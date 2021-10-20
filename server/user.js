const db = require("quick.db");
const { MongoClient } = require('mongodb');
const log4js = require("log4js");
const { TaskTimer, Task } = require("tasktimer");
const { parser, cartParse, cartsCreate, getPasswordHash, setPasswordHash } = require("./func");
const MODULES = require("./modules.json");  
const NODES = require("./nodes.json");


const timer = new TaskTimer(1000)
const client = new MongoClient('mongodb://localhost:27017')
const log = log4js.getLogger("cheese");
const TIME =()=> `[${new Date().getDay()}:${new Date().getUTCHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}]:`;
log4js.configure({
    appenders: { cheese: { type: "file", filename: "log.log" } },
    categories: { default: { appenders: ["cheese"], level: "error" } }
});



////////////////////////////////////////////////////////////////////////
function newTask(login, clb, day=1) {
    db.add("TASK_ID", 1)
    timer.add(
        new Task({
            id: `${login}_${db.get("TASK_ID")}`, 
            removeOnCompleted: true,
            tickInterval: ((((60*1000)*60)*24)*day), 
            callback: clb
        })
    ).start()
}
exports.registration = function(login, password, ip, optionsData) {
    if(db.has("user."+login)) return {error: "login bussy"};
    else {
        let newUser = {
            id: Object.keys(db.get("user")).length,
            ip: ip,
            login: login,
            password: setPasswordHash(password),
            firstName: "",
            lastName: "",
            phone: "",
            adres: "",
            kontact1: "",
            kontact2: "",
            avatar: "./img/no-avatar.png",
            payloads: [],
            favorites: [],
            nodes: [],
            rooms: [{name:"Серверная", visibility:"block"}]
        }
        db.set("user."+login, newUser)

        return new User(newUser)
    }
}
exports.autorise = function(login, password, row, ip) {
    if(!db.has("user."+login)) return {error: "нет такого юзера"};
    else {
        if(row && getPasswordHash(db.get("user."+login).password)!==password) return {error: "password error"}
        else if(!row && db.get("user."+login).password!==password) return {error: "password error"}
        else {
            let data = db.get("user."+login)
            data.ip=ip
            return new User(data)
        }
    }
}
////////////////////////////////////////////////////////////////////////


class User {
    constructor(data) {
        Object.keys(data).forEach((key)=> {
            this[key] = data[key]
        });
    }
    #dump() {
        db.set("user."+this.login, this)
    }
    _findShemeType(type) {
        return MODULES[type]
    }

    addNewRoom(name, clb) {
        if(this.rooms.length < 10){
            this.rooms.push({
                name: name??`новая комната ${this.rooms.length}`,
                visibility: "block",
            });
            
            clb(this.rooms)
            this.#dump()
        }
        else clb({error: "Максимальное кол-во комнат 10"})
    }
    reWriteRoom(name, id, clb) {
        if(name.length>3){
            console.log(this.rooms, id, name)
            this.rooms[id].name = name
            clb(this.rooms)
            this.#dump()
        }
        else clb({error:"название не может быть менее 3-х символов"})
    }
    delRoom(id, clb) {
        this.rooms.splice(id, 1)
        clb(this.rooms)
        this.#dump()
    }

    async payload(data) {
        await client.connect()
        const DB = client.db("rex")
        const payloads = DB.collection("payloads")
        let res = await payloads.insertOne({
            _id: this.login, 
            time: TIME(),
            payload: data
        });
        
        // таск на очистку через 5 дней
        newTask(this.login, ()=> payloads.dropIndex(res.insertedId), 5);
        this.payloads = data
        this.#dump()
    }
    setFavorite(data) {
        if(data instanceof Array) this.devices = data
        this.#dump()
    }
    recombination(roomId, device) {
        this.devices.forEach((dev, index)=> {
            if(dev.guid===device.guid) this.devices[index].room = roomId
        })
        this.#dump()
    }

    #addDevice(metaCarta, count) {
        let kart = {guid:db.get("guid")}

        Object.keys(metaCarta).map((moduleName)=> {
            if(metaCarta[moduleName].length > 0) kart[moduleName] = metaCarta[moduleName]
        });

        return kart
    }
    addNewNode(meta) {
        let metaCarta = {}
        if(!this.nodes) this.nodes = {}
        if(!this.nodes[meta.mac]) this.nodes[meta.mac] = {}
        this.nodes[meta.mac]._mac = meta.mac
        this.nodes[meta.mac]._type = meta.type
        this.nodes[meta.mac]._name = meta.name
        this.nodes[meta.mac]._frame = 0
        this.nodes[meta.mac]._knx = ""
        this.nodes[meta.mac].table = {}

        // modules:count
        parser(NODES[meta.type]).map((module, i)=> {
            let key = Object.keys(NODES[meta.type])[i]
            if(cartParse(key)) metaCarta[key] = cartParse(key)
            this.nodes[meta.mac].table[key] = module
        });

        let cart = this.#addDevice(metaCarta)
        this.nodes[meta.mac].cart = cartsCreate(meta.type, cart)

        this.#dump()
    }
    /** ?реализовать */
    setTable(mac, data) {

    }

    reNameDevice(name, id, clb) {
        if(name.length>3){
            if(this.devices[id]){
                this.devices[id].name = name
                clb(this.devices[id])
                this.#dump()
            }
            else clb({error:"девайс не найден"})
        }
        else clb({error:"название не может быть менее 3-х символов"})
    }
    dump(data) {
        this.devices.forEach((device, id)=> {
            if(data.devices[id]) this.devices[id].payload = data.devices[id].payload
            else log.error(this.login+" payload не совпадают(на сервере новее)")
        });

        this.#dump()
        return "ok"
    }
    exit() {
        this.status = "off"
        this.#dump()
    }

    
    // админ апи
    static deleteDevice(login, adminPassword, idDevices, clb) {
        let admin = db.get("user.admin")
        let user = db.get("user."+login)

        if(user){
            if(admin.password === adminPassword){
                let finds = user.devices.find((devices, i)=> {
                    if(devices.mac===mac){
                        delete user.devices[i];
                        return 1
                    }
                });
                
                if(finds) db.set("user."+login, user)
                else clb({error: "устройство не найдено в списке устройств юзера"})
            }
            else clb({error: "пароль администратора не верен"})
        }
        else clb({error: "юзер с таким логином не найден"})
    }
    static addDevice(login, mac, name, type, adminPassword, clb) {
        let admin = db.get("user.admin")
        let user = db.get("user."+login)

        if(user){
            if(admin.password === adminPassword){
                let finds = user.devices.find((devices)=> {
                    if(devices.mac===mac) return devices;
                });
                
                if(!finds){
                    user.devices.push({
                        mac: mac,
                        room: undefined,
                        name: name,
                        type: type,
                        status: 'created',
                        payload: {}
                    })
                    db.set("user."+login, user)
                }
                else clb({error: mac+" уже привязан к данному юзеру"})
            }
            else clb({error: "пароль администратора не верен"})
        }
        else clb({error: "юзер с таким логином не найден"})
    }
    static readTodo(login, mac, todo, adminPassword, clb) {
        let admin = db.get("user.admin")
        let user = db.get("user."+login)
        
        if(user){
            if(admin.password === adminPassword){
                let finds = user.devices.find((devices, i)=> {
                    if(devices.mac===mac){
                        user.devices[i].todo = todo
                        db.set("user."+login, user)
                        return user.devices[i]
                    }
                });

                if(finds) clb(finds)
                else clb({error: "не найдено кстройство"})
            }
            else clb({error: "пароль администратора не верен"})
        }
        else clb({error: "юзер с таким логином не найден"})
    }
    static getUserDevices(login, adminPassword, clb) {
        let admin = db.get("user.admin")
        let user = db.get("user."+login)

        if(user){
            if(admin.password === adminPassword){
                clb(user.devices)
            }
            else clb({error: "пароль администратора не верен"})
        }
        else clb({error: "юзер с таким логином не найден"})
    }
}


exports.User = User
const db = require("quick.db");
const log4js = require("log4js");
const CryptoJS = require('crypto-js');
const { parser, getPasswordHash, setPasswordHash } = require("./func");
const MODULES = require("./modules.json");  
const NODES = require("./nodes.json");



const log = log4js.getLogger("cheese")
const TIME =()=> `[${new Date().getDay()}:${new Date().getUTCHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}]:`;
const master = 'rexMyHome';
log4js.configure({
    appenders: { cheese: { type: "file", filename: "log.log" } },
    categories: { default: { appenders: ["cheese"], level: "error" } }
});





////////////////////////////////////////////////////////////////////////
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
            status: "off",
            devices: [],
            favorites: [],
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
const CARTS = [
    "/R$/onoff",
    "/T$/onoff",       
    "/T$/data",       
    "/T$/mode",        
    "/T$/headmode", 
    "/T$/coolmode",
    "/T$/MAINset",         
    "/T$/TIME1h",        
    "/T$/TIME1m",
    "/T$/TIME1set",         
    "/T$/TIME1onoff",   
    "/T$/TIME2h",        
    "/T$/TIME2m",
    "/T$/TIME2set",     
    "/T$/TIME2onoff",  
    "/T$/TIME3h",
    "/T$/TIME3m",
    "/T$/TIME3set",
    "/T$/TIME3onoff",
    "/T$/TIME4h",
    "/T$/TIME4m",
    "/T$/TIME4set",
    "/T$/TIME4onoff",
    "/T$/TIME5set",
    "/T$/TIME5onoff",
    "/D$/onoff",          
    "/D$/brightness",      
    "/D$/TIME1hour",        
    "/D$/TIME1min",         
    "/D$/TIME1set",         
    "/D$/TIME1onoff",       
    "/D$/TIME2hour",        
    "/D$/TIME2min",         
    "/D$/TIME2set",         
    "/D$/TIME2onoff",       
    "/D$/TIME3hour",        
    "/D$/TIME3min",        
    "/D$/TIME3set",        
    "/D$/TIME3onoff",       
    "/D$/TIME4hour",       
    "/D$/TIME4min",         
    "/D$/TIME4set",         
    "/D$/TIME4onoff"     
]
// [литерал] - шыблон
const META = {
    PMR: {
        relay: [
            {type:"lable", data:"Реле"}, 
            {type:'input', data:"name"}, 
            {type:'select', name:"room", data:`[rooms]()`}, 
            {type:'input', data:"GA1"}, 
            {type:'input', data:"GA2"}, 
            {type:'input', data:"GAstatus"}
        ],
        button: [
            {type:"lable", data:"INPUT"}, 
            {type:'input', data:"name"}, 
            {type:'select', name:"mod", data:['click','turnON','turnOFF','dimming','longClick','gerkonONOFF','gerkonOFFON','MS1min','MS5min','MS10min']},
            {type:'input', data:"GA1"}, 
            {type:'select', name:"mod", data:['click','turnON','turnOFF','dimming','longClick','gerkonONOFF','gerkonOFFON','MS1min','MS5min','MS10min']},
            {type:'input', data:"GA2"}, 
            {type:'input', data:"status"}
        ]
    }
}


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
    payload(devices, rooms) {
        console.log("payload:devices", devices)
        console.log("payload:rooms", rooms)

        db.set("dumps."+this.login+"."+TIME(), {devices:devices, rooms:rooms})
    }
    setFavorite(data) {
        if(data instanceof Array) this.devices = data
        this.#dump()
    }
    recombination(roomId, device) {
        this.devices.forEach((dev, index)=>{
            if(dev.guid===device.guid) this.devices[index].room = roomId
        })
        this.#dump()
    }

    #addDevice(metaCarta) {
        let kart = {room:0, guid:db.get("guid"), name:''}
        Object.keys(metaCarta).map((v)=> {
            if(metaCarta[v].length > 0) kart[v] = metaCarta[v]
        });

        return kart
    }
    addNewNode(meta) {
        let metaCarta = {}
        if(!this.nodes) this.nodes = {}
        if(!this.nodes[meta.mac]) this.nodes[meta.mac] = {}
        this.nodes[meta.mac]._type = meta.type
        this.nodes[meta.mac]._name = meta.name
        this.nodes[meta.mac]._frame = 0
        this.nodes[meta.mac].table = {}


        parser(NODES[meta.type]).map((row, i)=> {
            let key = Object.keys(NODES[meta.type])[i]
            if(cartParse(key)) metaCarta[key] = cartParse(key)
            this.nodes[meta.mac].table[key] = row
        });
        
        
        this.nodes[meta.mac].cart = this.#addDevice(metaCarta)
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
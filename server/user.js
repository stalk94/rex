const db = require("quick.db");
const CryptoJS = require('crypto-js');
const SHEME = require("./sheme.json");  //! deprecate
const log4js = require("log4js");
log4js.configure({
    appenders: { cheese: { type: "file", filename: "log.log" } },
    categories: { default: { appenders: ["cheese"], level: "error" } }
});


const log = log4js.getLogger("cheese")
const TIME =()=> `[${new Date().getDay()}:${new Date().getUTCHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}]:`;
const master = 'rexMyHome';


function setPasswordHash(pass) {
    return CryptoJS.AES.encrypt(pass, master).toString()
}
function getPasswordHash(hashPass) {
    return CryptoJS.AES.decrypt(hashPass, master).toString(CryptoJS.enc.Utf8)
}
function tokenGeneration(login, pass) {
    return CryptoJS.AES.encrypt(login+'&'+time(), pass).toString()
}
function tokenDecriptor(token, pass) {
    let rez = CryptoJS.AES.decrypt(token, pass).toString(CryptoJS.enc.Utf8)

    return rez === '' 
        ? '[❌]: error token'
        : rez
}
/** Верификатор регистрации нового устройства */
function verifyDevice(scheme) {
    const protos = {
        mac: ()=> {
            let find;

            if(scheme.length < 3) find = {error: "Вы не ввели mac id устройства"}
            else {
                let allUser = db.get("user");

                Object.keys(allUser).forEach((login)=> {
                    let devices = allUser[login].devices

                    devices.forEach((obj)=> {
                        if(obj.mac===device.mac) find = {error: "Данный девайс уже зарегистрирован, обратитесь в службу поддержки"}
                    });
                });
            }

            device.mac = find
        },
        name: ()=> {
            if(device.name==="") device.name = device.type
        },
        type: ()=> {
            let find = {error: "Такого типа устройства нет в базе данных"};
            let types = db.get("sheme")

            types.forEach((protos)=> {
                if(protos.type===device.type) find = undefined;
            });
            return find
        }
    }
    protos.mac()
    protos.name()

    return device
}

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
        return SHEME[type]
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

    addDevice(state, clb) {
        let {mac, type, name} = state
        db.add("guid", 1)

        let find = this.devices.find((device, index)=> {
            if(device.mac===mac){
                this.devices[index].name = name
                clb(this.devices[index])
                return true
            }
        });

        if(!find){
            console.log("new devices: ", state)
            let device = {
                guid: db.get("guid"),
                mac: mac,
                room: 0,
                name: name??`newDevice-${this.devices.length}`,
                type: type,
                sheme: SHEME[type],
                payload: {}
            }

            this.devices.push(device)
            this.#dump()
            clb(this)
        }
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
        })
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
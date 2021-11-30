const db = require("quick.db");
const { EventEmitter } = require("stream");
const { parser, cartParse, cartsCreate, getPasswordHash, setPasswordHash } = require("./func");
const MODULES = require("./modules.json");  
const NODES = require("./nodes.json");



////////////////////////////////////////////////////////////////////////
exports.registration = function(login, password, ip) {
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
            avatar: "",
            payloads: {},
            favorites: [],
            nodes: {},
            connect: [],
            rooms: [{name:"Скрытая", visibility:"block"}]
        }
        db.set("user."+login, newUser)

        return new User(newUser)
    }
}
exports.autorise = function(login, password, ip) {
    if(!db.has("user."+login)) return {error: "нет такого юзера"};
    else {
        if(db.get("user."+login).password===password){
            let data = db.get("user."+login);

            if(ip && data && data.ip!==ip) data.connect.push(ip)
            return new User(data)
        }
        else if(getPasswordHash(db.get("user."+login).password)===password) {
            let data = db.get("user."+login);

            if(ip && data.ip && data.ip!==ip) data.connect.push(ip)
            return new User(data)
        }
        else return {error: "password error"}
    }
}
////////////////////////////////////////////////////////////////////////


class User extends EventEmitter {
    constructor(data) {
        super()

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
            this.#dump()
            clb(this.rooms)
        }
        else clb({error: "Максимальное кол-во комнат 10"})
    }
    reWriteRoom(name, id, clb) {
        if(name.length>3){
            this.rooms[id].name = name
            clb(this.rooms)
            this.#dump()
        }
        else clb({error:"название не может быть менее 3-х символов"})
    }
    delRoom(id) {
        this.rooms.splice(id, 1)
        this.#dump()
        return this
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
        return this
    }
    setTable(mac, meta) {
        let data = this.nodes[mac].table 
        this.nodes[mac]._mac = meta.mac 
        this.nodes[mac]._knx = meta.knx
        this.nodes[mac]._name = meta.name 
        this.nodes[mac]._frame++
        this.nodes[mac].table = data

        if(mac!==meta.mac){
            let copy = this.nodes[mac]
            this.nodes[meta.mac] = copy
            delete this.nodes[mac]
        }
        this.#dump()
        
        return this
    }
    deleteNode(mac) {
        delete this.nodes[mac]
        Object.keys(this.payloads).map((key)=> {
            if(key.split("/")[0]===mac) delete this.payloads[key]
        })
        this.#dump()
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
    exit() {
        this.mqtt.end()
        delete this.mqtt
        this.status = "off"
        this.#dump()
    }
}


exports.User = User
const db = require("quick.db");
const CryptoJS = require('crypto-js');
const { conect } = require("./api");



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
function verifyDevice(device) {
    const protos = {
        mac: ()=> {
            let find;

            if(device.mac.length < 3) find = {error: "Вы не ввели mac id устройства"}
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
    protos.type()
    protos.name()

    return device
}

////////////////////////////////////////////////////////////////////////
exports.registration = function(login, password, optionsData) {
    if(db.has("user."+login)) return {error: "login bussy"};
    else {
        let newUser = {
            id: Object.keys(db.get("user")).length,
            login: login,
            password: setPasswordHash(password),
            avatar: "./img/no-avatar.png",
            status: "off",
            devices: [],
            rooms: []
        }
        db.set("user."+login, newUser)

        return new User(newUser)
    }
}
exports.autorise = function(login, password) {
    if(!db.has("user."+login)) return {error: "нет такого юзера"};
    else {
        if(db.get("user."+login+".password")!==password) return {error: "password error"}
        else return new User(db.get("user."+login))
    }
}
////////////////////////////////////////////////////////////////////////


class User {
    constructor(data) {
        Object.keys(data).forEach((key)=> {
            this[key] = data[key]
        });

        if(this.status === "off"){
            this.api = conect(this)
            this.status = "on"
        }
    }
    #dump() {
        delete this.api         //!
        db.set("user."+this.name, this)
    }
    addNewRoom(name, clb) {
        if(this.rooms.length < 10){
            this.rooms.push({
                name: name
            });
            
            clb(this.rooms)
            this.#dump()
        }
        else clb({error: "Максимальное кол-во комнат 10"})
    }
    addNewDevice(device, clb) {
        let vDev = verifyDevice(device)
        
        if(!vDev.type.error && !vDev.mac.error){
            vDev.room = undefined
            vDev.payload = {}

            this.devices.push(vDev);
            clb(vDev)
            this.#dump()
        }
        else clb(vDev)
    }
    /**
     * публикация команды устройсту от клиента
     * @param {*} idDevices mac устройства
     * @param {*} comand comand name
     * @param {*} massage 
     * @returns 
     */
    comand(idDevices, comand, massage) {
        if(this.devices[idDevices]){
            this.api.publish(idDevices+"/"+comand, massage)
        }
        else return {error: "ошибка устройства, обратитесь к менеджеру!"}
    }
    /**
     *  Chanel {_name, value}
     */
    async connectDevices() {
        this.devices.forEach((device)=> {
            let mac = device.mac

            Object.keys(device.payload).forEach((key)=> {
                this.api.subscribe(`${mac}/${key}`, (err, data)=> {
                    if(err) log(err);
                    else device.payload[key] = data
                });
            });
        });
    }
    /**
     * Переход в автономный режим
     */
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
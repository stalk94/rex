const MODULES = require("./modules.json"); 
const NODES = require("./nodes.json");
const CARTS = [
    "/R0/onoff",
    "/T0/onoff",       
    "/T0/data",       
    "/T0/mode",        
    "/T0/headmode", 
    "/T0/coolmode",
    "/T0/MAINset",         
    "/T0/TIME1h",        
    "/T0/TIME1m",
    "/T0/TIME1set",         
    "/T0/TIME1onoff",   
    "/T0/TIME2h",        
    "/T0/TIME2m",
    "/T0/TIME2set",     
    "/T0/TIME2onoff",  
    "/T0/TIME3h",
    "/T0/TIME3m",
    "/T0/TIME3set",
    "/T0/TIME3onoff",
    "/T0/TIME4h",
    "/T0/TIME4m",
    "/T0/TIME4set",
    "/T0/TIME4onoff",
    "/T0/TIME5set",
    "/T0/TIME5onoff",
    "/D0/onoff",          
    "/D0/brightness",      
    "/D0/TIME1hour",        
    "/D0/TIME1min",         
    "/D0/TIME1set",         
    "/D0/TIME1onoff",       
    "/D0/TIME2hour",        
    "/D0/TIME2min",         
    "/D0/TIME2set",         
    "/D0/TIME2onoff",       
    "/D0/TIME3hour",        
    "/D0/TIME3min",        
    "/D0/TIME3set",        
    "/D0/TIME3onoff",       
    "/D0/TIME4hour",       
    "/D0/TIME4min",         
    "/D0/TIME4set",         
    "/D0/TIME4onoff"     
]


/** 
 * заполнитель узла модулями 
 * node: конкретная нода
 */
const parser = function(node) {
    return Object.keys(node).map((keys)=> {
        let result = {}

        let literal = keys[0].toUpperCase()
        let iter = node[keys]
        let topics = MODULES[keys].map((topic, i)=> {
            return topic.split("/")[2]
        })

        for(let i=0; iter>i; i++) result[literal+i] = topics


        return result
    })
}
const cartParse =(moduleName)=> {
    let res = []

    CARTS.forEach((k)=> {
        if(moduleName[0]===k[1].toLowerCase()) res.push(k)
    });

    return  res
}

exports.setPasswordHash = function(pass) {
    return CryptoJS.AES.encrypt(pass, master).toString()
}
exports.getPasswordHash = function(hashPass) {
    return CryptoJS.AES.decrypt(hashPass, master).toString(CryptoJS.enc.Utf8)
}
exports.tokenGeneration = function(login, pass) {
    return CryptoJS.AES.encrypt(login+'&'+time(), pass).toString()
}
exports.tokenDecriptor = function(token, pass) {
    let rez = CryptoJS.AES.decrypt(token, pass).toString(CryptoJS.enc.Utf8)

    return rez === '' 
        ? '[❌]: error token'
        : rez
}
/** Верификатор регистрации нового устройства */
exports.verifyDevice = function(scheme) {
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





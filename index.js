const express = require("express");
const jsonParser = require("body-parser").json();
const db = require("quick.db");
const { MongoClient } = require('mongodb');
const app = express();
const log4js = require("log4js");
const path = require("path");
const {User, registration, autorise} = require("./server/user");


////////////////////////////////////////////////////////////////////////////
const TIME =()=> [new Date().getDay(), new Date().getUTCHours(), new Date().getMinutes(), new Date().getSeconds()];
log4js.configure({
    appenders: { cheeses: { type: "file", filename: "log.log" } },
    categories: { default: { appenders: ["cheeses"], level: "info" } }
});


const logger = log4js.getLogger("cheeses");
const mock = {
    login: "TestLoginName",
    firstName: "test",
    lastName: "test-last-name",
    phone: "06299992",
    adres: "Kiyv",
    kontact1: "director",
    kontact2: "director",
    password: "123456",
    avatar: "img/no-avatar.png",
    rooms: [
        {id: 0, name: "Квартира",}, 
        {id: 1, name: "Кухня"},
        {id: 2, name: "Спальня"}
    ],
    devices: [{
        mac: '0000',
        room: 1,
        name: "test-devices",
        type: "wtor",
        payload: {
            enable: 0, 
            value: 100,
            lastTime: TIME()
        }
    },
    {
        mac: '0000',
        room: 1,
        name: "test-devices",
        type: "termostat",
        payload: {
            enable: 0, 
            value: 100,
            temperature: 34,
            lastTime: TIME()
        }
    },
    {
        mac: '0011',
        room: 2,
        name: "test-devices2",
        type: "deamer",
        payload: {
            enable: 0, 
            value: 100,
            lastTime: TIME()
        }
    }]
};
 

////////////////////////////////////////////////////////////////////////////
app.get("/", (req, res)=> {
    res.sendFile(__dirname+"/dist/index.html")
});



// синхронизация с параметрами только через сервер
app.post("/auth", jsonParser, (req, res)=> {
    if(req.body.login && req.body.password){
        res.send(autorise(req.body.login, req.body.password, req.body.row, req.body.ip));
        logger.info("[🔌]авторизация: ", req.body.login, req.body.ip)
    }
    else res.send({error: "Не все поля заполнены"});
});
app.post("/regUser", jsonParser, (req, res)=> {
    if(req.body.login && req.body.password){
        res.send(registration(req.body.login, req.body.password, req.body.ip));
        logger.info("[🆕] регистрация: ", req.body.login, req.body.ip)
    }
    else res.send({error: "Не все поля заполнены"});
});
app.post("/sinc", jsonParser, (req, res)=> {
    if(req.body.test) res.send(mock);
    else {
        let user = autorise(req.body.login, req.body.password);
        res.send(user)
    }
});
app.post("/regNewDevice", jsonParser, (req, res)=> {
    let user = autorise(req.body.login, req.body.password);
    console.log(user)
    if(!user.error) user.addDevice(req.body.state, (data)=> {
        res.send(data)
    });
    else res.send(user)
});
app.post("/addNode", jsonParser, (req, res)=> {
    let user = autorise(req.body.login, req.body.password);

    if(!user.error) user.addNewNode(req.body.state);
    else res.send(user)
});
app.post("/readNameRoom", jsonParser, (req, res)=> {
    let user = autorise(req.body.login, req.body.password);
    if(!user.error) user.reWriteRoom(req.body.name, req.body.id, (data)=> {
        res.send(data)
    });
    else res.send(user)
});
app.post("/delRoom", jsonParser, (req, res)=> {
    let user = autorise(req.body.login, req.body.password);
    if(!user.error) user.delRoom(req.body.id, (data)=> {
        res.send(user)
    });
    else res.send(user)
});
app.post("/reNameDevice", jsonParser, (req, res)=> {
    let user = autorise(req.body.login, req.body.password);
    
    if(!user.error) user.reNameDevice(req.body.name, req.body.id, (data)=> {
        res.send(data)
    });
    else res.send(user)
});
app.post("/dump", jsonParser, (req, res)=> {
    let user = autorise(req.body.login, req.body.password);
    
    if(!user.error) user.payload(req.body.devices, req.body.rooms, (data)=> {
        res.send(data)
    });
    else res.send(user)
});
app.post("/favorites", jsonParser, (req, res)=> {
    let user = autorise(req.body.login, req.body.password);
   
    if(!user.error) user.setFavorite(req.body.data)
    res.send(user)
});
app.post("/payload", jsonParser, (req, res)=> {
    let user = autorise(req.body.login, req.body.password);
    
    if(!user.error) user.payload(req.body.data).then(()=> res.send(user))
    else res.send(user)
});
app.post("/set", jsonParser, (req, res)=> {
    // {mac:string, data:{}}
    let user = autorise(req.body.login, req.body.password);
    
    if(!user.error){
        user.setTable(req.body.mac, req.body.data)
        res.send(user)
    }
    else res.send(user)
});
app.post("/newNode", jsonParser, (req, res)=> {
    let user = autorise(req.body.login, req.body.password);
    
    if(!user.error && req.body.state){
        user.addNewNode(req.body.state)
        res.send(user)
    }
    else res.send(user)
});
app.post("/exit", jsonParser, (req, res)=> {
    let user = autorise(req.body.login, req.body.password);
    
    if(!user.error) user.dump(req.body.data)
    console.log("exit")
});
app.post("/recombination", jsonParser, (req, res)=> {
    let user = autorise(req.body.login, req.body.password);

    if(!user.error){
        user.recombination(req.body.roomId, req.body.device)
        res.send(user)
    }
    else res.send(user)
});

// admin api
app.post("/getUserList", jsonParser, (req, res)=> {
    if(req.body.token===""){
        res.send(db.get("user"))
    }
    else res.send({error:"error token"})
});
app.post("/getUser", jsonParser, (req, res)=> {
    if(req.body.token===""){
        if(db.has("user."+req.body.login)) res.send(db.get("user."+req.body.login));
        else res.send({error:"такого логина в базе не найдено"})
    }
    else res.send({error:"error token"})
});


////////////////////////////////////////////////////////////////////////////////
app.use('/', express.static(path.join(__dirname, './dist')));
app.listen(3000, ()=> logger.info("server start"))
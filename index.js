const express = require("express");
const jsonParser = require("body-parser").json();
const db = require("quick.db");
const app = express();
const fs = require("fs");
const path = require("path");
const {User, registration, autorise} = require("./server/user");


const TIME =()=> [new Date().getDay(), new Date().getUTCHours(), new Date().getMinutes(), new Date().getSeconds()];

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

let count = 0

// синхронизация с параметрами только через сервер
app.post("/auth", jsonParser, (req, res)=> {
    console.log(count++)
    if(req.body.test){
        if(count===10){mock.devices.pop()}
        else res.send(mock)
    }
    else {
        if(req.body.login && req.body.password) res.send(autorise(req.body.login, req.body.password));
        else res.send({error: "Не все поля заполнены"});
    }
});
app.post("/regUser", jsonParser, (req, res)=> {
    if(req.body.test) res.send(mock)
    else {
        if(req.body.login && req.body.password) res.send(registration(req.body.login, req.body.password));
        else res.send({error: "Не все поля заполнены"});
    }
});
// todo: добавить схемы девайсов
app.post("/regNewDevice", jsonParser, (req, res)=> {
    if(req.body.test){
        mock.devices.push()
        res.send(mock)
    }
    else {
        let user = autorise(req.body.login, req.body.password);
        if(!user.error) user.addNewDevice(req.body.data, (data)=> {
            res.send(data)
        });
        else res.send(user)
    }
});
app.post("/addRoom", jsonParser, (req, res)=> {
    if(req.body.test){
        mock.rooms.push({name: req.body.room})
        res.send(mock)
    }
    else {
        let user = autorise(req.body.login, req.body.password);
        if(!user.error) user.addNewRoom(req.body.room, (data)=> {
            res.send(data)
        });
        else res.send(user)
    }
});
app.post("/sinc", jsonParser, (req, res)=> {
    if(req.body.test) res.send(mock);
    else {
        let user = autorise(req.body.login, req.body.password);
        res.send(user)
    }
});
app.post("/comand", jsonParser, (req, res)=> {
    
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
app.listen(3000, ()=> console.log("start server"))
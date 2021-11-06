const express = require("express");
const cache = require('js-cache');
const sizeof = require('object-sizeof');
const jsonParser = require("body-parser").json();
const dompurify = require("dompurify");
const db = require("quick.db");
const { Server } = require("socket.io");
const http = require('http');
const app = express();
const cookie = require("cookie");
const cookieParser = require('cookie-parser');
const server = http.createServer(app)
const io = new Server(server, {
    secret: "rex",
    maxAge: 86400000,
    cookieHttpOnly: false,
    cookiePath: "/"
});
const fs = require("fs");
const pinoms = require('pino-multi-stream');
const path = require("path");
const {registration, autorise} = require("./server/user");
const { tokenGeneration } = require("./server/func")



////////////////////////////////////////////////////////////////////////////
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
const TIME =()=> [new Date().getDay(), new Date().getUTCHours(), new Date().getMinutes(), new Date().getSeconds()];
const prettyStream = pinoms.prettyStream()
const streams = [{stream: fs.createWriteStream('log.log')},{stream: prettyStream}];
const logger = pinoms(pinoms.multistream(streams))
const whiteList = {}


////////////////////////////////////////////////////////////////////////////
app.get("/", (req, res)=> {
    res.sendFile(__dirname+"/dist/index.html")
});



// синхронизация с параметрами только через сервер
app.post("/auth", jsonParser, (req, res)=> {
    let user;
    
    if(req.body.login && req.body.password) {
        user = autorise(req.body.login, req.body.password)
        
        if(!user.error){
            user.token = tokenGeneration(req.body.login, req.body.password)
            res.cookie("login", req.body.login)
            res.cookie("password", req.body.password)
            db.set("user."+user.login, user)
            logger.info("[🔌]авторизация: ", req.body.login)
            res.send(user);
        }
    }
    else res.send({error:"login or password error"})
});
app.post("/regUser", jsonParser, (req, res)=> {
    if(req.body.login && req.body.password){
        let user = registration(req.body.login, req.body.password)
        user.token = tokenGeneration(req.body.login, req.body.password)
        res.cookie("login", req.body.login)
        res.cookie("password", req.body.password)
        db.set("user."+user.login, user)
        logger.info("[🆕] регистрация: ", req.body.login)
        res.send(user);
    }
    else res.send({error: "Не все поля заполнены"});
});
app.post("/addNode", jsonParser, (req, res)=> {
    let user = autorise(req.body.login, req.body.password+"=");

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
app.post("/addRoom", jsonParser, (req, res)=> {
    let user = autorise(req.body.login, req.body.password);
    console.log(req.body.login, req.body.password)

    if(!user.error){
        user.rooms.push({visibility:"block", name:req.body.room})
        db.set("user."+req.body.login, user)
        res.send(user)
    }
    else res.send(user)
});
app.post("/reNameDevice", jsonParser, (req, res)=> {
    let user = autorise(req.body.login, req.body.password);
    
    if(!user.error) user.reNameDevice(req.body.name, req.body.id, (data)=> {
        res.send(data)
    });
    else res.send(user)
});
app.post("/set", jsonParser, (req, res)=> {
    // {mac:string, meta:{}, data:{}}
    let user = autorise(req.body.login, req.body.password);
    
    if(!user.error){
        user.setTable(req.body.mac, req.body.meta, req.body.data)
        setTimeout(()=> res.send(user), 500)
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
app.post("/delete", jsonParser, (req, res)=> {
    let user = autorise(req.body.login, req.body.password);

    if(!user.error && req.body.mac){
        user.deleteNode(req.body.mac)
        res.send(user)
    }
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




io.on('connection', (socket)=> {
    console.log('[🔌]соединение установлено:', socket.id)
   
    socket.on("init", (data)=> {
        let user = autorise(data.login, data.password)
        if(user) whiteList[socket.id] = user
    });
    socket.on("set", async(data)=> {
        let user = whiteList[socket.id]

        if(user){
            if(data.req[0] && data.req[1]){
                user[data.req[0]] = data.req[1]
                db.set("user."+user.login, user)

                if(data.req[0]==="payloads") socket.emit("get.payload", user.payloads)
                else socket.emit("get.user", user)
            }
            else socket.emit("error", "error key or value set")
        }
        else socket.emit("error", "error object user set")
    });
    socket.on("get", (data)=> {
        let user = whiteList[socket.id]

        if(user && data.req){
            console.log("get: ", data.req)
            socket.emit("get."+data, user[data.req])
        }
        else socket.emit("error", "user multi session")
    })
    socket.on("del", (data)=> {
        let user = whiteList[socket.id]

        if(user && data.req){
            console.log("delete: ", data.req)
            user.delete(data.req)
        }
        else socket.emit("error", "error delete data "+data.req)
    });
    socket.on("dump", (data)=> {
        let user = whiteList[socket.id]

        if(user && user.payloads){
            user.payloads = data.payloads
            db.set("user."+user.login, user)
            socket.emit("get.user", user)
        }
        else socket.emit("error", "error user data dump")
    });
    socket.on("app", (data)=> {
        let user = whiteList[socket.id]

        if(user)user.set("app", dompurify.sanitize(data.req))
        else socket.emit("error", "error dump dom")
    });
    socket.on("file.po", (data)=> {
        let user = whiteList[socket.id]

        if(user){
            if(user.nodes[data.req[0]]) user.nodes[data.req[0]].file = data.req[1]
            db.set("user."+user.login, user)
        }
        else socket.emit("error", "error file.po")
    });
    socket.on("exit", (data)=> {
        let user = whiteList[socket.id]
        
        if(user){
            console.log('[⭕]соединение разорвано:', socket.id)
            db.set("user."+user.login, user)
            socket.disconnect()
        }
        else {
            socket.disconnect()
            logger.error("[❗]: error socket disconection")
        }
    });
    socket.on("disconnect", ()=> {
        console.log('[🆑]соединение разорвано:', socket.id)
        delete whiteList[socket.id]
    });
});


////////////////////////////////////////////////////////////////////////////////
app.use('/', express.static(path.join(__dirname, './dist')));
app.use('/', express.static(path.join(__dirname, './src')));
server.listen(3000, ()=> logger.info("server start"))
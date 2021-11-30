require("dotenv").config();
const fs = require("fs");
const path = require("path");
const pinoms = require('pino-multi-stream');
const express = require("express");
const db = require("quick.db");
const { Server } = require("socket.io");
const http = require('http');
const app = express();
const cookieParser = require('cookie-parser');
const server = http.createServer(app);
const io = new Server(server);
const {registration, autorise} = require("./server/user");
const { tokenGeneration } = require("./server/func");
const { run } = require("./server/server-broker");



////////////////////////////////////////////////////////////////////////////
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
const prettyStream = pinoms.prettyStream()
const streams = [{stream: fs.createWriteStream('log.log')}, {stream: prettyStream}];
logger = pinoms(pinoms.multistream(streams))
whiteList = {}


////////////////////////////////////////////////////////////////////////////
app.get("/", (req, res)=> {
    if(!app.locals){
        app.locals = []
        app.locals.push(req.headers)
    }
    res.sendFile(__dirname+"/dist/index.html")
});



io.on('connection', (socket)=> {
    console.log('[🔌]соединение установлено:', socket.id);
   

    socket.on("registration", (data)=> {
        console.log(data)
        if(data.login && data.password){
            let user = registration(data.login, data.password, socket.conn.remoteAddress);
            user.token = tokenGeneration(data.login, data.password);
            db.set("user."+user.login, user);

            logger.info("[🆕] регистрация: ", data.login);
            socket.emit("get.registration", user);
        }
        else socket.emit("get.registration", {error:"Не все поля заполнены"});
    });
    socket.on("auth", (data)=> {
        if(data.login && data.password) {
            let user = autorise(data.login, data.password);
            
            if(!user.error){
                db.set("user."+user.login, user)
                socket.emit("get.auth", user);

                logger.info("[🔌]авторизация: ", data.login);
            }
        }
        else socket.emit("get.auth", {error:"login or password error"});
    });

    socket.on("init", (data)=> {
        let user = autorise(data.login, data.password)
        
        if(user && !user.error){
            whiteList[socket.id] = user
            socket.emit("get.init", user)
        }
        else socket.disconnect()
    });
    socket.on("set", (data)=> {
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
            logger.info("get: ", data.req)
            socket.emit("get."+data, user[data.req])
        }
        else socket.emit("error", "user multi session")
    })
    socket.on("del", (data)=> {
        let user = whiteList[socket.id]

        if(user && data.req){
            logger.info("delete: ", data.req)
            user.delete(data.req)
        }
        else socket.emit("error", "error delete data "+data.req)
    });
    socket.on("payload", (data)=> {
        let user = whiteList[socket.id]
        
        if(user && data){
            user.payloads[data.topic] = data.value
            db.set("user."+user.login, user)
            socket.emit("get.payload", user.payloads)
            socket.emit("mqtt.payload", {topic:data.topic,value:data.value})
            whiteList[socket.id] = user
        }
        else socket.emit("error", "error payload")
    });
    socket.on("file.po", (data)=> {
        let user = whiteList[socket.id]

        if(user){
            if(user.nodes[data.req[0]]) user.nodes[data.req[0]].file = data.req[1]
            db.set("user."+user.login, user)
        }
        else socket.emit("error", "error file.po")
    });
    socket.on("editTable", (data)=> {
        let user = whiteList[socket.id]
        
        if(user){
            whiteList[socket.id] = user.setTable(data.mac, data.meta)
            
            if(!user.error){
                socket.emit("get.user", user)
                socket.emit("get.editTable", user)
            }
        }
        else socket.emit("error", "error editTable")
    });
    socket.on("createRoom", (data)=> {
        let user = whiteList[socket.id]
        
        if(user && data){
            user.rooms.push({visibility:"block", name:data})
            db.set("user."+user.login, user)
            socket.emit("get.user", user)
            socket.emit("get.createRoom", user.rooms)
        }
        else socket.emit("error", "error createRoom")
    });
    socket.on("renameRoom", (data)=> {
        let user = whiteList[socket.id]

        if(user && data.name && data.id){
            user.reWriteRoom(data.name, data.id, (newData)=> {
                whiteList[socket.id].rooms = newData
                socket.emit("get.user", whiteList[socket.id])
                socket.emit("get.renameRoom", newData)
            });
        }
        else socket.emit("error", "error rename room")
    });
    socket.on("deleteRoom", (id)=> {
        let user = whiteList[socket.id]

        if(user && id){
            user.delRoom(id, (data)=> {
                if(!data.error){
                    whiteList[socket.id] = data
                    socket.emit("get.deleteRoom", id)
                }
            })
        }
        else socket.emit("error", "error delete room")
    });
    socket.on("reWriteTable", (data)=> {
        let user = whiteList[socket.id]

        if(user && data.mac && data.meta){
            let newData = user.setTable(data.mac, data.meta)
            if(!newData.error){
                whiteList[socket.id] = newData
                socket.emit("get.user", newData)
                socket.emit("get.reWriteTable", newData.nodes[data.meta.mac])
            }
        }
        else socket.emit("error", "error reWriteTable")
    });
    socket.on("newNode", (data)=> {
        let user = whiteList[socket.id]

        if(user && data.state){
            whiteList[socket.id] = user.addNewNode(data.state)
            socket.emit("get.user", whiteList[socket.id])
            socket.emit("get.newNode", data.state)
        }
        else socket.emit("error", "error add node")
    });
    socket.on("delete", (mac)=> {
        let user = whiteList[socket.id] 

        if(user && mac){
            user.deleteNode(mac)
            socket.emit("get.delete", user)
        }
        else socket.emit("error", "delete node error")
    })
    socket.on("exit", ()=> {
        let user = whiteList[socket.id]
        
        if(user){
            logger.info('[⭕]соединение разорвано:', socket.id)
            db.set("user."+user.login, user)
            socket.disconnect()
        }
        else socket.disconnect();
    });
    socket.on("disconnect", ()=> {
        logger.warn('[🆑]соединение разорвано:', socket.id)
        delete whiteList[socket.id]
    });
});



////////////////////////////////////////////////////////////////////////////////
app.use('/', express.static(path.join(__dirname, './dist')));
app.use('/', express.static(path.join(__dirname, './src')));
server.listen(3001, ()=> {
    logger.info("server start")
    run()
});
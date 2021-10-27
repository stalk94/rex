const express = require("express");
const jsonParser = require("body-parser").json();
const dompurify = require("dompurify");
const db = require("quick.db");
const { Server } = require("socket.io");
const http = require('http');
const app = express();
const server = http.createServer(app)
const io = new Server(server);
const log4js = require("log4js");
const path = require("path");
const {registration, autorise} = require("./server/user");


////////////////////////////////////////////////////////////////////////////
const TIME =()=> [new Date().getDay(), new Date().getUTCHours(), new Date().getMinutes(), new Date().getSeconds()];
log4js.configure({
    appenders: { cheeses: { type: "file", filename: "log.log" } },
    categories: { default: { appenders: ["cheeses"], level: "info" } }
});
const logger = log4js.getLogger("cheeses");



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
app.post("/addRoom", jsonParser, (req, res)=> {
    let user = autorise(req.body.login, req.body.password);
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
app.post("/newNode", jsonParser, (req, res)=> {
    let user = autorise(req.body.login, req.body.password);
    
    if(!user.error && req.body.state){
        user.addNewNode(req.body.state)
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


const online = {}
const useAuthorise =(login, password, id)=> {
    let user = autorise(login, password+"=")
    if(user && !user.error) online[id] = user
    
    return user
}
function useStorage(id) {
    let user = online[id]
    
    db.set("user."+user.login, user)
    console.log("saved")
}


io.on('connection', (socket)=> {
    console.log('[🔌]соединение установлено:', socket.id)

    socket.on("init", (data)=> {
        let res = useAuthorise(data[0], data[1], socket.id)
        
        if(res) {
            socket.emit("on.connect", {user:res[0], token:res[1]})
            useStorage(socket.id)
        }
        else socket.emit("error", "error init")
    });
    socket.on("set", (data)=> {
        let user = online[socket.id]
        
        if(user && data[0] && data[1]){
            user[data[0]] = data[1]
            useStorage(socket.id)
            if(data[0]==="payloads") socket.emit("get.payload", user.payloads)
            else socket.emit("get.user", user)
        }
        else socket.emit("error", "error set")
    });
    socket.on("get", (data)=> {
        let user = online[socket.id]
        if(user){
            socket.emit("get."+data, user[data])
            useStorage(socket.id)
        }
        else socket.emit("error", "user multi session")
    })
    socket.on("del", (data)=> {
        let user = online[socket.id]
        if(user){
            user.delete(data)
            useStorage(socket.id)
        }
        else socket.emit("error", "user multi session")
    });
    socket.on("dump", (data)=> {
        let user = online[socket.id]
        if(user){
            useStorage(socket.id)
            socket.emit("get.user", user)
        }
        else socket.emit("error", "user multi session")
    });
    socket.on("app", (data)=> {
        let user = online[socket.id]
        if(user){
            user.set("app", dompurify.sanitize(data))
            useStorage(socket.id)
        }
        else socket.emit("error", "user multi session")
    });
    socket.on("exit", ()=> {
        if(online[socket.id]){
            console.log('[🆑]соединение разорвано:', socket.id)
            let user = online[socket.id]
            db.set("user."+user.login, online[socket.id])
            delete online[socket.id]
            socket.disconnect()
        }
        else {
            socket.disconnect()
            logger.error("[❗]: error socket disconection")
        }
    });
    socket.on("disconnect", ()=> {
        if(online[socket.id]){
            console.log('[🆑]соединение разорвано:', socket.id)
            let user = online[socket.id]
            db.set("user."+user.login, online[socket.id])
            delete online[socket.id]
        }
        else logger.error("[❗]: error socket disconection")
    });
});


////////////////////////////////////////////////////////////////////////////////
app.use('/', express.static(path.join(__dirname, './dist')));
server.listen(3000, ()=> logger.info("server start"))
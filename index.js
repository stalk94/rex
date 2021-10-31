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



////////////////////////////////////////////////////////////////////////////
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
const TIME =()=> [new Date().getDay(), new Date().getUTCHours(), new Date().getMinutes(), new Date().getSeconds()];
const prettyStream = pinoms.prettyStream()
const streams = [{stream: fs.createWriteStream('log.log')},{stream: prettyStream}];
const logger = pinoms(pinoms.multistream(streams))
const online = {}


////////////////////////////////////////////////////////////////////////////
app.get("/", (req, res)=> {
    res.sendFile(__dirname+"/dist/index.html")
});



// синхронизация с параметрами только через сервер
app.post("/auth", jsonParser, (req, res)=> {
    let user;
    let cocs = cookieParser.JSONCookies(req.cookies)
    
    if(req.body.login && req.body.password) {
        user = autorise(req.body.login, req.body.password)
        
        if(!user.error){
            res.cookie("login", user.login)
            res.cookie("password", user.password)
            logger.info("[🔌]авторизация: ", req.body.login)
            res.send(user);
        }
    }
    else if(cocs.login && cocs.password){
        user = autorise(cocs.login, cocs.password)
        res.send(user);
    }
    else res.send({error:"login or password error"})
});
app.post("/regUser", jsonParser, (req, res)=> {
    if(req.body.login && req.body.password){
        let user = registration(req.body.login, req.body.password)
        req.cookies["login"] = req.body.login
        req.cookies["passsword"] = user.password
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
app.post("/exit", jsonParser, (req, res)=> {
    let user = autorise(req.body.login, req.body.password);
    
    if(!user.error && req.body.state){
        res.clearCookie("login")
        res.clearCookie("password")
        res.clearCookie("token")
        res.redirect("http://31.172.65.58/")
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




io.on('connection', (socket)=> {
    let cookies =()=> cookieParser.JSONCookies(cookie.parse(socket.request.headers.cookie))
    console.log('[🔌]соединение установлено:', socket.id)
    
    const useOnline =()=> {
        if(cookies().login && !online[cookies().login]){
            let user = autorise(cookies().login, cookies().passsword)
            if(!user.error) online[user.login] = user
            else {
                socket.emit('delete_cookie', 'login');
                socket.emit('delete_cookie', 'password');
                socket.disconnect()
            }
        }
    }
    

    socket.on("set", (data)=> {
        let user = online[cookieParser.JSONCookies(cookie.parse(socket.request.headers.cookie)).login]
        if(!user){
            useOnline()
            user = online[cookieParser.JSONCookies(cookie.parse(socket.request.headers.cookie)).login]
        }
        
        if(user){
            if(data[0] && data[1]){
                user[data[0]] = data[1]
                db.set("user."+user.login, user)

                if(data[0]==="payloads") socket.emit("get.payload", user.payloads)
                else socket.emit("get.user", user)
            }
            else socket.emit("error", "error key or value set")
        }
        else socket.emit("error", "error object user set")
    });
    socket.on("get", (data)=> {
        useOnline()
        let user = online[cookieParser.JSONCookies(cookie.parse(socket.request.headers.cookie)).login]
        if(user && data){
            socket.emit("get."+data, user[data])
        }
        else socket.emit("error", "user multi session")
    })
    socket.on("del", (data)=> {
        useOnline()
        let user = online[cookieParser.JSONCookies(cookie.parse(socket.request.headers.cookie)).login]

        if(user){
            user.delete(data)
        }
        else socket.emit("error", "user multi session")
    });
    socket.on("dump", (data)=> {
        useOnline()
        let user = online[cookieParser.JSONCookies(cookie.parse(socket.request.headers.cookie)).login]

        if(user && user.payloads){
            user.payloads = data.payloads
            db.set("user."+user.login, user)
            socket.emit("get.user", user)
        }
        else socket.emit("error", "user multi session")
    });
    socket.on("app", (data)=> {
        let user = online[cookieParser.JSONCookies(cookie.parse(socket.request.headers.cookie)).login]
        if(user){
            user.set("app", dompurify.sanitize(data))
        }
        else socket.emit("error", "user multi session")
    });
    socket.on("file.po", (data)=> {
        let user = online[cookieParser.JSONCookies(cookie.parse(socket.request.headers.cookie)).login]

        if(user){
            if(user.nodes[data[0]]) user.nodes[data[0]].file = data[1]
            db.set("user."+user.login, user)
        }
        else socket.emit("error", "error file.po")
    });
    socket.on("exit", ()=> {
        if(online[cookieParser.JSONCookies(cookie.parse(socket.request.headers.cookie)).login]){
            console.log('[🆑]соединение разорвано:', socket.id)
            let user = online[cookieParser.JSONCookies(cookie.parse(socket.request.headers.cookie)).login]
            db.set("user."+user.login, user)

            delete online[cookieParser.JSONCookies(cookie.parse(socket.request.headers.cookie)).login]
            socket.disconnect()
        }
        else {
            socket.disconnect()
            logger.error("[❗]: error socket disconection")
        }
    });
    socket.on("disconnect", ()=> {
        if(online[cookieParser.JSONCookies(cookie.parse(socket.request.headers.cookie)).login]){
            console.log('[🆑]соединение разорвано:', socket.id)
            let user = online[cookieParser.JSONCookies(cookie.parse(socket.request.headers.cookie)).login]

            if(user){
                db.set("user."+user.login, user)
                delete online[cookieParser.JSONCookies(cookie.parse(socket.request.headers.cookie)).login]
            }
        }
        else logger.error("[❗]: error socket disconection")
    });
});


////////////////////////////////////////////////////////////////////////////////
app.use('/', express.static(path.join(__dirname, './dist')));
app.use('/', express.static(path.join(__dirname, './src')));
server.listen(3000, ()=> logger.info("server start"))
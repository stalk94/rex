const { io } = require("socket.io-client");
import mqtt from "mqtt";


export default function Api(user) {
    const payloads =()=> user.payloads


    if(!window.socket) {
        window.socket = io()
        socket.on('disconnect', ()=> {
            document.location.reload()
        });
        socket.on("get.payload", (data)=> {
            let user = store.get("user")
            user.payloads = data
            store.set("user", user)
        });
        socket.on("get.user", (data)=> {
            if(!data.error) store.set("user", user)
            else EVENT.emit("error", data.error)
        });
        socket.on("error", (txt)=> {
            EVENT.emit("error", txt)
            if(txt==="error object user set") setTimeout(()=> window.location.reload(), 1000)
        });

        socket.emit("init", {login:user.login, password:user.password})
    }


    window.api = mqtt.connect("ws://31.172.65.58:8083/mqtt", {
        clean: true,
        connectTimeout: 1000,
        clientId: user && user.id ? user.id : "test",
        username: user && user.login ? user.login : "test"
    });
    window.api.on('reconnect', (error)=> {
        EVENT.emit("warn", 'mqtt reconnecting: '+error)
    });
    window.api.on('error', (error)=> {
        EVENT.emit("error", 'mqtt connection failed: '+error)
    });
    window.api.on("message", (...arg)=> {
        let topic = arg[0].slice(0, arg[0].length-2)
        let data = String(arg[1])

        user = store.get("user")
        let payload = payloads()

        if(user && !payload){
            socket.emit("set", {token:user.token, req:["payloads", {[topic]: data}]})
        }
        else if(topic && payload){
            payload[topic] = data
            socket.emit("set", {token:user.token, req:["payloads", payload]})
            EVENT.emit("payload", `[🔌]topic: ${topic}; value: ${data}`)
        }
    });
}
import mqtt from "mqtt";
import { send } from "./engine";


const client = store.get("user")
const payload = store.get("payload")

window.api = mqtt.connect("ws://31.172.65.58:8083/mqtt", {
    clean: true,
    connectTimeout: 1000,
    clientId: client.id,
    username: client.login
});
window.api.on('reconnect', (error)=> {
    console.log('reconnecting:', error)
});
window.api.on('error', (error)=> {
    err('Connection failed:', error)
});



window.api.on("message", (...arg)=> {
    let topic = arg[0].slice(0, arg[0].length-2)
    let data = String(arg[1])
    
    payload[topic] = data
    store.set("payload", payload)
    console.log("[🔌]topic:", topic, "value:", data)
    send("payload", {login:client.login,password:client.password,data:payload}, "POST").then((val)=> val.json().then((v)=> store.set("user", v)))
});

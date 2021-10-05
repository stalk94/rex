import mqtt from "mqtt";
import { send } from "./engine";


const client = store.get("user")


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

client.devices.forEach((device)=> {
    Object.values(device.sheme).forEach((val)=> {
        val.forEach((topic)=> {
            console.log("[subscribe]:", device.mac+topic+"st")
            window.api.subscribe(device.mac+topic+"st")
        })
    })
});
window.api.on("message", (...arg)=> {
    let u = store.get("user")
    let target = arg[0].split("/")
    let topic = target[target.length-1]
    topic = topic.slice(0, topic.length-2)

    u.devices.forEach((device, index)=> {
        if(device.mac===target[0]){
            console.log("[🔌]:", topic, String(arg[1]))
            
            device.payload[topic] = String(arg[1])
            u.devices[index] = device
            store.set("user", u)       // на сервер паралельно
            send("dump", {login:u.login,password:u.password,data:u}, "POST").then((v)=> console.log(v))
        }
    });
});
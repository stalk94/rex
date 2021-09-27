import mqtt from "mqtt";
const client = store.get("user")
import { send } from "./engine";

const canvas = document.querySelector("#stars")
const events =(name, val)=> new CustomEvent(name, {
    bubbles: true,
    detail: { value: val}
});
window.emit =(name, ...values)=> {
	window.dispatchEvent(events(name, values[1]))
}
window.onresize =()=> {
    canvas.style.width = window.innerWidth+"px"
    canvas.style.height = window.innerHeight+"px"
}




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
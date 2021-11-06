import mqtt from "mqtt";


let user = store.get("user")
const payloads =()=> user.payloads



window.api = mqtt.connect("ws://31.172.65.58:8083/mqtt", {
    clean: true,
    connectTimeout: 1000,
    clientId: user.id??"test",
    username: user.login
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

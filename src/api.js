import mqtt from "mqtt";


let user = store.get("user")


window.api = mqtt.connect("ws://31.172.65.58:8083/mqtt", {
  clean: true,
  connectTimeout: 1000,
  clientId: user.id??"test",
  username: user.login
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

  user = store.get("user")
  const payloads =()=> user.payloads
  let payload = payloads()

  if(user && !payload){
    payload = {}
    socket.emit("set", ["payloads", {}])
  }
  if(topic && payload){
    payload[topic] = data
    socket.emit("set", ["payloads", payload])
    console.log("[🔌]topic:", topic, "value:", data)
  }
});
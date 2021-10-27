import mqtt from "mqtt";







export const apiInit =()=> {
    const user = store.get("user")

    if(user && user.id){
        window.api = mqtt.connect("ws://31.172.65.58:8083/mqtt", {
            clean: true,
            connectTimeout: 1000,
            clientId: user.id,
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
            
            let payloads = user.payloads
            payloads[topic] = data
            socket.emit("set", ["payloads", payloads])
            console.log("[🔌]topic:", topic, "value:", data)
        });
    }
}
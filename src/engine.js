const observe = require('store/plugins/observe');
const mqtt = require("mqtt");
window.store = require('store');


class EventEmmitter {
  constructor() {
    this.events = {};
  }
  on(eventName, fn) {
      if(!this.events[eventName]) this.events[eventName] = [];
      this.events[eventName].push(fn);
      
      return ()=> {
          this.events[eventName] = this.events[eventName].filter(eventFn => fn !== eventFn);
      }
  }
  emit(eventName, data) {
      const event = this.events[eventName];
      if(event){
          event.forEach((fn)=> {
              fn.call(null, data);
          });
      }
  }
}


if(!store.get("curent.room")) store.set("curent.room", {name:"Избранное",id:0})
window.gurl = `http://31.172.65.58/`;   //31.172.65.58
store.addPlugin(observe);
window.EVENT = new EventEmmitter()



window.readFile =(input, clb)=> {
  let file = input.files[0]
  let reader = new FileReader()

  reader.readAsText(file)

  reader.onload =()=> {
    console.log(reader.result)
    if(clb) clb(reader.result)
  }
  reader.onerror =()=> EVENT.emit("error", reader.error);
}
window.onExit =()=> {
  socket.emit("exit", {})
  localStorage.clear()
  window.location.reload()
}
window.onbeforeunload =()=> {
  socket.emit("exit", {})
  store.remove("loadApi")
}
window.useSocket =(event, dat, reductor)=> {
  socket.emit(event, dat)

  if(!useSocket.table[event]){
      useSocket.table[event] = ""
      socket.on("get."+event, (data)=> {
          useSocket.table[event] = data
          if(!data.error) reductor(data)
          else EVENT.emit("error", data.error)
      });
  }
}
useSocket.table = {}



window.initSocket = function(user) {
  	if(!window.socket) window.socket = io();
  
    socket.on("get.init", (user)=> {
      if(user && !user.error){
            window.api = mqtt.connect("ws://31.172.65.58:8083/mqtt", {
                clean: true,
                connectTimeout: 1000,
                clientId: user.id,
                username: user.login
            });
            window.api.on("message", (...arg)=> {
              let topic = arg[0].slice(0, arg[0].length-2)
              let data = String(arg[1])
  
              console.log(`[🔌]${topic}: ${String(arg[1])}`)
              socket.emit("payload", {topic:arg[0], value:data});
            });

            window.api.setMaxListeners(4000)
            window.api.on('reconnect', (error)=> EVENT.emit("warn", error));
            window.api.on('error', (error)=> EVENT.emit("error", error));
        }
        else console.log("error init api")
    });
  	socket.on("get.payload", (data)=> {
        console.log(data)
      	let users = store.get("user")
      	users.payloads = data
     	  store.set("user", users)
  	});
    socket.on("get.user", (data)=> {
      if(!data.error) store.set("user", data)
      else EVENT.emit("error", data.error)
    });
    socket.on("error", (txt)=> {
      EVENT.emit("error", txt)
      if(txt==="error object user set") setTimeout(()=> window.location.reload(), 1000)
    });
    socket.on('disconnect', ()=> document.location.reload());


  	if(user) socket.emit("init", {login:user.login, password:user.password})
}
window.useStart =()=> {
  if(window.api){
      window.usePub = function(topic, val) {
          let strVal = String(val)
          window.api.publish(topic, strVal)
          console.log('[📡]:', topic, ':', strVal)
      }
      window.useSub = function(topic, def, fn) {
          let user = store.get("user");
    
          socket.on("mqtt.payload", (payload)=> {
              if(topic===payload.topic){
                  fn(payload.value)
              }
          });
          if(window.api && topic){
              if(!useSub.payloads[topic]) window.api.subscribe(topic);
              if(!user.payloads[topic]){
                  user.payloads[topic] = def
                  store.set("user", user)
              }
          }
          else console.log("! api не инициализировано")
      }
      window.useUnmountSub = function(topic) {
          delete window.useSub.payloads[topic]
      }
    
      window.useSub.payloads = {}
  }
  else setTimeout(()=> useStart(), 50)
}
import cookie from "cookie";
const observe = require('store/plugins/observe');
const { io } = require("socket.io-client");


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

window.socket = io()
window.store = require('store');
store.addPlugin(observe)
const gurl = "http://localhost:3000/";
window.EVENT = new EventEmmitter()


export const useCokie =(login, password)=> {
  return cookie.parse(document.cookie)
}


window.onExit =()=> {
  EVENT.emit("exit")
  socket.emit("exit", store.get("user"))
  document.cookie = 'login=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  document.cookie = 'password=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';

  setTimeout(()=> {
    store.remove("user");
  }, 1000);
}


socket.on('delete_cookie', (cookie)=> {
  document.cookie = cookie+'=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
});
socket.on('disconnect', ()=> {
  document.location.reload()
});
store.set("curent.room", {name:"Избранное", id:-1})
socket.on("multiconnect", ()=> {
  EVENT.emit("error", "Обнаружено новое соединение, это было отключено от сервера!!!")
});
socket.on("get.payload", (data)=> {
  let user = store.get("user")
  user.payloads = data
  store.set("user", user)
});
socket.on("error", (txt)=> {
  EVENT.emit("error", txt)
});


window.readFile =(input, clb)=> {
    let file = input.files[0]
    let reader = new FileReader()

    reader.readAsText(file)

    reader.onload =()=> {
      console.log(reader.result)
      if(clb) clb(reader.result)
    }
    reader.onerror =()=> {
      EVENT.emit("error", reader.error)
    }
}


export function send(url, data, metod) {
  let response;


  if(metod==="GET"){
      response = fetch(gurl + url, {
          method: "GET",
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          redirect: 'follow', 
          referrerPolicy: 'no-referrer'
      });
  }
  else response = fetch(gurl + url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  });

  return response
}
import cookie from "cookie";
const observe = require('store/plugins/observe');
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
const gurl = "http://localhost:3000/";
store.addPlugin(observe)
window.EVENT = new EventEmmitter()


window.useCokie =(login, password)=> {
  return cookie.parse(document.cookie)
}
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
window.onExit =()=> {
  socket.emit("exit", {})
  localStorage.clear()
  //document.cookie = 'login=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  //document.cookie = 'password=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';

  setTimeout(()=> {
    window.location.reload()
  }, 1000);
}



window.send = function(url, data, metod) {
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
window.useSend = function(url, data, metod, clb) {
    send(url, data, metod).then((dat)=> {
        dat.json().then((val)=> {
            clb(val)
        })
    })
}
window.onbeforeunload =()=> {
  socket.emit("exit", {})
  store.remove("loadApi")
}
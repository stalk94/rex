const ReactDOMServer = require('react-dom/server');



export const useCokie =(login, password)=> {
  if(login && password){
      document.cookie = `login=${login}`
      document.cookie = `password=${password}`
  }
  else {
    let cookies = document.cookie.split(";")
    let res = {}

    cookies.forEach((elem)=> {
      let tokien = elem.split("=")
      if(tokien[0]==="login" && tokien[1]!=="") res.login = tokien[1]
      else if(tokien[0]===" password" && tokien[1]!=="") res.password = tokien[1]
    });
    
    return res
  } 
}

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
const gurl = "http://localhost:3000/";
window.EVENT = new EventEmmitter()



window.serverStore = {
	cache: {},
	on: EVENT.on,
	emit: EVENT.emit,
	init(login, password) {
		socket.on("on.connect", (data)=> {
			this.cache = data
		});
		this._listens()
		socket.emit("init", [login, password])
	},
	set(key, value) { 
		socket.emit("set", [key, value])
	},
	get(key) {
		socket.emit("get", key)
    console.log(this.cache[key])
		if(this.cache[key]) return this.cache[key]
		else return null
	},
	_listens() {
		socket.on("on.get", (data)=> {
			this.cache[data.key] = data.value
			this.emit(data.key, data.value)
		});
    EVENT.on("unmount", (data)=> data[0], data[1])
	},
  domStore(app) {
    //const testRenderer = TestRenderer.create(app)
    socket.emit("app", ReactDOMServer.renderToString(app))
  }
}


window.onExit =()=> {
  EVENT.emit("exit")

  setTimeout(()=> {
    document.cookie = "login=";
    document.cookie = "password=";
    store.remove("user");
    store.remove("payload")
  }, 1000);
}
window.onbeforeunload =()=> {
  socket.emit("set")
}
socket.on("multiconnect", ()=> {
  EVENT.emit("error", "Обнаружено новое соединение, это было отключено от сервера!!!")
});

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
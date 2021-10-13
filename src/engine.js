const gurl = "http://localhost:3000/";
const engine = require('store/src/store-engine');
const observe = require('store/plugins/observe');
const ls = require('store/storages/localStorage');


window.store = engine.createStore(ls, observe);
window.onresize =()=> {
    //canvas.style.width = window.innerWidth+"px"
    //canvas.style.height = window.innerHeight+"px"
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



window.triger = new EventEmmitter()
window.addEventListener("beforeunload", ()=> {
  triger.emit("exit")
});
send("sheme", {}, "GET").then((data)=> {
	data.json().then((val)=> {
		store.set("SCHEME", val)
	});
});
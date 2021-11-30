import cookie from "cookie";
const observe = require('store/plugins/observe');
const gurl = "http://localshost:3000/";


window.store = require('store');
store.addPlugin(observe)
window.useCokie =(login, password)=> {
    return cookie.parse(document.cookie)
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

window.send =(url, data, metod)=> {
    console.log(url, data, metod)
    
    return({then:(clb)=> { 
        clb(store.get("user"))
    }})
}


window.EVENT = new EventEmmitter()
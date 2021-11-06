import cookie from "cookie";
const observe = require('store/plugins/observe');
window.store = require('store');
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
    
}


window.EVENT = new EventEmmitter()
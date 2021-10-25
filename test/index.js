class EventEmmitter {
    constructor() {
      this.events = {};
    }
    on(eventName, fn) {
      if(!this.events[eventName]) this.events[eventName] = [];
      this.events[eventName].push(fn);
      
      return ()=> {
        this.events[eventName] = this.events[eventName].filter((eventFn)=> fn !== eventFn);
      }
    }
    emit(eventName, data) {
      const event = this.events[eventName];
      if(event){
        event.forEach((fn, i)=> {
          if(fn.call) fn.call(null, data);
        });
      }
    }
    remove(eventName, fn) {
      if(this.events[eventName]){
        delete this.events[eventName]
        console.log("[x]event remove", eventName)
      }
    }
}

const testEmiter = new EventEmmitter() 


window.test = {
    cache: {},
    on: testEmiter.on,
    emit: testEmiter.emit,
    set(key, val) {
        this.cache[key] = val 
        console.table(this.cache)
    },
    get(key) {
        if(!this.cache[key]){
            this.cache[key] = "test"
        }

        return this.cache[key]
    }
}
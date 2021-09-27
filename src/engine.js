const engine = require('store/src/store-engine');
const observe = require('store/plugins/observe');
const ls = require('store/storages/localStorage');
window.store = engine.createStore(ls, observe);
const gurl = "http://31.172.65.58/";



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


window.server = function(path, data) {
	let user = store.get("user")
	send(path, {login:user.login, password:user.password, ...data}, "POST").then((res)=> {
		res.json().then((resData)=> {
			if(!resData.error) store.set(`responce:${path}`, resData)
			else console.log("[⚠️]:", path, resData)
		})
	});
}
store.watch("user", (data)=> window.server("dump", {...data}))
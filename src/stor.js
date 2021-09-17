import {createState} from 'jedisdb'
import { send } from "./engine";


let user = window.localStorage.getItem("user")!==null ? JSON.parse(window.localStorage.getItem("user")) : {login:'test', password:"test"}
send("auth", {login:user.login, password:user.password}, "POST").then((data)=> {
    data.json().then((userData)=> {
        createState({
            user: userData,
            rooms: userData.rooms,
            devices: userData.devices,
            init: {}
        })
    })
});


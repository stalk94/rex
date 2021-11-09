import "./engine.js";
const { io } = require("socket.io-client");
import React, {useState, useEffect} from "react";
import { useLocalstorageState, useDidMount } from "rooks";
import App from "./application";
import Main from "./index";
import ReactDOM from "react-dom";



const initSocket =(user)=> {
    if(!window.socket) {
        window.socket = io()
        socket.on('disconnect', ()=> {
            document.location.reload()
        });
        socket.on("get.payload", (data)=> {
            let user = store.get("user")
            user.payloads = data
            store.set("user", user)
        });
        socket.on("get.user", (data)=> {
            if(!data.error) store.set("user", user)
            else EVENT.emit("error", data.error)
        });
        socket.on("error", (txt)=> {
            EVENT.emit("error", txt)
            if(txt==="error object user set") setTimeout(()=> window.location.reload(), 1000)
        });

        socket.emit("init", {login:user.login, password:user.password})
    }
}


export default function UI (props) {
    const [user, setUser] = useLocalstorageState("user", false)
    const [render, setRender] = useState("")
    
    useDidMount(()=> {
        if(user && user.login && user.password){
            useSend("auth", {login:user.login, password:user.password}, "POST", (userData)=> {
                if(!userData.error){
                    setUser(userData)
                    setRender(<App user={ userData } />)
                    initSocket(user)
                }
                else alert("login or password error")
            });
        }
        else setRender(<Main useRender={(data)=> setRender(<App user={data} />)}/>);
    })
    
    
    return(
        <>{ render }</>
    );
}


ReactDOM.render(<UI/>, document.querySelector(".root"))
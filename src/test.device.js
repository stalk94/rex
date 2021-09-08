import React, { useState, useEffect } from "react";
import { send } from "./engine"




const options =(clientId, login)=> {
    return ({
        clean: true,
        connectTimeout: 2000,
        clientId: clientId,
        username: login
    });
}
async function authorization(client) {
    let data = window.localStorage.getItem("user")

    if(data!==null) client.data = JSON.parse(data)
    else viewAuthWindow(client.data)
}
function log(s) {
    console.log(s)
}

const client = mqtt.connect("ws://31.172.65.58:8083/mqtt", options("test-ClientId", "test-userName"))
client.on('reconnect', (error)=> {
    log('reconnecting:', error)
});
client.on('error', (error)=> {
    log('Connection failed:', error)
    //setConsole(`[error]: ${error.toString()}`)
    //setColor("red")
});

client.subscribe("SYS")
let inital = false


///////////////////////////////////////////////////////////////////////
const formError =(props)=> <h3 style={{color:"red"}}>{props}</h3>;

function Form(props) {
    const [valuePub, setPub] = useState("")
    const [valueSub, setSub] = useState("")
    const [valueMsg, setMsg] = useState("")
    const [color, setColor] = useState("grey")
    const [console, setConsole] = useState("вывод устройства...")

    if(!inital){
        client.on('message', (topic, message)=> {
            log('receive message：', topic, message.toString())
            setConsole(`[${topic}]: ${message.toString()}`)
            setColor("green")
        });

        inital = true
    }
    const init =(type, value)=> {
        if(type==="pub") client.publish(value, "tests", setConsole)
        else client.subscribe(value, setConsole)
    }

    const setsPub =(ev)=> setPub(ev.target.value)
    const setsSub =(ev)=> setSub(ev.target.value)
    const setsMsg =(ev)=> { setMsg(ev.target.value); client.publish(valuePub, valueMsg) }
    const setInitPub =()=> init("pub", valuePub)
    const setInitSub =()=> init("sub", valueSub)


    return(
        <div style={{display:"grid", width:"30vh"}}>
            <h3 style={{color:color}}>{console}</h3>

            <h4>Топик в который публикуем команды для устройства: {valuePub}</h4>
            <input placeholder="topic publish" type="text" onInput={setsPub} value={valuePub} />
            <button onClick={setInitPub}> connect </button>

            <h4>Топик который будем слушать ('SYS' по умолчанию)</h4>
            <input placeholder="topic subscribe" type="text" onInput={setsSub} value={valueSub} />
            <button onClick={setInitSub}> connect </button>

            <h4>Сообщение устройству: {valueSub}</h4>
            <input placeholder="massage" type="text" onInput={(ev)=> setMsg(ev.target.value)} value={valueMsg} />
            <button onClick={setsMsg}> send </button>
        </div>
    );
}




export default function TestDevice(props) {
    return(<Form/>);
}
import React, { useState, useEffect } from "react";
import { send } from "../engine"
import { DropDown2 } from "./form"


function log(s) {
    console.log(s)
}


///////////////////////////////////////////////////////////////////////
const formError =(props)=> <h3 style={{color:"red"}}>{props}</h3>;






function Form(props) {
    const [valuePub, setPub] = useState("")
    const [valueSub, setSub] = useState("")
    const [valueMsg, setMsg] = useState("")
    const [color, setColor] = useState("grey")
    const [console, setConsole] = useState("вывод устройства...")


    const setInitPub =()=> ''
    const setInitSub =()=> ''


    return(
        <div style={{display:"grid", width:"30vh"}}>
            <h3 style={{color:color}}>{console}</h3>


            <h4>Топик который будем слушать ('SYS' по умолчанию):</h4>
            <input placeholder="topic subscribe" type="text" onInput={setSub} value={valueSub} />
            <button onClick={setInitSub}> connect </button>

            <h4>Сообщение устройству: {valueSub}</h4>
            <input placeholder="massage" type="text" onInput={(ev)=> setMsg(ev.target.value)} value={valueMsg} />
            <button onClick={setMsg}> send </button>
        </div>
    );
}




export default function TestDevice(props) {
    return(<Form/>);
}
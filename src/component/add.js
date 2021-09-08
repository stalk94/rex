import React, { useState, useEffect, useContext } from "react";
import { send } from "../engine";



export default function AddDevice(props) {
    const [err, setError] = useState() 
    const [mac, setMac] = useState()
    const [name, setName] = useState()
    const [type, setType] = useState()

    const onSend =()=> {
        let user = JSON.parse(window.localStorage.getItem("user"))

        send("regNewDevice", { login:user.login, password:user.password, data:{mac:mac, name:name, type:type} }, "POST").then((res)=> {
            res.json().then((data)=> {
                if(!data.mac.error && !data.type.error ) props.add(data)
                else if(data.mac.error) setError(data.mac.error)
                else setError(data.type.error)
            });
        });
    }

    return(
        <div className="intrf">
            {err ? <div>{err}</div> : "" }
            mac id device:
            <input type="text" 
                value={ mac } 
                onInput={(ev)=> setMac(ev.target.value)}
            />
            Имя устройства(любое):
            <input type="text" 
                value={ name } 
                onInput={(ev)=> setName(ev.target.value)}
            />
            Тип устройства:
            <select>

            </select>
            <button onClick={onSend}>
                <i class="fal fa-plus-circle"/>
                Добавить
            </button>
        </div>
    );
}
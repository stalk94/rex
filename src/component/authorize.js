import React, { useState, useEffect } from 'react';
import { send } from "../engine";


/**
 * @param {*} props 
 * `onOk()`  
 * `onErr()`
 */
export default function Authorize(props) {
    const [login, setLogin] = useState("")
    const [password, setPass] = useState("")

    const auth =()=> {
        send("auth", {login:login, password:password, row:true}, "POST").then((res)=> {
            res.json().then((data)=> {
                if(!data.error) props.onOk(data);
                else props.onErr(data.error);
            })
        });
    }
    const reg =()=> {
        send("regUser", {login:login, password:password}, "POST").then((res)=> {
            res.json().then((data)=> {
                if(!data.error) props.onOk(data);
                else props.onErr(data.error);
            })
        });
    }


    return(
        <div style={{marginTop:"0px"}} className="intrf">
            Логин:
            <input type="text" 
                value={ login } 
                onInput={(ev)=> setLogin(ev.target.value)}
            />
            Пароль:
            <input type="password" 
                value={ password } 
                onInput={(ev)=> setPass(ev.target.value)}
            />

            <div className="line">
                <button style={{marginTop:"20px", width:"35%"}} 
                    onClick={ auth }
                >
                    <i className="bx bx-user"/>
                    Авторизация
                </button>
                <button style={{marginTop:"20px", marginLeft:"50px", width:"35%"}} 
                    onClick={ reg }
                >
                    <i className="bx bxs-lock-open"/>
                    Регистрация
                </button>
            </div>
        </div>
    );
}



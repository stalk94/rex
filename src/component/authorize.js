import React, { useEffect, useState } from 'react';
import { useInput } from "rooks";

let user = store.get("user")


/**
 * onOk: `Function`   
 * onErr: `Function`
 */
export default function Authorize(props) {
    const login = useInput("")
    const password = useInput("")

    const auth =(arg)=> socket.emit("auth", arg);
    const reg =()=> socket.emit("registration", {login:login.value, password:password.value});
    
    useEffect(()=> {
        socket.on("get.registration", (data)=> {
            if(!data.error) props.onOk(data);
            else props.onErr(data.error);
        });
        socket.on("get.auth", (data)=> {
            if(!data.error) props.onOk(data);
            else props.onErr(data.error);
        });

        if(user && user.login && user.password) auth({login:user.login, password:user.password})
    }, [])


    return(
        <div style={{marginTop:"0px",marginBottom:"5%"}} className="intrf">
            Логин:
            <input type="text" {...login}/>
            Пароль:
            <input type="password" {...password} />

            <div className="buttons-reg">
                <button className="btn-reg" onClick={()=> auth({login:login.value, password:password.value}) }>
                    <i className="bx bx-user"/>
                    Авторизация
                </button>
                <button className="btn-reg" onClick={ reg }>
                    <i className="bx bxs-lock-open"/>
                    Регистрация
                </button>
            </div>
        </div>
    );
}
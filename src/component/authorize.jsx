import React from 'react';
import { useInput } from "rooks";
import { send } from "../engine";



export default function Authorize(props) {
    const login = useInput()
    const password = useInput()

    const auth =()=> {
        send("auth", {login:login.value, password:password.value}, "POST").then((res)=> {
            res.json().then((data)=> {
                if(!data.error) props.onOk(data);
                else props.onErr(data.error);
            })
        });
    }
    const reg =()=> {
        send("regUser", {login:login.value, password:password.value, ip:data}, "POST").then((res)=> {
            res.json().then((data)=> {
                if(!data.error) props.onOk(data);
                else props.onErr(data.error);
            })
        });
    }


    return(
        <div style={{marginTop:"0px"}} className="intrf">
            Логин:
            <input type="text" {...login}/>
            Пароль:
            <input type="password" {...password} />

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
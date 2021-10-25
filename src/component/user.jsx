import React, {useState, useEffect} from "react";
import {Menu, MenuItem, MenuButton} from '@szhsin/react-menu';
import exit from "../img/exit.svg";
import redact from '../img/pen-tool.png';



export default function User(props) {
    const [firsName, setFirstName] = useState(props.children.firstName)
    const [lastName, setLastName] = useState(props.children.lastName)
    const [phone, setPhone] = useState(props.children.phone)
    const [adres, setAdres] = useState(props.children.adres)
    const [kontact1, setKontact1] = useState(props.children.kontact1)
    const [kontact2, setKontact2] = useState(props.children.kontact2)

    useEffect(()=> {
        let user = {
            firsName:firsName, 
            lastName:lastName, 
            phone:phone,
            adres:adres, 
            kontact1:kontact1, 
            kontact2:kontact2
        }

        Object.keys(user).forEach((key)=> {
            socket.emit("set", [key, user[key]])
        });
    }, [firsName, lastName, phone, adres, kontact1, kontact2])

    return(
        <div className="User">
            <div className="line">
                <img className="avatar" src={props.children.avatar}/>
                <div className="userData">
                    <h2>{props.children.login}</h2>
                    <div style={{display:"flex", flexDirection:"column"}}>
                        <h5 style={{textAlign:"left", margin:"0px", color:"grey"}}>Имя:</h5>
                        <input type="text" onInput={(ev)=> setFirstName(ev.target.value)} value={firsName}/>
                        <h5 style={{textAlign:"left", margin:"0px", color:"grey"}}>Фамилия:</h5>
                        <input type="text" onInput={(ev)=> setLastName(ev.target.value)} value={lastName}/>
                        <h5 style={{textAlign:"left", margin:"0px", color:"grey"}}>Номер телефона:</h5>
                        <input type="text" onInput={(ev)=> setPhone(ev.target.value)} value={phone}/>
                        <h5 style={{textAlign:"left", margin:"0px", color:"grey"}}>Адрес:</h5>
                        <input type="text" onInput={(ev)=> setAdres(ev.target.value)} value={adres}/>
                    </div>
                </div>
            </div>
            <ul>
                <h5 style={{textAlign:"left", margin:"0px", color:"grey"}}>Контактное лиццо1:</h5>
                <input type="text" onInput={(ev)=> setKontact1(ev.target.value)} value={kontact1}/>
                <h5 style={{textAlign:"left", margin:"0px", color:"grey"}}>Контактное лиццо2:</h5>
                <input type="text" onInput={(ev)=> setKontact2(ev.target.value)} value={kontact2}/>

                <div className="line" id="exit" onClick={onExit}>
                    <img src={exit}/>
                    <h3> Выход </h3>
                </div>
            </ul>
        </div>
    );
}
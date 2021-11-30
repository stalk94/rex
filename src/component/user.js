import React, {useState, useEffect} from "react";
import { useInput } from "rooks";
import exit from "../img/exit.svg";
import noAvatar from "../img/no-avatar.png";





export default function User(props) {
    const [avatar, setAvatar] = useState(props.user.avatar??noAvatar)
    const firstName = useInput(props.user.firstName)
    const lastName = useInput(props.user.lastName)
    const phone = useInput(props.user.phone)
    const adres = useInput(props.user.adres)
    const kontact1 = useInput(props.user.kontact1)
    const kontact2 = useInput(props.user.kontact2)

    useEffect(()=> {
        let user = {
            firsName: firstName.value, 
            lastName: lastName.value, 
            phone: phone.value,
            adres: adres.value, 
            kontact1: kontact1.value, 
            kontact2: kontact2.value, 
        }
        if(props.user.avatar==="") setAvatar(noAvatar)
    }, [])


    return(
        <div className="User">
            <div className="line">
                <img src={avatar}/>
                <div className="userData">
                    <h2>{ props.user.login }</h2>
                    <div style={{display:"flex", flexDirection:"column"}}>
                    <h5 style={{textAlign:"left", margin:"0px", color:"grey"}}>Имя:</h5>
                    <input type="text" {...firstName}/>
                    <h5 style={{textAlign:"left", margin:"0px", color:"grey"}}>Фамилия:</h5>
                    <input type="text" {...lastName}/>
                    <h5 style={{textAlign:"left", margin:"0px", color:"grey"}}>Номер телефона:</h5>
                    <input type="text" {...phone}/>
                    <h5 style={{textAlign:"left", margin:"0px", color:"grey"}}>Адрес:</h5>
                    <input type="text" {...adres}/>
                    </div>
                </div>
            </div>

            <ul>
                <h5 style={{textAlign:"left", margin:"0px", color:"grey"}}>Контактное лиццо1:</h5>
                <input type="text" {...kontact1}/>
                <h5 style={{textAlign:"left", margin:"0px", color:"grey"}}>Контактное лиццо2:</h5>
                <input type="text" {...kontact2}/>

                <div className="line" id="exit" onClick={onExit}>
                    <img src={exit}/><h3> Выход </h3>
                </div>
            </ul>
        </div>
    );
}
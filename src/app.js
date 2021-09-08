import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import logo from "./img/logo.svg";
import exit from "./img/exit.svg";
import userIcon from "./img/user.svg";
import house from "./img/house.svg";
import "./css/style.css";
import "./css/fontawesome.css";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Navigation from "./component/navigation";
import AddDevice from "./component/add";
import { send } from "./engine";
import Authorize from "./component/authorize";
import { Modal } from "./component/form";
import DeviceManager from "./component/device.manager";
import DevicePanel from "./component/device.panel";


let user = window.localStorage.getItem("user")!==null 
    ? JSON.parse(window.localStorage.getItem("user")) 
    : {login:'test', password:"test"}
const onFetch =(setUser, setDevice, setRooms, onError)=> {
    window.onFetch = setInterval(()=> send("auth", {login:user.login, password:user.password, test:"test"}, "POST").then((rawData)=> {
        rawData.json().then((data)=> {
            if(!data.error){
                setUser(data)
                setDevice(data.devices)
                setRooms(data.rooms)
            }
            else onError(data.error);
        })
    }), 2500)
}
/////////////////////////////////////////////////////////////
const onExit =()=> {
    window.localStorage.clear()
    document.location.href = "index.html"
}
const HeaderNav =(props)=> {
    return(
        <React.Fragment>
            <img className="link" onClick={()=> props.fn("home")} id="home" src={house}/>
            <h3 style={props.style} className="Error">{props.title}</h3>
            <img className="link" onClick={()=> props.fn("user")} id="user" src={userIcon}></img>
        </React.Fragment>
    );
}
const User =(props)=> {
    const [firsName, setFirstName] = useState(props.children.firstName)
    const [lastName, setLastName] = useState(props.children.lastName)
    const [phone, setPhone] = useState(props.children.phone)
    const [adres, setAdres] = useState(props.children.adres)
    const [kontact1, setKontact1] = useState(props.children.kontact1)
    const [kontact2, setKontact2] = useState(props.children.kontact2)


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

                <div className="line" id="exit" onClick={props.onExit}>
                    <img src={exit}/>
                    <h3>Выход</h3>
                </div>
            </ul>
        </div>
    );
}
//////////////////////////////////////////////////////////////


function App(props) {
    const [user, setUser] = useState(props.user)
    const [view, setView] = useState("devices")
    const [devices, setDevice] = useState(user.devices)
    const [rooms, setRooms] = useState(user.rooms)
    const [title, setTitle] = useState(<HeaderNav className="line top-panel" fn={setView}/>)
    //////////////////////////////////////////
    const pages = { 
        devices: <DevicePanel devices={devices} rooms={rooms}/>,
        home: <DeviceManager const={3000} devices={devices} rooms={rooms}/>,
        user: <User onExit={onExit}>{user}</User>,
        add: <AddDevice add={onAddDevice} />,
        modal: ""
    }
    //////////////////////////////////////////
    const onError =(textError)=> {
        setTitle(<HeaderVav title={textError} fn={setView}/>)
        setView("auth")
        setTimeout(()=> setTitle(<HeaderNav fn={setView}/>), 5000)
    }
    const onAddDevice =(device)=> {
        props.user.devices.push(device)
        setDevice(props.user.devices)
    }
    const onAddRoom =(val)=> {
        send("addRoom", {login:props.user.login, password:props.user.password, room:val}, "POST").then((res)=> {
            res.json().then((val)=> {
                if(!val.error) setRooms(val);
                else onError(val);
            })
        })
    }
    const closeModal =()=> {
        setView("home")
    }
    const openModal =(content)=> {
        pages.modal = <Modal close={closeModal}>{content}</Modal>;
        setView("modal")
    }
    useEffect(()=> {
        if(!window.onFetch) onFetch(setUser, setDevice, setRooms, onError)
    })

    return(
        <article>
        <main>
            <aside>
                <header className="logo">
                    <img src={ logo }/>
                </header>
                <nav className="card">
                    <Navigation 
                        rooms={ rooms } 
                        setRoom={ onAddRoom } 
                        fn={ setView } 
                        modal={ openModal }
                    />
                </nav>
            </aside>

            <main className="body">
                <header style={{position:"fixed"}}>
                    { title }
                </header>
                <div className="area">
                    { pages[view] }
                </div>
            </main>
        </main>
        </article>
    );
}


send("auth", {login:user.login, password:user.password, test:"test"}, "POST").then((data)=> {
    data.json().then((userData)=>
        ReactDOM.render(<App user={userData}/>, document.querySelector(".root"))) 
})
window.onresize =()=> {
    const canvas = document.querySelector("#stars")
    canvas.style.width = window.innerWidth+"px"
    canvas.style.height = window.innerHeight+"px"
}
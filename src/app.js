import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import "./css/style.css";
import "./css/fontawesome.css";
import logo from "./img/logo.svg";
import exit from "./img/exit.svg";
import userIcon from "./img/user.svg";
import house from "./img/house.svg";
import hard from "./img/hard.png";
import { NavigationHome } from "./component/navigation";
import SchemeConstructor from "./component/scheme";
import { send } from "./engine";
import { Modal } from "./component/form";
import FavoriteDevice from "./component/device.manager";
import DevicePanel from "./component/device.panel";
import Catalog from "./component/lists";
import Api from "./api";


let user = window.localStorage.getItem("user")!==null ? JSON.parse(window.localStorage.getItem("user")) : {login:'test', password:"test"}
const onFetch =(setUser, setDevice, setRooms, onError)=> {
    window.onFetch = setInterval(()=> send("auth", {login:user.login, password:user.password}, "POST").then((rawData)=> {
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
const api = Api(user)
/////////////////////////////////////////////////////////////
const onExit =()=> {
    window.localStorage.clear()
    document.location.href = "index.html"
}
const HeaderNav =(props)=> {
    return(
        <React.Fragment>
            <img className="link" onClick={()=> props.fn("home")} id="home" src={house}/>
            <img className="link" onClick={()=> props.fn("atoms")} id="serverRoom" src={hard}/>
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
    const onAddDevice =(device)=> {
        send("addDevice", {device}, "POST").then((res)=> {
            res.json().then((value)=> {
                if(value.error) console.log("error")
                else ''
            })
        })
    }
    const onAddRoom =(val)=> {
        send("addRoom", {login:props.user.login, password:props.user.password, room:val}, "POST").then((res)=> {
            res.json().then((val)=> {
                if(!val.error) console.log(val);
                else console.log(val.error);
            })
        })
    }
    const readRoom =(val, id)=> {
        send("readNameRoom", {login:props.user.login, password:props.user.password, name:val, id:id}, "POST").then((res)=> {
            res.json().then((val)=> {
                if(!val.error) setLeftNavigations(<NavigationHome rooms={rooms} setRoom={onAddRoom} readRoom={readRoom} event={setView}/>);
                else console.log(val.error);
            })
        })
    }
    const delRoom =(id)=> {
        send("delRoom", {login:props.user.login, password:props.user.password, id:id}, "POST").then((res)=> {
            res.json().then((val)=> {
                if(!val.error) setLeftNavigations(<NavigationHome rooms={rooms} setRoom={onAddRoom} readRoom={readRoom} event={setView}/>);
                else console.log(val.error);
            })
        })
    }
    const selectDevice =(ev)=> {
        
    }

    const [user, setUser] = useState(props.user)
    const [view, setView] = useState("test")
    const [devices, setDevice] = useState(user.devices)
    const [rooms, setRooms] = useState(user.rooms)
    const [title, setTitle] = useState(<HeaderNav className="line top-panel" fn={setView}/>)
    function listDevicesSortable() {
        let find = []
        
        rooms.forEach((room, index)=> {
            find.push({title:room.name, list:[]})
        });
        if(rooms.length>0) rooms.forEach((device)=> {
            if(device.room) find[device.room].list.push(device)
        });

        return find
    }
    //<NavigationHome rooms={rooms} setRoom={onAddRoom} readRoom={readRoom} event={setView}/>
    const [leftNavigation, setLeftNavigations] = useState(<NavigationHome rooms={rooms} setRoom={onAddRoom} readRoom={readRoom} event={setView}/>)

    
    //////////////////////////////////////////
    const pages = { 
        test: <SchemeConstructor/>,
        devices: <DevicePanel devices={devices} rooms={rooms}/>,
        home: <FavoriteDevice devices={devices} rooms={rooms}/>,
        user: <User onExit={onExit}>{user}</User>,
        modal: ''
    }
    //////////////////////////////////////////
    const setError =(textError)=> {
        setTitle(<HeaderVav title={textError} fn={setView}/>)
        setView("auth")
        setTimeout(()=> setTitle(<HeaderNav fn={setView}/>), 5000)
    }
    function setNavigation() {
        if(view==='serverRoom'){
            setLeftNavigations(<Catalog list={listDevicesSortable()} event={console.log} onAdd={onAddDevice}/>)
            pages.devices = <SchemeConstructor error={setError}/>
        }
        else {
            setLeftNavigations(<NavigationHome rooms={rooms} setRoom={onAddRoom} readRoom={readRoom} event={setView}/>)
            pages.devices = <DevicePanel devices={devices} rooms={rooms}/>
        }
    }
    const closeModal =()=> {
        setView("home")
    }
    const openModal =(content)=> {
        pages.modal = <Modal close={closeModal}>{content}</Modal>;
        setView("modal")
    }
    useEffect(()=> {
        if(!window.onFetch) onFetch(setUser, setDevice, setRooms, setError)
    });


    return(
        <article>
        <main>
            <aside>
                <header className="logo">
                    <img src={ logo }/>
                </header>
                <nav className="card">
                    { leftNavigation }
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


send("auth", {login:user.login, password:user.password}, "POST").then((data)=> {
    data.json().then((userData)=> ReactDOM.render(<App user={userData}/>, document.querySelector(".root"))) 
})
window.onresize =()=> {
    const canvas = document.querySelector("#stars")
    canvas.style.width = window.innerWidth+"px"
    canvas.style.height = window.innerHeight+"px"
}
window.oncontextmenu = ((ev)=>{
    let ctxMain = ev.target.getAttribute("ctx")
    if(ctxMain){
        console.log(ctxMain)
    }
    return false
});
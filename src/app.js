import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
require("./stor");
import useJedis from 'jedisdb'
import "./css/style.css";
import "./css/fontawesome.css";
import logo from "./img/logo.svg";
import exit from "./img/exit.svg";
import userIcon from "./img/user.svg";
import house from "./img/house.svg";
import hard from "./img/hard.png";
import NavigationHome from "./component/navigation";
import SchemeConstructor from "./component/scheme";
import { send } from "./engine";
import FavoriteDevice from "./component/device.manager";
import DevicePanel from "./component/device.panel";
import Catalog from "./component/lists";
import Api from "./api";
import {Menu, MenuItem, MenuButton} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';


let user = window.localStorage.getItem("user")!==null ? JSON.parse(window.localStorage.getItem("user")) : {login:'test', password:"test"}
const onFetch =(setUser, setDevice, setRooms)=> {
    window.onFetch = setInterval(()=> send("auth", {login:user.login, password:user.password}, "POST").then((rawData)=> {
        rawData.json().then((data)=> {
            if(!data.error){
                setUser(data)
                setDevice(data.devices)
                setRooms = data.rooms
            }
            else console.log(data.error);
        })
    }), 4000)
}
const api = Api(user, console.log)
/////////////////////////////////////////////////////////////
const onExit =()=> {
    window.localStorage.clear()
    document.location.href = "index.html"
}
const HeaderNav =(props)=> {
    return(
        <React.Fragment>
            <Menu menuButton={<MenuButton><img src={house}/></MenuButton>} transition>
                <MenuItem onClick={props.home}> Главная </MenuItem>
                <MenuItem onClick={props.add}> Серверная </MenuItem>
                <MenuItem onClick={onExit}> Выход </MenuItem>
            </Menu>
            <h3 style={props.style} className="Error">{props.title}</h3>
            <img className="link" onClick={props.user} id="user" src={userIcon}></img>
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
const Favorite =(props)=> {
    const devices = useJedis("devices")
    const rooms = useJedis("rooms")

    return(
        <div className="area">
            <FavoriteDevice 
                devices={devices} 
                rooms={rooms}
            />
        </div>
    );
}
//////////////////////////////////////////////////////////////


function App(props) {
    const user = useJedis("user")
    const devices = useJedis("devices")
    const rooms = useJedis("rooms")
    ////////////////////////////////////////
    const onAddDevice =(device)=> {
        console.log(device)
        devices.state = [...devices.state, device]
        user.devices = devices.state
        window.localStorage.setItem("user", JSON.stringify(user))
    }
    const onDelDevice =()=> {

    }
    const setError =(textError)=> {
        setTitle(<HeaderVav title={textError} fn={setView}/>)
        setTimeout(()=> setTitle(<HeaderNav fn={setView}/>), 5000)
    }
    ////////////////////////////////////////
    const [view, setView] = useState(<Favorite/>);
    const [leftNavigation, setLeftNavigations] = useState(setNav('home'))
    const [title, setTitle] = useState(
        <HeaderNav className="line top-panel"
            user={()=> setView(
                <div className="area">
                    <User onExit={onExit}>{user.state}</User>
                </div>
            )}
            add={()=> setView(
                <div className="area">
                    <SchemeConstructor 
                        error={setError} 
                        onAdd={(device)=> onAddDevice(device)}
                        onDel={onDelDevice}
                    />
                    {setLeftNavigations(setNav("add"))}
                </div>
            )}
            home={()=> setView(
                <div className="area">
                    <FavoriteDevice 
                        devices={devices} 
                        rooms={rooms}
                    />
                    {setLeftNavigations(setNav("home"))}
                </div>
            )}
        />
    );
    /////////////////////////////////////////
    const onAddRoom =(value)=> {
        send("addRoom", {login:user.state.login, password:user.state.password, room:value}, "POST").then((res)=> {
            res.json().then((val)=> {
                if(!val.error) rooms.state = val;
                else setError(val.error);
            })
        })
    }
    const readRoom =(newVal, id)=> {
        send("readNameRoom", {login:user.state.login, password:user.state.password, name:newVal, id:id}, "POST").then((res)=> {
            res.json().then((val)=> {
                if(!val.error){
                    rooms.state = val
                    setLeftNavigations(setNav('home'))
                }
                else console.log(val.error);
            })
        })
    }
    const delRoom =(id)=> {
        send("delRoom", {login:props.user.login, password:props.user.password, id:id}, "POST").then((res)=> {
            res.json().then((val)=> {
                if(!val.error) rooms.state = val;
                else setError(val.error);
            })
        });
    }
    function setNav(mod="home") {
        const listDevicesSortable =()=> {
            let find = []
            
            rooms.state.forEach((room, index)=> {
                find.push({title:room.name, list:[]})
            });
            if(rooms.state.length>0) devices.state.forEach((device)=> {
                find[device.room].list.push(device)
            });
            return find
        }

        // список комнат
        if(mod==="home") return (
            <NavigationHome 
                rooms={rooms} 
                delRoom={()=> delRoom()}
                click={(id)=> setView(<DevicePanel roomId={id} devices={devices} readRoom={readRoom} api={api}/>)}
                setRoom={()=> onAddRoom()} 
                readRoom={()=> readRoom()} 
            />
        );
        // каталог девайсов согласно комнатам
        else if(mod==="add") return (
            <Catalog 
                onAdd={onAddDevice}
                onDel={onDelDevice}
                error={setError}
                list={listDevicesSortable()} 
                click={()=> setView(<DevicePanel devices={devices} rooms={rooms} api={api}/>)}
            />
        );
        else return <Favorite/>
    }
    
    
    return(
        <article>
            <main>
                <aside>
                    <header className="logo">
                        <img onClick={()=> setLeftNavigations(setNav('home'))} src={logo}/>
                    </header>
                    <nav className="card">
                        { leftNavigation }
                    </nav>
                </aside>
                <div className="base">
                    <header>{ title }</header>
                    { view }
                </div>
            </main>
        </article>
    );
}


///////////////////////////////////////////////////////////////////////////////////
setTimeout(()=> ReactDOM.render(<App />, document.querySelector(".root")), 1000)
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
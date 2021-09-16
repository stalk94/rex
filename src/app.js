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
import FavoriteDevice from "./component/device.manager";
import DevicePanel from "./component/device.panel";
import Catalog from "./component/lists";
import Api from "./api";
import {Menu, MenuItem, MenuButton} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';


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
//////////////////////////////////////////////////////////////



function App(props) {
    const [user, setUser] = useState(props.user)
    const [devices, setDevice] = useState(user.devices)
    const [rooms, setRooms] = useState(user.rooms)
    ////////////////////////////////////////
    const onAddDevice =(device)=> {
        send("addDevice", {device}, "POST").then((res)=> {
            res.json().then((value)=> {
                if(value.error) console.log("error")
                else ''
            })
        })
    }
    ////////////////////////////////////////
    const [view, setView] = useState(
        <div className="area">
            <FavoriteDevice 
                devices={devices} 
                rooms={rooms}
            />
        </div>
    );
    /////////////////////////////////////////
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
                if(!val.error) setLeftNavigations(
                    <NavigationHome 
                        rooms={rooms} 
                        setRoom={onAddRoom} 
                        readRoom={readRoom} 
                        event={setView}
                    />
                );
                else console.log(val.error);
            })
        })
    }
    function setNav(mod="home") {
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
        if(mod==="home") return (
            <NavigationHome 
                rooms={rooms} 
                setRoom={onAddRoom} 
                readRoom={readRoom} 
                click={()=> setView(<DevicePanel devices={devices} rooms={rooms} api={api}/>)}
            />
        )
        else return (
            <Catalog 
                list={listDevicesSortable()} 
                click={console.log} 
            />
        )
    }
    const setError =(textError)=> {
        setTitle(<HeaderVav title={textError} fn={setView}/>)
        setTimeout(()=> setTitle(<HeaderNav fn={setView}/>), 5000)
    }
    const delRoom =(id)=> {
        send("delRoom", {login:props.user.login, password:props.user.password, id:id}, "POST").then((res)=> {
            res.json().then((val)=> {
                if(!val.error) setLeftNavigations(<NavigationHome rooms={rooms} setRoom={onAddRoom} readRoom={readRoom} click={setView}/>);
                else console.log(val.error);
            })
        })
    }
    /////////////////////////////////////////
    const [leftNavigation, setLeftNavigations] = useState(setNav('home'))
    const [title, setTitle] = useState(
        <HeaderNav className="line top-panel"
            user={()=> setView(<div className="area"><User onExit={onExit}>{user}</User></div>)}
            add={()=> setView(<div className="area"><SchemeConstructor onAdd={onAddDevice}/>{setLeftNavigations(setNav("add"))}</div>) }
            home={()=> setView(<div className="area"><FavoriteDevice devices={devices} rooms={rooms}/>{setLeftNavigations(setNav("home"))}</div>)}
        />
    );

    useEffect(()=> {
        if(!window.onFetch) onFetch(setUser, setDevice, setRooms, setError)
    });


    return(
        <article>
        <main>
            <aside>
                <header className="logo">
                    <img src={ logo }
                        onClick={()=> setNav('home')}
                    />
                </header>
                <nav className="card">
                    { leftNavigation }
                </nav>
            </aside>

            <main className="body">
                <header style={{position:"fixed"}}>
                    { title }
                </header>
                { view }
            </main>
        </main>
        </article>
    );
}


///////////////////////////////////////////////////////////////////////////////////
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
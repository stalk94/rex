require("./api");
import React, { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import Favorites from "./component/favorites";
import { useLocalstorageState } from "rooks";
import "./css/style.css";
import "./css/fontawesome.css";
import logo from "./img/logo.svg";
import exit from "./img/exit.svg";
import userIcon from "./img/user.svg";
import redact from './img/pen-tool.png';
import NavigationHome from "./component/navigation";
import SchemeConstructor from "./component/scheme";
import { send } from "./engine";
import DevicePanel from "./component/device.panel";
import Catalog from "./component/lists";
import {Menu, MenuItem, MenuButton} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { AiFillDatabase, AiFillStar } from "react-icons/ai";


window.on =(name, fn)=> window.addEventListener(name, fn)
const Mod = {}
//////////////////////////////////////////////////////////////
const listDevicesSortable =(user)=> {
    let find = []
    
    user.rooms.forEach((room, index)=> {
        find.push({title:room.name, list:[]})
    });
    if(user.rooms.length>0) user.devices.forEach((device)=> {
        find[device.room].list.push(device)
    });
    return find
}
const onExit =()=> {
    window.localStorage.clear()
    document.location.href = "index.html"
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
const Main =(props)=> {
    let rooms = store.get("user").rooms
    return(
        <React.Fragment>
            <Menu menuButton={<MenuButton>{props.title}</MenuButton>} transition>
                <MenuItem onClick={()=> props.home({name:"Избранное"})}>
                    <AiFillStar style={{marginBottom:"5px"}}/><div style={{marginBottom:"4%",color:"#fae247b3"}}>Избранное</div>
                </MenuItem>
                    {rooms.map((room, id)=> {
                        if(id!==0) return(
                            <MenuItem key={id} onClick={()=> props.room(room)}>
                                <div style={{color:"#cccccc"}}>{room.name}</div>
                            </MenuItem>
                        )
                    })}
                <MenuItem onClick={props.add}>
                    <div style={{marginTop:"6%",display:"flex",flexDirection:"row"}}>
                        <AiFillDatabase/><div style={{color:"#fae247b3",padding:"3px"}}>Серверная</div>
                    </div>
                </MenuItem>
                <MenuItem onClick={onExit}>
                    <div style={{color:"brown"}}>Выход</div>
                </MenuItem>
            </Menu>
            <h3 style={props.style} className="Error">{ props.error }</h3>
            <img className="link" onClick={props.user} id="user" src={userIcon}/>
        </React.Fragment>
    );
}
const NameRoom =(props)=> (
    <>
        <var className="title-name" 
            onInput={(ev)=> props.setName(ev.target.textContent)}
        >
            { props.name }
        </var>
        <img id="read-b" height="31px" src={redact} onClick={props.changeName}/>
    </>
)

//////////////////////////////////////////////////////////////


function App(props) {
    const [user, setUser] = useLocalstorageState("user", store.get("user"));
    const [curentRoom, setCurentRoom] = useState()
    const [leftNavigation, setLeftNavigations] = useState("Room");
    const [view, setView] = useState(<div className="area"><Favorites/></div>);
    const [error, setErr] = useState("");

    ////////////////////////////////////////
    const setError =(textError)=> {
        setErr(textError)
        setTimeout(()=> setErr(""), 5000)
    }
    const onAddRoom =(value)=> {
        send("addRoom", {login:user.state.login, password:user.state.password, room:value}, "POST").then((res)=> {
            res.json().then((val)=> {
                if(!val.error) user.rooms = val;;
            })
        })
    }
    const readRoom =(newVal, id)=> {
        send("readNameRoom", {login:user.state.login, password:user.state.password, name:newVal, id:id}, "POST").then((res)=> {
            res.json().then((val)=> {
                if(!val.error){
                    user.rooms = val
                }
                else console.log(val.error);
            })
        })
    }
    const delRoom =(id)=> {
        send("delRoom", {login:user.state.login, password:user.state.password, id:id}, "POST").then((res)=> {
            res.json().then((val)=> {
                if(!val.error) user.rooms = val;
            })
        });
    }

    
    /////////////////////////////////////////
    Mod.Home =(room)=> {
        setCurentRoom(room)
        setView(
            <div className="area">
                <DevicePanel 
                    user={user}
                    target={curentRoom}
                    readRoom={readRoom}
                />
            </div>
        );
    }
    Mod.Add =()=> setView(
        <div className="area">
            <SchemeConstructor 
                user={user}
                error={setError} 
                onAdd={setUser}
            />
            {setLeftNavigations("Devices")}
        </div>
    );
    Mod.User =()=> setView(
        <div className="area">
            <User onExit={onExit}>{ user }</User>
        </div>
    );
    Mod.Room = (
        <NavigationHome 
            error={setError}
            user={user} 
            target={curentRoom}
            onTarget={setCurentRoom}
            setRoom={onAddRoom}
            readRoom={readRoom} 
            delRoom={delRoom}
        />
    );
    Mod.Devices = (
        <Catalog 
            list={listDevicesSortable(user)}
            onAdd={setUser}
            onError={setError}
        />
    );
    useEffect(()=> {
        window.api.on("message", (...arg)=> {
            let u = user
            let target = arg[0].split("/")
            let topic = target[target.length-1]
            topic = topic.slice(0, topic.length-2)
        
            u.devices.forEach((device, index)=> {
                if(device.mac===target[0]){
                    console.log("[🔌]:", topic, String(arg[1]))
                    device.payload[topic] = String(arg[1])
                    u.devices[index] = device
                    store.set("user", u)       // на сервер паралельно
                    setUser(u)
                }
            });
        });
    }, [user])
    /////////////////////////////////////////
    
    return(
        <article>
            <main>
                <aside>
                    <header className="logo">
                        <img 
                            onClick={()=> setLeftNavigations("Room")} 
                            src={logo}
                        />
                    </header>
                    <nav className="card">{ Mod[leftNavigation] }</nav>
                </aside>
                <div className="base">
                    <header>
                        <Main className="line top-panel"
                            title={curentRoom===undefined
                                ? setCurentRoom({name:"Избранное"})
                                : curentRoom.name
                            }
                            error={error}
                            user={Mod.User}
                            add={Mod.Add}
                            room={(room)=> Mod.Home(room)}
                            home={()=> {
                                setLeftNavigations("Room");
                                setView(<div className="area"><Favorites/>{setCurentRoom({name:"Избранное"})}</div>)
                            }}
                        />
                    </header>
                    { view }
                </div>
            </main>
        </article>
    );
}


///////////////////////////////////////////////////////////////////////////////////
ReactDOM.render(<App />, document.querySelector(".root"))
require("./engine");
require("./api");
import "./css/style.css";
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import NodeDevice from "./component/node";
import logo from "./img/logo.svg";
import exit from "./img/exit.svg";
import userIcon from "./img/user.svg";
import redact from './img/pen-tool.png';
import NavigationHome from "./component/navigation";
import SchemeConstructor from "./component/scheme";
import { send } from "./engine";
import NodeArea from "./component/node"
import {Menu, MenuItem, MenuButton} from '@szhsin/react-menu';
import { AiFillDatabase, AiFillStar } from "react-icons/ai";




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
    triger.emit("exit")

    setTimeout(()=> {
        window.localStorage.clear()
        document.location.href = "index.html"
    }, 1000);
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

                <div className="line" id="exit" onClick={onExit}>
                    <img src={exit}/>
                    <h3>Выход</h3>
                </div>
            </ul>
        </div>
    );
}
const Title =(props)=> {
    const style = {color:props.color}

    return(
        <>
            <h3 style={style} className="Error">{ props.error }</h3>
            <img className="link" onClick={props.user} id="user" src={userIcon}/>
        </>
    );
}



/** EVENTS: `error`,`errorColor`,`exit` */
function App(props) {
    const [user, setUser] = useState(store.get("user"))
    const [curentRoom, setCurentRoom] = useState({name:"Избранное",id:0})
    const [errorColor, setErrColor] = useState("red")
    const [error, setErr] = useState("")

    ////////////////////////////////////////
    useEffect(()=> {
        EVENT.on("error", (text)=> {
            setErr(text)
            setTimeout(()=> setErr(""), 5000)
        });
        EVENT.on("errorColor", (color)=> setErrColor(color));
        EVENT.on("exit", ()=> send("exit", {login:user.login, password:user.password, data:user}))
        store.watch("user", (newData)=> {
            setUser(newData)
            triger.emit("user.update", newData)
        })
        !curentRoom ? setCurentRoom({name:"Избранное",id:-1}) : curentRoom.name
    }, [])
    const setError =(textError)=> {
        setErr(textError)
        setTimeout(()=> setErr(""), 5000)
    }
    const onAddRoom =(value)=> {
        send("addRoom", {login:user.login, password:user.password, room:value}, "POST").then((res)=> {
            res.json().then((val)=> {
                if(!val.error){
                    store.set("user", val)
                }
                else setError(val.error)
            })
        })
    }
    const readRoom =(newVal, id)=> {
        send("readNameRoom", {login:user.login, password:user.password, name:newVal, id:id}, "POST").then((res)=> {
            res.json().then((val)=> {
                if(!val.error){
                    user.rooms = val
                    store.set("user", user)
                }
                else console.log(val.error);
            })
        })
    }
    const delRoom =(id)=> {
        send("delRoom", {login:user.login, password:user.password, id:id}, "POST").then((res)=> {
            res.json().then((val)=> {
                if(!val.error){
                    store.set("user", val)
                }
                else setError(val.error)
            })
        });
    }
    const setcurRoom =(room)=> {
        setCurentRoom(room)
    }
    

    return(
        <article>
            <main>
                <aside>
                    <header className="logo">
                        <img width="100%"
                            onClick={()=> setcurRoom({name:"Избранное",id:-1})} 
                            src={logo}
                        />
                    </header>
                    <nav className="card">
                        <NavigationHome 
                            error={setError}
                            user={user} 
                            target={curentRoom}
                            onTarget={(room)=> setcurRoom(room)}
                            setRoom={onAddRoom}
                            readRoom={readRoom} 
                            delRoom={delRoom}
                            add={()=> setcurRoom({name:"Серверная", id:0})}
                        />
                    </nav>
                </aside>
                <div className="base">
                    <header>
                        <Title 
                            user={()=> setcurRoom({name:"user", id:0})} 
                            error={error} 
                            color={errorColor} 
                        />
                    </header>
                    <div className="area">
                        {curentRoom && curentRoom.name==="Серверная"
                            ? <SchemeConstructor 
                                user={user}
                                error={setError} 
                                onAdd={setUser}
                            />
                            :(curentRoom.name!=="user"
                                ? <div><NodeArea room={curentRoom}/></div>
                                : <User onExit={onExit}>{user}</User>
                        )}
                    </div> 
                </div>
            </main>
        </article>
    );
}

///////////////////////////////////////////////////////////////////////////////////
ReactDOM.render(<App />, document.querySelector(".root"))


/**
 * <DevicePanel 
        user={user}
        target={curentRoom}
        readRoom={readRoom}
    />
 */
import "./css/style.css";
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import Cookies from 'js-cookie';
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useDidMount, useLocalstorageState } from "rooks";
//import { send, useCokie } from "./engine";
import User from "./component/user";
import logo from "./img/logo.svg";
import userIcon from "./img/user.svg";
import NavigationHome from "./component/navigation";
import SchemeConstructor from "./component/scheme";
import NodeArea from "./component/node";
import NotificationLayer from "./component/notification";



const Title =(props)=> {
    const style = {color:props.color}
    require("./api");

    return(
        <>
            <h3 style={style} className="Error">{ props.error }</h3>
            <img className="link" onClick={props.user} id="user" src={userIcon}/>
        </>
    );
}



/** 
 * EVENTS: `error`,`errorColor`,`exit` 
 */
export default function App(props) {
    const [user, setUser] = useState(props.user)
    const [curentRoom, setCurentRoom] = useLocalstorageState("curent.room", {name:"Избранное",id:-1})
    const [errorColor, setErrColor] = useState("red")
    const [error, setErr] = useState("")
   

    ////////////////////////////////////////
    useEffect(()=> {
        setUser(props.user)
    }, [props.user])
    useDidMount(()=> {
        EVENT.on("error", (text)=> {
            setErr(text)
            setTimeout(()=> setErr(""), 5000)
        });

        EVENT.on("errorColor", (color)=> setErrColor(color));
    })

    const setError =(textError)=> {
        setErr(textError)
        setTimeout(()=> setErr(""), 5000)
    }
    const onAddRoom =(value)=> {
        send("addRoom", {login:Cookies.get("login"), password:Cookies.get("password"), room:value}, "POST").then((res)=> {
            res.json().then((userData)=> {
                if(!userData.error){
                    store.set("user", userData)
                    setUser(userData)
                }
                else setError(userData.error)
            })
        })
    }
    const readRoom =(newVal, id)=> {
        send("readNameRoom", {login:useCokie().login, password:useCokie().password, name:newVal, id:id}, "POST").then((res)=> {
            res.json().then((val)=> {
                if(!val.error){
                    user.rooms = val
                    store.set("user", user)
                    setUser(user)
                }
                else console.log(val.error);
            })
        })
    }
    const delRoom =(id)=> {
        send("delRoom", {login:useCokie().login, password:useCokie().password, id:id}, "POST").then((res)=> {
            res.json().then((userData)=> {
                if(!userData.error){
                    store.set("user", userData)
                    setUser(userData)
                }
                else setError(userData.error)
            })
        });
    }
    

    return(
        <article>
            <main>
                <aside>
                    <header className="logo">
                        <img width="100%"
                            onClick={()=> setCurentRoom({name:"Избранное",id:-1})} 
                            src={logo}
                        />
                    </header>
                    <nav className="card">
                        <NavigationHome 
                            error={setError}
                            user={user} 
                            target={curentRoom}
                            onTarget={(room)=> setCurentRoom(room)}
                            setRoom={onAddRoom}
                            readRoom={readRoom} 
                            delRoom={delRoom}
                            add={()=> setCurentRoom({name:"Серверная", id:0})}
                        />
                    </nav>
                </aside>
                <div className="base">
                    <header>
                        <Title 
                            user={()=> setCurentRoom({name:"user", id:0})} 
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
                                ? <NodeArea nodes={user.nodes} room={ curentRoom }/>
                                : <User user={user}/>
                        )}
                    </div> 
                    <NotificationLayer/>
                </div>
            </main>
        </article>
    );
}


///////////////////////////////////////////////////////////////////////////////////
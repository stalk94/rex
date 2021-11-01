import "./css/style.css";
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import Cookies from 'js-cookie';
import React, { useState, useEffect } from "react";
import { useDidMount, useLocalstorageState } from "rooks"
import ReactDOM from "react-dom";
import { send, useCokie } from "./engine";
import Main from "./index";
import User from "./component/user";
import logo from "./img/logo.svg";
import userIcon from "./img/user.svg";
import NavigationHome from "./component/navigation";
import SchemeConstructor from "./component/scheme";
import NodeArea from "./component/node";
import { NotificationLayer } from "./component/pop-up";



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
function App(props) {
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
        EVENT.on("exit", ()=> send("exit", {login:store.get("user").login, password:store.get("user").password, data:store.get("user")}))
    })

    const setError =(textError)=> {
        setErr(textError)
        setTimeout(()=> setErr(""), 5000)
    }
    const onAddRoom =(value)=> {
        send("addRoom", {login:Cookies.get("login"), password:Cookies.get("password"), room:value}, "POST").then((res)=> {
            res.json().then((val)=> {
                delete val.password
                if(!val.error){
                    store.set("user", val)
                    setUser(val)
                }
                else setError(val.error)
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
            res.json().then((val)=> {
                if(!val.error){
                    delete val.password
                    store.set("user", val)
                    setUser(val)
                }
                else setError(val.error)
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
window.onload =()=> {
    const UI =()=> {
        const [render, setRender] = useState("")
    
        useEffect(()=> {
            if(store.get("user").login && store.get("user").password){
                send("auth", {login:store.get("user").login, password:store.get("user").password}, "POST").then((res)=> {
                    res.json().then((userData)=> {
                        if(!userData.error){
                            store.set("user", userData)
                            setRender(<App user={userData} />)
                            socket.emit("init", {login:store.get("user").login, password:store.get("user").password})
                        }
                        else alert("login or password error")
                    });
                });
            }
            else setRender(<Main useRender={(data)=> setRender(<App user={data} />)}/>);
        }, [])
    
    
        return(
            <>{ render }</>
        );
    }

    ReactDOM.render(<UI/>, document.querySelector(".root"))
}
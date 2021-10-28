import "./css/style.css";
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import React, { useState, useEffect } from "react";
import { useLocalstorageState } from "rooks";
import ReactDOM from "react-dom";
import Main from "./index";
import { send, useCokie } from "./engine";
import User from "./component/user";
import logo from "./img/logo.svg";
import userIcon from "./img/user.svg";
import NavigationHome from "./component/navigation";
import SchemeConstructor from "./component/scheme";
import NodeArea from "./component/node"



//////////////////////////////////////////////////////////////
const Title =(props)=> {
    const style = {color:props.color}

    return(
        <>
            <h3 style={style} className="Error">{ props.error }</h3>
            <img className="link" onClick={props.user} id="user" src={userIcon}/>
        </>
    );
}
socket.on("get.user", (newData)=> {
    store.set("user", newData)
});


/** EVENTS: `error`,`errorColor`,`exit` */
function App(props) {
    const [user, setUser] = useLocalstorageState("user", props.user)
    const [curentRoom, setCurentRoom] = useLocalstorageState("curent.room", {name:"Избранное",id:0})
    const [errorColor, setErrColor] = useState("red")
    const [error, setErr] = useState("")

    ////////////////////////////////////////
    useEffect(()=> {
        EVENT.on("error", (text)=> {
            setErr(text)
            setTimeout(()=> setErr(""), 5000)
        });
        
        EVENT.on("errorColor", (color)=> setErrColor(color));
        EVENT.on("exit", ()=> send("exit", {login:user.login, password:user.password, data:user, payload:store.get("payload")}))
        !curentRoom ? setCurentRoom({name:"Избранное",id:-1}) : curentRoom.name
    }, [])
    const setError =(textError)=> {
        setErr(textError)
        setTimeout(()=> setErr(""), 5000)
    }
    const onAddRoom =(value)=> {
        send("addRoom", {login:useCokie().login, password:useCokie().password, room:value}, "POST").then((res)=> {
            res.json().then((val)=> {
                delete val.password
                if(!val.error) store.set("user", val)
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
                }
                else setError(val.error)
            })
        });
    }
    const setcurRoom =(room)=> setCurentRoom(room)
    

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
                                ? <NodeArea nodes={user.nodes} room={ curentRoom }/>
                                : <User>{ user }</User>
                        )}
                    </div> 
                </div>
            </main>
        </article>
    );
}


///////////////////////////////////////////////////////////////////////////////////
const UI =()=> {
    const [render, setRender] = useState("")

    useEffect(()=> {
        if(useCokie().login && useCokie().password) setRender(<App user={store.get("user")} />)
        else setRender(<Main useRender={(data)=> {setRender(<App user={data} />)}} />)
    }, [])


    return(
        <>{ render }</>
    );
}

window.onload =()=> ReactDOM.render(<UI/>, document.querySelector(".root"))
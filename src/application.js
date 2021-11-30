import "./css/style.css";
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import React, { useState, useEffect, StrictMode } from "react";
import { useDidMount, useLocalstorageState } from "rooks";
import User from "./component/user";
import logo from "./img/logo.svg";
import userIcon from "./img/user.svg";
import NavigationHome from "./component/navigation";
import SchemeConstructor from "./component/scheme";
import NodeArea from "./component/node";
import NotificationLayer from "./component/notification";



const Title =(props)=> {
    return(
        <>
            <h3 style={{color:props.color}} className="Error">{ props.error }</h3>
            <img className="link" onClick={props.user} id="user" src={userIcon}/>
        </>
    );
}



/** 
 * EVENTS: `error`,`errorColor`,`exit` 
 */
export default function App(props) {
    const [user, setUser] = useState(props.user)
    const [errorColor, setErrColor] = useState("red")
    const [error, setErr] = useState("")
    const [curentRoom, setCurentRoom] = useLocalstorageState("curent.room", {name:"Скрытая",id:-1})
   

    const setError =(textError)=> {
        setErr(textError)
        setTimeout(()=> setErr(""), 5000)
    }
    const onAddRoom =(value)=> {
        useSocket("createRoom", value, (roomsData)=> {
            if(!roomsData.error){
                EVENT.emit("status-ok", "успешно создана: "+roomsData.name)
            }
        });
    }
    const readRoom =(newVal, id)=> {
        useSocket("renameRoom", {name:newVal, id:id}, (data)=> {
            console.log(data)
        });
    }
    const delRoom =(id)=> {
        useSocket("deleteRoom", id, (data)=> {
            let clone = user
            clone.rooms.splice(id, 1)
            setUser(clone)
            document.location.reload()
        });
    }
    
    ////////////////////////////////////////
    useEffect(()=> setUser(props.user), [props.user])
    useDidMount(()=> {
        store.watch("user", (newData)=> setUser(newData));
        
        EVENT.on("error", (text)=> {
            setErr(text)
            setTimeout(()=> setErr(""), 5000)
        });
        EVENT.on("errorColor", (color)=> setErrColor(color));
    });
    

    return(
        <StrictMode>
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
                                ? <NodeArea nodes={user.nodes} room={curentRoom}/>
                                : <User user={user}/>
                        )}
                    </div>
                    <NotificationLayer/>
                </div>
            </main>
        </StrictMode>
    );
}
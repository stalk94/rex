import React, { useState, useEffect, useContext, useCallback, useMemo } from 'react';
import {Menu, MenuItem, MenuButton} from '@szhsin/react-menu';
import { send, useCokie } from "../engine";
import { AiFillDatabase } from "react-icons/ai";
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';





const setFavorite =(device, id, errorFn)=> {
    let user = store.get("user")
    device.favorite = device.favorite===true?false:true
    user.devices[id] = device
    
    send("favorites", {login:useCokie().login, password:useCokie().password, data:user.devices}, "POST").then((val)=> {
        if(val.error) errorFn(val.error)
    });
    store.set("user", user)
}
const Fav =(props)=> {
    return(
        <svg className="icon-favorite"
            width="32" 
            height="32" 
            xmlns="http://www.w3.org/2000/svg"
            onClick={props.click}
        >
            <polygon 
                cx="26.265015" 
                cy="34.584991" 
                stroke={props.enable===true?"#ecf95d":"white"}
                fill="#00000000"
                points="16.765015463707186,0.9031815441903746 19.950616100925572,12.433143986760115 32.22824478149414,11.811995252655834 21.919425916044247,18.316754183992998 26.32181941458657,29.46282386779785 16.765015463707186,21.95302344359152 7.20821355205203,29.46282386779785 11.610603991758012,18.316754183992998 1.3017851263081184,11.811995252655834 13.579415846100915,12.433143986760115 16.765015463707186,0.9031815441903746 19.950616100925572,12.433143986760115 "
                r="14.68181" 
                r2="4.893937" 
                radialshift="0" 
                strokeWidth="2" 
            />
        </svg>
    );
}
const Room =(props)=> {
    const [name, setName] = useState(props.name)

    return (
        <div style={{display:"flex",flexDirection:"row"}}>
            <button 
                onClick={()=> props.onTarget(props.room)} 
                style={{width:"85%",marginBottom:"3px",border:props.select?"2px solid white":""}}
            >
                { name }
            </button>
            <Menu
                direction="right"
                menuButton={<MenuButton id="szh-menu">:</MenuButton>}
                transition
            >
                {Object.keys(props.devices).map((device, id)=> {
                    if(device.room===props.id) return (
                        <MenuItem key={id}>
                            <Fav 
                                click={()=> setFavorite(device, id, props.error)} 
                                enable={device.favorite}
                            />
                            <var className="p2">{device.name}</var>
                        </MenuItem>
                    );
                })}
                <input 
                    placeholder={"✏️переименовать"}
                    onChange={(ev)=> setName(ev.target.value)} 
                    type="text" 
                    value={name}
                    style={{width:"89%"}}
                />
                <button onClick={()=> props.readRoom(name, props.id)}> ✏️изменить </button>

                {props.id > 0
                    ?   <MenuItem onClick={()=> props.delRoom(props.id)}>
                            <var style={{marginTop:"5%",color:"brown"}}> ❌удалить </var>
                        </MenuItem>
                    : ""
                }
            </Menu>
        </div>
    );
}


export default function Navigations(props) {
    const [curent, setCurent] = useState()
    const [nameRoom, setName] = useState("")
    const [time, setTime] = useState()

    const clb = useCallback(()=> {
        store.watch("user", ()=> setTime(<div style={{display:"none"}}>{Date.now()}</div>))
        EVENT.on("user.update", ()=> setTime(<div style={{display:"none"}}>{Date.now()}</div>))
    })
    const useTarget =(selectRoom, id)=> {
        setCurent(id)
        props.onTarget(selectRoom)
    }
    const chek =()=> {
        nameRoom.length > 3 
            ? props.setRoom(nameRoom) && setName("")
            : props.error("Не менее 4х символов")
        
        setTimeout(()=> setTime(<div style={{display:"none"}}>{Date.now()}</div>), 1000)
    }

    useEffect(()=> store.watch("user", ()=> setName("")))

    
    return(
        <>
            <ul>
                {props.user.rooms.map((room, index)=> {
                    if(room.visibility==="block" && index!==0) return(
                        <Room 
                            key={index}
                            id={index}
                            name={room.name} 
                            room={room}
                            select={curent && curent===index?true:false}
                            devices={props.user.nodes} 
                            readRoom={props.readRoom}
                            delRoom={props.delRoom}
                            error={props.error}
                            onTarget={()=> useTarget(room, index)}
                        />
                    );
                })}
                { time }
            </ul>

            <hr style={{width:"85%", opacity:"0.1"}}/>

            <div style={{display:"flex",flexDirection:"row"}}>
                <Menu 
                    direction="right"
                    menuButton={<MenuButton id="add"><div id="addRoom"> ➕ </div></MenuButton>}
                >
                    <input placeholder="имя комнаты" 
                        style={{width:"80%", marginLeft:"4%"}} 
                        type="text" 
                        onInput={(ev)=> setName(ev.target.value)} 
                        value={nameRoom}
                    />
                    <MenuItem onClick={chek}> создать </MenuItem>
                </Menu>

                <MenuButton 
                    onClick={()=> {props.add();setCurent(0)}} 
                    id="serve"
                >
                    <div style={{borderBottom:curent===0?"1px solid white":""}} >
                        <AiFillDatabase/>
                    </div>
                </MenuButton>
            </div>
        </>
    );
}
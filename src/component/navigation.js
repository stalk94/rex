import React, { useState, useEffect, useCallback } from 'react';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import { AiFillDatabase } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";



const Room =(props)=> {
    const [name, setName] = useState(props.name)
    const [id, setId] = useState(props.id)


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
    const [user, setUser] = useState(props.user)
    const [curent, setCurent] = useState()
    const [nameRoom, setName] = useState("")
    const [runer, setReload] = useState("")

    const useTarget =(selectRoom, id)=> {
        setCurent(id)
        props.onTarget(selectRoom)
    }
    const chek =()=> {
        nameRoom.length > 3 
            ? props.setRoom(nameRoom) && setName("")
            : props.error("Не менее 4х символов")
    }

    useEffect(()=> {
        setUser(props.user)
        setReload(new Date().getTime())
    }, [props.user])

    
    return(
        <>
        <div style={{display:"none"}}>{runer}</div>
            <ul>
                {user.rooms && user.rooms.map((room, index)=> {
                    if(room.visibility==="block" && index!==0) return(
                        <Room 
                            key={index}
                            id={index}
                            name={room.name} 
                            room={room}
                            select={curent && curent===index?true:false}
                            nodes={user.nodes} 
                            readRoom={props.readRoom}
                            delRoom={props.delRoom}
                            error={props.error}
                            onTarget={()=> useTarget(room, index)}
                        />
                    );
                })}
            </ul>

            <hr style={{width:"85%", opacity:"0.1"}}/>

            <div style={{display:"flex",flexDirection:"row"}}>
                <Menu 
                    direction="right"
                    menuButton={<MenuButton id="add"><div style={{color:"white"}} id="addRoom"><IoMdAdd/></div></MenuButton>}
                >
                    <input 
                        placeholder="имя комнаты" 
                        style={{width:"80%", marginLeft:"4%"}} 
                        type="text" 
                        onChange={(ev)=> setName(ev.target.value)} 
                        value={nameRoom}
                    />
                    <MenuItem onClick={chek}> создать </MenuItem>
                </Menu>

                <MenuButton id="serve"
                    onClick={()=> {props.add();setCurent(0)}}
                >
                    <div style={{borderBottom:curent===0?"1px solid white":""}}>
                        <AiFillDatabase/>
                    </div>
                </MenuButton>
            </div>
        </>
    );
}
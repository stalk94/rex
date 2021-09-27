import React, { useState, useEffect, useContext } from 'react';
import { ReactSortable, Sortable, MultiDrag, Swap } from "react-sortablejs";
import {Menu, MenuItem, MenuButton} from '@szhsin/react-menu';
import { send } from "../engine";
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';


/**
 * Навигационное меню
 * category: []:elems
 * 
 */
export class Nav extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            category: []
        }
        this.onAdd = this.onAdd.bind(this)
        this.goTo = this.goTo.bind(this)
        this.exit = this.exit.bind(this)
    }
    onAdd() {
        
    }
    goTo(ev) {
        
    }
    render() {
        return(
            <React.Fragment>
                <ul>
                    <h4 style={{marginLeft:"5%",marginTop:"0px",fontSize:"18px",opacity:"0.6"}}>Мой дом:</h4>
                    <ReactSortable
                        list={this.state.rooms}
                        setList={(newState)=> this.setState({ rooms: newState })}
                    >
                        {this.state.rooms.map((item, id)=> (
                            <li id="rooms" key={id}>
                                <i style={{fontSize:"19px",fontStyle:"normal"}}>🏛️ </i> 
                                    {item.name}
                            </li>
                        ))}
                    </ReactSortable>
                </ul>
                    
                <hr style={{width:"85%", opacity:"0.1"}}/>
                <div id="addRoom" onClick={this.onAdd}> ➕ </div>
            </React.Fragment>
        );
    }
    exit() {
        
    }
}


const setFavorite =(device, id, errorFn)=> {
    let user = store.get("user")
    device.favorite = device.favorite===true?false:true
    user.devices[id] = device
    
    send("favorites", {login:user.login, password:user.password, data:user.devices}, "POST").then((val)=> {
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


export default function Navigations(props) {
    const [time, setTime] = useState()
    useEffect(()=> {
        store.watch("user", ()=> {
            setTime(<div style={{display:"none"}}>{Date.now()}</div>)
        })
    });

    return(
        <React.Fragment>
            <ul>
                <h4 style={{marginLeft:"5%",marginTop:"0px",fontSize:"18px",opacity:"0.6"}}>
                    Мой дом[{props.user.rooms.length}/10]:
                </h4>

                {props.user.rooms.map((room, index)=> {
                    if(room.visibility==="block") return(
                        <Menu key={index}
                            direction="right"
                            menuButton={
                                <MenuButton onClick={()=> props.onTarget(room)} id="szh-menu">
                                    <i style={{fontSize:"19px",fontStyle:"normal"}}>🏛️ </i> 
                                    { props.user.rooms[index].name }
                                </MenuButton>
                            }
                            transition
                        >
                            {props.user.devices.map((device, id)=> {
                                if(device.room===index) return (
                                    <MenuItem key={id}>
                                        <Fav 
                                            click={()=> setFavorite(device, id, props.error)} 
                                            enable={device.favorite}
                                        />
                                        <var className="p2">{device.name}</var>
                                    </MenuItem>
                                );
                            })}
                            {<MenuItem><var style={{color:"grey"}}>+ добавить</var></MenuItem>}
                        </Menu>
                    );
                })}
                { time }
            </ul>

            <hr style={{width:"85%", opacity:"0.1"}}/>
            <div id="addRoom" onClick={props.setRoom}> ➕ </div>
        </React.Fragment>
    );
}
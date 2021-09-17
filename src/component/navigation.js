import React, { useState, useEffect, useContext } from 'react';
import { ReactSortable, Sortable, MultiDrag, Swap } from "react-sortablejs";
require("../stor");
import useJedis from 'jedisdb'


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




export default function Navigations(props) {
    const rooms = useJedis("rooms")
    const setname =(id)=> rooms.state[id].name

    return(
        <React.Fragment>
            <ul>
                <h4 style={{marginLeft:"5%",marginTop:"0px",fontSize:"18px",opacity:"0.6"}}>
                    Мой дом[{props.rooms.state.length}/10]:
                </h4>
                {rooms.state.map((item, id)=> (
                    <li style={{display:item.visibility}} 
                        id="rooms" 
                        key={id} 
                        ctx={"delRoom:"+id}
                        onClick={()=> {setname(id); props.click(id)}}
                    >
                        <i style={{fontSize:"19px",fontStyle:"normal"}}>🏛️ </i> 
                        { setname(id) }
                    </li>
                ))}
            </ul>
                
            <hr style={{width:"85%", opacity:"0.1"}}/>
            <div id="addRoom" onClick={props.setRoom}> ➕ </div>
        </React.Fragment>
    );
}
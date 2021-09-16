import React, { useState, useEffect, useContext } from 'react';
import { ReactSortable, Sortable, MultiDrag, Swap } from "react-sortablejs";



/**
 * Навигационное меню
 * category: []:elems
 * 
 */
export default class Nav extends React.Component {
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



export class NavigationHome extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            enable: true,
            rooms: props.rooms
        }
        this.onAdd = this.onAdd.bind(this)
    }
    onAdd() {
        this.setState({rooms: [...this.state.rooms, `новая комната ${this.state.rooms.length}`]})
        this.props.setRoom()
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
                            <li style={{display:item.visibility}} 
                                id="rooms" 
                                key={id} 
                                ctx={"delRoom:"+id}
                                onClick={this.props.click}
                            >
                                <i style={{fontSize:"19px",fontStyle:"normal"}}>🏛️ </i> 
                                <var 
                                    onInput={(ev)=> this.props.readRoom(ev.target.innerText, id)}
                                    ctx={"delRoom:"+id}         // удаление через контекстное меню
                                >
                                    { item.name }
                                </var>
                            </li>
                        ))}
                    </ReactSortable>
                </ul>
                
                <hr style={{width:"85%", opacity:"0.1"}}/>
                <div id="addRoom" onClick={this.onAdd}> ➕ </div>
            </React.Fragment>
        );
    }
}
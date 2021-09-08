import React, { useState, useEffect, useContext } from 'react';
import { ReactSortable, Sortable, MultiDrag, Swap } from "react-sortablejs";



export default class Navigation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            enable: true,
            rooms: props.rooms
        }
        this.onAdd = this.onAdd.bind(this)
        this.goTo = this.goTo.bind(this)
        this.exit = this.exit.bind(this)
        this.profile = this.profile.bind(this)
        this.test = this.test.bind(this)
    }
    onAdd() {
        this.setState({rooms: [...this.state.rooms, 'новая комната']})
        this.props.setRoom()
    }
    goTo(ev) {
        this.props.fn(this.state.rooms[ev.target.getAttribute("data-id")])
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
    profile() {
        this.props.fn("home")
    }
    test() {
        this.props.fn("test")
    }
    exit() {
        this.props.fn("auth")
    }
}
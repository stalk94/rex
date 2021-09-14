import React, { useState, useEffect, useContext } from "react";
import {DropDown2} from "./form"
import { send } from "../engine";



/**
 *  output: mac/chanel/comand+"st"
 *  input: mac/chanel/comand
*/
export default class SchemeConstructor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mac: "",
            type: "PMR",
            name: ""
        }
        this.setInput = this.setInput.bind(this)
        this.create = this.create.bind(this)
        this.setError = this.setError.bind(this)
        this.setType = this.setType.bind(this)
    }
    setError(error) {
        this.props.error(error)
    }
    create() {
        send("regNewDevice", { login:user.login, password:user.password, state:this.state }, "POST").then((res)=> {
            res.json().then((data)=> {
                if(!data.mac.error && !data.type.error) props.add(data)
                else if(data.mac.error) setError(data.mac.error)
                else this.setError(data.type.error)
            });
        });
    }
    setInput(ev) {
        let name = ev.target.getAttribute("name")

        this.setState({
            [name]: ev.target.value
        })
    }
    setType(ev) {
        [...ev.target.parentElement.parentElement.children].forEach((elem)=> {
            elem.style = ''
        });
        ev.target.parentElement.style.color = "red"
        
        this.setState({type:ev.target.textContent})
    }
    render() {
        return(
            <div style={{marginTop:"5%", maxWidth:"60%"}}>
                <DropDown2 title={"Тип"} click={this.setType} data={Object.keys(JSON.parse(window.localStorage.getItem("user")).sheme)}/>
                <h3 style={{color:"grey"}}>{`${this.state.mac}`}</h3>
                <input placeholder="MAC" name="mac" type="text" onInput={this.setInput} value={this.state.mac} />
                <input placeholder="имя устройства(кастомное)" name="name" type="text" onInput={this.setInput} value={this.state.name} />

                <button 
                    onClick={this.create} 
                    style={{marginTop:"2%",marginLeft:"25%",width:"50%"}}
                > 
                    create 
                </button>
            </div>  
        );
    }
}


//<input placeholder="GROUP" name="groop" type="text" onInput={this.setInput} value={this.state.groop} />
//<input placeholder="TOPIC" name="comand" type="text" onInput={this.setInput} value={this.state.comand} />

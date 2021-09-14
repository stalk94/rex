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
            groop: "",
            comand: "",
            name: ""
        }
        this.setInput = this.setInput.bind(this)
        this.create = this.create.bind(this)
        this.setError = this.setError.bind(this)
    }
    setError(error) {
        this.props.error(error)
    }
    create() {
        let str = ''
        Object.values(this.state).forEach((val)=> {
            str += val
        });

        send("regNewDevice", { login:user.login, password:user.password, scheme:str }, "POST").then((res)=> {
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
    render() {
        const INTRFACE = {
            lamp: {},
            onOff: { maxCount: 1 },
            wtor: {},
            logic: {},
            termostat: {}
        }

        return(
            <div style={{marginTop:"5%", maxWidth:"60%"}}>
                <h3 style={{color:"grey"}}>{`${this.state.mac}/${this.state.groop}/${this.state.comand}`}</h3>
                <input placeholder="MAC" name="mac" type="text" onInput={this.setInput} value={this.state.mac} />
                <input placeholder="GROUP" name="groop" type="text" onInput={this.setInput} value={this.state.groop} />
                <input placeholder="TOPIC" name="comand" type="text" onInput={this.setInput} value={this.state.comand} />
                <DropDown2 title={"Тип"} data={Object.keys(INTRFACE)}/>
                <input placeholder="имя устройства(кастомное)" name="name" type="text" onInput={this.setInput} value={this.state.name} />

                <button onClick={this.create} style={{marginTop:"2%",marginLeft:"25%",width:"50%"}}> 
                    create 
                </button>
            </div>  
        );
    }
}
import React from "react";
import {DropDown2} from "./form";
import { send } from "../engine";



/**
 *  output: mac/chanel/topic+"st"
 *  input: mac/chanel/topic
*/
export default class SchemeConstructor extends React.Component {
    constructor(props) {
        super(props)
        this.err = ""
        this.state = {
            mac: "",
            type: "PMR",
            name: "новое устройство"
        }
        this.verify = this.verify.bind(this)
        this.setInput = this.setInput.bind(this)
        this.create = this.create.bind(this)
        this.setType = this.setType.bind(this)
    }
    create() {
        send("regNewDevice", { login:this.props.user.login, password:this.props.user.password, state:this.state }, "POST").then((res)=> {
            res.json().then((data)=> {
                if(!data.error) this.props.onAdd(data)
                else this.props.error(data.error)
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
    verify(ev) {
        if(ev.target.value.search("/")!==-1) this.err = "в mac недопустимо указывать группу и топик"
        else this.setInput(ev)
    }
    render() {
        let d = Object.keys(this.props.user.sheme)

        return(
            <div style={{maxWidth:"60%"}}>
                <h4 style={{color:"red"}}>{this.err}</h4>
                <DropDown2 
                    title={"Тип"} 
                    click={this.setType} 
                    data={d}
                />
                <h3 style={{color:"grey"}}>{`${this.state.mac}`}</h3>
                <input 
                    placeholder="MAC" 
                    name="mac" 
                    type="text" 
                    onInput={this.verify} 
                    value={this.state.mac} 
                />
                <input 
                    placeholder="имя устройства(кастомное)" 
                    name="name" type="text" 
                    onInput={this.setInput} 
                    value={this.state.name} 
                />

                <button style={{marginTop:"2%",marginLeft:"25%",width:"50%"}} onClick={this.create}> create </button>
            </div>  
        );
    }
}
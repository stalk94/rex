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
        this.state = {
            mac: "",
            type: "PMR",
            name: "новое устройство"
        }
        this.setInput = this.setInput.bind(this)
        this.create = this.create.bind(this)
        this.setType = this.setType.bind(this)
    }
    create() {
        let user = window.localStorage.getItem("user")!==null 
            ? JSON.parse(window.localStorage.getItem("user")) 
            : {login:'test', password:"test"}

        send("regNewDevice", { login:user.login, password:user.password, state:this.state }, "POST").then((res)=> {
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
    render() {
        return(
            <div style={{maxWidth:"60%"}}>
                <DropDown2 title={"Тип"} click={this.setType} data={Object.keys(JSON.parse(window.localStorage.getItem("user")).sheme)}/>
                <h3 style={{color:"grey"}}>{`${this.state.mac}`}</h3>
                <input placeholder="MAC" name="mac" type="text" onInput={this.setInput} value={this.state.mac} />
                <input placeholder="имя устройства(кастомное)" name="name" type="text" onInput={this.setInput} value={this.state.name} />

                <button style={{marginTop:"2%",marginLeft:"25%",width:"50%"}}
                    onClick={this.create} 
                > 
                    create 
                </button>
            </div>  
        );
    }
}
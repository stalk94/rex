import React from "react";
import { DropDown2 } from "./form";
import { send } from "../engine";
import { useLocalstorageState } from "rooks";
import { DragDropContainer, DropTarget } from "react-drag-drop-container";
import Grid from "./grid"


const user = store.get("user")
const style = {paddingLeft:"55px",paddingRight:"50px"}
let SHEME;
send("sheme", {}, "GET").then((data)=> {
    data.json().then((val)=> {
        SHEME = val;
    });
});


//------------------------------------DATA GRID-----------------
const meta1 = {
    meta: {mac:"",room:"",knx:"",type:"PMR"}
}
const placeholders11 = [
    {type:"lable", data:"Реле #1"}, 
    {type:'input', data:"name"}, 
    {type:'select', selected:"", name:"room", data:user.rooms.map((room)=> room.name)}, 
    {type:'input', data:"GA1"}, 
    {type:'input', data:"GA2"}, 
    {type:'input', data:"GA3"}, 
    {type:'input', data:"GA status"}
]
const placeholders12 = [
    {type:"lable", data:"input #1"}, 
    {type:'input', data:"name"}, 
    {type:'select', name:"mod", selected:"", data:['click','turnON','turnOFF','dimming','longClick','gerkonONOFF','gerkonOFFON','MS1min','MS5min','MS10min']},
    {type:'input', data:"GA1"}, 
    {type:'select', name:"mod", selected:"", data:['click','turnON','turnOFF','dimming','longClick','gerkonONOFF','gerkonOFFON','MS1min','MS5min','MS10min']},
    {type:'input', data:"GA2"}, 
    {type:'input', data:"status"}
]


//---------------------------------------------------------------
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
        [...ev.target.parentElement.children].forEach((elem)=> {
            elem.style = ''
        });
        ev.target.style.color = "red"
        this.setState({type:ev.target.textContent});
    }
    verify(ev) {
        if(ev.target.value.search("/")!==-1) this.err = "в mac недопустимо указывать группу и топик"
        else this.setInput(ev)
    }
    render() {
        return(
            <>
                <div style={{display:"flex",flexDirection:"row"}}>
                    {Object.keys(SHEME).map((type, i)=> (
                        <button onClick={this.setType} key={i}>{ type }</button>
                    ))}
                </div> 
                <input 
                    style={{maxWidth:"50%"}}
                    placeholder="MAC" 
                    name="mac" 
                    type="text" 
                    onInput={this.verify} 
                    value={this.state.mac} 
                />
                <input 
                    style={{maxWidth:"50%"}}
                    placeholder="имя устройства(кастомное)" 
                    name="name" type="text" 
                    onInput={this.setInput} 
                    value={this.state.name} 
                />

                <button style={{marginTop:"2%",width:"52%"}} onClick={this.create}> create </button>
                <Grid title={meta1} rows={{green:placeholders11,orange:placeholders12}}/>
            </>  
        );
    }
}
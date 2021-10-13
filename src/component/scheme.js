import React, {useState} from "react";
import { send } from "../engine";
import { DragDropContainer, DropTarget } from "react-drag-drop-container";
import Grid from "./grid"


/////////////////////////////////////////////////
const user = store.get("user")
const style = {paddingLeft:"55px",paddingRight:"50px"}
let SHEME;
send("sheme", {}, "GET").then((data)=> {
    data.json().then((val)=> {
        SHEME = val;
    });
});
///////////////////////////////////////////////////


const FormRegistrationNewNode =(props)=> {
    const [mac, setMac] = useState()
    const [name, setName] = useState()
    const [type, setType] = useState()

    const verify =(ev)=> {
        if(ev.target.value.search("/")!==-1) window.alert("в mac недопустимо указывать группу и топик")
        else setMac(ev.target.value)
    }
    const useType =(ev)=> {
        [...ev.target.parentElement.children].forEach((elem)=> {
            elem.style = ''
        });
        ev.target.style.color = "red"
        setType(ev.target.textContent)
    }

    return(
        <>
            <div style={{display:"flex",flexDirection:"row"}}>
                {Object.keys(SHEME).map((type, i)=> (
                    <button onClick={useType} key={i}>{ type }</button>
                ))}
            </div> 
            <input 
                style={{maxWidth:"50%"}}
                placeholder="MAC" 
                name="mac" 
                type="text" 
                onInput={verify} 
                value={mac} 
            />
            <input 
                style={{maxWidth:"50%"}}
                placeholder="имя устройства(кастомное)" 
                name="name" type="text" 
                onInput={(e)=> setName(e.target.getAttribute("name"))} 
                value={name} 
            />

            <button style={{marginTop:"2%",width:"52%"}} onClick={()=> props.create({mac:mac,name:name,type:type})}>
                Создать узел
            </button>
        </>
    );
}


/** ->Grid inut */
export default class SchemeConstructor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.create = this.create.bind(this)
    }
    create(meta) {
        send("regNewNode", {login:this.props.user.login, password:this.props.user.password, state:meta}, "POST").then((res)=> {
            res.json().then((data)=> {
                if(!data.error){
                    let copy = this.state
                    copy[data.meta.mac] = <Grid title={data.meta} rows={data.rows}/>
                    this.setState(copy)
                }
                else this.props.error(data.error)
            });
        });
    }
    render() {
        return(
            <>
                <FormRegistrationNewNode create={this.create} />

                <div className="Table">
                    {Object.values(this.state).map((node, index)=> {
                        <Grid key={index} rows={node.rows} meta={node.meta} />
                    })}
                </div>
            </>  
        );
    }
}
import React, {useState} from "react";
import { send } from "../engine";
import Grid from "./grid"


/////////////////////////////////////////////////
const user = store.get("user")
const style = {paddingLeft:"55px",paddingRight:"50px"}
const SHEME = ['PMR','SMR',"FSC"]
///////////////////////////////////////////////////


const FormRegistrationNewNode =(props)=> {
    const [mac, setMac] = useState("")
    const [name, setName] = useState("")
    const [type, setType] = useState("")

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
                {SHEME.map((type, i)=> (
                    <button onClick={useType} key={i}>{ type }</button>
                ))}
            </div> 
            <input 
                style={{maxWidth:"50%"}}
                placeholder="MAC"  
                type="text" 
                onChange={verify} 
                value={mac} 
            />
            <input 
                style={{maxWidth:"50%"}}
                placeholder="имя устройства(кастомное)" 
                type="text" 
                onChange={(e)=> setName(e.target.value)} 
                value={name} 
            />

            <button style={{marginTop:"2%",width:"52%"}} onClick={()=> props.create({mac:mac,name:name,type:type})}>
                Создать узел
            </button>
        </>
    );
}


/** -> Grid <- */
export default class SchemeConstructor extends React.Component {
    constructor(props) {
        super(props)
        this.state = store.get("user").nodes
        this.create = this.create.bind(this)
    }
    create(meta, type) {
        send("newNode", {login:user.login, password:user.password, state:meta}, "POST").then((res)=> {
            res.json().then((userData)=> {
                if(!userData.error) store.set("user", userData)
                else this.props.error(userData.error)
            });
        });
    }
    componentDidMount() {  
        store.watch("user", (newData)=> this.setState(newData.nodes))
    }
    render() {
        return(
            <>
                <FormRegistrationNewNode create={this.create} />

                <div className="Table">
                    {Object.values(this.state).length > 0
                        ? Object.values(this.state).map((node, index)=> (
                            <Grid 
                                key={index} 
                                rows={node.table} 
                                mac={node._mac} 
                                type={node._type} 
                                name={node._name}
                                knx={node._knx}
                            />
                        ))
                        : "узлов пока не добавлено"
                    }
                </div>
            </>  
        );
    }
}
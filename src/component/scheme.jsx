import React, {useState} from "react";
import { send, useCokie } from "../engine";
import Grid from "./grid";



/////////////////////////////////////////////////
const user = store.get("user")
const style = {paddingLeft:"55px",paddingRight:"5%"}
const SHEME = ['PMR','SMR',"FSC","BUT8","DIM8","CUR4"]
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



export default function SchemeConstructor(props) {
    const [state, setState] = useState(store.get("user").nodes)

    const onCreate =(meta)=> {
        if(meta.type){
            send("newNode", {login:useCokie().login, password:useCokie().password, state:meta}, "POST").then((res)=> {
                res.json().then((userData)=> {
                    if(!userData.error){
                        store.set("user", userData)
                        window.location.reload()
                    }
                    else props.error(userData.error)
                })
            });
        }
        else EVENT.emit("error", "не указан тип ноды")
    }


    return(
        <div>
            <FormRegistrationNewNode create={onCreate} />
            <div className="tables">
                {Object.values(state).length > 0
                    ? Object.values(state).map((node, index)=> (
                        <div key={index} className="Table">
                            <Grid 
                                rows={node.table} 
                                mac={node._mac} 
                                type={node._type} 
                                name={node._name}
                                knx={node._knx}
                            />
                        </div>
                    ))
                    : "узлов пока не добавлено"
                }
            </div>  
        </div>
    )
}
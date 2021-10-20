import React, { useState, useEffect } from 'react';
import { VariableWidthGrid } from 'react-variable-width-grid';
import { Resizable } from "re-resizable";
import { Select, Input } from "./input";
import { send } from "../engine";


const user = store.get("user")
const META = {
    reley: [
        {type:"lable", data:"Реле", color:"#90e160cc"}, 
        {type:'input', data:"name"}, 
        {type:'select', name:"room", data:store.get("user").rooms.map((room)=> room.name)}, 
        {type:'input', data:"GA1"}, 
        {type:'input', data:"GA2"}, 
        {type:'input', data:"GAstatus"}
    ],
    button: [
        {type:"lable", data:"INP", color:"#f4ea7c"}, 
        {type:'input', data:"name"}, 
        {type:'select', name:"mod", data:['click','turnON','turnOFF','dimming','longClick','gerkonONOFF','gerkonOFFON','MS1min','MS5min','MS10min']},
        {type:'input', data:"GA1"}, 
        {type:'select', name:"mod", data:['click','turnON','turnOFF','dimming','longClick','gerkonONOFF','gerkonOFFON','MS1min','MS5min','MS10min']},
        {type:'input', data:"GA2"}, 
    ]
}
const useSend =(macRootDevice, data, clb)=> {
    send("set", {login:user.login,password:user.password,table:{mac:macRootDevice,data:data}}, "POST").then((res)=> {
        if(clb) clb(res)
    })
}
const useParse =(type, index)=> {
    return META[type][index]
}



/**
 * `knx`: knx   
 * `mac`: mac   
 * `name`: имя устройства   
 * `type`: тип устройства выбранный 
 */
const Title =(props)=> {
    const style = {margin:"10px",textDecoration:"underline"}
    const styleInput = {padding:"10px", marginRight:"5px"}
    const styleTitle = {display:"flex",flexDirection:"row",textAlign:"center",background:"#6c6a6acc"}

    return(
        <div style={styleTitle}>
            <div style={{...style,marginRight:"30px"}}>{ props.type }</div>
            <Input style={styleInput} placeholder="NAME" onChange={(e)=> props.name.set(e.target.value)} value={props.name.name}/>
            <Input style={styleInput} placeholder="KNX" onChange={(e)=> props.knx.set(e.target.value)} value={props.knx.knx}/>
            <Input style={styleInput} placeholder="MAC" onChange={(e)=> props.mac.set(e.target.value)} value={props.mac.mac}/>
            <button style={{...style,marginRight:"50px"}}>💾</button>
            <button style={style}>Считать</button>
            <button style={style}>Перепрошивка</button>
            <button style={{margin:"10px",padding:"8px",marginLeft:"20%"}} id="del">❌</button>
        </div>
    );
}
/** Строка в таблице */
const Row =(props)=> {
    const [selected, setSelected] = useState([])
    const [state, setState] = useState(props.module)
    
    const onState =(id, val)=> {
        let copy = state
        copy[id] = val
        setState(copy)
    }
    /** возможно заменить */
    const onSave =()=> {
        let request = {}
        
        Object.values(props.module).map((e, i)=> {
            let elem = useParse(props.id, index)

            if(i===0) console.log(elem[0]);
            else if(!selected[i]) request[elem.data] = state[i];
            else request[selected[i].key] = selected[i].val;
        });
        
        props.change(props.id, request)
    }

    return(
        <>
            {Object.keys(state).map((key, index)=> {
                let elem = useParse(props.id, index)
                let color = props.id==="reley"?"#90e160cc":(props.id==="button"?"#f4ea7c":"grey")

                if(elem && elem.type==="input"){
                    return(
                        <Input 
                            size={{width:"100px",height:"50px",border:`1px solid ${color}`}}
                            key={index} 
                            placeholder={elem.data} 
                            onChange={(e)=> onState(index, e.target.value)} 
                            value={state[index]}
                        />
                )}
                else if(elem && elem.type==="select"){
                    return(
                        <Select key={index} 
                            style={{border:`1px solid ${color}`}}
                            data={elem.data} 
                            onValue={(e)=> {
                                selected[index] = {key:elem.name, val:e}
                                setSelected(selected)
                            }} 
                        />
                )}
                else if(elem && elem.type==="lable"){
                    return (
                        <div 
                            key={index} 
                            style={{
                                marginTop:"5px",
                                marginBottom:"5px",
                                borderRadius:"5px",
                                textAlign:"center",
                                border:"1px solid grey",
                                width:"70px",
                                height:"48px",
                                backgroundColor:elem.color,
                                border:`1px solid ${color}`
                            }}
                        >
                            { elem ? props.id : "null" }
                        </div>
                )}
            })}

            <button onClick={onSave} style={{maxWidth:"50px",height:"50px",marginTop:"5px",marginLeft:"10px"}}>
                💾
            </button>
        </>
    );
}




export default function Grid(props) {
    const style = {border:"1px solid grey",marginTop:"10%"}
    const [modules, setModules] = useState(props.rows)
    const [mac, setMac] = useState(props.mac)
    const [knx, setKnx] = useState(props.knx)
    const [name, setName] = useState(props.name)

    console.log("modules:", modules)
    const onChange =(keyModule, data)=> {
        let copy = modules
        copy[keyModule] = data

        useSend(mac, copy, (res)=> {
            setModules(copy)
            if(!res.error) store.set("user", res)
            else EVENT.emit("error", res.error)
        });
    }
    
    return(
        <Resizable style={style} defaultSize={{width:960, height:200}}>
            <Title 
                type={props.type} 
                name={{name:name, set:setName}} 
                mac={{mac:mac, set:setMac}} 
                knx={{knx:knx, set:setKnx}}
            />
            <div style={{paddingLeft:"10px",marginTop:"10px"}}>
                {Object.keys(modules).map((key)=> (
                    <div className="Row" key={key}>
                        <Row 
                            id={key}
                            change={onChange} 
                            module={modules[key]} 
                        />
                    </div>
                ))}
            </div>
        </Resizable>
    );
}
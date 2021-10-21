import React, { useState, useEffect } from 'react';
import { Resizable } from "re-resizable";
import { Select, Input } from "./input";
import { send } from "../engine";
import { FaArrowsAltV } from "react-icons/fa";
import { usePub } from "./device.f";


const user = store.get("user")
const META = {
    reley: [
        {type:"lable", data:"Реле", color:"#90e160cc"},         //скрытый топик вызова (всех реле группы)  
        {type:'input', data:"name"},                            //не обязательный топик имени
        {type:'select', name:"room", data:store.get("user").rooms.map((room)=> room.name)},
        {type:'input', data:"GA1"}, 
        {type:'input', data:"GA2"}, 
        {type:'input', data:"GAstatus"}                       
    ],
    button: [
        {type:"lable", data:"INP", color:"#f4ea7c"},            //скрытый топик вызова (всех кнопок группы)
        {type:'input', data:"name"}, 
        {type:'select', name:"mod", data:['click','turnON','turnOFF','dimming','longClick','gerkonONOFF','gerkonOFFON','MS1min','MS5min','MS10min']},
        {type:'input', data:"GA1"}, 
        {type:'select', name:"mod", data:['click','turnON','turnOFF','dimming','longClick','gerkonONOFF','gerkonOFFON','MS1min','MS5min','MS10min']},
        {type:'input', data:"GA2"}, 
    ]
}

const useSend =(mac, meta, data, clb)=> {
    send("set", {login:user.login,password:user.password,mac:mac,meta:meta,data:data}, "POST").then((res)=> {
        if(clb) res.json().then((v)=> clb(v))
    })
}

const useParse =(type, index)=> {
    return META[type][index]
}
const useArray =(data)=> {
    if(data instanceof Array){
        let rezult = {}
        data.map((val, i)=> rezult[val]='')
        return rezult
    }
    else return data
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

    const onDel =()=> {
        send("delete", {login:user.login,password:user.password,mac:props.mac.mac}, "POST").then((data)=> {
            data.json().then((v)=> {
                store.set("user", v)
                window.location.reload()
            })
        })
    }

    return(
        <div style={styleTitle}>
            <div style={{...style,marginRight:"30px"}}>{ props.type }</div>
            <Input style={styleInput} placeholder="NAME" onChange={(e)=> props.name.set(e.target.value)} value={props.name.name}/>
            <Input style={styleInput} placeholder="KNX" onChange={(e)=> props.knx.set(e.target.value)} value={props.knx.knx}/>
            <Input style={styleInput} placeholder="MAC" onChange={(e)=> props.mac.set(e.target.value)} value={props.mac.mac}/>
            <button onClick={props.change} style={{...style,marginRight:"50px"}}>💾</button>
            <button style={style}>Считать</button>
            <button style={style}>Перепрошивка</button>
            <button style={{margin:"10px",padding:"8px",marginLeft:"20%"}} onClick={onDel} id="del">❌</button>
        </div>
    );
}
const Row =(props)=> {
    const [render, setRender] = useState()
    const [state, setState] = useState(useArray(props.module))
    
    const onSave =()=> {
        Object.keys(state).map((key)=> {
            window.api.subscribe(props.mac+"/"+props.name+"/"+key+"st", (data)=> console.log("onSub:", data))
            usePub(props.mac+"/"+props.name+"/"+key, state[key])
        })
        props.change(props.name, props.id, state)
    }
    const onRender =()=> {
        setRender(Object.keys(state).map((key, index)=> {
            let elem = useParse(props.id, index)
            let color = props.id==="reley"?"#90e160cc":(props.id==="button"?"#f4ea7c":"grey")
    
            if(elem && elem.type==="input"){
                return(
                    <input 
                        style={{width:"100px",height:"50px",border:`1px solid ${color}`}}
                        key={key} 
                        type="text"
                        placeholder={elem.data} 
                        onChange={(e)=> {
                            state[key] = e.target.value
                            setState(state)
                            onRender()
                        }}
                        value={state[key]}
                    />
            )}
            else if(elem && elem.type==="select"){
                return(
                    <Select key={index} 
                        style={{border:`1px solid ${color}`}}
                        data={elem.data} 
                        onValue={(e)=> {
                            let states = state
                            if(elem.name==="room"){
                                states.room = e
                            }
                            else states[key] = e

                            setState(states)
                            onRender()
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
        }))
    }
    
    return(
        <div className="Row">
            { render??onRender() }
            <button onClick={onSave} style={{maxWidth:"50px",height:"50px",marginTop:"5px",marginLeft:"10px"}}>
                💾
            </button>
        </div>
    );
}



/** !размеры таблиц */
export default function Grid(props) {
    const [visible, setVisible] = useState(true)
    const [modules, setModules] = useState(props.rows)
    const [mac, setMac] = useState(props.mac)
    const [knx, setKnx] = useState(props.knx)
    const [name, setName] = useState(props.name)

   
    const onChange =(name, keyModule, data)=> {
        if(name && keyModule && data){
            let copy = modules
            copy[keyModule][name] = data
            setModules(copy)
            let meta = {mac:mac,knx:knx,name:name}
        }
        else EVENT.emit("error", "переданы не все атрибуты")
    }
    const onTitleChange =()=> {
        let meta = {mac:mac,knx:knx,name:name}
        useSend(props.mac, meta, modules, (res)=> {
            if(!res.error) store.set("user", res)
            else EVENT.emit("error", res.error)
        });
    }
    
    return(
        <div style={{border:"1px solid gray",backgroundColor:"#00000033"}}>
            <Title 
                type={props.type} 
                name={{name:name, set:setName}} 
                mac={{mac:mac, set:setMac}} 
                knx={{knx:knx, set:setKnx}}
                change={onTitleChange}
            />
            <div style={{paddingLeft:"10px",marginTop:"10px",display:visible?"block":"none"}}>
                {Object.keys(modules).map((key)=> (
                    Object.keys(modules[key]).map((kid)=> (
                        <Row 
                            mac={mac}
                            id={key}
                            name={kid}
                            key={kid}
                            change={onChange} 
                            module={modules[key][kid]} 
                        />
                    ))
                ))}
            </div>
            <div className="Shadower" onClick={()=> setVisible(visible?false:true)}><FaArrowsAltV/></div>
        </div>
    );
}



/**useSend(props.mac, meta, copy, (res)=> {
    setModules(copy)
    if(!res.error) store.set("user", res)
    else EVENT.emit("error", res.error)
});
*/
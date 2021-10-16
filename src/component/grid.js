import React, { useState, useEffect } from 'react';
import { Input } from '@nextui-org/react';
import { VariableWidthGrid } from 'react-variable-width-grid';
import { Resizable } from "re-resizable";
import { Select } from "./input";
import { send } from "../engine";


const META = {
    reley: [
        {type:"lable", data:"Реле"}, 
        {type:'input', data:"name"}, 
        {type:'select', name:"room", data:store.get("user").rooms.map((room)=> room.name)}, 
        {type:'input', data:"GA1"}, 
        {type:'input', data:"GA2"}, 
        {type:'input', data:"GAstatus"}
    ],
    button: [
        {type:"lable", data:"INP"}, 
        {type:'input', data:"name"}, 
        {type:'select', name:"mod", data:['click','turnON','turnOFF','dimming','longClick','gerkonONOFF','gerkonOFFON','MS1min','MS5min','MS10min']},
        {type:'input', data:"GA1"}, 
        {type:'select', name:"mod", data:['click','turnON','turnOFF','dimming','longClick','gerkonONOFF','gerkonOFFON','MS1min','MS5min','MS10min']},
        {type:'input', data:"GA2"}, 
    ]
}
const useSend =(macRootDevice, data, clb)=> {
    send("set", {[macRootDevice]: data}, "POST").then((res)=> {
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
    const style = {margin:"10px"}
    const styleInput = {padding:"10px", marginRight:"5px"}
    const styleTitle = {display:"flex",flexDirection:"row",textAlign:"center",background:"#6c6a6acc"}

    return(
        <div style={styleTitle}>
            <div style={style}>{ props.type }</div>
            <Input style={styleInput} labelPlaceholder="NAME" onChange={(e)=> props.name.set(e.target.value)} value={props.name.name}/>
            <Input style={styleInput} labelPlaceholder="KNX" onChange={(e)=> props.knx.set(e.target.value)} value={props.knx.knx}/>
            <Input style={styleInput} labelPlaceholder="MAC" onChange={(e)=> props.mac.set(e.target.value)} value={props.mac.mac}/>
            <button style={style}>💾</button>
            <button style={style}>Считать</button>
            <button style={style}>Перепрошивка</button>
            <button style={{margin:"10px",padding:"8px",marginLeft:"20%"}} id="del">❌</button>
        </div>
    );
}
const Row =(props)=> {
    const [selected, setSelected] = useState([])
    const [state, setState] = useState(props.module)
    
    const onState =(id, val)=> {
        let copy = state
        copy[id] = val
        setState(copy)
    }
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
            {Object.keys(state).map((e, index)=> {
                let elem = useParse(props.id, index)
                console.log(elem)

                if(elem&&elem.type==="input") return(
                    <Input 
                        style={{maxWidth:"70px",height:"50px"}}
                        key={index} 
                        size="mini" 
                        labelPlaceholder={elem.data} 
                        onChange={(e)=> onState(index, e.target.value)} 
                        value={state[index]}
                    />
                )
                else if(elem&&elem.type==="select"){
                    return(
                        <Select
                            key={index} 
                            data={elem.data} 
                            onValue={(e)=> {
                                selected[index] = {key:elem.name, val:e}
                                setSelected(selected)
                            }} 
                        />
                )}
                else return (
                    <div key={index} 
                        style={{border:"1px solid grey",backgroundColor:"orange"}}
                    >
                        {elem?elem.data:"null"}
                    </div>
                )
            })}

            <button onClick={onSave} style={{maxWidth:"50px"}}>💾</button>
        </>
    );
}




export default function Grid(props) {
    const style = {border:"1px solid grey",marginTop:"10%"}
    const [modules, setModules] = useState(props.rows)
    const [mac, setMac] = useState(props.mac)
    const [knx, setKnx] = useState(props.knx)
    const [name, setName] = useState(props.name)

    
    const onChange =(keyId, data)=> {
        let copy = state
        copy[keyId] = data
        setModules(copy)
    }
    
    return(
        <Resizable style={style} defaultSize={{width:960, height:200}}>
            <Title 
                type={props.type} 
                name={{name:name,set:setName}} 
                mac={{mac:mac,set:setMac}} 
                knx={{knx:knx,set:setKnx}}
            />
            <div style={{paddingLeft:"10px",marginTop:"20px"}}>
                {Object.keys(modules).map((key, i)=> (
                    <VariableWidthGrid key={key}>
                        <Row id={key}
                            change={onChange} 
                            module={modules[key]} 
                        />
                    </VariableWidthGrid>
                ))}
            </div>
        </Resizable>
    );
}
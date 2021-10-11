import React, { useState, useEffect } from 'react';
import { Input } from '@nextui-org/react';
import { VariableWidthGrid } from 'react-variable-width-grid';
import { Resizable } from "re-resizable";
import { Select } from "./input";
import { send } from "../engine";


const useSend =(macRootDevice, data, clb)=> {
    send("set", {[macRootDevice]: data}, "POST").then((res)=> {
        if(clb) clb(res)
    })
}


/**
 * `knx`: knx   
 * `mac`: mac   
 * `name`: имя устройства   
 * `type`: тип устройства выбранный 
 */
const Title =(props)=> {
    const [knx, setKnx] = useState(props.knx)
    const [name, setName] = useState(props.name)
    const [mac, setMac] = useState(props.mac)
    const [type, setType] = useState(props.type)

    const style = {margin:"10px"}
    const styleInput = {padding:"10px", marginRight:"5px"}
    const styleTitle = {display:"flex",flexDirection:"row",textAlign:"center",background:"#6c6a6acc"}

    return(
        <div style={styleTitle}>
            <div style={style}>{ type }</div>
            <Input style={styleInput} labelPlaceholder="NAME" onChange={(e)=> setName(e.target.value)} value={ name }/>
            <Input style={styleInput} labelPlaceholder="KNX" onChange={(e)=> setKnx(e.target.value)} value={ knx }/>
            <Input style={styleInput} labelPlaceholder="MAC" onChange={(e)=> setMac(e.target.value)} value={ mac }/>
            <button style={style}>💾</button>
            <button style={style}>Считать</button>
            <button style={style}>Перепрошивка</button>
            <button style={{margin:"10px",padding:"8px",marginLeft:"20%"}} id="del">❌</button>
        </div>
    );
}
/**
 * `placeholders`: массив плейсхолдеров     
 */
const Row =(props)=> {
    const [id, setId] = useState(props.id)
    const [selected, setSelected] = useState([])
    const [state, setState] = useState(props.datas)

    const onState =(id, val)=> {
        let copy = state
        copy[id] = val
        setState(copy)
    }
    const onSave =()=> {
        let request = {}
        
        props.datas.map((elem, i)=> {
            if(i===0) console.log(elem[0]);
            else if(!selected[i]) request[elem.data] = state[i];
            else request[selected[i].key] = selected[i].val;
        });
        
        props.change(id, request)
    }


    return(
        <>
            {props.datas.map((elem, index)=> {
                if(elem.type==="input") return(
                    <Input 
                        style={{maxWidth:"70px",height:"50px"}}
                        key={index} 
                        size="mini" 
                        labelPlaceholder={elem.data} 
                        onChange={(e)=> onState(index, e.target.value)} 
                        value={state[index]}
                    />
                )
                else if(elem.type==="select") return(
                    <Select
                        key={index} 
                        data={elem.data} 
                        onValue={(e)=> {
                            selected[index] = {key:elem.name, val:e}
                            setSelected(selected)
                        }} 
                    />
                )
                else return <div key={index} style={{border:"1px solid grey",backgroundColor:id}}>{elem.data}</div>
            })}

            <button onClick={onSave} style={{maxWidth:"50px"}}>💾</button>
        </>
    );
}




export default function Grid(props) {
    const style = {border:"1px solid grey",marginTop:"10%"}
    const [state, setState] = useState(props.rows)
    const [mac, setMac] = useState(props.title.meta.mac)
    const [knx, setKnx] = useState(props.title.meta.knx)
    const [room, setRoom] = useState(props.title.meta.room)

    const onChange =(keyId, data)=> {
        let copy = state
        copy[keyId] = data
        setState
    }

    return(
        <Resizable style={style} defaultSize={{width:960, height:200}}>
            <Title 
                type={props.title.meta.type} 
                name={room} 
                mac={mac} 
                knx={knx}
                set={{mac:setMac,knx:setKnx}}
            />
            <div style={{paddingLeft:"10px",marginTop:"20px"}}>
                {Object.keys(state).map((key, i)=> (
                    <VariableWidthGrid key={key}>
                        <Row 
                            key={i}
                            change={onChange}
                            id={key} 
                            datas={state[key]} 
                        />
                    </VariableWidthGrid>
                ))}
            </div>
        </Resizable>
    );
}
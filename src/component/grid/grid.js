import React, { useState, useEffect } from 'react';
import Row from "./row";
import Title from "./title";
import arrow from "../../img/top-ar.png";




/**
 * rows: `{}`   
 * mac: `String`  
 * knx: `String`  
 * name: `String`
 */
export default function Grid(props) {
    const [visible, setVisible] = useState(false)
    const [modules, setModules] = useState(props.rows)
    const [mac, setMac] = useState(props.mac)
    const [knx, setKnx] = useState(props.knx)
    const [name, setName] = useState(props.name)

    const onTitleChange =()=> {
        let meta = {mac:mac, knx:knx, name:name}

        useSocket("reWriteTable", {mac:props.mac, meta:meta}, (res)=> {
            setMac(mac)
            setKnx(knx)
            setName(name)
            setModules(props.rows)
        });
    }
    useEffect(()=> {
        setMac(props.mac)
        setKnx(props.knx)
        setName(props.name)
        setModules(props.rows)
    }, [props])
    
    
    return(
        <div className="Grid">
            <Title 
                type={props.type} 
                name={{name:name, set:setName}} 
                mac={{mac:mac, set:setMac}} 
                knx={{knx:knx, set:setKnx}}
                change={onTitleChange}
            />
            <div className="Row" style={{display:visible?"block":"none"}}>
                {modules ? Object.keys(modules).map((key)=> {
                    if(key && modules) return Object.keys(modules[key]).map((kid)=> (
                        <Row 
                            key={kid}
                            mac={mac}
                            id={key}
                            name={kid} 
                            module={modules[key][kid]} 
                        />
                    )
                )}) : document.location.reload()}
            </div>
            <div className="Shadower" onClick={()=> setVisible(visible?false:true)}>
                <img width="50px" src={arrow} style={{transform:!visible?"rotate(180deg)":"rotate(0deg)",transitionDuration:"1s"}}/>
            </div>
        </div>
    );
}
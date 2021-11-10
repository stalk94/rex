import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Row from "./row";
import Title from "./title";
import arrow from "../../img/top-ar.png";



const useSend =(mac, meta, data, clb)=> {
    send("set", {
            login: Cookies.get("login"),
            password: Cookies.get("password"),
            mac: mac,
            meta: meta,
            data: data
        }, "POST").then((res)=> clb && res.json().then((v)=> clb(v))
    )
}




/**
 * rows: `{}`   
 * mac: `String`  
 * knx: `String`  
 * name: `String`
 */
export default function Grid(props) {
    const [visible, setVisible] = useState(true)
    const [modules, setModules] = useState(props.rows)
    const [mac, setMac] = useState(props.mac)
    const [knx, setKnx] = useState(props.knx)
    const [name, setName] = useState(props.name)

    const onTitleChange =()=> {
        let meta = {mac:mac, knx:knx, name:name}

        useSend(props.mac, meta, modules, (res)=> {
            if(!res.error) store.set("user", res)
            else EVENT.emit("error", res.error)
        });
    }
    useEffect(()=> {
        setMac(props.mac)
        setKnx(props.knx)
        setName(props.name)
        setModules(props.rows)
    }, [props.mac, props.knx, props.name, props.rows])
    
    
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
                {Object.keys(modules).map((key)=> (
                    Object.keys(modules[key]).map((kid)=> (
                        <Row key={kid}
                            mac={mac}
                            id={key}
                            name={kid} 
                            module={modules[key][kid]} 
                        />
                    ))
                ))}
            </div>
            <div className="Shadower" onClick={()=> setVisible(visible?false:true)}>
                <img width="50px" src={arrow} style={{transform:!visible?"rotate(180deg)":"rotate(0deg)",transitionDuration:"1s"}}/>
            </div>
        </div>
    );
}
import React, { useState, useEffect, useContext } from "react";
import Device from "../device.f";
import lamp from '../img/lamp.png';
import onOff from '../img/onOff.png';
import wtor from '../img/wtor.png';
import logic from '../img/logic.png';
import termostat from '../img/termostat.png';



export const ICON = {
    PMR: lamp,
    onOff: onOff,
    wtor: wtor,
    logic: logic,
    FSC: termostat
}

const sort =(devices, roomId)=> {
    let find = []

    devices.forEach((device)=> {
        if(device.room===roomId) find.push(device)
    });
    return find
}



export default function DevicePanel(props) {
    return(
        <div className="device-wraper">
            {props.user.devices.map((device, index)=> {
                if(props.user.rooms[device.room]===props.target) return(
                    <Device 
                        key={index}
                        id={index}
                        room={props.target.name}
                        payload={device.payload}
                        type={device.type} 
                        title={device.name} 
                        sheme={device.sheme}
                        mac={device.mac}
                        favorite={device.favorite}
                        image={ICON[device.type]}
                    />
                );
            })}
        </div>
    );
}

export const SetingsPanel =(props)=> {
    return(
        <div></div>
    )
}
export const Device =(props)=> {
    const id = props.id, title = props.title, room = props.room, mac = props.mac, sheme = props.sheme
    const [selected, setSelected] = useState(0)
    const [load, setLoad] = useState()
    const [payload, setPayload] = useState(props.payload)
    const [settingsView, setView] = useState(false)
    

    const {stop, start, isActive} = useTimeout(()=> {
        setLoad()
    }, 300);
   
    const view =(selected)=> {
        switch(selected) {
            case 0: return(
                <>
                <div className="device-body">
                    <div className="line" style={{borderBottom:"1px solid rgba(0,0,0,.2)"}}>
                        <h2 className="title"
                            onClick={()=> setView(settingsView?false:true)}
                        >
                           { title }
                        </h2>
                        <h3 style={{marginBottom:"1px", marginLeft:"35%", marginTop:"5px", color:"gray", textAlign:"right", fontSize:"14px"}}>
                            { room }
                        </h3>
                    </div>
                        {payload["/R0/onoff"] === '0'
                            ? <input style={{marginTop:"25%"}} 
                                disabled
                                type="range" 
                                onInput={(ev)=> pub(mac, sheme, 'brihtness', ev.target.value)} 
                                value={payload.brihtness}
                            />
                            : <input style={{marginTop:"25%"}} 
                                type="range" 
                                onInput={(ev)=> pub(mac, sheme, 'brihtness', ev.target.value)} 
                                value={payload.brihtness}
                            /> 
                        }
                    </div>
                <div className="device-icon">
                    {props.type!=="FSC" 
                        ? <div style={{cursor:"pointer"}}
                            onClick={()=> pub(mac, sheme, "onoff", payload.onoff==='0'?1:0)} 
                        >
                            <h3 style={{position:"absolute", color:(payload.onoff==='1'?"#42f059":"red"), left:"40%",top:"30%"}}>
                                { load ? load : (payload.onoff==='1'?payload.brihtness+"%":"off") }
                            </h3>
                            <img style={{width:"100%", opacity:payload.onoff==='1'?"1":"0.4"}} 
                                src={props.image} 
                            />
                        </div>
                        : "тут будет термостат"
                    }
                </div>
                </>
            );
                break;
            case 1: return(1)
                break;
            case 2: return(
                <div className="table">
                    <h4>toggle</h4> <h4>toggleST</h4> <h4>diming</h4>
                    <input type="text"/> <input type="text"/> <input type="text"/>
                    <input type="text"/> <input type="text"/> <input type="text"/>
                    <input type="text"/> <input type="text"/> <input type="text"/>
                </div>
            )
                break;
        }
    }
    

    return(
        <div className="container">
            <div className="device-title">
                {settingsView ? <SetingsPanel selected={selected} onSelect={setSelected} /> : ""}
            </div>
                { view(selected) }
        </div>
    );
}
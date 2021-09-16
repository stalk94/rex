import React, { useState, useEffect, useContext } from "react";
import Device, {ProgressBar, Cell, Move} from "./device";
import lamp from '../img/lamp.png';
import onOff from '../img/onOff.png';
import wtor from '../img/wtor.png';
import logic from '../img/logic.png';
import termostat from '../img/termostat.png';


const ICON = {
    PMR: lamp,
    onOff: onOff,
    wtor: wtor,
    logic: logic,
    termostat: termostat
}


export default function DevicePanel(props) {
    const view = props.devices.map((device, index)=> {
        if(props.devices && props.devices.length!==0){
            return <Device key={index}
                type={device.type} 
                title={device.name} 
                sheme={device.sheme}
                mac={device.mac}
                api={props.api}
                room={props.rooms[device.room]?props.rooms[device.room].name:""} 
                image={ICON[device.type]}
            />
        }
        else return "девайсов нет"
    })

    return(
        <div className="device-wraper">
            { view }
        </div>
    );
}
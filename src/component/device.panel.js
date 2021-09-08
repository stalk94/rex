import React, { useState, useEffect, useContext } from "react";
import Device, {ProgressBar, Cell, Move} from "./device";
import lamp from '../img/lamp.png';
import onOff from '../img/onOff.png';
import wtor from '../img/wtor.png';
import logic from '../img/logic.png';
import termostat from '../img/termostat.png';


const ICON = {
    deamer: lamp,
    onOff: lamp,
    wtor: wtor,
    logic: logic,
    termostat: termostat
}


export default function DevicePanel(props) {


    return(
        <div className="device-wraper">
            {props.devices.map((device, index)=> <Device key={index}
                    type={device.type} 
                    title={device.name} 
                    room={props.rooms[device.room].name} 
                    image={ICON[device.type]}
                />
            )}
        </div>
    );
}
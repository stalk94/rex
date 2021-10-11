import React, { useState, useEffect, useContext } from "react";
import Device from "./device.f";
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
import React, { useState, useEffect, useContext } from "react";
import Device, {ProgressBar, Cell, Move} from "./device";
import lamp from '../img/lamp.png';
import onOff from '../img/onOff.png';
import wtor from '../img/wtor.png';
import logic from '../img/logic.png';
import redact from '../img/pen-tool.png';
import termostat from '../img/termostat.png';
import useJedis from 'jedisdb'
require("../stor")



const ICON = {
    PMR: lamp,
    onOff: onOff,
    wtor: wtor,
    logic: logic,
    termostat: termostat
}



export default function DevicePanel(props) {
    const rooms = useJedis("rooms")
    const devices = useJedis("devices")
    const [name, setName] = useState(rooms.state[props.roomId].name)
    const changeName =()=> props.readRoom(name, props.roomId)
    const sort =()=> {
        let find = []

        props.devices.state.forEach((device)=> {
            if(device.room===props.roomId) find.push(device)
        });
        return find
    }

    
    return(
        <div className="area">
            <div className="device-wraper">
                {rooms.state[props.roomId].name
                    ? <React.Fragment>
                        <var className="title-name" 
                            contentEditable="true" 
                            suppressContentEditableWarning={true}
                            onInput={(ev)=> setName(ev.target.textContent)}
                        >
                            { rooms.state[props.roomId].name } 
                        </var>
                        <img id="read-b" height="31px" src={redact} onClick={changeName}/>
                            {sort().map((device, index)=> {
                                if(devices.state && devices.state.length!==0){
                                    return <Device key={index}
                                        type={device.type} 
                                        title={device.name} 
                                        sheme={device.sheme}
                                        mac={device.mac}
                                        api={props.api}
                                        room={rooms.state[device.room]?rooms.state[device.room].name:""} 
                                        image={ICON[device.type]}
                                    />
                            }})}
                      </React.Fragment>
                    : devices.state.map((device, index)=> {
                        if(devices && devices.length!==0){
                        return <Device key={index}
                            type={device.type} 
                            title={device.name} 
                            sheme={device.sheme}
                            mac={device.mac}
                            api={props.api}
                            room={rooms.state[device.room]?rooms.state[device.room].name:""} 
                            image={ICON[device.type]}
                        />
                    }
                })}
            </div>
        </div>
    );
}
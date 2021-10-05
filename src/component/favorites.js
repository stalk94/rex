import React, {useCallback, useState} from "react";
import Device from "./device.f";
import { ICON } from "./device.panel";



export default function Favorites(props) {
    const [devices, setDevices] = useState(store.get("user").devices)

    const clb = useCallback(()=> {
        store.watch("user", (data)=> setDevices(data.devices))
    });

    return(
        <div className="device-wraper">
            {devices.map((device, index)=> {
                device.payload = device.payload.onoff
                    ? device.payload
                    : {brihtness:50,onoff:"0"}
                if(device.temperature && device.type==="termostat") device.temperature = 0;
                
                if(device.favorite===true) return (
                    <Device 
                        key={index}
                        id={index}
                        room={"Избранное"}
                        payload={device.payload}
                        type={device.type} 
                        title={device.name} 
                        sheme={device.sheme}
                        mac={device.mac}
                        favorite={true}
                        image={ICON[device.type]}
                    />
                );
            })}
        </div>
    );
}
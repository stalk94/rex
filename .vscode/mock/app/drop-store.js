import { send } from "../../src/engine";
import React, {useState, useEffect} from 'react';
import { useDidMount } from "rooks";
import ReactDOM from 'react-dom';
import {DragDropContainer, DropTarget} from "react-drag-drop-container";
import { ICON } from "../device.panel";
import "../css/store";


const Lable =(props)=> {
    const style = {border:"1px solid grey",background:"grey"}
    const styleSelect = {border:"1px solid red",background:"brown"}
    
    return(
        <li className="lable" style={props.select ? styleSelect : style} 
            onClick={props.click}
        >
            <img width="30px" src={ICON[props.title]} /> 
            { props.title }
        </li>
    );
}
const sort =(devices)=> {
    let list = []
    devices.map((device)=> {
        if(device.room===0) list.push(device)
    })

    return list
}


/**
 * `devices`: user.devices
 * 
 */
export default function DeviceStore(props) {
    const [dir, setDir] = useState()
    const [cur, setCur] = useState()
    const [devices, setDevices] = useState(sort(props.devices))
    const onList =()=> (
        devices.map((device, index)=> {
            let copydir = dir??{}
            if(!copydir[device.type]) copydir[device.type] = []

            copydir[device.type].push(
                <DragDropContainer key={index} targetKey="device" dragData={device}>
                    <div className="DeviceStore-device">
                        <img width="80%" src={ICON[device.type]}/>
                        <h4>{ device.name }</h4>
                    </div>
                </DragDropContainer>
            )
            setDir(copydir)
        })
    );

    useDidMount(()=> {
        store.watch("user", (newData)=> {
            setDevices(sort(newData.devices))
            onList()
        })
    });
    

    return(
        <div className="DeviceStore">
            <ul className="DeviceStore-header">
                {dir
                    ? Object.keys(dir).map((key)=> {
                        <Lable 
                            key={key}
                            title={key}
                            select={cur===key?true:false}
                            click={()=> setCur(key)}
                        />
                    })
                    : "нет новых девайсов"
                }
            </ul>
            <div className="DeviceStore-curent">
                {cur 
                    ? dir[cur].map((device)=> device)
                    : "" 
                }
            </div>
        </div>
    );
}



ReactDOM.render(<DeviceStore devices={store.get("user").devices} />, document.querySelector(".test"))
import React from 'react';
import {Button} from './buttons';
import {SlideBar} from './input';
import List, {DropDown, DropDown2} from './form';
import Device, {ProgressBar, Label, loader} from './device';
import lamp from '../img/lamp.png';
import onOff from '../img/onOff.png';
import wtor from '../img/wtor.png';
import logic from '../img/logic.png';
import termostat from '../img/termostat.png';


////////////////////////////////////////////////////////////////
const ICON = {
    lamp: lamp,
    deamer: lamp,
    onOff: onOff,
    wtor: wtor,
    logic: logic,
    termostat: termostat
}
const INTRFACE = {
    lamp: <ProgressBar></ProgressBar>,
    onOff: <div></div>,
    wtor: <ProgressBar></ProgressBar>,
    logic: <div></div>,
    termostat: <ProgressBar></ProgressBar>
}
const DEVICES = {
    
}
////////////////////////////////////////////////////////////////
let info = `Enables an invisible overlay beneath the popover that captures clicks 
and prevents interaction with the rest of the document until the popover is closed. 
This prop is only available when interactionKind`
const mock = [
    {type:"lamp", room:"кухня", name:"Лампочка", info:info}, 
    {type:"onOff", room:"ванная", name:"Розетка", info:info}, 
    {type:"wtor", room:"кухня", name:"Штора", info:info}, 
    {type:"logic", room:"квартира", name:"Реле", info:info}, 
    {type:"termostat", room:"зал", name:"Подогрев пола", info:info},
    {type:"termostat", room:"квартира", name:"Подогрев пола", info:info}
]
////////////////////////////////////////////////////////////////


const MainDevice =(props)=> {
    return(
        <div className="card-body" onClick={props.event}>
            <div className="line">
                <div className="glass">
                    <img width="100px" height="100px" 
                        type={props.type}
                        src={ICON[props.type]} 
                        className="rounded-circle"
                    />
                </div>
                <div style={{width:"80%"}}>
                    <p style={{marginLeft:"30px", marginTop:"5px", marginBottom:"3px"}}>{props.title}</p>
                    <hr style={{marginLeft:"10px", marginTop:"0px", width:"100%", opacity:"0.1"}}/>
                    <h4 style={{marginLeft:"30px", marginTop:"0px"}}>{props.info}</h4>
                </div>
            </div>
        </div>
    );
}



/** 
 * Управляет состоянием всех приборов
 * Точка входа данных с устройств
 * props {
 *      `const`: константы верхнего уровня    
 * }
 */
export default class FavoriteDevice extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            devices: props.devices
        }
        this.tick = this.tick.bind(this)
        this.selectable = this.selectable.bind(this)
    }
    componentDidMount() {
        //this.setState({devices:mock})
        //setInterval(()=> this.setState({devices:[{type:"lamp",name:"dildo"}]}), this.props.const)
    }
    /** интерфейс устройства */ 
    selectable(ev) {
        let id = +ev.target.getAttribute("key")
        let dataDevice = this.state.devices[id]
        let type = dataDevice.type

        return ()=> <Device 
            key={id}
            title={dataDevice.name} 
            head={INTRFACE[type]}
            body={body} 
        />
    }
    render() {
        return(
            <>{this.state.devices.map((device, index)=> {
                    return <MainDevice 
                        key={index} 
                        type={device.type} 
                        event={console.log} 
                        title={`${device.name} [${this.props.rooms[device.room].name}]: #${index}`} 
                        info={device.info}
                    />
                })
            }</>
        );
    }
}
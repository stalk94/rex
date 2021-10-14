import React, {useEffect, useState} from "react";
import { useDebounce } from "rooks";
import { ProgressBar } from "./device.f";
import lamp from '../img/lamp.png';
import onOff from '../img/onOff.png';
import wtor from '../img/wtor.png';
import logic from '../img/logic.png';
import termostat from '../img/termostat.png';



const usePub =(topic, val)=> {
    let strVal = String(val)
    window.api.publish(topic, strVal)
    console.log('[📡]:', topic, ':', strVal)
}
export const ICON = {
    lamp: lamp,
    toogler: onOff,
    wtor: wtor,
    logic: logic,
    termostat: termostat
}
const useFiltre =(module, searchToken)=> {
    module.find((topic)=> )
}


const OnOff =(props)=> {
    return(
        <>
            {props.onoff === '0'
                ?   <h3 style={{position:"absolute", color:(props.onoff==='1'?"#42f059":"red"), left:"40%",top:"30%"}}>
                        { props.onoff==='1' ? props.brihtness+"%" : (props.onoff==='0'?"off":props.onoff) }
                    </h3>
                : ""
            }
        </>
    );
};
const Lable =(props)=> {
    const style = {position:"relative",top:"50%",left:"50%"}

    return(
        <>
            {props.type==="FSC"
                ? <ProgressBar enable={props.onOff} brihtness={props.brihtness} data={props.data} children={props.children}/>
                : { "PMR": <div style={style}>{ props.children }<img height="80%" src={ICON.lamp}/></div>,
                    "SMR": <div style={style}>{ props.children }<img height="80%" src={ICON.lamp}/></div>
                }[props.type]
            }
        </>
    );
}

const Centr =(props)=> {
    const [brihtness, setBr] = useState(props.value)
    const setDeb = useDebounce((v)=>props.onState(props.mac, v), 1500)

    return(
        <input style={{marginTop:"25%"}} 
            disabled={props.onoff}
            type="range" 
            onChange={(ev)=> {setDeb(ev.target.value); setBr(ev.target.value)}} 
            value={brihtness}
        />                       
    );
}
const Title =(props)=> (
    <div className="device-title">
        <div className="line" style={{borderBottom:"1px solid rgba(0,0,0,.2)"}}>
            <div>{ props.name }</div>
            <var>{ props.room }</var>
        </div>
    </div>
);


/** 
 *  `_frame`:0,     
 *  `mac`:string,   
 *  `guid`:${user.id:0},  
 *  `room`:0,   
 *  `name`:"",       
 *  `view`:boolean,   
 *  `payload`:{onoff:topic, brihtness:topic}  
 */
class Device extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            mac:props.mac,
            view:props.view,
            name:props.name,
            room:props.room,
            payload:props.payload
        }
        this.useClick = this.useClick.bind(this)
        this.onState = this.onState.bind(this)
    }
    componentDidMount() {
        store.watch("user", (newData)=> {
            let copy = newData.devices[this.props.guid]
            copy.view = this.state.view
            this.setState(copy)
        });
    }
    useClick() {
        let copy = this.payload
        let onoff = copy.payload[this.props.cfg.onoff]
        usePub(onoff?0:1)

        copy.payload[this.props.cfg.onoff] = <div className="ring"></div>
        this.setState(this.state)
    }
    onState(topic, val) {
        let copy = this.state.payload
        copy[topic] = val 
        this.setState(copy)
        usePub(this.state.payload)
    }
    render() {
        return(
            <div style={{display:this.state.view?"block":"none"}} className="container">
                <div className="device-body">
                    <Title name={this.state.name} room={this.state.room}/>
                    <Centr 
                        onoff={this.state.payload.onoff} 
                        brihtness={data}
                        onState={(val)=> this.onState("", val)} 
                    />
                </div>
                <div className="device-icon">
                    <Lable 
                        type={this.props.type} 
                        click={this.useClick} 
                        payload={this.state.payload}
                        onoff={this.state.payload.onoff}
                    >
                        <OnOff 
                            brihtness={} 
                            onoff={this.state.payload.onoff}
                        />
                    </Lable>
                </div>
            </div>
        );
    }
}


/** узлы: принимает карточки */
export default function NodeArea(props) {
    const [devices, setDevices] = useState(store.get("user").nodes)
    
    useEffect(()=> {
        store.watch("user", (data)=> setDevices(data.nodes))
    }, []);


    return(
        <div  className="device-wraper">
            {devices.map((device, index)=> (
                <Device key={index}  
                    view={}
                    name={}
                    mac={}
                    room={}
                    payload={}
                />
            ))}
        </div>
    );
}
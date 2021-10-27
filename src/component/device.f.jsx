import { apiInit } from "../api";
import React, { useEffect, useState } from 'react';
import { useDebounce, useWillUnmount } from "rooks";
import {Menu, MenuItem, MenuButton} from '@szhsin/react-menu';
import lamp from '../img/lamp.png';
import onOff from '../img/onOff.png';
import wtor from '../img/wtor.png';
import logic from '../img/logic.png';
import termostat from '../img/termostat.png';
import { BsCardText } from "react-icons/bs";

let init = false
const payloads = {}
export const ICON = {
    lamp: lamp,
    toogler: onOff,
    wtor: wtor,
    logic: logic,
    termostat: termostat
}



export const useSub =(topic, def)=> {
    if(!init){
        apiInit()
        init = true
    }
    let payload = store.get("user").payloads

    if(!payloads[topic]){
        payload[topic] = def
        payloads[topic] = def
        socket.emit("set", ["payloads", payload])
        if(window.api) window.api.subscribe(topic+"st")
        else {
            apiInit()
            window.api.subscribe(topic+"st")
        }
    }
}
export const usePub =(topic, val)=> {
    let strVal = String(val)
    window.api.publish(topic, strVal)
    console.log('[📡]:', topic, ':', strVal)
}


/** 
 * topic:   
 * data:    
 * brihtness:
 */
export function ProgressBar(props) { 
    const [onoff, setOnoff] = useState(store.get("user").payloads[props.topic]??'0')
    const [data, setData] = useState(store.get("user").payloads[props.data]??'0')
    const [brihtness, setBrihtness] = useState(store.get("user").payloads[props.brihtness]??50)

    useEffect(()=> {
        useSub(props.topic, '0')
        useSub(props.data, '0')
        useSub(props.brihtness, '50')
        store.watch("user", (data)=> {
            setOnoff(data.payloads[props.topic])
            setData(data.payloads[props.data])
            setBrihtness(data.payloads[props.brihtness])
        })
    }, [])

    return(
        <div onClick={()=> usePub(onoff==='1'?0:1)} className="top-device">  
            <svg className="progress" data-progress={brihtness} version="1.1" xmlns="http://www.w3.org/2000/svg" 
                x={props.x ? props.x : "0px"} 
                y={props.y ? props.y : "0px"} 
                viewBox="0 0 80 80"
            >
                <path className="track" 
                    transform="translate(-10 8) rotate(45 50 50)" 
                    d="M40,72C22.4,72,8,57.6,8,40C8,22.4,22.4,8,40,8c17.6,0,32,14.4,32,32">
                </path>
                <text className="temp" x="37%" y="37%"> 
                    {data+"°C"} 
                </text>
                <text className="display" x="50%" y="60%"> 
                    {onoff==='0'?brihtness+"%":"off"} 
                </text>
                <path style={{stroke:onoff==='0'?'rgb(255, 255, 255)':'rgb(227, 41, 97)'}} 
                    className="fill"
                    transform="translate(-10 8) rotate(45 50 50)" 
                    d="M40,72C22.4,72,8,57.6,8,40C8,22.4,22.4,8,40,8c17.6,0,32,14.4,32,32">
                </path>
                <script>{`
                    let max = 150.72259521484375;
                    setInterval(()=> $.each($('.progress'), (index, value)=> {
                        let percent = $('.progress').attr("data-progress");
                        $(value).children($('.fill')).attr('style', 'stroke-dashoffset: ' + ((100 - percent) / 100) * max);
                    }), 2000)
                `}</script>
            </svg>
        </div>
    );
}


/** 
 * topic:   
 * brihtness:
 */
export const OnOffDeamer =(props)=> {
    const [onoff, setOnoff] = useState(store.get("user").payloads[props.topic]??'0')
    const [brihtness, setBrihtness] = useState(50)

    useEffect(()=> {
        useSub(props.topic, '0')
        useSub(props.brihtness, '50')
        setBrihtness(store.get("user").payloads[props.brihtness])

        store.watch("user", (data)=> {
            setOnoff(data.payloads[props.topic])
            setBrihtness(data.payloads[props.brihtness])
        })
    }, [])


    return(
        <>
            {onoff==='0'
                ? <h3 style={{color:onoff==='1'?"#42f059":"red",left:"40%"}}>
                    { onoff==='1' ? brihtness+"%" : (onoff==='0'?"off":onoff) }
                </h3>
                : "null"
            }
        </>
    );
}
/** topic */
export const OnOff =(props)=> {
    const [onoff, setOnoff] = useState(store.get("user").payloads[props.topic]??'0')
    let onData =()=> {
        useSub(props.topic, '0')
        store.watch("user", (data)=> {
            setOnoff(data.payloads[props.topic])
        })
    }


    useEffect(()=> {
        onData()
    }, [])
    useWillUnmount(()=> onData = undefined)

    
    return(
        <div 
            style={{position:"relative",left:"65%"}}
            onClick={()=> usePub(props.topic, onoff==='1'?0:1)}
        >
            <img style={{position:"absolute",height:"18vh",cursor:"pointer",opacity:onoff==='1'?"1":"0.4"}} src={ICON.lamp}/>
            <h3 style={{position:"absolute",color:onoff==='1'?"#42f059":"red"}}>
                { onoff==='1'?"on":"off" }
            </h3>
        </div>
    );
}
export const Lable =(props)=> {
    const style = {left:"50%",height:"15%"}
    //enable={props.onOff} brihtness={props.brihtness} data={props.data}

    return(
        <>
            {props.type === "FSC"
                ? <ProgressBar children={props.children}/>
                : <div style={style}>{ props.children }</div>
            }
        </>
    );
}



/** 
 * topic:   
 * brihtness:
 */
export const Centr =(props)=> {
    const [onoff, setOnoff] = useState(store.get("user").payloads[props.topic]??'0')
    const [brihtness, setBrihtness] = useState(store.get("user").payloads[props.brihtness]??50)
    const setDebounce = useDebounce((v)=> usePub(props.brihtness, v), 1500)

    useEffect(()=> {
        useSub(props.topic, '0')
        useSub(props.brihtness, 50)
        store.watch("user", (data)=> {
            setOnoff(data.payloads[props.topic])
            setBrihtness(data.payloads[props.brihtness])
        })
    }, [])


    return(
        <input style={{marginTop:"5%"}} 
            disabled={onoff==="0"?false:true}
            type="range" 
            onChange={(ev)=> {setDebounce(ev.target.value); setBr(ev.target.value);setBrihtness(ev.target.value)}} 
            value={+brihtness}
        />                       
    );
}
export const Title =(props)=> {
    const nameStyle = {fontSize:"19px",width:"50%",color:"#00000099",textAlign:"centr",cursor:"pointer"}
    const iconStyle = {paddingTop:"2px",marginRight:"3px",textAlign:"centr"}

    return(
        <div className="line" style={{borderBottom:"1px solid rgba(0,0,0,0.2)"}}>
            <div style={nameStyle}>
                <BsCardText style={iconStyle}/>
                { props.name }
            </div>
        </div>
    );
}
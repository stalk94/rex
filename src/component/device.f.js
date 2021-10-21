import React, { useEffect, useState } from 'react';
import { useDebounce } from "rooks";
import {Menu, MenuItem, MenuButton} from '@szhsin/react-menu';
import lamp from '../img/lamp.png';
import onOff from '../img/onOff.png';
import wtor from '../img/wtor.png';
import logic from '../img/logic.png';
import termostat from '../img/termostat.png';
import { MdOutlineMeetingRoom } from "react-icons/md";
import { BsCardText } from "react-icons/bs";

const payloads = {}
export const ICON = {
    lamp: lamp,
    toogler: onOff,
    wtor: wtor,
    logic: logic,
    termostat: termostat
}

export const useSub =(topic, def)=> {
    let payload = store.get("payload")
    if(!payloads[topic]){
        payload[topic] = def
        payloads[topic] = def
        store.set("payload", payload)
        window.api.subscribe(topic+"st")
    }
}
export const usePub =(topic, val)=> {
    let strVal = String(val)
    window.api.publish(topic, strVal)
    console.log('[📡]:', topic, ':', strVal)
}


/** topic,data,brihtness */
export function ProgressBar(props) { 
    const [onoff, setOnoff] = useState(store.get("payload")[props.topic]??'0')
    const [data, setData] = useState(store.get("payload")[props.data]??'0')
    const [brihtness, setBrihtness] = useState(store.get("payload")[props.brihtness]??50)

    useEffect(()=> {
        useSub(props.topic, '0')
        useSub(props.data, '0')
        useSub(props.brihtness, '50')
        store.watch("payload", (data)=> {
            setOnoff(data[props.topic])
            setData(data[props.data])
            setBrihtness(data[props.brihtness])
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
export function Timer(props) {
    const style= {
        border:"1px solid #3e97ea",
        width:"20%",
        height:"3%",
        textAlign:"center",
        background:"#73c5de85"
    }
    const [time, setTime] = useState("00:00")
    
    useEffect(()=> {
        useSub(props.topic, '00:00')
        store.watch("payload", (data)=> {
            setTime(data[props.topic])
        })
    }, [])

    return(
        <Menu 
            menuButton={<div style={style}><p>{time}</p></div>} 
            transition
        >
            {props.timers.map((timer, i)=> (
                <MenuItem onClick={()=> usePub(props.topic, timer)} key={i}>
                    <var>{timer}</var>
                </MenuItem>
            ))}
            <MenuItem>x</MenuItem>
        </Menu>
    )
}


/** topic,brihtness */
export const OnOffDeamer =(props)=> {
    const [onoff, setOnoff] = useState(store.get("payload")[props.topic]??'0')
    const [brihtness, setBrihtness] = useState(store.get("payload")[props.brihtness]??50)

    useEffect(()=> {
        useSub(props.topic, '0')
        useSub(props.brihtness, '50')
        store.watch("payload", (data)=> {
            setOnoff(data[props.topic])
            setBrihtness(data[props.brihtness])
        })
    }, [])

    return(
        <>
            {onoff === '0'
                ?   <h3 style={{color:onoff==='1'?"#42f059":"red",left:"40%"}}>
                        { onoff==='1' ? brihtness+"%" : (onoff==='0'?"off":onoff) }
                    </h3>
                :   "null"
            }
        </>
    );
}
/** topic */
export const OnOff =(props)=> {
    const [onoff, setOnoff] = useState(store.get("payload")[props.topic]??'0')

    useEffect(()=> {
        useSub(props.topic, '0')
        store.watch("payload", (data)=> {
            setOnoff(data[props.topic])
        })
    }, [])

    return(
        <div 
            style={{position:"relative",left:"65%"}}
            onClick={()=> usePub(onoff==='1'?0:1)}
        >
            <img style={{position:"absolute",height:"18vh"}} src={ICON.logic}/>
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



/** topic,brihtness */
export const Centr =(props)=> {
    const [onoff, setOnoff] = useState(store.get("payload")[props.topic]??'0')
    const [brihtness, setBrihtness] = useState(store.get("payload")[props.brihtness]??50)
    const setDebounce = useDebounce((v)=> usePub(props.brihtness, v), 1500)

    useEffect(()=> {
        useSub(props.topic, '0')
        useSub(props.brihtness, 50)
        store.watch("payload", (data)=> {
            setOnoff(data[props.topic])
            setBrihtness(data[props.brihtness])
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
    const roomStyle = {fontSize:"19px",color:"#00000099",textAlign:"centr",cursor:"pointer"}
    const iconStyle = {paddingTop:"2px",marginRight:"3px",textAlign:"centr"}

    return(
        <div className="line" style={{borderBottom:"1px solid rgba(0,0,0,0.2)"}}>
            <Menu menuButton={<div style={nameStyle}><BsCardText style={iconStyle}/>{props.name}</div>} transition>
                <input type="text"/>
                <MenuItem>изменить</MenuItem>
            </Menu>
            <Menu menuButton={<var style={roomStyle}><MdOutlineMeetingRoom style={iconStyle}/>{props.room}</var>} transition>
                <input type="text"/>
                <MenuItem>изменить</MenuItem>
            </Menu>
        </div>
    );
}
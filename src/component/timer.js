import { useDidMount } from "rooks";
import {Menu, MenuItem, MenuButton} from '@szhsin/react-menu';
import React, {useState, useEffect} from "react";
import { usePub, useSub } from "./device.f";
import { MdTimer } from "react-icons/md";
import { Select } from "./input";
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';


//////////////////////////////////////////////////////////
const hours = []
const mins = [5,10,15,20,25,30,35,40,45,50,55,60]
const cells = []
for(let i=0; i<=24; i++){
    hours.push(`${i}`)
}
for(let i=15; i<=35; i++){
    cells.push(`${i}`)
}
///////////////////////////////////////////////////////////
const useChek =(topic)=> {
    return store.get("user").payloads[topic]
}



/** 
 * topicHour    
 * topicMin     
 * topicCell    
 * topicEnable  
 */
export function Timer(props) {
    const style= {
        border:"1px solid #3e97ea",
        textAlign:"center",
        fontSize: "28px",
        paddingRight:"15px",
        paddingLeft:"15px",
        marginLeft:"15px",
        marginRight:"15px",
        background:"#73c5de85",
        cursor:"pointer",
    }
    const styleSelect = {
        margin:"1px",
        background: "#fe771026",
        border:"1px solid orange",
        color:"#c44708",
        paddingLeft:"15px",
        marginLeft:"15px"
    }

    const [hour, setHour] = useState(useChek(props.topicHour)??"00")
    const [min, setMin] = useState(useChek(props.topicMin)??"00")
    const [enable, setEnable] = useState(useChek(props.topicEnable)??'0')
    
    useDidMount(()=> {
        useSub(props.topicHour, hour, setHour)
        useSub(props.topicMin, min, setMin)
        useSub(props.topicEnable, enable, setEnable)
    }, [])


    return(
        <div style={{textAlign:"center",fontSize:"28px",display:"flex",flexDirection:"row",marginBottom:"2%"}}>
            <Menu menuButton={<div style={style}>{ hour }</div>} transition>
                {hours.map((h, i)=> <MenuItem key={i} onClick={()=> usePub(props.topicHour, h)}>
                    { h.length===1 ? "0"+h : h }
                </MenuItem>
                )}
            </Menu>
            : 
            <Menu menuButton={<div style={style}>{ min }</div>} transition>
                {mins.map((m, i)=> <MenuItem key={i} onClick={()=> usePub(props.topicMin, m)}>
                    { m.length===1 ? "0"+m : m }
                </MenuItem>
                )}
            </Menu>
            { props.children }
            <input type="checkbox"
                onChange={()=> usePub(props.topicEnable, enable==='0'?1:0)} 
                checked={enable==='0'?false:true} 
                style={{height:"23px",width:"15%",marginTop:"5px"}} 
            />
        </div>
    );
}



/** ! Починить селектор
 * `mac`: 111,
 * `module`: "R0"
 * `timers`: [] 
 */
export default function TimerManager(props) {
    const style = {border:"1px solid black",display:"flex",flexDirection:"column"}
    const [value, setValue] = useState(useChek(props.topicCell)??"off")

    const useTimerData =()=> {
        if(props.module[0]==="R") return ["on", "off"]
        else if(props.module[0]==="D") return ["on", "off", 5, 10, 15, 25, 50, 75, 100]
        else if(props.module[0]==="T") return ["on", "off", ...cells]
    }
    const useValue =(topicCell, val)=> {
        usePub(topicCell, val)
    }
    useEffect(()=> {
        useSub(props.topicCell, value, setValue)
    }, [])
    
    return(
        <div style={style}>
            {props.timers.map((i)=> (
                <Timer 
                    key={i} 
                    id={"timer_"+i}
                    topicHour={props.mac+"/"+props.module+`/Set${i}h`} 
                    topicMin={props.mac+"/"+props.module+`/Set${i}m`} 
                    topicCell={props.mac+"/"+props.module+`/Set${i}`} 
                    topicEnable={props.mac+"/"+props.module+`/Set${i}onoff`} 
                    children={
                        <Select style={{height:"32px",width:"60px",margin:"1px"}} 
                            onValue={(e)=> useValue(props.mac+"/"+props.module+`/Set${i}`, e)} 
                            data={useTimerData()} 
                            value={value}
                        />
                    }
                />
            ))}
        </div>
    );
}
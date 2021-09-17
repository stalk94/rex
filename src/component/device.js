import React, {useState, useEffect} from 'react';
import {DragDropContainer, DropTarget} from "react-drag-drop-container";
require("../stor");
import useJedis from 'jedisdb'


///////////////////////////////////////////////////////////
export const Loader =()=> <div className="ring"></div>
export function ProgressBar(props) {
    return(
        <div onClick={props.toggle} className="top-device">  
            <svg className="progress" data-progress={props.value} version="1.1" xmlns="http://www.w3.org/2000/svg" 
                x={props.x ? props.x : "0px"} 
                y={props.y ? props.y : "0px"} 
                viewBox="0 0 80 80"
            >
                <path className="track" 
                    transform="translate(-10 8) rotate(45 50 50)" 
                    d="M40,72C22.4,72,8,57.6,8,40C8,22.4,22.4,8,40,8c17.6,0,32,14.4,32,32">
                </path>
                <text className="temp" x="37%" y="37%"> 
                    {props.temperature+"°C"} 
                </text>
                <text className="display" x="50%" y="60%"> 
                    {props.enable==="false"?(props.value+"%"):"off"} 
                </text>
                <path style={{stroke:props.enable==="true"?'rgb(255, 255, 255)':'rgb(227, 41, 97)'}} className="fill"
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
///////////////////////////////////////////////////////////


export default function Device(props) {
    const init = useJedis('init')
    const [disabled, setEnable] = useState('true')
    const [value, setValue] = useState(50)
    const [temperature, setTemp] = useState(21)

    
    const pub =(key, val)=> {
        Object.keys(props.sheme).forEach((name)=> props.sheme[name].forEach((str)=> {
            let tokens = str.split("/")
            console.log(`[PUB📡]:${props.mac+str}`, `key:${key}`, `val:${val}`)
            if(tokens[tokens.length-1]===key) props.api.publish(props.mac+str, val)
        }));
    }
    const sub =()=> {
        Object.keys(props.sheme).forEach((key)=> {
            props.sheme[key].forEach((str)=> {
                let tokens = str.split("/")
                
                props.api.subscribe(props.mac+str+"st")

                props.api.on('massage', (topic, payload, packet)=> {
                    console.log("[SUB🔌]:", topic, payload, packet)
                    let input = tokens[tokens.length-1]

                    if(topic===props.mac+str+"st"){
                        if(input==="onoff") setEnable(+payload===1?"false":"true")
                        if(input==="brihtness") setValue(+payload)
                        if(input==="temperature") setTemp(+payload)
                    }
                })
            })
        })
        init.state[props.mac] = true
    }

    // слушаем
    if(!init.state[props.mac]) sub()

    const input = disabled==="true"
        ? <input disabled style={{marginTop:"25%"}} type="range" onInput={(ev)=> pub('brihtness', ev.target.value)} value={value}/>
        : <input style={{marginTop:"25%"}} type="range" onInput={(ev)=> pub('brihtness', ev.target.value)} value={value}/>
    const display = {
        PMR: input
    }
    const labelImage = props.type!=="termostat" 
        ? <div onClick={()=> {pub("onoff", disabled==='true'?1:0)}} style={{cursor:"pointer"}}>
            <h3 style={{position:"absolute",color:disabled==='false'?"#42f059":"red",left:"40%",top:"30%"}}>
                {disabled==='false'?(value+"%"):"off"}
            </h3>
            <img style={{width:"100%", opacity:disabled==='false'?"1":"0.4"}} 
                src={props.image}
                enable={disabled}
            />
        </div>
        : <ProgressBar 
            toggle={()=> {pub("onoff", disabled==='true'?1:0)}} 
            enable={disabled} 
            value={value} 
            temperature={temperature}
        />
    


    return(
        <div className="container">
            <div className="device-title">
                <Loader/> 
            </div>
            <div className="device-body">
                <div className="line" style={{borderBottom:"1px solid rgba(0,0,0,.2)"}}>
                    <h2 style={{marginBottom:"5px", marginTop:"3px", color:"white", textAlign:"left", fontSize:"18px"}}>
                        { props.title }
                    </h2>
                    <h3 style={{marginBottom:"1px", marginLeft:"35%", marginTop:"5px", color:"gray", textAlign:"right", fontSize:"14px"}}>
                        { props.room }
                    </h3>
                </div>
                { display[props.type] }
            </div>
            <div className="device-icon">
                { labelImage }
            </div>
        </div>
    );
}
import React, {useState, useEffect} from 'react';
import { useFreshRef, useLifecycleLogger } from "rooks";
import { FcSettings, FcHome, FcClock } from 'react-icons/fc';


///////////////////////////////////////////////////////////
export function ProgressBar(props) {
    console.log(props)
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
                    {props.enable==='0'?(props.value+"%"):"off"} 
                </text>
                <path style={{stroke:props.enable==='0'?'rgb(255, 255, 255)':'rgb(227, 41, 97)'}} className="fill"
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
const SetingsPanel =(props)=> {
    return(
        <>
            <FcHome onClick={()=> props.onSelect(0)} id="set-index" style={{backgroundColor: props.selected===0?"":"#2323235d"}}/>
            <FcClock onClick={()=> props.onSelect(1)} id="set-timer" style={{backgroundColor: props.selected===1?"":"#2323235d"}}/>
            <FcSettings onClick={()=> props.onSelect(2)} id="set-setings" style={{backgroundColor: props.selected===2?"":"#2323235d"}}/>
        </>
    )
}


export default function Device(props) {
    const [selected, setSelected] = useState(0)
    const [load, setLoad] = useState()
    const [payload, setStates] = useState(props.payload)
    
    const pub =(mac, sheme, key, val)=> {
        Object.keys(sheme).map((name)=> {
            sheme[name].map((str)=> {
                const tokens = str.split("/")
    
                if(tokens[tokens.length-1]===key){
                    let vals = String(val)
                    console.log(`[📡]:`, mac+str, "value:", vals)
                    window.api.publish(mac+str, vals)
                    setLoad(<div className="ring"></div>)

                    setTimeout(()=> {
                        setStates(store.get("user").devices[props.id].payload)
                        setLoad()
                    }, 1000)
                }
            })
        });
    }
    const view =(selected)=> {
        switch(selected) {
            case 0: return(
                <>
                <div className="device-body">
                    <div className="line" style={{borderBottom:"1px solid rgba(0,0,0,.2)"}}>
                        <h2 style={{marginBottom:"5px", marginTop:"3px", color:"white", textAlign:"left", fontSize:"18px"}}>
                            { props.title }
                        </h2>
                        <h3 style={{marginBottom:"1px", marginLeft:"35%", marginTop:"5px", color:"gray", textAlign:"right", fontSize:"14px"}}>
                            { props.room }
                        </h3>
                    </div>
                        {props.payload.onoff==='0'
                            ? <input style={{marginTop:"25%"}} 
                                disabled
                                type="range" 
                                onInput={(ev)=> pub(props.mac, props.sheme, 'brihtness', ev.target.value)} 
                                value={props.payload.brihtness}
                            />
                            : <input style={{marginTop:"25%"}} 
                                type="range" 
                                onInput={(ev)=> pub(props.mac, props.sheme, 'brihtness', ev.target.value)} 
                                value={props.payload.brihtness}
                            /> 
                        }
                    </div>
                <div className="device-icon">
                    {props.type!=="termostat" 
                        ? <div style={{cursor:"pointer"}}
                            onClick={()=> pub(props.mac, props.sheme, "onoff", payload.onoff==='0'?1:0)} 
                        >
                            <h3 style={{position:"absolute", color:(payload.onoff==='1'?"#42f059":"red"), left:"40%",top:"30%"}}>
                                { load ? load : (payload.onoff==='1'?payload.brihtness+"%":"off") }
                            </h3>
                            <img  style={{width:"100%", opacity:payload.onoff==='1'?"1":"0.4"}} 
                                src={props.image} 
                            />
                        </div>
                        : <ProgressBar 
                                toggle={()=> pub(props.mac, props.sheme, "onoff", props.payload.onoff==='0'?1:0)} 
                                enable={props.payload.onoff} 
                                value={props.payload.brihtness} 
                                temperature={props.payload.temperature}
                        /> 
                        }
                </div>
                </>
            );
                break;
            case 1: return(1)
                break;
            case 2: return(
                <div className="table">
                    <h4>toggle</h4> <h4>toggleST</h4> <h4>diming</h4>
                    <input type="text"/> <input type="text"/> <input type="text"/>
                    <input type="text"/> <input type="text"/> <input type="text"/>
                    <input type="text"/> <input type="text"/> <input type="text"/>
                </div>
            )
                break;
        }
    }


    useEffect(()=> {
        store.watch("user", (newData)=> {
            setLoad(<div className="ring"></div>)
            setStates(newData.devices[props.id].payload)
            setTimeout(()=> setLoad(), 400)
        })
    }, [payload, load])


    return(
        <div className="container">
            <div className="device-title">
                <SetingsPanel selected={selected} onSelect={setSelected} />
            </div>
                { view(selected) }
        </div>
    );
}
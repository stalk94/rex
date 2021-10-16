import React from 'react';
import { useDebounce } from "rooks";
import lamp from '../img/lamp.png';
import onOff from '../img/onOff.png';
import wtor from '../img/wtor.png';
import logic from '../img/logic.png';
import termostat from '../img/termostat.png';


export const ICON = {
    lamp: lamp,
    toogler: onOff,
    wtor: wtor,
    logic: logic,
    termostat: termostat
}


export function ProgressBar(props) {
    const termostat = <ProgressBar 
        toggle={()=> pub(mac, sheme, "onoff", payload.onoff==='0'?1:0)} 
        enable={payload.onoff} 
        brihtness={payload.brihtness} 
        data={payload.data}
    /> 

    return(
        <div onClick={props.toggle} className="top-device">  
            <svg className="progress" data-progress={props.brihtness} version="1.1" xmlns="http://www.w3.org/2000/svg" 
                x={props.x ? props.x : "0px"} 
                y={props.y ? props.y : "0px"} 
                viewBox="0 0 80 80"
            >
                <path className="track" 
                    transform="translate(-10 8) rotate(45 50 50)" 
                    d="M40,72C22.4,72,8,57.6,8,40C8,22.4,22.4,8,40,8c17.6,0,32,14.4,32,32">
                </path>
                <text className="temp" x="37%" y="37%"> 
                    {props.data+"°C"} 
                </text>
                <text className="display" x="50%" y="60%"> 
                    {props.enable==='0'?(props.brihtness+"%"):"off"} 
                </text>
                <path style={{stroke:props.enable==='0'?'rgb(255, 255, 255)':'rgb(227, 41, 97)'}} 
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

export const OnOff =(props)=> {
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
}
export const Lable =(props)=> {
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

export const Centr =(props)=> {
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
export const Title =(props)=> (
    <div className="device-title">
        <div className="line" style={{borderBottom:"1px solid rgba(0,0,0,.2)"}}>
            <div>{ props.name }</div>
            <var>{ props.room }</var>
        </div>
    </div>
);
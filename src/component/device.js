import React, {useState, useEffect} from 'react';
import { Button } from './buttons';
import Moveable from "react-moveable";


///////////////////////////////////////////////////////////
export const Cell =(props)=> {
    const [value, setValue] = useState(props.value)

    return(
        <div className="skills">
            <div className="skills_label">

            </div>
            <div className="bar">
                <h2>{value}</h2>
            </div>
        </div>
    );
}
export const Move =(elem)=> {
    return (
        <Moveable
                target={elem.target}
                container={null}
                origin={true}
                edge={false}
                /* draggable */
                draggable={true}
                throttleDrag={0}
                onDragStart={({ target, clientX, clientY }) => {
                    console.log("onDragStart", target);
                }}
                onDrag={({
                    target,
                    beforeDelta, beforeDist,
                    left, top,
                    right, bottom,
                    delta, dist,
                    transform,
                    clientX, clientY,
                })=> {
                    console.log("onDrag left, top", left, top);
                   
                    console.log("onDrag translate", dist);
                    if(target) target.style.transform = transform;
                }}
                onDragEnd={({ target, isDrag, clientX, clientY })=> {
                    console.log("onDragEnd", target, isDrag);
                }}

                /* When resize or scale, keeps a ratio of the width, height. */
                keepRatio={true}
                resizable={true}
                throttleResize={0}
                onResizeStart={({ target , clientX, clientY})=> {
                    console.log("onResizeStart", target);
                }}
                onResize={({
                    target, width, height,
                    dist, delta, direction,
                    clientX, clientY,
                })=> {
                    console.log("onResize", target);
                    delta[0] && (target.style.width = `${width}px`);
                    delta[1] && (target.style.height = `${height}px`);
                }}
                onResizeEnd={({ target, isDrag, clientX, clientY }) => {
                    console.log("onResizeEnd", target, isDrag);
                }}
                scalable={true}
                throttleScale={0}
                onScaleStart={({ target, clientX, clientY }) => {
                    console.log("onScaleStart", target);
                }}
                onScale={({
                    target, scale, dist, delta, transform,
                    clientX, clientY,
                })=> {
                    console.log("onScale scale", scale);
                    if(target) target.style.transform = transform;
                }}
                onScaleEnd={({ target, isDrag, clientX, clientY }) => {
                    console.log("onScaleEnd", target, isDrag);
                }}

                /* rotatable */
                rotatable={true}
                throttleRotate={0}
                onRotateStart={({ target, clientX, clientY }) => {
                    console.log("onRotateStart", target);
                }}
                onRotate={({
                    target,
                    delta, dist,
                    transform,
                    clientX, clientY,
                })=> {
                    console.log("onRotate", dist);
                    if(target) target.style.transform = transform;
                }}
                onRotateEnd={({ target, isDrag, clientX, clientY }) => {
                    console.log("onRotateEnd", target, isDrag);
                }}

                /* warpable */
                /* Only one of resizable, scalable, warpable can be used. */
                /*
                this.matrix = [
                    1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, 0,
                    0, 0, 0, 1,
                ]
                */
                warpable={true}
                onWarpStart={({ target, clientX, clientY })=> {
                    console.log("onWarpStart", target);
                }}
                onWarp={({
                    target,
                    clientX,
                    clientY,
                    delta,
                    dist,
                    multiply,
                    transform,
                })=> {
                    console.log("onWarp", target);
                    // target.style.transform = transform;
                    this.matrix = multiply(this.matrix, delta);
                    target.style.transform = `matrix3d(${this.matrix.join(",")})`;
                }}
                onWarpEnd={({ target, isDrag, clientX, clientY })=> {
                    console.log("onWarpEnd", target, isDrag);
                }}
                pinchable={true}
                onPinchStart={({ target, clientX, clientY, datas })=> {
                    console.log("onPinchStart");
                }}
                onPinch={({ target, clientX, clientY, datas })=> {
                    // pinch event occur before drag, rotate, scale, resize
                    console.log("onPinch");
                }}
                onPinchEnd={({ isDrag, target, clientX, clientY, datas })=> {
                    // pinchEnd event occur before dragEnd, rotateEnd, scaleEnd, resizeEnd
                    console.log("onPinchEnd");
                }}
        />
    );
}
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
export const Loader =()=> <div className="ring"></div>
//////////////////////////////////////////////////////////////


export default function Device(props) {
    const [init, setInit] = useState(false)
    const [disabled, setEnable] = useState('true')
    const [value, setValue] = useState(50)
    const [temperature, setTemp] = useState(21)
    const pub =(key, val)=> {
        props.sheme[key].forEach((str)=> {
            let tokens = str.split("/")
            if(tokens[tokens.length-1]===key) props.api.publish(props.mac+str, val)
        });
    }
    const sub =()=> {
        Object.keys(props.sheme).forEach((key)=> {
            props.sheme[key].forEach((str)=> {
                let tokens = str.split("/")
                
                props.api.subscribe(props.mac+str+"st")
                props.api.on('massage', (topic, payload, packet)=> {
                    let input = tokens[tokens.length-1]

                    if(topic===props.mac+str+"st"){
                        if(input==="onoff") setEnable(+payload===1?"false":"true")
                        if(input==="brihtness") setValue(+payload)
                        if(input==="temperature") setTemp(+payload)
                    }
                })
            })
        })
        setInit(true)
    }

    
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
    
    // слушаем
    if(!init) sub()


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
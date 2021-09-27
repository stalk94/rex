import React, {useState, useEffect} from 'react';
import {DragDropContainer, DropTarget} from "react-drag-drop-container";


///////////////////////////////////////////////////////////
export function ProgressBar(props) {
    return(
        <div onClick={()=> props.toggle()} className="top-device">  
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
const Brihtness =(props)=> (
    props.disabled==="true"
        ? <input disabled style={{marginTop:"25%"}} type="range" onInput={(ev)=> props.pub('brihtness', ev.target.value)} />
        : <input style={{marginTop:"25%"}} type="range" onInput={(ev)=> props.pub('brihtness', ev.target.value)} />
);
const Enabler =(props)=> (
    <div onClick={()=> {props.pub("onoff", props.disabled==='true'?1:0)}} style={{cursor:"pointer"}}>
        <h3 style={{position:"absolute",color:(props.disabled==='false'?"#42f059":"red"),left:"40%",top:"30%"}}>
            {props.disabled==='false'?(props.value+"%"):"off"}
        </h3>
        <img 
            style={{width:"100%", opacity:props.disabled==='false'?"1":"0.4"}} 
            src={props.image}
        />
    </div>
);
////////////////////////////////////////////////////////////



export default class Device extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            disable: "",
            brihtness: "",
            temp: ""
        }
        if(props.type==="termostat") this.termostat = 
            <ProgressBar 
                toggle={()=> {props.pub("onoff", props.disabled==='true'?1:0)}} 
                enable={props.disabled} 
                value={props.value} 
                temperature={props.temperature}
            />
        this.pub = this.pub.bind(this)
    }
    pub(key, val) {
        Object.keys(this.props.sheme).map((name)=> 
            this.props.sheme[name].map((str)=> {
                let tokens = str.split("/")
                if(tokens[tokens.length-1]===key) window.api.publish(this.props.mac+str, String(val))
            })
        );
    }
    componentDidMount() {
        let scheme = this.props.sheme
        let mac = this.props.mac

        Object.keys(scheme).map((key)=> {
            scheme[key].map((str)=> {
                let tokens = str.split("/")
                window.api.subscribe(mac+str+"st")
                 
                if(tokens[2]==="onoff") window.on(mac+str+"st", (data)=> this.setState({disable:data===1?"true":"false"}))
                else if(tokens[2]==='brihtness') window.on(mac+str+"st", (data)=> this.setState({brihtness:+data.detail.value}))
                else if(tokens[2]==="temp") window.on(mac+str+"st", (data)=> this.setState({temp:+data.detail.value}))
            })
        })
    }
    render() {
        return(
            <div className="container">
                <div className="device-title">
                    <div className="ring"></div> 
                </div>

                <div className="device-body">
                    <div className="line" style={{borderBottom:"1px solid rgba(0,0,0,.2)"}}>
                        <h2 style={{marginBottom:"5px", marginTop:"3px", color:"white", textAlign:"left", fontSize:"18px"}}>
                            { this.props.title }
                        </h2>
                        <h3 style={{marginBottom:"1px", marginLeft:"35%", marginTop:"5px", color:"gray", textAlign:"right", fontSize:"14px"}}>
                            { this.props.room }
                        </h3>
                    </div>
                    <Brihtness/>
                </div>

                <div className="device-icon">
                    { this.termostat }
                    <Enabler/>
                </div>
            </div>
        );
    }
}
import React, { useState } from "react";
import { Menu, MenuItem, MenuGroup } from '@szhsin/react-menu';
import { Select } from "./input";



//////////////////////////////////////////////////////////
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
    overwlowY:"auto"
}
const hours = []
const mins = ['-',0,5,10,15,20,25,30,35,40,45,50,55]
const cells = ['-',0]
for(let i=0; i<=24; i++){
    hours.push(`${i}`)
}
for(let i=15; i<=35; i++){
    cells.push(`${i}`)
}
///////////////////////////////////////////////////////////
const useChek =(topic)=> store.get("user").payloads[topic];




/** 
 * topicHour: `string`     
 * topicMin: `string`    
 * topicCell: `string`  
 * topicEnable: `string`
 */
export class Timer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hour: useChek(props.topicHour+"st")??"-",
            min: useChek(props.topicMin+"st")??"-",
            enable: useChek(props.topicEnable+"st")??0,
            value: useChek(props.topicCell+"st")??"-"
        }
        this.setParam = this.setParam.bind(this)
        this.useTimerData = this.useTimerData.bind(this)
    }
    setParam(key, val) {
        this.setState((state, props)=> {
            state[key] = val
            return state
        })
    }
    useTimerData() {
        if(this.props.module[0]==="R") return ["-", "on", "off"]
        else if(this.props.module[0]==="D") return ["-", "on", "off", 0, 5, 10, 15, 25, 50, 75, 100]
        else if(this.props.module[0]==="L") return ["-", "on", "off", 0, 5, 10, 15, 25, 50, 75, 100]
        else if(this.props.module[0]==="T") return ["-", "on", "off", ...cells]
    }
    componentDidMount() {
        useSub(this.props.topicHour+"st", this.state.hour, (val)=> this.setParam('hour', val))
        useSub(this.props.topicMin+"st", this.state.min, (val)=> this.setParam('min', val))
        useSub(this.props.topicEnable+"st", this.state.enable, (val)=> this.setParam('enable', val))
        useSub(this.props.topicCell+"st", this.state.value, (val)=> this.setParam('value', val))
    }
    componentWillUnmount() {
        useUnmountSub(this.props.topicHour+"st")
        useUnmountSub(this.props.topicMin+"st")
        useUnmountSub(this.props.topicEnable+"st")
        useUnmountSub(this.props.topicCell+"st")
    }
    render() {
        return(
            <div style={{textAlign:"center",fontSize:"28px",display:"flex",flexDirection:"row",marginBottom:"2%"}}>
                <Menu menuButton={<div style={style}>{ this.state.hour }</div>} transition>
                    <MenuGroup style={{overflowY:"scroll"}}>
                        {hours.map((h, i)=> <MenuItem key={i} onClick={()=> usePub(this.props.topicHour, h)}>
                            { h.length===1 ? "0"+h : h }
                        </MenuItem>
                        )}
                    </MenuGroup>
                </Menu>
                : 
                <Menu overflow="auto" menuButton={<div style={style}>{ this.state.min }</div>} transition>
                    {mins.map((m, i)=> <MenuItem key={i} onClick={()=> usePub(this.props.topicMin, m)}>
                        { m.length===1 ? "0"+m : m }
                    </MenuItem>
                    )}
                </Menu>
                <Select 
                    style={{height:"32px",width:"60px",margin:"1px"}} 
                    onValue={(e)=> usePub(this.props.topicCell, e)} 
                    data={this.useTimerData()} 
                    value={this.state.value}
                />
                <input type="checkbox"
                    onChange={()=> usePub(this.props.topicEnable, +this.state.enable===0?1:0)} 
                    checked={+this.state.enable===0?false:true} 
                    style={{height:"23px",width:"15%",marginTop:"5px"}} 
                />
            </div>
        );
    }
}



export default function TimerManager(props) {
    const style = {border:"1px solid black",display:"flex",flexDirection:"column"}

    return(
        <div style={style}>
            {props.timers.map((i)=> (
                <Timer 
                    key={props.mac+"_"+i} 
                    id={"timer_"+i}
                    module={props.module}
                    topicHour={props.mac+"/"+props.module+`/Set${i}h`} 
                    topicMin={props.mac+"/"+props.module+`/Set${i}m`} 
                    topicCell={props.mac+"/"+props.module+`/Set${i}`} 
                    topicEnable={props.mac+"/"+props.module+`/Set${i}onoff`}
                />
            ))}
        </div>
    );
}
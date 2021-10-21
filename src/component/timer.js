import { useDebounce } from "rooks";
import {Menu, MenuItem, MenuButton} from '@szhsin/react-menu';
import React,{useState, useEffect} from "react"
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


export default function Timer(props) {
    const style= {
        border:"1px solid #3e97ea",
        width:"20%",
        height:"3%",
        textAlign:"center",
        background:"#73c5de85"
    }
    const styleSelect = {
        border:"2px dotted orange",
        color:"#c44708",
        padding:"7px"
    }
    
    const [hour, setHour] = useState("00")
    const [min, setMin] = useState("00")
    const [cell, setCell] = useState("")
    const [enable, setEnable] = useState(0)
    const setDeb = useDebounce(()=> {
        usePub(props.topicHour, hour)
        usePub(props.topicMin, min)
        usePub(props.topicCell, cell)
        usePub(props.topicEnable, enable)
    }, 1000)
    
    
    useEffect(()=> {
        //useSub(props.topic, '00:00')
    }, [])


    return(
        <div style={{textAlign:"center",fontSize:"24px",display:"flex",flexDirection:"row"}}>
            <Menu menuButton={
                    <div style={style}>
                        <span>{hour}</span>
                    </div>
                } 
                transition
            >
                {hours.map((h)=> <MenuItem onClick={()=> setHour(h)}>{h}</MenuItem>)}
            </Menu>
            <div>:</div>
            <Menu menuButton={
                    <div style={style}>
                        <span>{min}</span>
                    </div>
                } 
                transition
            >
                {mins.map((m)=> <MenuItem onClick={()=> setMin(m)}>{m}</MenuItem>)}
            </Menu>
            <select style={styleSelect} onChange={(e)=> {setCell(e.target.value);setDeb()}} value={cell}>
                <option value={0}>OFF</option>
                <option value={1}>ON</option>
                {cells.map((val)=> (
                    <option value={val}>{ val+"C" }</option>
                ))}
            </select>
        </div>
    );
}
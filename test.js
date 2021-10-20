import React, {useState, useEffect} from "react"
import ReactDOM from "react-dom";
import { useLocalstorage } from "rooks";
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';


const Timer =(props)=> {
    const style= {
        cursor:"pointer",
        borderRadius: "5px",
        border:"1px solid #3e97ea",
        width:"20%",
        height:"3%",
        textAlign:"center",
        background:"#73c5de85"
    }
    const [time, setTime] = useState("00:00")
    const timers = ["01:00", "02:00"]

    useEffect(()=> {

    })

    return(
        <Menu 
            menuButton={<div style={style}><p>{time}</p></div>} 
            transition
        >
            {timers.map((timer, i)=> (
                <MenuItem onClick={()=> usePub(props.topic, timer)} key={i}>
                    <var>{timer}</var>
                </MenuItem>
            ))}
            <MenuItem>x</MenuItem>
        </Menu>
    )
}


//ReactDOM.render(<Timer/>, document.querySelector("#root"))
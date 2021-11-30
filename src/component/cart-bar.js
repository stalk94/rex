import React, {useEffect, useState} from "react";
import { MdOutlineTimer } from "react-icons/md";
import { AiOutlineAreaChart } from "react-icons/ai";
import { Title } from "./device.f";
import TimerManager from "./timer";



const useUser =()=> store.get("user")
const Diagram =(props)=> {
    return(
        <div className="Diagram">
            { props.child }
        </div>
    );
}
function Footer(props) {
    return(
        <div className="footer-cart">
            <button style={{width:"50%"}} onClick={()=> props.useView(1)}>
                <MdOutlineTimer/>
            </button>
            <button style={{width:"50%"}} onClick={()=> props.useView(2)}>
                <AiOutlineAreaChart/>
            </button>
        </div>
    );
}




export default function Carts(props) {
    const [name, setName] = useState("")
    const [room, setRoom] = useState("Скрытая")
    const [view, setView] = useState(0)
    
    const update =()=> {
        let roomTopic = props.topic[0]+"/"+props.topic[1]+"/roomst"
        let roomCartId = useUser().payloads[roomTopic]
        let cartName = useUser().payloads[props.topic[0]+"/"+props.topic[1]+"/namest"]
        
        if(useUser().rooms[+roomCartId]) setRoom(useUser().rooms[+roomCartId].name)
        setName(cartName)
    }
    useEffect(()=> update(), [props.room, props.children])
    

    
    return(
        <div className="container" style={{display:(store.get("curent.room").name===room)?"block":"none"}}>
            <div>
                <Title name={name} onClick={()=> setView(0)} />
                {view===0 
                    ? props.children 
                    : (view===1
                        ? <TimerManager mac={props.topic[0]} module={props.topic[1]} timers={[1,2,3,4]} />
                        : <Diagram child={"в разработке"}/>
                    )
                }
            </div>
            <Footer useView={setView} view={view} />
        </div>
    );
}
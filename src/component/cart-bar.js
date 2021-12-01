import React, {useEffect, useState} from "react";
import { MdOutlineTimer } from "react-icons/md";
import { AiOutlineAreaChart } from "react-icons/ai";
import { Title } from "./device.f";
import TimerManager from "./timer";



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
    const [child, setChild]= useState(props.children)
    
    useEffect(()=> {
        let user = store.get("user")
        let roomTopic = props.topic[0]+"/"+props.topic[1]+"/roomst"

        let roomCartId = user.payloads[roomTopic]
        let cartName = user.payloads[props.topic[0]+"/"+props.topic[1]+"/namest"]
        
        if(user.rooms[+roomCartId]) setRoom(user.rooms[+roomCartId].name)
        setName(cartName)
        setChild(props.children)
    }, [props.room, props.children])
    

    
    return(
        <div className="container" style={{display:props.room.name===room?"block":"none"}}>
            <Title name={name} onClick={()=> setView(0)} />
                {view===0 
                    ? child
                    : (view===1
                        ? <TimerManager mac={props.topic[0]} module={props.topic[1]} timers={[1,2,3,4]} />
                        : <Diagram child={"в разработке"}/>
                    )
                }
            <Footer useView={setView} view={view} />
        </div>
    );
}
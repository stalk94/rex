import React, {useEffect, useState} from "react";
import { MdOutlineTimer } from "react-icons/md";
import { AiOutlineAreaChart } from "react-icons/ai";


export const useUser =()=> store.get("user")


function Footer(props) {
    return(
        <div style={{borderTop:"1px solid #00000080",paddingTop:"1px"}}>
            {props.elems.map((e, i)=> {
                if(e.type.name==="TimerManager") return(
                    <button style={{width:(100/elems.length)+"%"}} onClick={()=> props.useView(1)} key={i}>
                        <MdOutlineTimer/>
                    </button>
                )
            })}
            <button style={{width:(100/elems.length)+"%"}} onClick={()=> props.useView(2)}>
                <AiOutlineAreaChart/>
            </button>
        </div>
    );
}




export default function Carts(props) {
    const elems = React.Children.toArray(props.children.props.children)
    const [name, setName] = useState("")
    const [room, setRoom] = useState({name:1})
    const [view, setView] = useState(0)
    
    const update =(newRoom)=> {
        let roomTopic = props.topic.split("/")[0]+"/"+props.topic.split("/")[1]+"/room"
        let roomCartId = useUser().payloads[roomTopic]
        let cartName = useUser().payloads[props.topic.split("/")[0]+"/"+props.topic.split("/")[1]+"/name"] 

        setRoom(useUser().rooms[roomCartId])
        setName(cartName)
    }
    useEffect(()=> {
        update(props.room)
    }, [props.room])

    
    return(
        <div className="container"
            style={{
                display: (room && store.get("curent.room").name===room.name) ? "block" : "none"
            }}
        >
            <Title name={name} onClick={()=> setView(0)}/>
            {
                elems.map((e, i)=> {
                    if(e.type.name==="TimerManager" && view===1) return e 
                    else if(e.type.name!=="TimerManager" && view===0) return e
                    else if(view===2) return "графики"
                })
            }
            <Footer useView={setView} view={view} elems={elems}/>
        </div>
    );
}
require("../engine")
import React, {useEffect, useState} from "react";
import { useDidUpdate, useLocalstorage } from "rooks";
import { OnOff, Lable, Centr, Title, OnOffDeamer } from "./device.f";
import TimerManager from "./timer";



export const useUser =()=> {
    return store.get("user")
}


export function Carts(props) {
    const [name, setName] = useState("")
    const [room, setRoom] = useState({name:1})
    
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
            <Title name={name} />
            { props.children }
        </div>
    );
}



/** ! В данных полный пиздец, контролируй явно создание карточек
 *  `_frame`:0,     
 *  `mac`:string,   
 *  `guid`:${user.id:0},  
 *  `room`:0,   
 *  `name`:"",       
 *  `view`:boolean,   
 *  `payload`:{onoff:topic, brihtness:topic}  
 */
const Node =(props)=> {
    return(
        <>{props.type === "PMR"
            ? <Carts room={props.room} id={`#pmr-0`} topic={props.mac+props.cart.reley[0]}> 
                <Lable type="PMR">
                    <OnOff topic={props.mac+props.cart.reley[0]}/>
                </Lable>
             </Carts>
        
            : Object.keys(props.cart).map((key)=> {
                if(props.type!=="PMR" && key==="dimmer") return props.cart[key].map((topic, i)=> (
                    <Carts room={props.room} key={i} id={`#new-device-${i}`} topic={props.mac+topic}>
                        <Lable 
                            type={props.type} 
                            topic={props.mac+topic} 
                        >
                            <TimerManager mac={props.mac} module={"D"+i} timers={[1]} />
                            <OnOffDeamer 
                                key={i} 
                                brihtness={props.mac+topic} 
                                topic={props.mac+props.cart.reley[i]}
                            />
                        </Lable>
                    </Carts>
                ))
                else if(props.type==="SMR" && key==="reley") return props.cart[key].map((topic, i)=> {
                    if(topic.split("/")[2]==="onoff") return(
                        <Carts room={props.room} key={i} id={`#new-smr-${i}`} topic={props.mac+topic}>
                            <Lable type="SMR" >
                                <TimerManager mac={props.mac} module={"R"+i} timers={[1]} />
                                <OnOff topic={props.mac+topic} />
                            </Lable>
                        </Carts>
                    );
                })
                else if(props.type==="FSC") return props.cart[key].map((topic, i)=> (
                    <Carts room={props.room} key={i} id={`#new-fsc-${i}`} topic={props.mac+topic}>
                        <Lable
                            type="FSC" 
                            topic={props.mac+topic}
                        >
                        <OnOffDeamer 
                            topic={props.mac+props.cart.reley[i]}
                            brihtness={props.mac+topic} 
                        />
                        </Lable>
                    </Carts>
                ))
            })}
        </>
    );
}



/** узлы: принимает карточки */
export default function NodeArea(props) {
    const [nodes, setDevices] = useState(store.get("user").nodes)
    
    useEffect(()=> {
        store.watch("user", (data)=> setDevices(data.nodes))
    }, [])


    return(
        <div className="device-wraper">
            {Object.keys(nodes).map((mac, index)=> (
                <Node 
                    key={index}  
                    type={nodes[mac]._type}
                    name={nodes[mac]._name}
                    mac={mac}
                    cart={nodes[mac].cart}
                    room={props.room}
                />
            ))}
        </div>
    );
}
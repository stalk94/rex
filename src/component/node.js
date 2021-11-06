import React, {useEffect, useState} from "react";
import { OnOff, Lable, Centr, Title, OnOffDeamer, ButtonBar } from "./device.f";
import TimerManager from "./timer";
import Carts from "./cart-bar"



/**
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
                if(props.type!=="PMR" && key==="dimmer") return props.cart[key].map((topic, i)=> {
                        if(topic.split("/")[2]==="onoff") return(
                            <Carts room={props.room} key={i} id={`#new-device-${i}`} topic={props.mac+topic}>
                                <Lable 
                                    type={props.type} 
                                    topic={props.mac+topic} 
                                >
                                <TimerManager mac={props.mac} module={"D"+i} timers={[1,2,3,4]} />
                                <OnOffDeamer 
                                    key={i} 
                                    brihtness={props.mac+`/D${i}/brightness`} 
                                    topic={props.mac+topic}
                                />
                                </Lable>
                            </Carts>
                )})
                else if(props.type==="SMR" && key==="reley") return props.cart[key].map((topic, i)=> {
                    if(topic.split("/")[2]==="onoff") return(
                        <Carts room={props.room} key={i} id={`#new-smr-${i}`} topic={props.mac+topic}>
                            <Lable type="SMR" >
                                <TimerManager mac={props.mac} module={"R"+i} timers={[1,2,3,4]} />
                                <OnOff style={{marginLeft:"60%",width:"100%"}} icon={"lamp"} topic={props.mac+topic} />
                            </Lable>
                        </Carts>
                    );
                })
                else if(props.type==="CUR4" && key==="reley") return props.cart[key].map((topic, i)=> {
                    if(topic.split("/")[2]==="onoff") return( 
                    <Carts room={props.room} key={i} id={`#new-curtain-${i}`} topic={props.mac+topic}>
                        <Lable type="CUR4">
                            <TimerManager mac={props.mac} module={"R"+i} timers={[1,2,3,4]} />
                            <div style={{display:"flex",flexDirection:"row",textAlign:"center"}}>
                                <ButtonBar mac={props.mac} index={i} module={"R"}/>
                                <OnOff offView="false" style={{width:"100%"}} icon={"wtor"} topic={props.mac+topic} />
                            </div>
                        </Lable>
                    </Carts>
                )})
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




export default function NodeArea(props) {
    const [nodes, setDevices] = useState(props.nodes)
    
    useEffect(()=> {
        setDevices(props.nodes)
    }, [props.nodes])
    

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
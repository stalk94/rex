require("../engine")
import React, {useEffect, useState} from "react";
import { useDidUpdate, useLocalstorage } from "rooks";
import { OnOff, Lable, Centr, Title, OnOffDeamer } from "./device.f";




/**
 * 
 * 
 */
export function Carts(props) {
    const [curent, setCur] = useState(props.room)
    const [name, setName] = useState("")
    const [room, setRoom] = useState({name:1})
    
    const update =()=> {
        let rooms = store.get("user").rooms
        let roomTopic = props.topic.split("/")[0]+"/"+props.topic.split("/")[1]+"/room"
        setTimeout(()=> {
            if(rooms[store.get("payload")[roomTopic]]) setRoom(rooms[store.get("payload")[roomTopic]])
            setName(store.get("payload")[props.topic.split("/")[0]+"/"+props.topic.split("/")[1]+"/name"])
        }, 500)
    }
    useEffect(()=> {
            store.watch("curent.room", (nroom)=> {
                console.log(nroom)
                setCur(nroom)
                update()
            })
            update()
    }, [])
    useDidUpdate(()=> {
        setCur(props.room)
    }, [props])
    
    return(
        <div style={{
                display:(curent&&curent.name===room.name)?"block":"none"
            }} 
            className="container"
            >
            <Title 
                name={name} 
                room={props.room.name}
            />
            {props.children}
        </div>
    );
}



/** 
 *  `_frame`:0,     
 *  `mac`:string,   
 *  `guid`:${user.id:0},  
 *  `room`:0,   
 *  `name`:"",       
 *  `view`:boolean,   
 *  `payload`:{onoff:topic, brihtness:topic}  
 */
class Node extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {}
    }
    componentDidMount() {
        store.watch("user", (newData)=> {
            this.setState(newData.nodes[this.props.mac])
        });
    }
    render() {
        return(
            <>
                {this.props.type === "PMR"
                 ? <Carts room={this.props.room} id={`#pmr-0`} topic={this.props.mac+this.props.cart.reley[0]}> 
                        <Lable type="PMR">
                            <OnOff topic={this.props.mac+this.props.cart.reley[0]}/>
                        </Lable>
                    </Carts>
        
                 :  Object.keys(this.props.cart).map((key, i)=> {
                        if(this.props.type!=="PMR" && key==="dimmer") return this.props.cart[key].map((topic, i)=> (
                            <Carts room={this.props.room} key={i} id={`#new-device-${i}`} topic={this.props.mac+topic}>
                                <Lable 
                                    type={this.props.type} 
                                    topic={this.props.mac+topic} 
                                >
                                    <OnOffDeamer 
                                        key={i} 
                                        brihtness={this.props.mac+topic} 
                                        topic={this.props.mac+this.props.cart.reley[i]}
                                    />
                                </Lable>
                            </Carts>
                        ))
                        else if(this.props.type==="SMR" && key==="reley") return this.props.cart[key].map((topic, i)=> (
                            <Carts room={this.props.room} key={i} id={`#new-smr-${i}`} topic={this.props.mac+topic}>
                                <Lable type={"SMR"} >
                                    <OnOff topic={this.props.mac+topic}/>
                                </Lable>
                            </Carts>
                        ))
                        else if(this.props.type==="FSC") return this.props.cart[key].map((topic, i)=> (
                            <Carts room={this.props.room} key={i} id={`#new-fsc-${i}`} topic={this.props.mac+topic}>
                                <Lable
                                    type={"FSC"} 
                                    topic={this.props.mac+topic}
                                >
                                    <OnOffDeamer 
                                        topic={this.props.mac+this.props.cart.reley[i]}
                                        brihtness={this.props.mac+topic} 
                                    />
                                </Lable>
                            </Carts>
                        ))
                    })
                }
            </>
        );
    }
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
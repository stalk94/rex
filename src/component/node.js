require("../engine")
import React, {useEffect, useState} from "react";
import { OnOff, Lable, Centr, Title, OnOffDeamer, Timer } from "./device.f";
import { useLocalstorage } from "rooks";


const devices = store.get("user").devices
const useRoomsName =(id)=> {
    let res = "not-room";
    let rooms = store.get("user").rooms
    rooms.map((room)=> {
        if(room.id===id) res = room.name 
    })
    return res
}


function Carts(props) {
    const [view, setView] = useState(true)
    const [name, setName] = useState(devices[props.topic]?(devices[props.topic].name??props.id):props.id)
    const [room, setRoom] = useState(devices[props.topic]?(devices[props.topic].room??-1):-1)

    const useRoom =()=> {

    }
    const useName =()=> {

    }

    return(
        <div style={{display:view?"block":"none"}} className="container">
            <Title 
                name={name} 
                room={useRoomsName(room)}
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
        this.onUpdate = this.onUpdate.bind(this)
    }
    componentDidMount() {
        store.watch("user", (newData)=> {
            this.setState(newData.nodes[this.props.mac])
        });
    }
    onUpdate(topic, prop, value) {

    }
    render() {
        return(
            <>
                {this.props.type === "PMR"
                 ? <Carts id={`#pmr-0`} topic={this.props.mac+this.props.cart.reley[0]}> 
                        <Lable type="PMR">
                            <OnOff topic={this.props.mac+this.props.cart.reley[0]}/>
                        </Lable>
                    </Carts>
        
                 :  Object.keys(this.props.cart).map((key, i)=> {
                        if(this.props.type!=="PMR" && key==="dimmer") return this.props.cart[key].map((topic, i)=> (
                            <Carts key={i} id={`#new-device-${i}`} topic={this.props.mac+topic}>
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
                            <Carts key={i} id={`#new-smr-${i}`} topic={this.props.mac+topic}>
                                <Lable type={"SMR"} >
                                    <OnOff topic={this.props.mac+topic}/>
                                </Lable>
                            </Carts>
                        ))
                        else if(this.props.type==="FSC") return this.props.cart[key].map((topic, i)=> (
                            <Carts key={i} id={`#new-fsc-${i}`} topic={this.props.mac+topic}>
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
                    curentRoom={props.room}
                />
            ))}
        </div>
    );
}
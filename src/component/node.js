import React, {useEffect, useState} from "react";
import { OnOff, Lable, Centr, Title } from "./device.f";
import { useLocalstorage } from "rooks";



const usePub =(topic, val)=> {
    let strVal = String(val)
    window.api.publish(topic, strVal)
    console.log('[📡]:', topic, ':', strVal)
}
const useFind =(node, searchToken)=> {
    
}


const Carts =(props)=> {
    const [topics, setTopic] = useState([])
    const [state, setState] = useState([])

    const setRoom =()=> {

    }
    const useClick =()=> {

    }

    return(
        <div style={{display:view?"block":"none"}} className="container">
            <div className="device-body">
                <Title name={1} room={1}/>
                <Centr 
                    onoff={1} 
                    brihtness={1}
                    onState={(val)=> this.onState("", val)} 
                />
            </div>
            <div className="device-icon">
                <Lable 
                    type={props.type} 
                    click={useClick} 
                    payload={1}
                    onoff={1}
                >
                    <OnOff 
                        brihtness={1} 
                        onoff={1}
                    />
                </Lable>
            </div>
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
        this.init = this.init.bind(this)
    }
    init() {
        if(this.state.cart.reley){
            this.state.cart.reley
        }
    }
    componentDidMount() {
        store.watch("user", (newData)=> {
            this.setState(newData.nodes[this.props.mac])
        });
    }
    render() {
        return(
            <Carts 
                type={this.props.type}

            />
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
                />
            ))}
        </div>
    );
}
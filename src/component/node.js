import React, {useEffect, useState} from "react";
import { OnOff, Lable, OnOffDeamer, ButtonBar, Termostat, RgbLamp } from "./device.f";
import Carts from "./cart-bar";



const Nodes = {
    FSC: (props)=> (
        <Carts room={props.room} id={`#new-fsc-${props.i}`} topic={[props.mac,`T${props.i}`]}>
            <Lable  type="FSC">
                <Termostat
                    i={props.i}
                    mac={props.mac}
                    mode={props.mac+`/T${props.i}/headcoolmode`}
                    onoff={props.mac+`/T${props.i}/onoff`} 
                    data={props.mac+`/T${props.i}/datafb`} 
                    brightness={props.mac+`/T${props.i}/Set0`}
                 />
            </Lable>
        </Carts>
    ),
    CUR4: (props)=> (
        <Carts room={props.room} id={`#new-curtain-${props.i}`} topic={[props.mac,`R${props.i}`]}>
            <Lable type="CUR4">
                <div style={{display:"flex",flexDirection:"row",textAlign:"center",width:"100%"}}>
                    <ButtonBar mac={props.mac} index={props.i} module="R" />
                    <OnOff offView="false" style={{width:"100%"}} icon="wtor" topic={props.mac+`/R${props.i}/onoff`} />
                </div>
            </Lable>
        </Carts>
    ),
    SMR: (props)=> (
        <Carts room={props.room} id={`#new-smr-${props.i}`} topic={[props.mac,`R${props.i}`]}>
            <Lable type="SMR">
                <OnOff style={{marginLeft:"60%"}} icon={"lamp"} topic={props.mac+`/R${props.i}/onoff`} />
            </Lable>
        </Carts>
    ),
    DIM8: (props)=> (
        <Carts room={props.room} id={`#new-dim8-${props.i}`} topic={[props.mac,`D${props.i}`]}>
            <Lable type={props.type??"DIM8"}>
                <div style={{visibility:"hidden",textAlign:"center",fontSize:"28px",display:"flex",flexDirection:"row",marginBottom:"2%"}}/>
                <div style={{display:"flex",flexDirection:"row",textAlign:"center"}}>
                    <OnOffDeamer 
                        topic={props.mac+`/D${props.i}/onoff`}
                        brightness={props.mac+`/D${props.i}/brightness`}     
                    />
                    <OnOff style={{position:"relative"}} icon={"lamp"} topic={props.mac+`/D${props.i}/onoff`} />
                </div>
            </Lable>
        </Carts>
    ),
    LED: (props)=> (
        <Carts room={props.room} id={`#new-rgb-${props.i}`} topic={[props.mac,`L${props.i}`]}>
            <Lable type="LRGB">
                <RgbLamp mac={props.mac} module="L" index={props.i} rgb={false}>
                    <OnOffDeamer brightness={props.mac+"/L"+props.i+"/brightness"}/>
                </RgbLamp>
            </Lable>
        </Carts>
    ),
    MR: (props)=> (
        <Carts room={props.room} id={`#new-mr-${props.i}`} topic={[props.mac,`R${props.i}`]}>
            <Lable type="MR">
                <OnOff style={{marginLeft:"60%",width:"100%"}} icon={"lamp"} topic={props.mac+`/R${props.i}/onoff`} />
            </Lable>
        </Carts>
    ),
    R4C2: (props)=> (
        <Carts room={props.room} id={`#new-r4c2-${props.i}`} topic={[props.mac,`R${props.i}`]}>
            <Lable type="R4C2">
                <div style={{display:"flex",flexDirection:"row",textAlign:"center",width:"100%"}}>
                    <ButtonBar mac={props.mac} index={props.i} module="R" />
                    <OnOff offView="false" style={{width:"100%"}} icon="wtor" topic={props.mac+`/R${props.i}/onoff`} />
                </div>
            </Lable>
        </Carts>
    )
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
const Node =(props)=> {
    const [reload, setReload] = useState(new Date().getMilliseconds())
    useEffect(()=> setReload(new Date().getMilliseconds()), [props.room])

    return(
        <>
            {props.type==="PMR"
                ? <Carts room={props.room} id={`#pmr-0`} topic={props.mac, `R0`}> 
                    <Lable type="PMR">
                        <OnOff topic={props.mac+`/R0/onoff`} icon={"logic"}/>
                    </Lable>
                </Carts>
            
                : Object.keys(props.cart).map((key)=> {
                    if(props.type==="DIM8" && key==="dimmer") return props.cart[key].map((topic, i)=> {
                        if(topic.split("/")[2]==="onoff") return(<Nodes.DIM8 key={reload+"_"+key+"_"+i} i={i} mac={props.mac} room={props.room} />);
                    })
                    else if(props.type==="SMR" && key==="reley") return props.cart[key].map((topic, i)=> {
                        if(i<8) return(<Nodes.SMR key={reload+"_"+key+"_"+i} i={i} mac={props.mac} room={props.room} />);
                    })
                    else if(props.type==="CUR4" && key==="reley") return props.cart[key].map((topic, i)=> {
                        if(i<20) return(<Nodes.CUR4 key={reload+"_"+key+"_"+i} i={i} mac={props.mac} room={props.room} />)
                    })
                    else if(props.type==="FSC" && props.mac && key==="termo") return props.cart[key].map((topic, i)=> {
                        if(i<20) return(<Nodes.FSC key={`${props.mac}_${key}_${i}`} i={i} mac={props.mac} room={props.room} />);
                    })
                    else if(props.type==="LRGB" && key==="lrgb") return props.cart[key].map((topic, i)=> {
                        if(i<20) return(<Nodes.LED key={reload+"_"+key+"_"+i} i={i} mac={props.mac} room={props.room} />);
                    })
                    else if(props.type==="LRGB" && key==="dimmer") return props.cart[key].map((topic, i)=> {
                        if(i<20) return(<Nodes.DIM8 type="LRGB" key={reload+"_"+key+"_"+i} i={i} mac={props.mac} room={props.room} />);
                    })
                    else if(props.type==="MR" && key==="reley") return props.cart[key].map((topic, i)=> {
                        if(i<20) return(<Nodes.MR type="MR" key={reload+"_"+key+"_"+i} i={i} mac={props.mac} room={props.room} />);
                    })
                    else if(props.type==="R4C2" && key==="reley") return props.cart[key].map((topic, i)=> {
                        if(i<2) return(<Nodes.R4C2 type="R4C2" key={reload+"_"+key+"_"+i} i={i} mac={props.mac} room={props.room} />);
                        else if(i>=2) return(<Nodes.SMR key={reload+"_"+key+"_"+i} i={i} mac={props.mac} room={props.room} />);
                    })
            })}
        </>
    );
}



export default function NodeArea(props) {
    const [frame, setFrame] = useState(0)
    const [nodes, setDevices] = useState()
    
    useEffect(()=> {
        if(!window.useSub) window.useStart()
        setTimeout(()=> setDevices(props.nodes), 500) 
        setFrame(frame+1)
        store.set("frame", frame)
    }, [props.nodes, props.room])

    return(
        <div className="device-wraper">
            {nodes && Object.keys(nodes).map((mac, index)=> (
                <Node 
                    key={mac+index}  
                    type={nodes[mac]._type}
                    name={nodes[mac]._name}
                    mac={nodes[mac]._mac}
                    cart={nodes[mac].cart}
                    room={props.room}
                />
            ))}
        </div>
    );
}
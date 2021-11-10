import React, { useEffect, useRef } from 'react';
import { Input } from "../input";
import { usePub, useSub } from "../device.f";
import { useUser } from "./meta"




/**
 * `knx`: knx   
 * `mac`: mac   
 * `name`: имя устройства   
 * `type`: тип устройства выбранный 
 */
export default function Title(props) {
    const inputRef = useRef(null)
    const style = {margin:"10px",textDecoration:"underline"}
    const styleInput = {padding:"10px", marginRight:"5px"}
    const styleTitle = {display:"flex",flexDirection:"row",textAlign:"center",background:"#6c6a6acc"}

    const onDel =()=> {
        socket.emit("delete", props.mac.mac)
        setTimeout(()=> document.location.reload(), 500)
    }
    const onLoad =(e)=> {
        readFile(e.target, (data)=> {
            socket.emit("file.po", {token:useUser().token, req:[props.mac.mac, data]})
        });
    }

    useEffect(()=> {
        socket.on("get.delete", (userData)=> {
            window.api.publish(props.mac.mac+"/RESET", 1)

            Object.keys(userData.payloads).map((topic)=> {
                if(topic.split("/")[0]===props.mac.mac) {
                    window.api.unsubscribe(topic)
                    delete userData.payloads[topic]
                }
            });
        })
    }, [])


    return(
        <div style={styleTitle}>
            <div style={{...style,marginRight:"30px"}}>{ props.type }</div>
            <Input style={styleInput} placeholder="NAME" onChange={(e)=> props.name.set(e.target.value)} value={props.name.name}/>
            <Input style={styleInput} placeholder="KNX" onChange={(e)=> props.knx.set(e.target.value)} value={props.knx.knx}/>
            <Input style={styleInput} placeholder="MAC" onChange={(e)=> props.mac.set(e.target.value)} value={props.mac.mac}/>
            <button onClick={props.change} style={{...style,marginRight:"50px"}}>💾</button>
            <label className="custom-file-upload">
                <input 
                    ref={inputRef} 
                    onChange={onLoad} 
                    type="file" 
                    style={{display:"none"}}
                />
                <button onClick={()=>inputRef.current.click()} style={style}>📁</button>
            </label>
            <button onClick={()=> usePub(props.mac.mac+"/STATUS", 1)} style={style}>Считать</button>
            <button style={style}>Перепрошивка</button>
            <button style={{margin:"10px",padding:"8px",marginLeft:"20%"}} onClick={onDel} id="del">❌</button>
        </div>
    );
}
import React, { useState, useEffect } from 'react';
import { useWillUnmount } from "rooks";
import { Select } from "../input";
import { usePub, useSub } from "../device.f";
import { useParse, useSocket, useWatch, useUser, useChek, useArray } from "./meta"




export default function Row(props) {
    const [id, setId] = useState()
    const [state, setState] = useState(useArray(props.module, props.mac+"/"+props.name+"/"))
    const [payload, setPayload] = useState(useUser().payloads) 
    
    const onSave =()=> {
        Object.keys(state).map((key)=> {
            window.api.subscribe(props.mac+"/"+props.name+"/"+key+"st")
            usePub(props.mac+"/"+props.name+"/"+key, state[key])
        });

        useSocket("payloads", payload)
    }
    useEffect(()=> {
        if(!id) setId(useWatch((data)=> {
            if(!data.payloads){
                data.payloads = {}
                store.set("user", data)
            }
            else setPayload(data.payloads)
        }))
    }, [])
    useWillUnmount(()=> {
        if(id) store.unwatch(id)
        setId()
    });

    
    return(
        <div className="Row">
            {Object.keys(state).map((key, index)=> {
                let color = props.id==="reley"?"#90e160cc":(props.id==="button"?"#f4ea7c":"grey")
                let elem = useParse(props.id, index)
            
                if(elem && elem.type==="input"){
                    return(
                        <input 
                            style={{width:"90px",height:"50px",border:`1px solid ${color}`}}
                            key={key} 
                            type="text"
                            placeholder={elem.data} 
                            onChange={(e)=> {
                                let states = state
                                states[key] = e.target.value
                                payload[props.mac+"/"+props.name+"/"+key] = e.target.value
                                setPayload(payload)
                                setState(states)
                            }}
                            defaultValue={payload[props.mac+"/"+props.name+"/"+key]}
                        />
                )}
                else if(elem && elem.type==="select"){
                    return(
                        <Select key={index} 
                            style={{border:`1px solid ${color}`}}
                            value={elem.data[useChek(props.mac+"/"+props.name+"/"+key)]}
                            data={elem.data} 
                            room={true}
                            onValue={(e)=> {
                                let states = state
                                if(elem.name==="room") states.room = e
                                else states[key] = e
                                payload[props.mac+"/"+props.name+"/"+key] = e
                                setPayload(payload)
                                setState(states)
                            }} 
                        />
                )}
                else if(elem && elem.type==="lable"){
                    return (
                        <div 
                            key={index} 
                            style={{
                                fontSize:"24px",
                                marginTop:"5px",
                                marginBottom:"5px",
                                borderRadius:"5px",
                                textAlign:"center",
                                border:"1px solid grey",
                                width:"70px",
                                height:"48px",
                                backgroundColor:elem.color,
                                border:`1px solid ${color}`
                            }}
                        >
                        { elem ? props.name[0]+(+props.name.slice(1, props.name.length)+1) : "null" }
                        </div>
                    );
                }}
            )}
            <button className="save-row" onClick={onSave}>
                💾
            </button>
        </div>
    );
}
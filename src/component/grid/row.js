import React, { useState, useEffect } from 'react';
import { Select } from "../input";
import { useParse, useWatch, useArray } from "./meta"


const useSubCache =(topic, cache, fn)=> {
    if(!useSubCache.cache[topic]){
        useSub(topic, cache??"#", fn);
    }
}
useSubCache.cache = {}




export default function Row(props) {
    const [state, setState] = useState({})
    const [payload, setPayload] = useState(store.get("user").payloads) 
    
    const onSave =()=> {
        Object.keys(state).map((key)=> {
            let topic = props.mac+"/"+props.name+"/"+key+"st";

            useSubCache(topic, payload[topic], (value)=> {
                state[key] = value
                setState(state)
            });
            usePub(props.mac+"/"+props.name+"/"+key, state[key])
        });
        setPayload(store.get("user").payloads)
        if(props.module[0]==="B") setTimeout(()=> document.location.reload(), 1500)
    }
    useEffect(()=> {
        setState(useArray(props.module, props.mac+"/"+props.name+"/"))
    }, [])

    
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
                                state[key] = e.target.value
                                payload[props.mac+"/"+props.name+"/"+key+"st"] = e.target.value
                                setPayload(payload)
                                setState(state)
                            }}
                            defaultValue={store.get("user").payloads[props.mac+"/"+props.name+"/"+key+"st"]}
                        />
                )}
                else if(elem && elem.type==="select"){
                    let topicVal = elem.data[+store.get("user").payloads[props.mac+"/"+props.name+"/"+key+"st"]];

                    return(
                        <Select key={index+topicVal} 
                            style={{border:`1px solid ${color}`}}
                            value={topicVal}
                            data={elem.data} 
                            room={true}
                            onValue={(e)=> {
                                if(elem.name==="room") state.room = e
                                else state[key] = e
                                payload[props.mac+"/"+props.name+"/"+key+"st"] = e
                                setPayload(payload)
                                setState(state)
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



/**
    const onSave =()=> {
        Object.keys(state).map((key)=> {
            usePub(props.mac+"/"+props.name+"/"+key, state[key])
        });
    }
    useDidMount(()=> {
        if(!id) {
            useWatch((data)=> setPayload(data.payloads))
            setId(props.id)
        }
    });
    useWillUnmount(()=> {
        if(id) store.unwatch(id)
        setId()
    });
    useIntervalWhen(()=> {
        [props.mac+"/"+props.name+"/"+key]
    })
 */
/**
 * 
 * useDidMount(()=> {
        if(!id) {
            useWatch((data)=> {
                setPayload(data.payloads)
            })
            setId(props.id)
        }
    });
    useWillUnmount(()=> {
        if(id) store.unwatch(id)
        setId()
    });

 */
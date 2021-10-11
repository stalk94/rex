import React, { useState, useEffect, useContext } from 'react';
import Accordion from 'react-tiny-accordion';
import {DragDropContainer, DropTarget} from "react-drag-drop-container";
import { send } from "../engine";


let user = store.get("user")


export function ListContainer(props) {
    const refList = React.createRef()
    
    useEffect(()=> {
        
    }, [])

    return(
        <div className="List" ref={refList}>
            {props.list.map((elem, index)=> 
                <div className="Cell"
                    key={index} 
                    onClick={props.click}
                >
                    { elem.name }
                </div>
            )}
        </div>
    );
}


export default function Catalog(props) {
    const [list, setList] = useState(props.list)
    const [selectedIndex, setSelected] = useState(0)
    const recombinationDevice =(device, idRoom)=> {
        send("recombination", {login:user.login, password:user.password, roomId:idRoom, device:device}, "POST").then((res)=> {
            res.json().then((val)=> {
                if(val.error) props.error(val.error)
                else store.set("user", val)
            });
        });
    }
    const useDrop =(indexRoom, device)=> {
        device.room = indexRoom
        list[indexRoom].list.push(device)
        setList(list)
        recombinationDevice(indexRoom, device)
    }
    
    return(
        <Accordion
            className="accordion"
            selectedIndex={selectedIndex}
            onChange={(index, expanded, selectedIndex)=> setSelected(selectedIndex)}
        >
            {list.map((elem, index)=> (
                <DropTarget 
                    key={index} 
                    dropData={list[index].list} 
                    onHit={(device)=> useDrop(index, device)} 
                    targetKey="device"
                >
                    <div data-header={<div className="acordion-title">{ elem.title }</div>}>
                        <ListContainer 
                            error={props.error}
                            add={props.onAdd}
                            list={list[index].list} 
                            category={elem.title} 
                            click={props.click}
                        />
                    </div>
                </DropTarget>
            ))}
        </Accordion>
    );
}
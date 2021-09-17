import React, { useState, useEffect, useContext } from 'react';
import Accordion from 'react-tiny-accordion';
import {DragDropContainer, DropTarget} from "react-drag-drop-container";
import { send } from "../engine";
let user = window.localStorage.getItem("user")!==null ? JSON.parse(window.localStorage.getItem("user")) : {login:'test', password:"test"}




export function ListContainer(props) {
    const refList = React.createRef()
    
    const reNameDevice =(name, id)=> {
        send("reNameDevice", {login:user.login, password:user.password, name:name, id:id}, "POST").then((res)=> {
            res.json().then((val)=> {
                if(val.error) props.error(val.error)
            });
        });
    }
    const setData =(ev, elem)=> {
        ev.dataTransfer.setData("text/plain", JSON.stringify(elem))
    }
    const onSelectCategory =(ev)=> {
        window.localStorage.setItem("setCategory", props.category)
    }

    return(
        <div className="List"
            ref={refList}
        >
            {props.list.map((elem, index)=> 
                <div className="Cell"
                    key={index} 
                    onClick={props.click}
                    draggable={'true'}
                    onDragStart={(ev)=> setData(ev, elem)}                                  // сохраняем перетаскиваемый
                >
                    {elem.name}
                </div>
            )}
        </div>
    );
}


export default function Catalog(props) {
    const [selectedIndex, setSelected] = useState(0)

    return(
        <Accordion
            className="accordion"
            selectedIndex={selectedIndex}
            onChange={(index, expanded, selectedIndex)=> console.log(selectedIndex)}
        >
            {props.list.map((elem, index)=> (
                <div
                    key={index} 
                    data-header={<div className="acordion-title">{elem.title}</div>}            // title list
                >
                    <ListContainer 
                        error={props.error}
                        add={props.onAdd}
                        list={elem.list} 
                        category={elem.title} 
                        click={props.click}                                                     // клик по устройству
                    />
                </div>
            ))}
        </Accordion>
    );
}
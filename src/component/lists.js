import React, { useState, useEffect, useContext } from 'react';
import Accordion from 'react-tiny-accordion';
import { send } from "../engine";
let user = window.localStorage.getItem("user")!==null ? JSON.parse(window.localStorage.getItem("user")) : {login:'test', password:"test"}




export function ListContainer(props) {
    const reNameDevice =(name, id)=> {
        send("reNameDevice", {login:user.login, password:user.password, name:name, id:id}, "POST").then((res)=> {
            res.json().then((val)=> {
                if(val.error) console.log(val.error)
            });
        });
    }
    const setData =(ev, elem)=> {
        ev.dataTransfer.setData("text/plain", JSON.stringify(elem))
    }
    const refList = React.createRef()

    return(
        <div className="List"
            ref={refList}
        >
            {props.list.map((elem, index)=> 
                <div className="Cell"
                    key={index} 
                    onClick={props.click}
                    draggable={'true'}
                    onDragStart={(ev)=> setData(ev, elem)}
                >
                    <var 
                        contentEditable="true" 
                        suppressContentEditableWarning="true"
                        onInput={(ev)=> reNameDevice(ev.target.innerText, index)}
                    >
                        { elem.name??`девайс ${index}` }
                    </var>
                </div>
            )}
            
            <div id="addDevice" style={{cursor:"cell"}} onClick={()=> props.onAdd({})}> ➕ </div>
        </div>
    );
}



/**
 *  AtomsList: [{
 *      title: ''
 *      list:  ListContainer
 *  }]
 */
export default function Catalog(props) {
    const [selectedIndex, setSelected] = useState(0)

    return(
        <Accordion
            className="accordion"
            selectedIndex={selectedIndex}
            onChange={(index, expanded, selectedIndex)=> console.log(selectedIndex)}
        >
            {props.list.map((elem, index)=> (
                <div className="accordion-item"
                    key={index} 
                    data-header={elem.title}
                >
                    <ListContainer list={elem.list}/>
                </div>
            ))
        }</Accordion>
    );
}
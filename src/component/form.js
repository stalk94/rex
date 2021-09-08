import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";


/**
 * @param {*} props 
 * top: заголовочная строка    
 * bottom: нижняя строка
 * icon?: blob
 */
const BlokData =(props)=> {
    return(
        <div className="alert border-0 border-start border-5 border-white alert-dismissible fade show py-2">
            <div className="d-flex align-items-center">
                <div className="font-35 text-white">{ props.icon?props.icon:<i className="fas fa-project-diagram"></i> }</div>
                <div className="ms-3">
                    <h6 className="mb-0 text-white"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">{props.top}</font></font></h6>
                    <div><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">{props.bottom}</font></font></div>
                </div>
            </div>
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Закрывать"></button>
        </div>
    );
}
const BlokData2 =(props)=> {
    return(
        <React.Fragment>
            <font style="vertical-align: inherit;">
                    <font style="vertical-align: inherit;">{props.title}
                </font>
            </font>
        </React.Fragment>
    )
}


/**
 * list scene component :`lvl 2`   
 *  {
 *      [`name`]: FunctionComponent
 *  }    
 * handler: call method scene   
 */
export function DropDown(props) {
    return(
        <select>{
            props.events.map((eventObject, index)=> {
                return <option  key={index} onClick={()=> props.handler(eventObject.event)}>
                    { eventObject.name }
                </option>
            })
        }</select>
    );
}
export function DropDown2(props) {
    return(
        <div class="btn-group">
            <button type="button" className="btn btn-light">
                <font style="vertical-align: inherit;">
                    <font style="vertical-align: inherit;">{props.title}</font>
                </font>
            </button>
            <button type="button" className="btn btn-light dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">	
                <span class="visually-hidden">
                    <font style="vertical-align: inherit;">
                        <font style="vertical-align: inherit;">список</font>
                    </font>
                </span>
            </button>
            
            <ul className="dropdown-menu" style={{margin: "0px"}}>
                <li>{
                    props.data.map((elem, index)=> {
                        return(<BlokData2 title={elem} key={index} />)
                    })
                }</li>
            </ul>
        </div>
    );
}


/**
 * 
 * @param {*} props 
 * data: Array  
 * title: String      
 */
export default function List(props) {
    let data = props.data
    return(
        <div className="card bg-transparent shadow-none">
            <div className="card-body">
                <h5 className="card-title"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">{props.title}</font></font></h5>
                <hr/>
                    
                    
			</div>
        </div>
    )
}


export const Modal =(props)=> {
    const style = {width:"100%", height:"100%"}
    const bacground = document.querySelector("#stars").cloneNode(true)

    return(
        <div className="Modal" dangerouslySetInnerHTML={{__html:bacground.innerHTML}} style={style}>
            {props}
        </div>
    );
}
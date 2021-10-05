import React, { useState, useEffect } from 'react';
import bpc from "@blueprintjs/core";


/**
 * @param {*} props 
 * title: string   
 * icon: blob   
 */
export function Button(props) {
    return(
        <button type="button" className="btn btn-light px-5">
            {props.icon?props.icon:<i className="bx bx-home mr-1"></i>}
            <font style={{verticalAlign: "inherit"}}>
                <font style={{verticalAlign: "inherit"}}>{props.title}</font>
            </font>
        </button>
    );
}

const NameRoom =(props)=> (
    <>
        <var className="title-name" 
            onInput={(ev)=> props.setName(ev.target.textContent)}
        >
            { props.name }
        </var>
        <img id="read-b" height="31px" src={redact} onClick={props.changeName}/>
    </>
);
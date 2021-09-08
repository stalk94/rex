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
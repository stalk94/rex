import React, { useState, useEffect } from 'react';


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
                <div className="font-35 text-white">{  }</div>
                <div className="ms-3">
                    <h6 className="mb-0 text-white">{props.top}</h6>
                    <div>{props.bottom}</div>
                </div>
            </div>
            <button className="btn-close" data-bs-dismiss="alert" aria-label="Закрывать"></button>
        </div>
    );
}
const BlokData2 =(props)=> {
    return(
        <React.Fragment>
            {props.title}
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
        <div className="btn-group">
            <div className="dropdown line">
                <div className="title-drop">
                    { props.title }
                </div>
                <button className="drop-btn">	
                    <svg xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        height="28px"
                        width="28px"
                        viewBox="0 0 30 30" 
                    >
                        <g>
                            <path
                                d="M22.285,15.349L16,21.544l-6.285-6.196c-0.394-0.391-1.034-0.391-1.428,0c-0.394,0.391-0.394,1.024,0,1.414  l6.999,6.899c0.379,0.375,1.048,0.377,1.429,0l6.999-6.9c0.394-0.39,0.394-1.024,0-1.414 C23.319,14.958,22.679,14.958,22.285,15.349z"
                                fill="white" 
                            />
                            <path
                                d="M15.286,16.662c0.379,0.375,1.048,0.377,1.429,0l6.999-6.899c0.394-0.391,0.394-1.024,0-1.414  c-0.394-0.391-1.034-0.391-1.428,0L16,14.544L9.715,8.349c-0.394-0.391-1.034-0.391-1.428,0c-0.394,0.391-0.394,1.024,0,1.414 L15.286,16.662z"
                                fill="white" 
                            />
                        </g>
                    </svg>
                </button>
            </div>
            <ul className="dropdown-menu" style={{margin: "2px 1% 1% 1%"}}>
                {props.data.map((elem, index)=> {
                    return( <li onClick={(ev)=> {window.localStorage.setItem("typeDevice", elem); props.click(ev)}} key={index}>
                                <i>{elem}</i>
                            </li>
                        )
                    })
                }
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
                <h5 className="card-title">{props.title}</h5>
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
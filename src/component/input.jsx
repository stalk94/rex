import React, { useState, useEffect } from 'react';
import "../css/style.css"



export function SlideBar(props) {
    return(
        <div class="mb-3">
			<input type="range" class="form-range"/>
		</div>
    );
}

/** value:"", data:[] */
export function Select(props) {
    const [value, setValue] = useState(props.value)
    
    const onValue =(e)=> {
        setValue(e.target.value)
        if(!props.room) props.onValue(e.target.value)
        else props.onValue(props.data.indexOf(e.target.value))
    }

    return(
        <select style={props.style} onChange={onValue} value={value}>
            {props.data.map((v, i)=> (
                <option style={{color:"black",margin:"5px"}} key={i}>{ v }</option>
            ))}
        </select>
    );
}
/**
 * `type`
 * `value`
 * `onChange`
 * `placeholder`
 */
export function Input(props) {
    return(
        <input style={{...props.size,display:""}}
            placeholder={props.placeholder}
            type={props.type??"text"} 
            value={props.value} 
            onChange={props.onChange}
        />
    );
}
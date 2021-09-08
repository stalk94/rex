import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';



export const each =(data, type)=> {
    if(data instanceof Array){
        return data.map((value, key)=> {
            return React.createElement(type, null, value)
        })
    }
    else if(data instanceof Object){
        let dat = Object.values(data);
        let key = Object.keys(data);

        // анализатор ключей
    }
}

/**
 *   type?: `string`  
 *   data: `[]`|`{}`
 */
export function List(props) {
    return(
        <React.Fragment>
            {each(props.data, props.type?props.type:"div")}
        </React.Fragment>
    );
}







const root = document.querySelector("#root")
ReactDOM.render(<List type="p" data={[1, 2]}/>, root)
root.innerHTML //?


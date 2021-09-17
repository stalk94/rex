import React, {useState} from "react";
import {Button} from '../buttons';
import {SlideBar} from '../input';
import List, {DropDown, DropDown2} from '../form';



export const Cell =(props)=> {
    const [value, setValue] = useState(props.value)

    return(
        <div className="skills">
            <div className="skills_label">

            </div>
            <div className="bar">
                <h2>{value}</h2>
            </div>
        </div>
    );
}
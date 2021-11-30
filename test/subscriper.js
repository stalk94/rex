import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { RangeInput } from "grommet"
import { useInput } from "rooks"



const Cli =(props)=> {
    const [str, setStr] = useState([])
    const state = useInput()

    useEffect(()=> {
        // subscribe
    }, [])

    return(
        <div>
            <ul>{ str }</ul>
            <input {...state} type="text"/>
        </div>
    );
}


const Api = {
    cli:(props)=> <Cli {...props}/>
}


const Subscriper =(props)=> {
    const [status, setStatus] = useState()
    const [state, setState] = useState()


    useEffect(()=> {

    }, [])


    return(
        <div className="container">
            <div className="buttonBar">
                <button onClick={()=> setStatus("cli")}>CLI</button>
                { Api[status]() }
            </div>
        </div>
    )
}
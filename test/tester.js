import React, {useState, useEffect} from "react";
import { useIntervalWhen, useOnWindowResize, useLocalstorage, useDidMount } from "rooks";
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import {TiFlowChildren} from "react-icons/ti";


/**
 * typeName: `string`   
 * type: `object|array|function`    
 * color: `string`  
 * any: `[]`
 */
class TestRender {
    constructor() {
        this.typeName = undefined
        this.type = undefined
        this.color = undefined
    }
    getIcon() {
        switch(this.type){
            case "object": return `☋`
            case "array": return `📚`
            case "function": return `📦`
            default :return `🔹`
        }
    }
    Render() {
        return ()=> $(".preview").html(`
            <div style="background-color:${this.color}">
                <div>${this.getIcon()}${this.any}</div>
                ${this.typeName instanceof this.type?`<div>✔️</div>`:`<div>❌</div>`}
                <var>Тип:${this.typeName}</var>
                <var>Назначено:${this.type}</var>
            </div>
        `)
    }
}

const useArray =(key, val, typer)=> {
    let value = useIteratorProps(val)
}
const useObject =(key, val, typer)=> {
    let value = useIteratorProps(val)
    switch(key){
        case "children": typer.any = <TiFlowChildren/>
    }
}
function useIteratorProps(prop) {
    let rezult = {...prop}
    let testRender = new TestRender()

    rezult[Symbol.iterator] = function*() {
        let cur;
        Object.keys(this).map((key)=> {
            if(typeof this[key]===Object && key!=="_test_"){
                testRender.typeName="object"
                testRender.color = "orange"
                useObject(key, this[key], testRender)
                testRender.type = typeof this[key]
            }
            else if(typeof this[key]===Array && key!=="_test_"){
                testRender.typeName="array"
                testRender.color = "red"
                useArray(key, this[key], testRender)
                testRender.type = typeof this[key]
            }
            else if(typeof this[key]===Function && key!=="_test_"){
                testRender.typeName="function"
                testRender.color = "blue"
                testRender.type = typeof this[key]
            }
            else if(key!=="_test_"){
                testRender.typeName="any"
                testRender.color = "grey"
                testRender.type = typeof this[key]
            }

            cur = {key:key,val:this[key], _test_:testRender}
        });
        yield cur
    }

    return rezult
}
///////////////////////////////////////////////////////////


const Test =(props)=> {
    useIteratorProps(props)
    
    return(
        <div className="Test">
            {TestRender()}
        </div>
    );
}



ReactDOM.render(<Test type="div" frame={0}><div>xru</div></Test>, document.querySelector(".root"))
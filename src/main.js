import "./engine.js";
import React, { useState, useEffect } from "react";
import Index from "./index";
import Application from "./application";
import ReactDOM from "react-dom";




/**
    setUser(userData)
    setRender(<App user={ userData } />)
 */
export default function App() {
    const [render, setRender] = useState()

    const viewApplication =(user)=> {
        window.useStart();
        window.initSocket(user);
        
        setRender(<Application user={user}/>)
    }
    
    
    return(<>{
        render ?? <Index onOk={(data)=> {
             store.set("user", data);
            viewApplication(data);
        }}/> 
    }</>);
}

window.onload =()=> ReactDOM.render(<App/>, document.querySelector(".root"));
({
    "plugins": ["jsdom-quokka-plugin"],
    "babel": true
});
import React, {useEffect, useState} from "react";
import { useDebounce, useLocalstorage, useLocalstorageState,useIsomorphicEffect } from "rooks";
import ReactDOM from "react-dom";


const App =(props)=> {
    const [name, setName] = useLocalstorage("name", props.name)

    return(
        <>
            <input onChange={(e)=> setName(e.target.value)} value={name}/>
            <div style={{width:"100px",height:"40px",background:"red"}}>{name}</div>
        </>
    );
}


class Test extends React.Component {
    constructor(props) {
        super(props)
        this.state =()=> {
            let s = useLocalstorage("test", {name:1})
            return s
        }
    }
    componentDidUpdate(prevProps, prevState) {
        console.log(prevProps, prevState)
    }
    render() {
        return(
            <div>
                <div>{"class:"+ this.state.name}</div>
                <App name={this.state.name} />
            </div>
        )
    }
}

ReactDOM.render(<Test/>, document.querySelector("#root"))
import React, {useEffect, useState} from "react";
import Carts from "../../src/component/cart-bar"
import { OnOffDeamer, Lable } from "../../src/component/device.f";
import { TimerManager } from "../../src/component/timer";
import ReactDOM from "react-dom";



export default function Termostat(props) {
    const [topic, setTopic] = useState("test")

    return(
        <Carts room={props.room} key={i} id={`#new-fsc-${i}`} topic={props.mac+topic}>
            <Lable type="FSC" topic={props.mac+topic}>
                <TimerManager mac={props.mac} module={"R"+i} timers={[1,2,3,4]} />
                    <OnOffDeamer 
                        topic={props.mac+props.cart}
                        brihtness={props.mac+topic} 
                    />
            </Lable>
        </Carts>
    );
}


ReactDOM.render(<Termostat mac={"1234"} cart={"test"} />, document.querySelector(".root"))
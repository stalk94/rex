import React, {useReducer, useRef, useState} from "react";
import { render } from "react-dom";
import { Stage, Sprite, Container, unmountComponentAtNode, TilingSprite } from '@inlet/react-pixi/legacy';



render(()=> {
    const reducer =(_, { data })=> data
    const app =()=> {
        const [motion, update] = useReducer(reducer)
        const iter = useRef(0)
        useTick((delta)=> {
            const i = (iter.current += 0.05 * delta)
            update({
                type: 'update',
                data: {
                    
                }
            })
        })
    }

    return (
        <Stage 
            width={window.innerWidth}
            height={window.innerHeight}
            options={}
        >

        </Stage>
    );
}, document.querySelector(".root"))
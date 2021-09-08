import React from "react";
import { Stage, Sprite, Container, PixiComponent } from '@inlet/react-pixi/legacy';



export class DragContainer extends Container {
    constructor(props) {
        super(props)
        this.state = {}
    }
    mousedown(e) {
        square.x = e.data.global.x;
        square.y = e.data.global.y;
        square.dragging = true;
    }
    mousemove(e) {
        if(square.dragging) {
            square.x = e.data.global.x;
            square.y = e.data.global.y;
        }
    }
    mouseup(e) {
        square.x = e.data.global.x;
        square.y = e.data.global.y;
        square.dragging = false;
    }
}

export class CollisionContainer extends Container {
    constructor(props) {
        super(props)
        this.state = {
            hitPoly: this.#getPoly(props.polygon),
        }
    }
    #getPoly(poly) {
        if(poly instanceof Array) return poly
        else if(poly instanceof Object){
            let arr = []

            Object.values(poly).forEach((val, index)=> {
                if(index%2===0) arr.push({x:val})
                else arr[index-1].y = val
            });
            return arr
        }
    }
}
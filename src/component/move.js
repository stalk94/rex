import React, {useEffect, useState} from "react";
import Moveable from "react-moveable";



export default function Movable(props) {
    const [target, setTarget] = useState();
    const [frame, setFrame] = useState({
        rotate: 0,
        translate: [0, 0],
        scale: [1, 1],
        clipStyle: "inset",
        matrix: [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]
    });
    
    useEffect(()=> {
        setTarget(document.querySelector(props.className));
    }, [props])


    return (
        <div className="container" style={{width:"100%",height:"100%",border:"1px solid red"}}>
            { props.children }
            <Moveable
                target={target}

                draggable="true"
                rotatable="true"
                scalable="true"
                clippable="true"
                warpable="true"

                keepRatio="true"
                throttleScale={0}
                throttleRotate={0}
                rotationPosition={"top"}
                zoom={1}
                edge={false}
                clipRelative={false}
                clipArea={false}
                dragWithClip={true}
                defaultClipPath={"inset"}
                origin={true}
                clipTargetBounds={false}
                clipVerticalGuidelines={[]}
                clipHorizontalGuidelines={[]}
                snapThreshold={5}
                renderDirections={["nw","n","ne","w","e","sw","s","se"]}
                padding={{"left":0,"top":0,"right":0,"bottom":0}}
                onRotateStart={(e)=> {
                    e.set(frame.rotate);
                }}
                onRotate={({target, transform, beforeRotate})=> {
                    frame.rotate = beforeRotate;
                    target.style.transform = transform;
                }}
                onDragStart={(e)=> {
                    e.set(frame.translate);
                }}
                onDrag={(e)=> {
                    frame.translate = e.beforeTranslate;
                    e.target.style.transform = `translate(${e.beforeTranslate[0]}px, ${e.beforeTranslate[1]}px)`;
                }}
                onClip={(e)=> {
                    if(e.clipType === "rect") e.target.style.clip = e.clipStyle;
                    else e.target.style.clipPath = e.clipStyle;
                    frame.clipStyle = e.clipStyle;
                }}
                onScaleStart={(e)=> {
                    e.set(frame.scale);
                    e.dragStart && e.dragStart.set(frame.translate);
                }}
                onScale={(e)=> {
                    const beforeTranslate = e.drag.beforeTranslate;
                
                    frame.translate = beforeTranslate;
                    frame.scale = e.scale;
                    e.target.style.transform
                        = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`
                        + ` scale(${e.scale[0]}, ${e.scale[1]})`;
                }}
                onWarpStart={(e)=> {
                    e.set(frame.matrix);
                }}
                onWarp={(e)=> {
                    frame.matrix = e.matrix;
                    e.target.style.transform = `matrix3d(${e.matrix.join(",")})`;
                }}
            />
        </div>
    );
}

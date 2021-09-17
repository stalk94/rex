import Moveable from "react-moveable";


export default function Move(elem) {
    return (
        <Moveable
            target={elem.target}
                container={null}
                origin={true}
                edge={false}
                /* draggable */
                draggable={true}
                throttleDrag={0}
                onDragStart={({ target, clientX, clientY }) => {
                    console.log("onDragStart", target);
                }}
                onDrag={({
                    target,
                    beforeDelta, beforeDist,
                    left, top,
                    right, bottom,
                    delta, dist,
                    transform,
                    clientX, clientY,
                })=> {
                    console.log("onDrag left, top", left, top);
                   
                    console.log("onDrag translate", dist);
                    if(target) target.style.transform = transform;
                }}
                onDragEnd={({ target, isDrag, clientX, clientY })=> {
                    console.log("onDragEnd", target, isDrag);
                }}

                /* When resize or scale, keeps a ratio of the width, height. */
                keepRatio={true}
                resizable={true}
                throttleResize={0}
                onResizeStart={({ target , clientX, clientY})=> {
                    console.log("onResizeStart", target);
                }}
                onResize={({
                    target, width, height,
                    dist, delta, direction,
                    clientX, clientY,
                })=> {
                    console.log("onResize", target);
                    delta[0] && (target.style.width = `${width}px`);
                    delta[1] && (target.style.height = `${height}px`);
                }}
                onResizeEnd={({ target, isDrag, clientX, clientY }) => {
                    console.log("onResizeEnd", target, isDrag);
                }}
                scalable={true}
                throttleScale={0}
                onScaleStart={({ target, clientX, clientY }) => {
                    console.log("onScaleStart", target);
                }}
                onScale={({
                    target, scale, dist, delta, transform,
                    clientX, clientY,
                })=> {
                    console.log("onScale scale", scale);
                    if(target) target.style.transform = transform;
                }}
                onScaleEnd={({ target, isDrag, clientX, clientY }) => {
                    console.log("onScaleEnd", target, isDrag);
                }}

                /* rotatable */
                rotatable={true}
                throttleRotate={0}
                onRotateStart={({ target, clientX, clientY }) => {
                    console.log("onRotateStart", target);
                }}
                onRotate={({
                    target,
                    delta, dist,
                    transform,
                    clientX, clientY,
                })=> {
                    console.log("onRotate", dist);
                    if(target) target.style.transform = transform;
                }}
                onRotateEnd={({ target, isDrag, clientX, clientY }) => {
                    console.log("onRotateEnd", target, isDrag);
                }}

                /* warpable */
                /* Only one of resizable, scalable, warpable can be used. */
                /*
                this.matrix = [
                    1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, 0,
                    0, 0, 0, 1,
                ]
                */
                warpable={true}
                onWarpStart={({ target, clientX, clientY })=> {
                    console.log("onWarpStart", target);
                }}
                onWarp={({
                    target,
                    clientX,
                    clientY,
                    delta,
                    dist,
                    multiply,
                    transform,
                })=> {
                    console.log("onWarp", target);
                    // target.style.transform = transform;
                    this.matrix = multiply(this.matrix, delta);
                    target.style.transform = `matrix3d(${this.matrix.join(",")})`;
                }}
                onWarpEnd={({ target, isDrag, clientX, clientY })=> {
                    console.log("onWarpEnd", target, isDrag);
                }}
                pinchable={true}
                onPinchStart={({ target, clientX, clientY, datas })=> {
                    console.log("onPinchStart");
                }}
                onPinch={({ target, clientX, clientY, datas })=> {
                    // pinch event occur before drag, rotate, scale, resize
                    console.log("onPinch");
                }}
                onPinchEnd={({ isDrag, target, clientX, clientY, datas })=> {
                    // pinchEnd event occur before dragEnd, rotateEnd, scaleEnd, resizeEnd
                    console.log("onPinchEnd");
            }}
        />
    );
}
import React, {useState, useEffect} from 'react';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import ReactDOM from 'react-dom';


function Draggable(props) {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: props.id,
    });
    const style = {transform: CSS.Translate.toString(transform),};

    return(
        <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {props.drags.map((item, index)=> item)}
        </button>
    );
}
export function Droppable(props) {
    const {isOver, setNodeRef} = useDroppable({id: props.id,});
    const style = {opacity: isOver ? 1 : 0.5,};

    return (
        <div ref={setNodeRef} style={style}>
            {props.children}
        </div>
    );
}



function App(props) {
    const [parent, setParent] = useState(null);
    const [elems, setElem] = useState([]);
    const [cur, setCur] = useState()
    const handleDragEnd =(event)=> {
        const {over} = event;
        setParent(over ? over.id : null);
    }

    useEffect(()=> {
        
    }, [])
    

    return (
        <DndContext onDragEnd={handleDragEnd}>
            {parent === null ? cur : null}
    
            {props.containers.map((container, index)=> (
                <Droppable key={container.id} id={container.id}>
                    {parent===container.id ? elem : container.data}
                </Droppable>
            ))}
        </DndContext>
    );
}


ReactDOM.render(<App containers={[{id:"one",data:<div>x</div>},{id:"two",data:<div>xx</div>}]} />, document.querySelector("#c"))
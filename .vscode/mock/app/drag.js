import React, {useState, useEffect} from "react";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import reactDom from "react-dom";


const getItems =(data)=> (
    Array.from({length: data.length}, (val, key)=> key).map((key)=> {
        getItems.count++
        return {
            id: `item-${key + getItems.count}-${new Date().getTime()}`,
            content: `${data[key]}`
        }
    })
);
getItems.count = 0


const Del =(props)=> (
    <button
        type="button"
        onClick={()=> {
            const newState = [...props.data];
            newState[ind].splice(index, 1);
            setState(newState.filter((group)=> group.length))
        }}
    >
        delete
    </button>
);
const reorder =(list, startIndex, endIndex)=> {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};
const move =(source, destination, droppableSource, droppableDestination)=> {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};



/** 
 *  one:
 *  two: 
 */
export default function QuoteApp(props) {
    const [length, setLength] = useState(props.one.length>props.two.length?props.one.length:props.two.length)
    const [state, setState] = useState([getItems(props.one), getItems(props.two)])

    const onDragEnd =(result)=> {
        const { source, destination } = result;

        if(!destination) return;
        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;

        if(sInd === dInd){
            const items = reorder(state[sInd], source.index, destination.index);
            const newState = [...state];
            newState[sInd] = items;
            setState(newState);
        } 
        else {
            const result = move(state[sInd], state[dInd], source, destination);
            const newState = [...state];
            newState[sInd] = result[sInd];
            newState[dInd] = result[dInd];

            setState(newState.filter((group)=> group.length));
        }
    }
    const getItemStyle =(isDragging, draggableStyle)=> ({
        userSelect: "none",
        padding: length * 2,
        margin: `0 0 5px 0`,
        background: isDragging ? "lightgreen" : "#0000004d",
        ...draggableStyle
    });
    const getListStyle =(isDraggingOver)=> ({
        background: isDraggingOver ? "lightblue" : "lightgrey",
        padding: 5,
        width: "100%"
    });


    return(
        <div>
            <div style={{display: "flex"}}>
                <DragDropContext onDragEnd={onDragEnd}>
                    {state.map((el, index)=> (
                        <Droppable key={index} droppableId={`${index}`}>
                            {(provided, snapshot)=> (
                                <div
                                    ref={provided.innerRef}
                                    style={getListStyle(snapshot.isDraggingOver)}
                                    {...provided.droppableProps}
                                >
                                {el.map((item, index)=> (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}
                                    >
                                        {(provided, snapshot)=> (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                                            >
                                                <div style={{display: "flex",justifyContent: "space-around"}}>
                                                    {item.content}
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                        </Droppable>
                    ))}
                </DragDropContext>
            </div>
        </div>
    );
}

reactDom.render(<QuoteApp one={[1,2,3]} two={[4]} />, document.querySelector(".root"))
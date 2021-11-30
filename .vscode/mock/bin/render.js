import React, { useState, useEffect } from 'react';
import { List } from "./doc";


/**
 *  `catalog`: {
 *      `chapter`: [
 *          { `name`: Function }
 *      ]
 *  }
 */
function SceneComponentsCatalog(props) {
    return(
        <div className="Catalog">
            {
                Object.keys(props.catalog).forEach((chapter)=> {
                    return <DropDowm name={ chapter } events={ props.catalog[chapter] } handler={props.onCreateLayer}/>
                })
            }
        </div>
    );
}


///////////////////////////////////////////////////////////////
class Scene extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            layers: [],
            events: []
        }
        this.createLayer = this.createLayer.bind(this)
        this.layerOnChangeZ = this.layerOnChangeZ.bind(this)
    }
    createLayer(initComponent) {
        this.setState({
            layers: [...this.state.layers, initComponent]
        })
    }
    layerOnChangeZ(layerTarget, newZindex) {
        console.log(`layer change z index to ${newZindex}:`, layerTarget)
    }
    createGroup(ownerLayer, ...layers) {
        //* `ownerLayer`: компонент реакт который станет родительским для `layers` (!только реакт компоненты)
        //todo: перестроить массив `this.state.layers`

        let newGroup =()=> <ownerLayer>{ layers.map((inerLayer)=> <inerLayer/>) }</ownerLayer>
    }
    render() {
        return(
            <div>
                <React.Fragment>{
                    this.state.layers.map((layer, index)=> {
                        if(layer) return <layer x={0} y={0} z={index}/>
                    })
                }
                </React.Fragment>
                <SceneComponentsCatalog events={this.state.events} onCreateLayer={this.createLayer}/>
            </div>
        );
    }
}

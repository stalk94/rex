import React, { useState, useEffect } from "react";
import { SmallNavigations } from "../src/component/diagrams"
import {OnOffDeamer, Centr} from "../src/component/device.f";
import Carts from "../src/component/cart-bar";
import ReactDOM from "react-dom";
import UI from "../src/app"
const logs = []
const skrins = []
const snaps = []


// контекст
const db = {
    id: 2,
    login: 'test3',
    firstName: '',
    lastName: '',
    phone: '',
    adres: '',
    kontact1: '',
    kontact2: '',
    avatar: '/no-avatar.447c9269.png',
    status: 'off',
    sheme: {},
    devices: [],
    rooms: [ 
        { name: 'Серверная', visibility: 'block' },
        { name: 'новая комната 9', visibility: 'block' },
        { visibility: 'block', name: 'туалет' },
        { visibility: 'block', name: 'тест7' } 
    ],
    SHEME: {},
    nodes: { 
        '94b97ee62258': { 
        _mac: '94b97ee62258',
        _type: 'SMR',
        _name: 'test',
        _frame: 0,
        _knx: '',
        table: { 
            reley: { 
                R0: [ 'all', 'name', 'room', 'ga1', 'ga2', 'gafb' ],
                R1: [ 'all', 'name', 'room', 'ga1', 'ga2', 'gafb' ],
                R2: [ 'all', 'name', 'room', 'ga1', 'ga2', 'gafb' ],
                R3: [ 'all', 'name', 'room', 'ga1', 'ga2', 'gafb' ],
                R4: [ 'all', 'name', 'room', 'ga1', 'ga2', 'gafb' ],
                R5: [ 'all', 'name', 'room', 'ga1', 'ga2', 'gafb' ],
                R6: [ 'all', 'name', 'room', 'ga1', 'ga2', 'gafb' ],
                R7: [ 'all', 'name', 'room', 'ga1', 'ga2', 'gafb' ] 
            },
            button: { 
                B0: [ 'all', 'name', 'ga1', 'ga2', 'gafb', 'ga1mode', 'ga2mode' ],
                B1: [ 'all', 'name', 'ga1', 'ga2', 'gafb', 'ga1mode', 'ga2mode' ],
                B2: [ 'all', 'name', 'ga1', 'ga2', 'gafb', 'ga1mode', 'ga2mode' ],
                B3: [ 'all', 'name', 'ga1', 'ga2', 'gafb', 'ga1mode', 'ga2mode' ],
                B4: [ 'all', 'name', 'ga1', 'ga2', 'gafb', 'ga1mode', 'ga2mode' ],
                B5: [ 'all', 'name', 'ga1', 'ga2', 'gafb', 'ga1mode', 'ga2mode' ],
                B6: [ 'all', 'name', 'ga1', 'ga2', 'gafb', 'ga1mode', 'ga2mode' ],
                B7: [ 'all', 'name', 'ga1', 'ga2', 'gafb', 'ga1mode', 'ga2mode' ],
                B8: [ 'all', 'name', 'ga1', 'ga2', 'gafb', 'ga1mode', 'ga2mode' ],
                B9: [ 'all', 'name', 'ga1', 'ga2', 'gafb', 'ga1mode', 'ga2mode' ],
                B10: [ 'all', 'name', 'ga1', 'ga2', 'gafb', 'ga1mode', 'ga2mode' ],
                B11: [ 'all', 'name', 'ga1', 'ga2', 'gafb', 'ga1mode', 'ga2mode' ],
                B12: [ 'all', 'name', 'ga1', 'ga2', 'gafb', 'ga1mode', 'ga2mode' ],
                B13: [ 'all', 'name', 'ga1', 'ga2', 'gafb', 'ga1mode', 'ga2mode' ],
                B14: [ 'all', 'name', 'ga1', 'ga2', 'gafb', 'ga1mode', 'ga2mode' ],
                B15: [ 'all', 'name', 'ga1', 'ga2', 'gafb', 'ga1mode', 'ga2mode' ] 
            } 
        },
        cart: { 
            guid: 0,
            reley: [ 
                '/R0/onoff',
                '/R1/onoff',
                '/R2/onoff',
                '/R3/onoff',
                '/R4/onoff',
                '/R5/onoff',
                '/R6/onoff',
                '/R7/onoff' 
            ]} 
        }
    },
    firsName: 'test',
    password: 'U2FsdGVkX1+03bIDLPWt365jo/EKTwEFdblYOKQxOcA=',
    payloads: { '94b97ee62258/R7/onoff': '0',
        '94b97ee62258/R0/room': 1,
        '94b97ee62258/R0/name': 'test',
        '94b97ee62258/R1/onoff': '0',
        '94b97ee62258/R0/Set4onoff': '0' 
    },
    token: 'U2FsdGVkX1+g1lq79SDvJtGuKL7JVqh1PNUyYvAB4RX0jeKCXqakllP2g5ObVO2Z' 
}


const useStory =(key, data)=> {
    logs.push({[key]: data})
	store.set("test_log", logs)
}
const saveSnap =(name, snapshot)=> {
	snaps.push(snapshot)
}


// инькция тестового контекста
EVENT.on("test.start", ()=> {
	store.set("user", db)
    store.set("curent.room", {name:"Избранное", id:-1})
})

// имитаторы сокетов
EVENT.on("triger", (str)=> {
	store.set("triger", str)
})
EVENT.on("set", (data)=> {
	useStory("", data)
})
EVENT.on("get", (data)=> {
	
})
EVENT.on("del", (data)=> {
	
})
EVENT.on("exit", (data)=> {
	console.log(data.toJSON())
	saveSnap(data.root.name, component.toJSON())
})

// по окончанию зачищаем localstorage и сохраняем снимки
EVENT.on("test.end", ()=> {
    localStorage.clear()
    store.set("SNAPSHOTS", snaps)
})
window.socket = EVENT
////////////////////////////////////////////////////////////



const Test =(props)=> {

    return(
        <div>test</div>
    )
}



EVENT.emit("test.start", "")
ReactDOM.render(<Test/>, document.querySelector(".root"))
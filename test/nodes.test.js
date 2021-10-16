const NODES = require("../server/nodes.json");
const {parser, cartParse} = require("../server/func");


const metaCarta = {}
const nodes = {}
const getGuid =()=> {
    if(!getGuid.count) getGuid.count = 0
    return getGuid.count++
}


parser(NODES.FSC).map((module, i)=> {
    let key = Object.keys(NODES.FSC)[i]
    if(cartParse(key)) metaCarta[key] = cartParse(key)
    nodes[i] = module
});



function mockAddDevice() {
    let kart = {_room:0, _guid:getGuid(), _name:''}

    Object.keys(metaCarta).map((val)=> {
        if(metaCarta[val].length > 0) kart[val] = metaCarta[val]
    });

    return kart
}


const result = mockAddDevice()



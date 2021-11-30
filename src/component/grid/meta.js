export const META =()=> ({
    reley: [
        {type:"lable", data:"Реле", color:"#90e160cc"},         //скрытый топик вызова (всех реле группы)  
        {type:'input', data:"name"},                            //не обязательный топик имени
        {type:'select', name:"room", data:store.get("user").rooms.map((room)=> room.name)},
        {type:'input', data:"GA1"}, 
        {type:'input', data:"GA2"}, 
        {type:'input', data:"GA-status"}                       
    ],
    button: [
        {type:"lable", data:"INP", color:"#f4ea7c"},            //скрытый топик вызова (всех кнопок группы)
        {type:'input', data:"name"}, 
        {type:'select', name:"mod", data:['click','turnON','turnOFF','dimming','longClick','gerkonONOFF','gerkonOFFON','MS1min','MS5min','MS10min']},
        {type:'input', data:"GA1"}, 
        {type:'select', name:"mod", data:['click','turnON','turnOFF','dimming','longClick','gerkonONOFF','gerkonOFFON','MS1min','MS5min','MS10min']},
        {type:'input', data:"GA2"}, 
        {type:'input', data:"GA-status"}
    ],
    dimmer: [
        {type:"lable", data:"Димер", color: "#24bfe5"},
        {type:'input', data:"name"}, 
        {type:'select', name:"room", data:store.get("user").rooms.map((room)=> room.name)},
        {type:'input', data:"GA1"}, 
        {type:'input', data:"GA2"}, 
        {type:'input', data:"GA1-relative"}, 
        {type:'input', data:"GA2-relative"}, 
        {type:'input', data:"GA1-absolute"},
        {type:'input', data:"GA2-absolute"}, 
        {type:'input', data:"GA-absolute-status"},
        {type:'input', data:"GA-status"}
    ],
    termo: [
        {type:"lable", data:"Термостат", color: "#d77575"},
        {type:'input', data:"name"},
        {type:'select', name:"room", data:store.get("user").rooms.map((room)=> room.name)},
        {type:'select', name:"mod", data:["Heat", "Heat+2", "Auto(heat/cool)", "Auto(heat+2/cool+2)", "Cool", "Cool+2", "Humidity", "Humidity+2", "CO2", "CO2+2"]},
        {type:'input', data:"data-ga"},
        {type:'input', data:"onoffGA"},
        {type:'input', data:"set0GA"}, 
        {type:'input', data:"set0fbGA"},
        {type:'input', data:"modeGA"}, 
        {type:'input', data:"modefbGA"},
        {type:'input', data:"heat1GA"},
        {type:'input', data:"heat2GA"},
        {type:'input', data:"heat3GA"}, 
        {type:'input', data:"cool1GA"},
        {type:'input', data:"cool2GA"}, 
        {type:'input', data:"cool3GA"}
    ],
    ir: [
        {type:"lable", data:"ИК-пульт", color: "#af7ed7"},
        {type:'input', data:"name"},
        {type:'input', data:"GA1"}, 
        {type:'input', data:"GA2"},
        {type:'input', data:"GA3"}, 
        {type:'input', data:"GA4"},
        {type:'input', data:"GA5"}, 
        {type:'input', data:"GA6"},
        {type:'input', data:"GA7"}, 
        {type:'input', data:"GA8"},
        {type:'input', data:"GA9"}, 
        {type:'input', data:"GA10"},
        {type:'input', data:"GA-status"}
    ],
    sensor: [
        {type:"lable", data:"Сенсор", color: "#fb41a4"},
        {type:'input', data:"name"},
        {type:'input', data:"GA1"}
    ],
    lrgb: [
        {type:"lable", data:"RGB", color: "#b97809"},
        {type:'input', data:"name"},
        {type:'select', name:"room", data:store.get("user").rooms.map((room)=> room.name)},
        {type:'input', data:"GA1"},
        {type:'input', data:"GA2"},
        {type:'input', data:"GA1-relative"}, 
        {type:'input', data:"GA2-relative"}, 
        {type:'input', data:"GA1-absolute"},
        {type:'input', data:"GA2-absolute"}, 
        {type:'input', data:"GA-absolute-status"}, 
        {type:'input', data:"GA-status"}
    ]
});



export const useParse =(type, index)=> META()[type][index]
//export const useSocket =(key, val)=> socket.emit("set", {req:[key, val]})
export const useWatch =(fn)=> store.watch("user", (data)=> fn(data))
export const useUser =()=> store.get("user")
export const useChek =(topic)=> store.get("user").payloads[topic]
export const useArray =(data, def)=> {
    let payload = store.get("user").payloads

    if(data instanceof Array){
        let rezult = {}
        data.map((val, i)=> rezult[val] = payload[def+val+"st"])
        return rezult
    }
    else if(data instanceof Object) {
        let rezult = {}
        Object.keys(data).map((key)=> {
            console.log(key)
            rezult[key] = payload[key]
        })
        return rezult
    }
}
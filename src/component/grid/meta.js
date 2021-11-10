export const META =()=> ({
    reley: [
        {type:"lable", data:"Реле", color:"#90e160cc"},         //скрытый топик вызова (всех реле группы)  
        {type:'input', data:"name"},                            //не обязательный топик имени
        {type:'select', name:"room", data:store.get("user").rooms.map((room)=> room.name)},
        {type:'input', data:"GA1"}, 
        {type:'input', data:"GA2"}, 
        {type:'input', data:"GAstatus"}                       
    ],
    button: [
        {type:"lable", data:"INP", color:"#f4ea7c"},            //скрытый топик вызова (всех кнопок группы)
        {type:'input', data:"name"}, 
        {type:'select', name:"mod", data:['click','turnON','turnOFF','dimming','longClick','gerkonONOFF','gerkonOFFON','MS1min','MS5min','MS10min']},
        {type:'input', data:"GA1"}, 
        {type:'select', name:"mod", data:['click','turnON','turnOFF','dimming','longClick','gerkonONOFF','gerkonOFFON','MS1min','MS5min','MS10min']},
        {type:'input', data:"GA2"}, 
        {type:'input', data:"GAstatus"}
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
        {type:'input', data:"GA-feedback"}
    ],
    termo: [
        {type:"lable", data:"Термостат", color: "#d77575"},
        {type:'input', data:"name"},
        {type:'select', name:"room", data:store.get("user").rooms.map((room)=> room.name)},
        {type:'input', data:"GA-data"}, 
        {type:'input', data:"onoff"}, 
        {type:'input', data:"onoff-status"}, 
        {type:'input', data:"heat1"},
        {type:'input', data:"heat1-status"}, 
        {type:'input', data:"heat2"},
        {type:'input', data:"heat2-status"}, 
        {type:'input', data:"heat3"},
        {type:'input', data:"heat3-status"},
        {type:'input', data:"cool1"},
        {type:'input', data:"cool1-status"}, 
        {type:'input', data:"cool2"},
        {type:'input', data:"cool2-status"}, 
        {type:'input', data:"cool3"},
        {type:'input', data:"cool3-status"}
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
    ]
});



export const useParse =(type, index)=> META()[type][index]
export const useSocket =(key, val)=> socket.emit("set", {req:[key, val]})
export const useWatch =(fn)=> store.watch("user", (data)=> fn(data))
export const useUser =()=> store.get("user")
export const useChek =(topic)=> store.get("user").payloads[topic]
export const useArray =(data, def)=> {
    let payload = useUser().payloads

    if(data instanceof Array){
        let rezult = {}
        data.map((val, i)=> rezult[val]=payload[def+val])
        return rezult
    }
    else if(data instanceof Object) {
        let rezult = {}
        Object.keys(data).map((key)=> {
            rezult[key] = payload[def+key]
        })
        return rezult
    }
}
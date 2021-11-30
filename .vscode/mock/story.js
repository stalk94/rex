const listens =(id, topic, data)=> {
    console.log("[🔌]:", topic, data.detail.value)

    if(topic==="onoff") data["onoff"] = data.detail.value===1?"true":"false"
    else if(topic==='brihtness') data["brihtness"] = +data.detail.value
    else if(topic==="temp") data["temp"] = +data.detail.value
}


Object.keys(props.sheme).forEach((key)=> {
    props.sheme[key].forEach((str)=> {
        let tokens = str.split("/")
        console.log(props.mac+str+"st")

        window.api.subscribe(props.mac+str+"st")
        window.on(props.mac+str+"st", (val)=> {
            listens(tokens[2], val)
            props.save(props.data)
        })
    })
});



: user.state.devices.map((device, index)=> {
    if(user.state.devices && user.state.devices.length!==0){
    return <Device key={Math.random()}
        id={index}
        type={device.type} 
        title={device.name} 
        sheme={device.sheme}
        mac={device.mac}
        api={props.api}
        room={user.state.rooms[device.room]?user.state.rooms[device.room].name:""} 
        image={ICON[device.type]}
    />
}
})}

<Favorite devices={user.state.devices} rooms={user.state.rooms} />
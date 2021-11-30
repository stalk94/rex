const Main =(props)=> {
    let rooms = store.get("user").rooms
    return(
        <React.Fragment>
            <Menu menuButton={<MenuButton>{props.title}</MenuButton>}  transition>
                <MenuItem onClick={()=> props.home({name:"Избранное"})}>
                    <AiFillStar style={{marginBottom:"5px"}}/><div style={{marginBottom:"4%",color:"#fae247b3"}}>Избранное</div>
                </MenuItem>
                    {rooms.map((room, id)=> {
                        if(id!==0) return(
                            <MenuItem key={id} onClick={()=> props.room(room)}>
                                <div style={{color:"#cccccc"}}>{room.name}</div>
                            </MenuItem>
                        )
                    })}
                <MenuItem onClick={props.add}>
                    <div style={{marginTop:"6%",display:"flex",flexDirection:"row"}}>
                        <AiFillDatabase/><div style={{color:"#fae247b3",padding:"3px"}}>Серверная</div>
                    </div>
                </MenuItem>
                <MenuItem onClick={onExit}>
                    <div style={{color:"brown"}}>Выход</div>
                </MenuItem>
            </Menu>
            <h3 style={props.style} className="Error">{ props.error }</h3>
            <img className="link" onClick={props.user} id="user" src={userIcon}/>
        </React.Fragment>
    );
}
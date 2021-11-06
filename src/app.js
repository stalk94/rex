import React from "react";
import App from "./application";
import Main from "./index";



window.onload =()=> {
    const UI =()=> {
        const [render, setRender] = useState("")
    
        useEffect(()=> {
            if(store.get("user") && store.get("user").login && store.get("user").password){
                send("auth", {login:store.get("user").login, password:store.get("user").password}, "POST").then((res)=> {
                    res.json().then((userData)=> {
                        if(!userData.error){
                            store.set("user", userData)
                            setRender(<App user={userData} />)
                            socket.emit("init", {login:store.get("user").login, password:store.get("user").password})
                        }
                        else alert("login or password error")
                    });
                });
            }
            else setRender(<Main useRender={(data)=> setRender(<App user={data} />)}/>);
        }, [])
    
    
        return(
            <>{ render }</>
        );
    }

    ReactDOM.render(<UI/>, document.querySelector(".root"))
}
import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import { Fullpage, Slide, HorizontalSlider } from 'fullpage-react';
import Authorize from "./component/authorize";
import { send } from "./engine";
import "./css/main.css";
import logo from "./img/logo.jpg";
import figure from "./img/figure.svg";
import gm from "./img/gm.svg";
import p1 from "./img/promo-1.jpg";
import p2 from "./img/promo-2.jpg";


/////////////////////////////////////////////////////
const fullPageOptions = {
    scrollSensitivity: 3,
    touchSensitivity: 3,
    scrollSpeed: 450,
    hideScrollBars: true,
    enableArrowKeys: true
};
const text1 = `
    Домашняя автоматизация — система домашних устройств, способных выполнять действия и решать определённые повседневные задачи без участия человека.
    Домашняя автоматизация в современных условиях — чрезвычайно гибкая система, которую пользователь конструирует и настраивает самостоятельно в зависимости 
    от собственных потребностей. 
    Это предполагает, что каждый владелец умного дома самостоятельно определяет, какие устройства куда установить и какие задачи они будут исполнять.
`;
const text2 = `
    О проекте: 
`;

const GM =(props)=> <img className="gm" onClick={props.open} src={gm}/>;

/////////////////////////////////////////////////////


function Main() {
    const verify =()=> {
        let userStorage = window.localStorage.getItem("user")
        let data = JSON.parse(userStorage)
    
        if(userStorage) send("auth", {login:data.login, password:data.password}, "POST").then((res)=> {
            res.json().then((userData)=> {
                if(!userData.error){
                    window.localStorage.setItem("user", JSON.stringify(userData))
                    document.location.href = "app.html"
                }
                else {
                    window.localStorage.clear()
                }
            });
        });
        else {
            onHead(
                <React.Fragment>
                    <GM open={verify}/>
                    <h3 style={{color:"brown", marginLeft:"5%"}}>Воспользуйтесь формой регистрации/авторизации</h3>
                </React.Fragment>
            );
            setTimeout(()=> onHead(<GM open={verify}/>), 6000)
        }
    }
    const [head, onHead] = useState(<GM open={verify}/>)
    

    fullPageOptions.slides = [
        <Slide className="section-1"> 
            <header>{ head }</header>
            <img className="figure" src={ figure }/>
            <img className="logo-index" src={ logo }/>

            <Authorize 
                onOk={(userData)=> {
                    window.localStorage.setItem("user", JSON.stringify(userData))
                    document.location.href = "app.html"
                }}
                onErr={(textError)=> {
                    onHead(
                        <div className="line">
                            <GM open={verify}/>
                            <h3>{textError}</h3>
                        </div>
                    )
                }}
            />
        </Slide>,
        <Slide className="section-2">
            <h1>{ text1 }</h1>
            <img src={ p2 } style={{width:"110vw"}}/>
        </Slide>,
        <Slide className="section-3"> 
            <h1>{ text2 }</h1>
            <img src={ p1 } style={{opacity:"0.6"}}/>
        </Slide>
    ];


    return(<Fullpage {...fullPageOptions} />);
}



ReactDOM.render(<Main/>, document.querySelector(".root"));
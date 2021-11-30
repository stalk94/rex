import React, { useEffect, useState } from 'react';
import { useDebounce, useWillUnmount, useToggle, useDidMount, useDebouncedValue } from "rooks";
import { RangeInput } from "grommet";
import { BsSnow } from "react-icons/bs";
import { WiDaySunny } from "react-icons/wi";
import { MdOutlineMotionPhotosAuto } from "react-icons/md";
import { SelectRgb } from "./input";
import { SketchPicker } from 'react-color';
import lamp from '../img/lamp.png';
import onOff from '../img/onOff.png';
import wtor from '../img/wtor.png';
import logic from '../img/logic.png';
import termostat from '../img/termostat.png';



export const ICON = {
    lamp: lamp,
    toogler: onOff,
    wtor: wtor,
    logic: logic,
    termostat: termostat
}
const iconMod = [<BsSnow/>, <MdOutlineMotionPhotosAuto/>, <WiDaySunny/>]
const colorLamp = {
    r0: "#f63131",      //red
    r1: "#55f631",      //green
    r2: "#3170f6",      //blue
    r3: "#f056f5",      //MAGENTA
    r4: "#8ff5ea",      //CYAN
    r5: "#f5ee8f",      //YELLOW
    r6: "#ceeff2",      //WHITE
    r7: "#ffffff",      //white
    r8: "#efedd7"       
}
const useColor =(index)=> {
    let result;
    //! используй find дурень
    if(index) Object.keys(colorLamp).forEach((key, i)=> {
        if(+index===i) result = key
    });
    return result
}
const Colorizer =(props)=> (
    <span value={colorLamp[props.color]} style={{width:"100%", height:"30px", background:colorLamp[props.color]}}>-</span>
);
const useColorTermo =(regim)=> {
    if(+regim===2) return "rgb(246, 227, 49)"
    else if(+regim===1)return "rgb(84, 226, 242)"
    else if(+regim===0) return 'rgb(175, 175, 172)'
}


export const Curtain =(props)=> (
    <svg xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 500" 
        width="80px"
        height="80px"
    >
        <g transform="matrix(0.133711, 0, 0, 0.140856, 261.996887, -113.970306)">
            <path fill={props.color??"#91b6f2"} d="M 801.939 2158.093 C 685.515 2132.409 656.932 2040.851 650.439 1975.829 L 617.318 1954.496 L 584.193 1975.829 C 577.703 2040.851 549.117 2132.409 432.693 2158.092 C 471.8 2197.196 495.656 2243.994 499.446 2317.568 L 735.185 2317.568 C 738.977 2243.995 762.833 2197.196 801.939 2158.093 Z"/>
        </g>

        <g transform="matrix(0.133711, 0, 0, 0.140856, 310.739258, 149.297455)">
            <path fill="#000003" d="M90.044,205.482c1.583,0.832,3.281,1.227,4.955,1.227c3.836,0,7.542-2.075,9.452-5.706l0.282-0.541 c2.744-5.213,0.741-11.664-4.471-14.408c-5.213-2.744-11.666-0.742-14.41,4.472l-0.286,0.549 C82.826,196.291,84.829,202.741,90.044,205.482z"/>
            <path fill="#000003" d="M501.333,21.332H287.795h-63.592H10.667C4.776,21.332,0,26.108,0,31.999v426.665 c0,17.646,14.353,32.002,31.998,32.002c8.19,0,15.668-3.096,21.335-8.174c5.664,5.079,13.142,8.174,21.333,8.174 c8.188,0,15.666-3.096,21.333-8.174c5.665,5.079,13.142,8.174,21.331,8.174c17.647,0,32.002-14.356,32.002-32.002 c0-0.017-0.002-0.033-0.002-0.05c0-3.593-0.059-7.12-0.142-10.617h213.623c-0.083,3.497-0.142,7.025-0.142,10.617 c0,0.017-0.002,0.033-0.002,0.05c0,17.646,14.355,32.002,32,32.002c8.188,0,15.666-3.096,21.333-8.174 c5.664,5.079,13.142,8.174,21.333,8.174c8.19,0,15.668-3.096,21.333-8.174c5.665,5.079,13.142,8.174,21.333,8.174 c17.645,0,32-14.356,32-32.002V31.999C512,26.108,507.222,21.332,501.333,21.332z M261.776,65.29 c-0.075-0.049-0.156-0.086-0.231-0.133c-0.194-0.117-0.387-0.233-0.588-0.337c-0.14-0.074-0.279-0.138-0.421-0.205 c-0.164-0.078-0.332-0.156-0.5-0.224c-0.175-0.071-0.35-0.134-0.527-0.196c-0.142-0.049-0.284-0.098-0.427-0.142 c-0.196-0.06-0.394-0.111-0.594-0.158c-0.131-0.032-0.265-0.064-0.398-0.09c-0.202-0.041-0.404-0.073-0.606-0.101 c-0.142-0.02-0.284-0.038-0.427-0.053c-0.188-0.018-0.378-0.031-0.564-0.039c-0.164-0.007-0.328-0.013-0.49-0.013 c-0.166,0-0.334,0.004-0.5,0.013c-0.186,0.009-0.371,0.021-0.556,0.039c-0.146,0.015-0.291,0.033-0.435,0.053 c-0.201,0.028-0.398,0.061-0.596,0.099c-0.138,0.028-0.273,0.06-0.411,0.093c-0.196,0.047-0.389,0.097-0.584,0.156 c-0.146,0.045-0.291,0.094-0.435,0.145c-0.175,0.061-0.348,0.123-0.518,0.193c-0.173,0.07-0.341,0.149-0.511,0.228 c-0.138,0.065-0.275,0.128-0.411,0.199c-0.205,0.107-0.4,0.223-0.596,0.342c-0.075,0.046-0.153,0.083-0.227,0.13l-15.269,9.834 c0.542-13.14,0.35-24.321,0.146-32.458h41.799c-0.204,8.137-0.396,19.317,0.146,32.457L261.776,65.29z M112.569,42.667 c0.244,28.394-0.662,76.483-15.182,120.167c-1.856,5.591,1.169,11.63,6.759,13.488c1.117,0.371,2.252,0.547,3.367,0.547 c4.469,0,8.634-2.832,10.121-7.306c15.553-46.804,16.524-97.231,16.272-126.896h28.55c0.332,25.763-0.387,68.656-12.613,110.876 c-16.397,56.62-48.299,92.619-94.834,107.081l-22.787-8.203c31.566-32.819,47.784-103.163,48.296-209.754H112.569z M170.336,159.478c12.93-44.651,13.759-90.721,13.453-116.811h29.969c0.317,12.277,0.629,30.019-1.209,50.293 c-0.275,1.077-0.387,2.194-0.317,3.312c-5.332,52.684-25.654,120.993-97.433,155.619 C140.188,230.231,158.79,199.352,170.336,159.478z M299.448,92.962c-1.838-20.274-1.525-38.017-1.211-50.294h29.971 c-0.306,26.089,0.525,72.17,13.459,116.824c11.549,39.87,30.148,70.745,55.536,92.403 c-71.785-34.627-92.107-102.939-97.439-155.626C299.835,95.152,299.723,94.038,299.448,92.962z M378.112,42.667 c-0.133,24.929,0.767,70.448,10.878,113.883c10.263,44.093,27.6,76.832,51.711,97.856c-37.751-17.29-64.132-51.109-78.539-100.85 c-12.23-42.223-12.951-85.126-12.62-110.889C349.542,42.667,378.112,42.667,378.112,42.667z M478.037,253.048 c-52.308-22.48-78.712-93.2-78.556-210.38h32c0.514,106.591,16.733,176.935,48.295,209.754L478.037,253.048z M490.665,232.424 c-13.284-16.895-23.435-44.404-29.777-81.165c-5.233-30.331-7.88-65.953-8.071-108.593h37.848V232.424z M59.182,42.667 c-0.19,42.638-2.835,78.26-8.069,108.593c-6.344,36.76-16.495,64.269-29.777,81.165V42.667H59.182z M31.998,469.333 c-5.88,0-10.663-4.785-10.663-10.667V297.395c14.501,37.082,21.674,89.465,21.357,156.494c-0.009,1.719-0.015,3.241-0.017,4.565 c0,0.071-0.011,0.14-0.011,0.211C42.666,464.548,37.88,469.333,31.998,469.333z M74.666,469.333 c-5.846,0-10.603-4.73-10.659-10.564c0-0.035,0.004-0.068,0.004-0.103c0-1.341,0.009-2.906,0.017-4.674 c0.138-29.017,0.494-105.746-23.16-165.232c7.486,10.317,14.113,22.146,19.803,35.37c22.256,51.733,24.66,111.32,24.66,134.536 C85.331,464.548,80.546,469.333,74.666,469.333z M117.33,469.333c-5.88,0-10.663-4.785-10.663-10.667 c0-24.538-2.573-87.591-26.396-142.968c-4.429-10.292-9.397-19.859-14.869-28.656l0.059,0.021 c43.798,44.588,62.536,96.064,62.536,171.604c0,0.006,0.002,0.014,0.002,0.02C127.985,464.558,123.205,469.333,117.33,469.333z M148.118,426.663c-2.315-29.426-7.976-55.34-17.138-78.57c-9.19-23.296-22.2-44.504-39.557-64.411 c30.721-9.176,56.931-23.742,78.102-43.433c20.952-19.49,37.159-44.173,48.166-73.365c8.376-22.207,12.855-44.764,15.199-65.054 l23.112-14.883l23.108,14.883c2.344,20.29,6.825,42.846,15.199,65.052c11.007,29.193,27.215,53.876,48.168,73.366 c21.169,19.69,47.376,34.258,78.1,43.433c-17.358,19.908-30.367,41.116-39.555,64.411c-9.163,23.23-14.824,49.144-17.138,78.57 H148.118z M437.334,469.333c-5.882,0-10.665-4.785-10.665-10.667c0-16.121,1.139-48.43,8.772-83.693 c1.246-5.758-2.411-11.437-8.169-12.684c-5.755-1.245-11.437,2.411-12.683,8.169c-8.053,37.204-9.255,71.233-9.255,88.207 c0,5.882-4.785,10.667-10.665,10.667c-5.876,0-10.653-4.775-10.665-10.647c0-0.006,0.002-0.014,0.002-0.02 c0-75.54,18.736-127.017,62.534-171.604l14.119-5.083c0.006-0.002,0.013-0.004,0.017-0.006l15.927-5.733 c-29.18,60.744-28.78,146.653-28.632,177.753c0.009,1.769,0.017,3.332,0.017,4.672c0,0.046,0.006,0.09,0.006,0.134 C447.919,464.619,443.169,469.333,437.334,469.333z M480,469.333c-5.882,0-10.665-4.785-10.665-10.667 c0-0.093-0.011-0.182-0.013-0.274c-0.002-1.309-0.009-2.808-0.017-4.499c-0.317-67.03,6.859-119.414,21.36-156.497v161.27 C490.665,464.548,485.88,469.333,480,469.333z"/>
            <path fill="#000003" d="M436.688,331.467c-5.598-1.831-11.623,1.224-13.453,6.824l-0.208,0.639 c-1.794,5.612,1.303,11.615,6.913,13.408c1.08,0.346,2.173,0.509,3.25,0.509c4.516,0,8.711-2.891,10.159-7.422l0.164-0.502 C445.343,339.322,442.288,333.298,436.688,331.467z"/>
        </g>
    </svg>
);
export const RangeTermostat =()=> {
    const [brightness, setBrightness] = useState(store.get("user").payloads[props.brightness+"st"]??0)

    useDidMount(()=> {
        if(!window.useSub) window.useStart();
        setTimeout(()=> useSub(props.brightness+"st", brightness, setBrightness), 500)
    })
    useWillUnmount(()=> useUnmountSub(props.brightness+"st"))

    return(
        <RangeInput 
            onChange={(ev)=> {setBrightness(ev.target.value);usePub(props.brightness, ev.target.value)}}
            value={brightness}
            min={5}
            max={43}
        />
    );
};
/** 
 * topic:   
 * data:    
 * brihtness:
 */
export function ProgressBar(props) { 
    const [onoff, setOnoff] = useState(store.get("user").payloads[props.onoff+"st"]??0)
    const [data, setData] = useState(store.get("user").payloads[props.data+"st"]??0)
    const [color, setColor] = useState(store.get("user").payloads[props.mode]+"st"??1)

    useDidMount(()=> {
        if(!window.useSub) window.useStart();

        setTimeout(()=> {
            useSub(props.mode+"st", color, (i)=> setColor(useColorTermo(i)));
            useSub(props.onoff+"st", 0, setOnoff)
            useSub(props.data+"st", 0, setData)
        }, 500)
    });
    useWillUnmount(()=> {
        setTimeout(()=> {
            useUnmountSub(props.mode+"st")
            useUnmountSub(props.onoff+"st")
            useUnmountSub(props.data+"st")
        }, 300)
    });


    return(
        <div onClick={()=> usePub(props.onoff, +onoff===1?0:1)} className="top-device" style={props.style}>  
            <svg className="progress" xmlns="http://www.w3.org/2000/svg"
                version="1.1"  
                x={props.x ? props.x : "0px"} 
                y={props.y ? props.y : "0px"} 
                viewBox="0 0 100 100"
            >
                <path className="track" 
                    transform="translate(-10 8) rotate(45 50 50)" 
                    d="M40,72C22.4,72,8,57.6,8,40C8,22.4,22.4,8,40,8c17.6,0,32,14.4,32,32">
                </path>
                <text className="temp" x="40%" y="50%"> 
                    { +data===0 ? 'off' : data } 
                </text>
                <path style={{stroke:+onoff===0?useColorTermo(0):color}} 
                    className="fill"
                    transform="translate(-10 8) rotate(45 50 50)" 
                    d="M40,72C22.4,72,8,57.6,8,40C8,22.4,22.4,8,40,8c17.6,0,32,14.4,32,32">
                </path>
                <foreignObject height="100%" width="100%" x={0} y={50} >
                    <input style={{width:"30px",height:"10px",boxShadow: "inset 0 0 2px rgba(0,0,0,0.5)"}} 
                        type="checkbox"
                        value={+onoff}
                    />
                </foreignObject>
            </svg>
        </div>
    );
}


/** 
 * topic: onoff
 * brihtness:
 */
export const OnOffDeamer =(props)=> {
    const style = {display:"flex",flexDirection:"row",width:"60%",marginTop:"10%"}
    const [brightness, setBrightness] = useState(store.get("user").payloads[props.brightness+"st"]??0)

    useDidMount(()=> {
        if(!window.useSub) window.useStart();
        setTimeout(()=> useSub(props.brightness+"st", 0, setBrightness), 500)
    })
    useWillUnmount(()=> useUnmountSub(props.brightness+"st"))

    
    return(
        <div style={{...style, ...props.style}}>
            <RangeInput 
                onChange={(ev)=> {setBrightness(ev.target.value);usePub(props.brightness, ev.target.value)}}
                value={brightness}
            />
            <h3 style={{margin:"1px",padding:"1px"}}>{brightness}%</h3>
        </div>
    );
}
/** topic, icon */
export const OnOff =(props)=> {
    const [onoff, setOnoff] = useState(store.get("user").payloads[props.topic+"st"]??0)
    
    useDidMount(()=> {
        if(!window.useSub) window.useStart();
        setTimeout(()=> useSub(props.topic+"st", onoff, setOnoff), 500)
    });
    useWillUnmount(()=> {
        if(!window.useSub) window.useStart();
        setTimeout(()=> useUnmountSub(props.topic+"st"), 500)
    });

    
    return(
        <div style={props.style} onClick={()=> usePub(props.topic, +onoff===1?0:1)}>
            {!props.offView
                ? <div style={{color:+onoff===1?"#42f059":"red",width:"40%",fontSize:"20px"}}>
                    { +onoff===1?"on":"off" }
                  </div>
                : ""
            }
            <img style={{height:"18vh",cursor:"pointer",opacity:+onoff===1?"1":"0.4"}} src={ICON[props.icon]}/>
        </div>
    );
}
export const ButtonBar =(props)=> {
    const topic = props.mac+"/"+props.module+props.index+"/"
    

    return(
        <div style={{width:"100%",display:"flex",flexDirection:"row",marginTop:"15%",marginLeft:"3%"}}>
            <button style={{height:"60px",marginRight:"1%"}} onClick={()=> usePub(topic+"onoff", 1)}>
                Открыть
            </button>
            <button style={{height:"60px",marginRight:"1%"}} onClick={()=> usePub(topic+"stop", 1)}>
                Стоп
            </button>
            <button style={{height:"60px"}} onClick={()=> usePub(topic+"onoff", 0)}>
                Закрыть
            </button>
        </div>
    );
}
/** public:Number */
export const ButtonBarTermo =(props)=> {
    const style = {height:"60px",marginRight:"1%"}
    const [state, setState] = useState(0)

    const useClick =(index)=> usePub(props.public+"st", index)
    useEffect(()=> {
        let def = store.get("user").payloads[props.public+"st"]??0
        setTimeout(()=> useSub(props.public+"st", def, setState), 500)
    }, [])
    useWillUnmount(()=> setTimeout(()=> useUnmountSub(props.public+"st"), 500))


    return(
        <div style={{width:"100%",display:"flex",flexDirection:"row",marginTop:"15%",marginLeft:"3%"}}>
            <button style={{opacity:state===0?"1":"0.5", ...style}} onClick={()=> useClick(0)}>
                { iconMod[0] } COOL
            </button>
            <button style={{opacity:state===1?"1":"0.5", ...style}} onClick={()=> useClick(1)}>
                { iconMod[1] } AUTO
            </button>
            <button style={{opacity:state===2?"1":"0.5", ...style}} onClick={()=> useClick(2)}>
                { iconMod[2] } HEAT
            </button>
        </div>
    );
}

////////////////////////////////////////////
const RgbLampImage =(props)=> {
    return(
        <div style={{width: "18vh",height: "18vh",cursor: "pointer",opacity: +props.onoff+"st"===1?"1":"0.4",}} onClick={()=> usePub(props.topic+"onoffst", +props.onoff+"st"===1?0:1)}>
            <svg version="1.1" 
                xmlns="http://www.w3.org/2000/svg" 
                x="0px" 
                y="0px"
                viewBox="0 0 1000 1000" 
            >
                <g fill={props.color} transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)">
                    <path d="M4769.7,4958.5l-63.7-49v-683.7v-683.7l63.7-49c36.8-29.4,95.6-51.5,132.3-51.5c36.8,0,95.6,22.1,132.3,51.5l63.7,49v683.7v683.7l-63.7,49c-36.7,29.4-95.6,51.5-132.3,51.5C4865.2,5010,4806.4,4987.9,4769.7,4958.5z" />
                    <path d="M2904.8,4515c-71.1-39.2-110.3-95.6-110.3-161.7c0-85.8,634.7-1181.1,700.8-1210.6c115.2-53.9,279.4,46.6,279.4,169.1c0,71.1-588.1,1119.9-666.5,1190.9C3051.9,4549.3,2975.9,4556.7,2904.8,4515z" />
                    <path d="M7087.8,4502.7c-78.4-71.1-666.5-1119.9-666.5-1190.9c0-122.5,164.2-223,279.4-169.1c61.3,27,700.8,1119.9,700.8,1200.7c0,83.3-26.9,127.4-100.4,164.2C7210.3,4556.7,7149.1,4554.2,7087.8,4502.7z" />
                    <path d="M4816.2,3218.7c-990-88.2-1882-791.5-2225-1754.6c-350.4-977.7-44.1-2217.7,794-3207.7c144.6-169.1,232.8-250,492.6-450.9c44.1-36.8,46.6-68.6,44.1-605.3l-2.5-566l68.6-78.4c137.2-164.2,171.5-171.5,1080.7-171.5c901.8,0,931.2,4.9,982.6,149.5c17.2,46.6,27,281.8,27,595.5v517.1l308.7,318.6c693.5,715.5,1078.2,1306.1,1249.8,1923.6c90.7,330.8,110.3,887.1,39.2,1225.2c-193.6,933.6-857.7,1681-1759.5,1982.4C5563.6,3213.8,5208.3,3253,4816.2,3218.7z M6271.8,1966.5c76-41.7,208.3-149.5,296.5-237.7c401.9-406.8,529.3-997.3,340.6-1565.9C6855-1.3,6668.8-300.2,6551.2-410.5l-71.1-68.6l-90.7,122.5c-49,66.2-90.7,127.4-90.7,137.2c0,7.4,34.3,53.9,73.5,100.5c90.7,102.9,178.9,272,230.4,446c49,164.2,51.5,507.3,4.9,678.8c-76,289.2-289.2,578.3-526.8,713.1c-61.3,36.8-115.2,68.6-120.1,71.1c-4.9,2.5,0,68.6,7.4,144.6c19.6,139.7,19.6,139.7,93.1,125C6100.3,2052.3,6195.8,2010.6,6271.8,1966.5z" />
                    <path d="M1542.4,2998.1c-51.5-56.4-71.1-100.5-71.1-166.6v-90.7l438.6-252.4c321-183.8,453.3-247.5,490.1-235.2c73.5,22.1,149.5,142.1,149.5,237.7c0,80.9-7.3,85.8-436.2,333.3c-237.7,137.2-448.4,250-468,250C1628.1,3074.1,1581.6,3039.8,1542.4,2998.1z" />
                    <path d="M7982.3,2824.2c-428.8-247.5-433.7-252.4-433.7-333.3c0-95.6,76-215.6,149.5-237.7c36.8-12.3,159.3,44.1,446,210.7c218.1,125,416.6,242.6,441.1,262.2c66.2,58.8,53.9,183.8-29.4,272c-39.2,41.7-85.8,76-105.4,76C8433.1,3074.1,8222.4,2961.4,7982.3,2824.2z" />
                    <path d="M873.4,1329.4c-56.4-80.9-46.6-193.6,22.1-269.6l58.8-68.6h468h468l58.8,68.6c68.6,76,78.4,188.7,22.1,269.6c-36.8,53.9-49,53.9-548.9,53.9S910.1,1383.3,873.4,1329.4z" />
                    <path d="M8028.8,1231.3c-56.3-80.9-46.5-193.6,22.1-269.6l58.8-68.6h468h468l58.8,68.6c68.6,76,78.4,188.7,22.1,269.6c-36.8,53.9-49,53.9-548.9,53.9C8077.8,1285.3,8065.5,1285.3,8028.8,1231.3z" />
                    <path d="M4313.9-4216.1c0-289.2,76-428.8,289.2-539.1c68.6-34.3,144.6-39.2,470.5-31.9c374.9,7.3,389.6,9.8,455.8,68.6c115.1,107.8,156.8,232.8,156.8,485.2v225.5H5000h-686.1V-4216.1z" />
                </g>
            </svg>
        </div>
    );
}
export const RgbLamp =(props)=> {
    const topic = props.mac+"/"+props.module+props.index+"/"
    const [onoff, setOnoff] = useState(store.get("user").payloads[topic+"onoffst"]??0)
    const [color, setColor] = useState(useColor(store.get("user").payloads[topic+"colorst"])??useColor(8))

    const onUseColor =(color)=> setColor(useColor(color))
    useDidMount(()=> {
        if(!window.useSub) window.useStart();

        setTimeout(()=> {
            useSub(topic+"onoffst", onoff, setOnoff)
            useSub(topic+"colorst", color, onUseColor)
        }, 500)
    })
    useWillUnmount(()=> {
        setTimeout(()=> {
            useUnmountSub(topic+"onoffst")
            useUnmountSub(topic+"colorst")
        }, 500)
    })
    

    return(
        <div style={{display:"flex",flexDirection:"row",marginTop:"2%",marginLeft:"3%"}}>
            {props.rgb 
                ? <SketchPicker color={color} onChangeComplete={(e)=> setColor(e)} />
                : <div style={{width:"100%"}}> 
                    {props.children}
                    <SelectRgb 
                        data={Object.keys(colorLamp).map((palit)=> palit)}
                        value={color}
                        onChange={(option)=> usePub(topic+"color", option)}
                    />
                </div>
            }
            <RgbLampImage topic={topic} color={colorLamp[color]} onoff={onoff}/>
        </div>
    );
}
////////////////////////////////////////////

/** 
 * topic: `string` 
 * brihtness: `string`
 */
export const Centr =(props)=> {
    const [onoff, setOnoff] = useState(store.get("user").payloads[props.topic+"st"]??0)
    const [brihtness, setBrihtness] = useState(store.get("user").payloads[props.brihtness+"st"]??50)
    const setDebounce = useDebounce((v)=> usePub(props.brihtness, v), 1500)

    const onUseCall =(data)=> {
        setOnoff(data.payloads[props.topic+"st"])
        setBrihtness(data.payloads[props.brihtness+"st"])
    }
    useDidMount(()=> {
        setTimeout(()=> {
            useSub(props.topic+"st", 0)
            useSub(props.brihtness+"st", 50)
        }, 500)

        store.watch("user", onUseCall)
    });
    useWillUnmount(()=> {
        setTimeout(()=> {
            useUnmountSub(props.topic+"st")
            useUnmountSub(props.brihtness+"st")
        }, 300)
        
        store.unwatch(onUseCall)
    });


    return(
        <input style={{marginTop:"5%"}} 
            disabled={onoff==="0"?false:true}
            type="range" 
            onChange={(ev)=> {
                setDebounce(ev.target.value); 
                setBr(ev.target.value);
                setBrihtness(ev.target.value)
            }} 
            value={+brihtness}
        />                       
    );
}
export const Title =(props)=> {
    const nameStyle = {
        textAlign:"center",
        fontSize:"24px",
        width:"50%",
        textAlign:"centr",
        cursor:"pointer",
        color:"#fcfcfc99",
        marginLeft:"5px"
    }

    return(
        <div onClick={()=> props.onClick()} className="line" style={{borderBottom:"1px solid rgba(0,0,0,0.2)"}}>
            <div style={nameStyle}>
                { props.name ? props.name : "not name" }
            </div>
        </div>
    );
}
export const Lable =(props)=> {
    const style = {left:"50%",height:"15%"}
    //enable={props.onOff} brihtness={props.brihtness} data={props.data}

    return(
        <>
            {props.type === "FSC"
                ? <ProgressBar children={props.children}/>
                : <div style={style}>
                    { props.children }
                </div>
            }
        </>
    );
}
let canvas = document.querySelector("#c")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = new fabric.Canvas("c")



class R {
    constructor() {
        
    }
    text(val="я текст", color="grey") {
        ctx.add(new fabric.IText(val, {
            top: window.innerWidth/3,
            left: window.innerHeight/3,
            fill: color,
            fontSize: 24,
        }))
        ctx.renderAll()
    }
    
}




const r = new R()
const tool = document.querySelector(".tool")
const listTool = [
    `<button class="r" id="text"> Tт </button>`,
]

listTool.forEach((elem)=> {
    tool.innerHTML += elem
})

document.addEventListener("click", (ev)=> {
    if(ev.target.classList.contains("r")){
        r[ev.target.id]()
    }
})
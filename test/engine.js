const expect = require('expect');
const React = require("react");
const TestRenderer = require('react-test-renderer');

const App =(props)=> {
    const [v, setV] = React.useState("test")

    React.useEffect(()=> {
        setTimeout(()=> setV("xro"), 2000)
    }, [])

    return(
        <div onClick={()=> console.log(2)}>{v}</div>
    );
}

const e = <App/>
const testRenderer = TestRenderer.create(e)
const res = []

res.push(testRenderer.toJSON())
setTimeout(()=> {
    testRenderer.update(e)
    res.push(testRenderer.toJSON())
    res
}, 3000)


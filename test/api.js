import React from 'react';
import ReactDOM from 'react-dom';
import Cat from './i';






class App extends React.Component { 
    constructor(props) {
        super(props)
        this.state = {value:1}
        this.onMove = this.onMove.bind(this)
    }
    onMove(ev) {
        this.setState({
            x: ev.screenX,
            y: ev.screenY
        });
    }
    render() {
        return(
            <div onMouseMove={this.onMove}>
                {this.props.render(this.state.x, )}
            </div>
        );
    }
}


function Tick(props) { 
    return(
        <App 
            render={(val)=> <Cat>{val}</Cat>}
        />
    );
}

ReactDOM.render(<Tick/>, document.querySelector(".root"))
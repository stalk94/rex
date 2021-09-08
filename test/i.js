import React from 'react';


export default class Cat extends React.Component {
    render() {
        let o = JSON.parse(this.props.children)
        console.log()
        return (
            <h3>
                {this.props.children}
            </h3>
        );
    }
}
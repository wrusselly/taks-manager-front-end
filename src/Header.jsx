import React, { Component } from 'react';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return (
            <div className="header">
               <h1>To Do Project</h1>
               <button>sign out</button>
            </div>
        );
    }
}
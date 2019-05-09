import React, { Component } from 'react';
import './Header.css'

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
               <button onClick={() => {this.signout()}}>sign out</button>
            </div>
        );
    }

    signout= () => {
        this.props.setUserId(0);
        this.props.setTaskList([]);
    }
}
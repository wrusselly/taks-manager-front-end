import React, { Component } from 'react';

export default class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            password2: ""
        }
    }

    render() {
        let userExists = 
            <p>user already exists</p>
        let userNotExists =
            <p>username available</p>    

        return (
            <div className="createPage">
                <h1 className="header">To Do Project</h1>
                <input type="text" onChange={this.usernameUpdate} placeholder="username" value={this.state.username} required />
                <input type="password" onChange={this.passwordUpdate} placeholder="password" value={this.state.password} required />
                <input type="password" onChange={this.password2Update} placeholder=" repeat password" value={this.state.password} required />
                <button onClick={() => {}}> submit </button>
                <button onClick={() => {this.props.createUpdate()}}> existing user </button>
            </div>
        );
    }

    usernameUpdate = (user) => {
        this.setState({
            username: user.target.value
        });
    }

    passwordUpdate = (pass) => {
        this.setState({
            password: pass.target.value
        });
    }

    password2Update = (pass2) => {
        this.setState({
            password2: pass2
        });
    }

    checkUsername = () => {
        
    }

}
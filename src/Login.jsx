import React, { Component } from 'react';
import CreateUser from './CreateUser';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            errorMessage: "",
            createUser: false
        }
    }

    render() {
        let loginPage = 
        <div>
            <h1 className="header">To Do Project</h1>
            <input type="text" onChange={this.usernameUpdate} placeholder="username" value={this.state.username} required />
            <input type="password" onChange={this.passwordUpdate} placeholder="password" value={this.state.password} required />
            <button onClick={() => {this.getByUsernameAndPassword(this.state.username, this.state.password)}}> login </button>
            <button onClick={() => {this.createUpdate()}}>new user </button>
            <p>{this.state.errorMessage}</p>
        </div>

        let createUserPage = <CreateUser createUpdate={this.createUpdate}/>   

        return (
            <div className="loginPage">
                 {(this.state.createUser ? createUserPage : loginPage)}
            </div>
        );
    }

    login = (username, password) => {
        
    }
    
    getByUsernameAndPassword = (username, password) => {
        let url = 'http://localhost:9090/task-tracker/users/'+username+'/'+password +'/only';
        let request = new XMLHttpRequest();
        request.open('GET', url);
        request.responseType = "json";
        request.onload = () => {
            let user = request.response[0];
            if (user === undefined){
                 this.setState({
                    errorMessage: "user not found",
                    username: "",
                    password: ""
                });
            } else {
                this.props.setUserId(user.userId);
            }
        }
        request.send();
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

    errorUpdate = (error) => {
        this.setState({
            errorMessage: error
        });
    }

    createUpdate = () => {
        this.setState({
            createUser: !this.state.createUser
        });
    }

}
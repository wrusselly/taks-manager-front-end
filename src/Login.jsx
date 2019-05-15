import React, { Component } from 'react';
import CreateUser from './CreateUser';
import './Login.css';
import { BACKEND_IP } from './endpoint-config';

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
                <div className="centre inputs">
                    <input className="centre" type="text" onChange={this.usernameUpdate} placeholder="username" value={this.state.username} required />
                    <input className="centre" type="password" onChange={this.passwordUpdate} placeholder="password" value={this.state.password} required />
                    <button className="centre"onClick={() => { this.getByUsernameAndPassword(this.state.username, this.state.password) }}> login </button>
                    <p className="centre">{this.state.errorMessage}</p>
                    <button className="centre" onClick={() => { this.createUpdate() }}>new user </button>
                </div>
            </div>

        let createUserPage = <CreateUser createUpdate={this.createUpdate} />

        return (
            <div className="loginPage">
                {(this.state.createUser ? createUserPage : loginPage)}
            </div>
        );
    }

    login = (username, password) => {

    }

    getByUsernameAndPassword = (username, password) => {
        let url = `${BACKEND_IP}/users/` + username + '/' + password + '/only';
        let request = new XMLHttpRequest();
        request.open('GET', url);
        request.responseType = "json";
        request.onload = () => {
            let user = request.response[0];
            if (user === undefined) {
                this.setState({
                    errorMessage: "username or password not found",
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
import React, { Component } from 'react';
import { BACKEND_IP } from './endpoint-config';

export default class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            password2: "",
            userStatus: -1,
        }
    }

    render() {
        let userExists =
            <p>user already exists</p>
        let userCreated =
            <p>user created please go to login</p>
        let passwordError =
            <p>passwords do not match</p>

        return (
            <div className="createPage">
                <h1 className="header">To Do Project</h1>
                <div className="centre inputs">
                    <input className="centre" type="text" onChange={this.usernameUpdate} placeholder="username" value={this.state.username} required />
                    <input className="centre" type="password" onChange={this.passwordUpdate} placeholder="password" value={this.state.password} required />
                    <input className="centre" type="password" onChange={this.password2Update} placeholder=" repeat password" value={this.state.password2} required />
                    <button className="centre" onClick={() => { this.createUser(this.state.username, this.state.password, this.state.password2) }}> submit </button>
                    <button className="centre" onClick={() => { this.props.createUpdate() }}> go to login </button>
                    <div className="centre" id="error message">
                        {(this.state.password === this.state.password2 ? <p></p> : passwordError)}
                        {(this.state.userStatus === 1 ? userCreated :
                            this.state.userStatus === 0 ? userExists : <p></p>)}
                    </div>
                </div>
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
            password2: pass2.target.value
        });
    }

    createUser = (username, pass1, pass2) => {
        if (pass1 === pass2) {
            this.postUser(username, pass1);
        } else {
            console.log("passwords don't match");
        }
    }

    postUser = (username, password) => {
        let url = `${BACKEND_IP}/users`;
        let request = new XMLHttpRequest();
        request.open('POST', url);
        request.setRequestHeader("Content-Type", "application/json");
        request.responseType = "json";
        request.onload = () => {
            console.log(request.response);
            this.setState({
                userStatus: request.response
            })
        };
        let bod = {};
        bod.username = username;
        bod.password = password;
        bod = JSON.stringify(bod);
        request.send(bod);
    }

}
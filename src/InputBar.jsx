import React, { Component } from 'react';

export default class InputBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            dueDate: ""
        }
    }

    render() {
        return (
            <div className="input-bar">
                <input type="text" onChange={this.textUpdate} placeholder="task description" value={this.state.text} required />
                <span>Due Date</span>
                <input type="date" onChange={this.dateUpdate} />
                <button onClick={this.sendToParent}> + </button>

            </div>
        );
    }

    textUpdate = (task) => {
        this.setState({
            text: task.target.value
        });
    }

    dateUpdate = (date) => {
        this.setState({
            dueDate: date.target.value
        });
    }

    sendToParent  = () => {
        let url = 'http://localhost:9090/task-tracker/task';
        let request = new XMLHttpRequest();
        request.open('POST', url);
        request.setRequestHeader("Content-Type", "application/json");
        request.responseType = "json";
        request.onload = () => {
            console.log(request.response);
            console.log(this.props.userId);
            if(request.status === 200) {
            this.props.addTaskFunction(request.response);
            this.setState({
                text: "",
                dueDate: ""
            });
            }
        }
        let bod = {};
        bod.text = this.state.text;
        bod.dateDueStr = this.state.dueDate;
        bod.userId = this.props.userId;
        bod.folderId = this.props.folderId;
        bod = JSON.stringify(bod);
        request.send(bod);
    }





}
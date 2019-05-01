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
        // "200" == 200   //TRUE
        // "200" === 200 // FALSE
        // "200" === "200" //TRUE
        // 200 === 200  // TRHE
        request.onload = () => {
            console.log(request.response);
            if(request.status === 200) {
            this.props.addTaskFunction(request.response);
            this.setState({
                text: ""
            });
            }
        }
        let bod = {};
        bod.text = this.state.text;
        bod = JSON.stringify(bod)
        request.send(bod);
    }





}
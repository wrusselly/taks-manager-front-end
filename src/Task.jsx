import React, { Component } from 'react';

export default class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div id={this.props.id}>
                <h4>{this.props.taskText}</h4>
                <p> due: {this.props.taskDue}</p>
                <button>update</button>
                 <button onClick={()=>{this.deleteTask(this.props.id, this.props.index)}}>delete</button>   
            </div>
        );
    }

    deleteTask = (backId, frontIndex) => {
        let url = 'http://localhost:9090/task-tracker/task/' + backId;
        let request = new XMLHttpRequest();
        request.open('DELETE', url);
        request.setRequestHeader("Content-Type", "application/json");
        request.responseType = "json";
        request.onload = () => {
            console.log("i'm deleting");
            console.log(request.response);
            if(request.status === 200) {
            this.props.removeTask(frontIndex);
            }
        }
        request.send();
    }
}
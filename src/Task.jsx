import React, { Component } from 'react';
import './main.css'

export default class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            completeText: "complete"
        }
    }

    render() {
        return (
            <div className="task" id={this.props.id}>
                <h4>{this.props.taskText}</h4>
                <p> due: {this.props.dueDate}</p>
                <button onClick={()=>{this.completed(this.props.id, this.props.index, this.props.taskText, this.props.dueDate)}} 
                    className={"completeButton"+this.props.complete}>complete</button>
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

    completed = (backId, frontIndex, text, date) => {
        let url = 'http://localhost:9090/task-tracker/task/' + backId;
        let request = new XMLHttpRequest();
        request.open('PUT', url);
        request.setRequestHeader("Content-Type", "application/json");
        request.responseType = "json";
        request.onload = () => {
            if(request.status === 200) {
                console.log(request.response);
                console.log("task completed");
                this.props.removeTask(frontIndex);
            }
        }
        let bod = {};
        bod.taskId = backId;
        bod.complete = !this.props.complete;
        bod.text = text;
        bod.dateDueStr = date;
        bod.userId = this.props.userId;
        bod.folderId = this.props.folderId;
        bod = JSON.stringify(bod);
        request.send(bod);
    }
}
import React, { Component } from 'react';
import Task from './Task.jsx';

export default class TaskDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className="task-display">
                {this.props.taskArr.map((task, i) => <Task key={"task" + i} taskText={task.text} id = {task.taskId} index={i} removeTask={this.props.removeTask}/>)}
            </div>
        );
    }

    
}


import React, { Component } from 'react';
import InputBar from './InputBar';
import TaskDisplay from './TaskDisplay';
import Navbar from './Navbar';
import Header from './Header';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskList: []
    }
  }

  render() {
    return (
      <div>
        <Header />
        <Navbar />
        <InputBar addTaskFunction={this.addTask} />
          <TaskDisplay taskArr={this.state.taskList} removeTask={this.removeTask}/>  
      </div>
    );
  }

  getAllTasks = () => {
    let url = 'http://localhost:9090/task-tracker/task';
    let request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = "json";
    request.onload = () => {
      console.log(request.response);
      this.setState({
        taskList: request.response
      });
    }
    request.send();
  }

  update = () => {
    this.forceUpdate();
  }


  componentDidMount = () => {
    // get info logic
    console.log("initial load")
    this.getAllTasks();
  }

  addTask = (task) => {
    console.log("adding a task")
    let array = this.state.taskList;
    array.push(task);
    this.setState({
      taskList: array
    });
  }

  removeTask = (index) => {
    let array = this.state.taskList;
    array.splice(index, 1);
    this.setState({
      taskList: array
    });
  }

}
export default App;

import React, { Component } from 'react';
import InputBar from './InputBar';
import TaskDisplay from './TaskDisplay';
import Navbar from './Navbar';
import Header from './Header';
import './main.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskList: [],
      userId: 1,
      folderId: 1
    }
  }

  render() {
    return (
      <div className="main-div">
        <Header />
        <Navbar getByUserAndComplete={this.getByUserAndComplete} setFolderId={this.setFolderId} getByUserAndList={this.getByUserAndList} userId={this.state.userId} folderId={this.state.folderId}/>
        <InputBar addTaskFunction={this.addTask} userId={this.state.userId} folderId={this.state.folderId}/>
          <TaskDisplay taskArr={this.state.taskList} removeTask={this.removeTask} completeArr={this.state.completedList} addCompleted={this.addCompleted}/>  
      </div>
    );
  }

  getByUserAndComplete = (userId, status) => {
    let url = 'http://localhost:9090/task-tracker/task/'+userId+'/'+status;
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

  getByUserAndList = (userId, folderId, complete) => {
    let url = 'http://localhost:9090/task-tracker/task/'+userId+'/'+folderId+'/'+complete;
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
    this.getByUserAndComplete(this.state.userId, false);
  }

  addTask = (task) => {
    console.log("adding a task")
    let array = this.state.taskList;
    array.unshift(task);
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

  setUserId = (id) => {
    this.setState({
      userId: id
    });
  }

  setFolderId = (id) => {
    this.setState({
      folderId: id
    });
  }

}
export default App;

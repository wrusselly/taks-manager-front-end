import React, { Component } from 'react';
import InputBar from './InputBar';
import TaskDisplay from './TaskDisplay';
import Navbar from './Navbar';
import Header from './Header';
import Login from './Login';
import './main.css';
import { BACKEND_IP } from './endpoint-config';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskList: [],
      userId: 0,
      folderId: 0
    }
  }

  render() {
    let mainPage =
      <div className="main-div">
        <Header setUserId={this.setUserId} setTaskList={this.setTaskList}/>
        <Navbar getByUserAndComplete={this.getByUserAndComplete} getByUserAndList={this.getByUserAndList}
          userId={this.state.userId} folderId={this.state.folderId} setFolderId={this.setFolderId}/>
        <InputBar addTaskFunction={this.addTask} userId={this.state.userId} folderId={this.state.folderId} />
        <TaskDisplay taskArr={this.state.taskList} removeTask={this.removeTask}
          completeArr={this.state.completedList} addCompleted={this.addCompleted} />
      </div>

      let loginPage = <Login setUserId={this.setUserId}/>


    return (
      <div>
      {(this.state.userId === 0 ? loginPage : mainPage)}
      </div>
    );
  }

  getByUserAndComplete = (userId, status) => {
    let url = `http://${BACKEND_IP}:9090/task-tracker/task/` + userId + '/' + status;
    let request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = "json";
    request.onload = () => {
      this.setState({
        taskList: request.response
      });
    }
    request.send();
  }

  getByUserAndList = (userId, folderId, complete) => {
    let url = `http://${BACKEND_IP}:9090/task-tracker/task/` + userId + '/' + folderId + '/' + complete;
    let request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = "json";
    request.onload = () => {
      this.setState({
        taskList: request.response
      });
      this.setFolderId(folderId);
    }
    request.send();
  }

  addTask = (task) => {
    let array = this.state.taskList;
    array.unshift(task);
    this.setState({
      taskList: array.reverse()
    });
  }

  removeTask = (index) => {
    let array = this.state.taskList;
    array.splice(index, 1);
    this.setState({
      taskList: array.reverse()
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

  setTaskList = (array) => {
    this.setState({
      taskList: array
    });
  }

}
export default App;

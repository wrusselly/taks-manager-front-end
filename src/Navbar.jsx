import React, { Component } from 'react';
import Folder from './Folder.jsx';

export default class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            folderList: [],
            nameText: ""
        }
    }

    render() {
        return (
            <div className="navbar">
                <button onClick={() => { this.props.getByUserAndComplete(this.props.userId, false) }}>To Do</button>
                <button onClick={() => { this.props.getByUserAndComplete(this.props.userId, true) }}>completed</button>
                <div className="dropdown">
                    <button className="dropbtn">lists</button>
                    <div className="dropdown-content">
                        {this.state.folderList.map((folder, i) => <Folder key={"folder" + i} folderName={folder.name} id={folder.folderId} 
                        getByUserAndList={this.props.getByUserAndList} userId={folder.userId}/>)}
                         <input type="text"  placeholder="new list" required />
                         <button > + </button>
                    </div>
                </div>
            </div>
        );
    }

    getFolderList = () => {
        let url = 'http://localhost:9090/task-tracker/folder';
        let request = new XMLHttpRequest();
        request.open('GET', url);
        request.responseType = "json";
        request.onload = () => {
            console.log(request.response);
            this.setState({
                folderList: request.response
            });
        }
        request.send();
    }

    componentDidMount = () => {
        console.log("initial load")
        this.getFolderList();
    }

    postFolder = () => {
        let url = 'http://localhost:9090/task-tracker/folder';
        let request = new XMLHttpRequest();
        request.open('POST', url);
        request.setRequestHeader("Content-Type", "application/json");
        request.responseType = "json";
        request.onload = () => {
            if(request.status === 200) {
                let array = this.state.folderList;
                array.push(request.response);
                this.setState({
                    folderList: array
                });
            }
        }
        let bod = {};
        bod.userId = this.props.userId;
        bod.name = this.state.nameText;
        bod = JSON.stringify(bod);
        request.send(bod);
    }

}
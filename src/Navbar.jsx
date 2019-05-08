import React, { Component } from 'react';
import Folder from './Folder.jsx';

export default class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            folderList: [],
            nameText: "",
            listHeader: ""
        }
    }

    render() {
        return (
            <div className="navbar">
                <button onClick={() => { this.toDoClick(this.props.userId) }}>To Do</button>
                <button onClick={() => { this.completeClick(this.props.userId) }}>completed</button>
                <div className="dropdown">
                    <button className="dropbtn">lists</button>
                    <div className="dropdown-content">
                        {this.state.folderList.map((folder, i) => <Folder key={"folder" + i} folderName={folder.name} id={folder.folderId} setList={this.setListHeader}
                        getByUserAndList={this.props.getByUserAndList} userId={folder.userId} index={i} removeFolder={this.removeFolder}/>)}
                         <input type="text"  placeholder="new list" required onChange={this.textUpdate} value={this.state.nameText}/>
                         <button onClick={this.postFolder}> + </button>
                    </div>
                </div>

                <h3 id="listHeading" >List: {this.state.listHeader}</h3>
            </div>
        );
    }

    getFolderList = () => {
        let url = 'http://localhost:9090/task-tracker/folder//' + this.props.userId;
        let request = new XMLHttpRequest();
        request.open('GET', url);
        request.responseType = "json";
        request.onload = () => {
            this.setState({
                folderList: request.response
            });
        }
        request.send();
    }

    componentDidMount = () => {
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
                    folderList: array,
                    nameText: ""
                });
            }
        }
        let bod = {};
        bod.userId = this.props.userId;
        bod.name = this.state.nameText;
        bod = JSON.stringify(bod);
        request.send(bod);
    }

    textUpdate = (folder) => {
        this.setState({
            nameText: folder.target.value
        });
    }

    removeFolder = (index) => {
        let array = this.state.folderList;
        array.splice(index, 1);
        this.setState({
            folderList: array
        });
    } 

    setListHeader = (name) => {
        this.setState({
            listHeader: name
        });
    }

    toDoClick = (userId) => {
        this.props.getByUserAndComplete(userId, false)
        this.setState({
            listHeader: "To do"
        });
        this.props.setFolderId(0)
    }

    completeClick = (userId) => {
        this.props.getByUserAndComplete(userId, true)
        this.setState({
            listHeader: "Completed"
        });
        this.props.setFolderId(0)
    }

}
import React, { Component } from 'react';

export default class Folder extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="folder" >
                <button className="folderButton" onClick={() => { this.folderClick(this.props.userId, this.props.id, this.props.folderName) }}> {this.props.folderName} </button>
                <button className="folderDelete" onClick={()=> {this.deleteFolder(this.props.id, this.props.index)}}> x </button>
            </div>
        );
    }

    deleteFolder = (backId, frontIndex) => {
        let url = 'http://localhost:9090/task-tracker/folder/' + backId;
        let request = new XMLHttpRequest();
        request.open('DELETE', url);
        request.setRequestHeader("Content-Type", "application/json");
        request.responseType = "json";
        request.onload = () => {
            if(request.status === 200) {
            this.props.removeFolder(frontIndex);
            }
        }
        request.send();
    }

    folderClick = (userId, folderId, name) => {
        this.props.getByUserAndList(userId, folderId, false);
        this.props.setList(name);
    }

    // this.props.getByUserAndList(this.props.userId, this.props.id, false)

}
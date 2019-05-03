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
                <button onClick={() => { this.props.getByUserAndList(this.props.userId, this.props.id, false) }}> {this.props.folderName} </button>
            </div>
        );
    }

}
import React, { Component } from 'react';

class Note extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <h3>{this.props.text}</h3>
                <button>Edit</button>
                <button>Delete</button>
            </div>
        )
    }
}

export default Note;
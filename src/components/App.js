import React, { Component } from 'react';
import { base } from '../firebase';
import _ from 'lodash';
import Note from './Note';

class App extends Component {

    constructor() {
        super();
        this.state = {
            notes: []
        }
    }

    componentWillMount() {
        this.notesRef = base.syncState('notes', {
            context: this,
            state: 'notes'
        })
    }

    componentWillUnmount() {
        base.removeBinding(this.notesRef);
    }

    render() {
        const notesList = _.map(this.state.notes, (note, index) => {
            return <Note key={index}
                        text={note}
                    />
        });        
        return (
            <div>
                <h1>NoteBook</h1>
                {notesList}
            </div>
        )
    }
}

export default App;
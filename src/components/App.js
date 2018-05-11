import React, { Component } from 'react';
import { base } from '../firebase'
import _ from 'lodash';
import shortid from 'shortid';
import { Container, Input, Button, TextArea, Modal } from 'semantic-ui-react';
import MenuBar from './MenuBar';
import Note from './Note';
import Styles from './App.css';

class App extends Component {

    constructor() {
        super();
        this.state = {
            notes: [],
            entry: '',
            modal: false
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentWillMount() {
        this.notesRef = base.syncState('notes', {
            context: this,
            state: 'notes'
        })
    }
        
    handleAdd(textEntry) {
        let note = {
            _id: shortid.generate(),
            text: textEntry,
            timeStamp: Date.now()
        }        
        this.setState({
            notes: [...this.state.notes, note]
        })
    }

    handleEdit(id, text) {
        console.log('editing')
        const notes = _.map(this.state.notes, (note) => {
            if(note._id !== id) {
                return note;
            } else {
                 return Object.assign({},note, {text: text});
            }
        })
        this.setState({
            notes: notes
        })
    }

    handleDelete(id) {
        this.setState({
            notes: _.filter(this.state.notes, (note) => {
                return note._id !== id;
            })
        })
    }

    componentWillUnmount() {
        base.removeBinding(this.notesRef);
    }

    render() {
        const notesList = _.map(this.state.notes, (note, index) => {
            return <Note key={note._id}
                        id={note._id}
                        text={note.text}
                        handleEdit={this.handleEdit}
                        handleDelete={this.handleDelete}
                    />
        });        
        return (
            <Container>
                <MenuBar handleAdd={this.handleAdd}
                />
                <div>
                    <div className={Styles.noteList}>
                        {notesList}
                    </div>
                </div>
            </Container>
        )
    }
}

export default App;
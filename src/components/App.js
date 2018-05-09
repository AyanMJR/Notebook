import React, { Component } from 'react';
import { base } from '../firebase'
import _ from 'lodash';
import shortid from 'shortid';
import { Container, Input, Button, TextArea, Modal } from 'semantic-ui-react';
import Note from './Note';

class App extends Component {

    constructor() {
        super();
        this.state = {
            notes: [],
            entry: '',
            modal: false
        }
        this.openModal =  this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleEntryChange = this.handleEntryChange.bind(this);
        this.handleEntrySubmit = this.handleEntrySubmit.bind(this);
    }

    componentWillMount() {
        this.notesRef = base.syncState('notes', {
            context: this,
            state: 'notes'
        })
    }

    openModal() {
        this.setState({
            modal: true
        })
    }

    closeModal() {
        this.setState({
            modal: false,
            entry: ''
        });
    }

    handleEntryChange(event) {
        this.setState({
            entry: event.target.value
        })
    }

    handleEntrySubmit(event) {
        let note = {
            _id: shortid.generate(),
            text: this.state.entry,
            timeStamp: Date.now()
        }        
        this.setState({
            notes: [...this.state.notes, note]
        })
    }

    componentWillUnmount() {
        base.removeBinding(this.notesRef);
    }

    render() {
        const notesList = _.map(this.state.notes, (note, index) => {
            return <Note key={note._id}
                        text={note.text}
                    />
        });        
        return (
            <Container>
                <header>
                    <h2>NoteBook</h2>
                    <Button onClick={this.openModal}>Add Modal</Button>
                </header>
                <div>
                    <Modal open={this.state.modal}
                        onClose={this.closeModal}
                        size='mini'
                        closeIcon    
                    >
                        <Modal.Content>
                            <Input placeholder='Write your note'
                                size='massive'
                                fluid
                                value={this.state.entry}
                                onChange={this.handleEntryChange}
                            />
                        </Modal.Content>
                        <Modal.Actions>
                            <Button onClick={this.handleEntrySubmit}>Post</Button>
                        </Modal.Actions>
                    </Modal>
                    {notesList}
                </div>
            </Container>
        )
    }
}

export default App;
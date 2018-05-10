import React, { Component } from 'react';
import { Button, Input, Modal } from 'semantic-ui-react';

class Note extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textNote: this.props.text,
            modal: false
        }
        this.deleteNote = this.deleteNote.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleEditButton = this.handleEditButton.bind(this);

    }

    openModal() {
        this.setState({
            modal: true
        })
    }

    closeModal() {
        this.setState({
            modal: false,
            textNote: this.props.text
        })
    }

    handleTextChange(event) {
        this.setState({
            textNote: event.target.value
        });
    }

    handleEditButton() {
        let id = this.props.id;
        let note = this.state.textNote;
        this.props.handleEdit(id, note);
    }

    deleteNote() {
        this.props.handleDelete(this.props.id);
    }

    render() {
        return (
            <div>
                <h4>{this.props.text}</h4>
                <Button onClick={this.openModal}>Edit</Button>
                <Button onClick={this.deleteNote}>Delete</Button>
                <div>
                    <Modal size='mini'
                        open={this.state.modal}
                        onClose={this.closeModal}
                        closeIcon
                    >
                        <Modal.Content>
                            <Input value={this.state.textNote} 
                                size='massive'
                                fluid
                                onChange={this.handleTextChange}
                            />
                        </Modal.Content>
                        <Modal.Actions>
                            <Button onClick={this.handleEditButton}>Edit</Button>
                        </Modal.Actions>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default Note;
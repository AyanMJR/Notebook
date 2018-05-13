import React, { Component } from 'react';
import Styles from './Note.css'
import { Button, Input, Modal, TextArea } from 'semantic-ui-react';

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
        this.closeModal();
    }

    deleteNote() {
        this.props.handleDelete(this.props.id);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.modal !== nextState.modal || 
            this.state.textNote !== nextState.textNote) {
                return true;
        }
        if(this.props.text !== nextProps.text) {
            return true;
        }
        return false;

    }

    render() {
        return (
            <div>
                <div className={Styles.note}>
                    <p className={Styles.displayNote}>{this.props.text}</p>
                    <hr/>
                    <p>Posted on {this.props.time}</p>
                    <Button color='black' 
                        onClick={this.openModal}
                    >Edit
                    </Button>
                    <Button color='black' 
                        onClick={this.deleteNote}
                    >Delete
                    </Button>
                </div>
                <div>
                    <Modal size='mini'
                        open={this.state.modal}
                        onClose={this.closeModal}
                        closeIcon
                    >
                        <Modal.Content>
                            <TextArea style={{backgroundColor: '#f1f94d'}} 
                                rows='10'
                                autoHeight
                                cols='30'
                                autoFocus
                                value={this.state.textNote}
                                onChange={this.handleTextChange}
                            >
                            </TextArea>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color='black' 
                                onClick={this.handleEditButton}
                            >Edit
                            </Button>
                        </Modal.Actions>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default Note;
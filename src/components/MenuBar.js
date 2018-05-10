import React, { Component } from 'react';
import { Menu, Modal, Input, Button, TextArea } from 'semantic-ui-react';
import Styles from './MenuBar.css';

class MenuBar extends Component {
    constructor() {
        super();
        this.state = {
            modal: false,
            entry: ''
        }
        this.openModal =  this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleEntryChange = this.handleEntryChange.bind(this);
        this.handleEntrySubmit = this.handleEntrySubmit.bind(this);
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

    handleEntrySubmit() {
        if(this.state.entry.length == 0) {
            return;
        }
        let textNote = this.state.entry;
        this.props.handleAdd(textNote);

    }

    render() {
        return (
            <div>
                <header className={Styles.header}>
                    <h1>NoteBook</h1>
                    <Button color='orange'
                        circular
                        onClick={this.openModal}
                    >Create Note
                    </Button>
                </header>
                {/*<Menu>
                    <Menu.Header>NoteBook</Menu.Header>
                    <Menu.Item position='right' 
                        onClick={this.openModal}                
                    >
                        Create Note
                    </Menu.Item>
                </Menu>*/}
                <Modal open={this.state.modal}
                            onClose={this.closeModal}
                            size='mini'
                            closeIcon    
                        >
                            <Modal.Content>
                                <TextArea rows='10'
                                    autoHeight
                                    cols='30'
                                    autoFocus
                                    value={this.state.entry}
                                    onChange={this.handleEntryChange}
                                >
                                </TextArea>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button onClick={this.handleEntrySubmit}>Post</Button>
                            </Modal.Actions>
                        </Modal>
            </div>
        )
    }
}

export default MenuBar;
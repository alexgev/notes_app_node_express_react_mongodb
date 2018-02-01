import React from 'react';

import NotesStore from '../stores/NotesStore';
import NotesActions from '../actions/NotesActions';

import Note from './Note.jsx';
import NoteEditor from './NoteEditor.jsx';
import NotesGrid from './NotesGrid.jsx';


import './App.less';

function getStateFromFlux() {
    return {
        isLoading: NotesStore.isLoading(),
        notes: NotesStore.getNotes()
    }
}

class App extends React.Component {
    constructor() {
        super();
        this.state = getStateFromFlux();
        this._onChange = this._onChange.bind(this);
    }

    componentWillMount() {
        NotesActions.loadNotes();
    }

    componentDidMount() {
        NotesStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        NotesStore.removeChangeListener(this._onChange);
    }

    handleNoteAdd(data) {
        NotesActions.createNote(data);
    }

    handleNoteDelete(note) {
        NotesActions.deleteNote(note.id);
    }

    _onChange() {
        this.setState(getStateFromFlux());
    }

    render() {
        return (
            <div className="App">
                <h2 className="App__header">NotesApp</h2>
                <NoteEditor onNoteAdd={this.handleNoteAdd}/>
                <NotesGrid notes={this.state.notes} onNoteDelete={this.handleNoteDelete}/>
            </div>
        )
    }
}

export default App;
import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../store';
import * as actions from '../actions';
import { INote } from '../note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  @select() notes;
  editNote: boolean = false;
  editedNote: INote;
  addNewNote: INote;
  noteEditEnable: boolean = false;
  newNote: boolean = false;
  searchText;
  sidebarToggle: boolean = false;

  model: INote = {
    id: 0,
    title: "",
    description: "",
    date: Date.now()
  };

  constructor(private ngRedux: NgRedux<IAppState>) { }

  ngOnInit(): void {

  }
  
  toggleSidebar(){
    this.sidebarToggle = !this.sidebarToggle;
  }
  getNotes() {
    this.ngRedux.dispatch(actions.LoadNotes(JSON.parse(localStorage.getItem("notes"))));
  }
  onTitleChange(editedNote: INote) {
    editedNote.date = Date.now();
    this.ngRedux.dispatch({ type: actions.UPDATE_NOTE, note: editedNote });
  }
  onDescriptionChange(editedNote: INote) {
    editedNote.date = Date.now();
    this.ngRedux.dispatch({ type: actions.UPDATE_NOTE, note: editedNote });
  }

  showEditNote(note: INote) {
    this.newNote = false;
    this.noteEditEnable = false;
    if (!note) {
      this.editNote = false;
      return;
    }
    this.editNote = true;
    this.editedNote = note;
  }
  showNewNote() {
    this.editNote = false;
    this.newNote = true;
  }
  cancelNewNote() {
    this.newNote = false;
  }
  saveNote(newNote: INote) {
    newNote.date = Date.now();
    this.ngRedux.dispatch({ type: actions.ADD_NOTE, note: newNote });
    this.newNote = false;
    this.model = {
      id: 0,
      title: "",
      description: "",
      date: Date.now()
    };
  }
  toggleNoteEdit() {
    this.noteEditEnable = !this.noteEditEnable;
  }
  deleteNote(note) {
    this.ngRedux.dispatch({ type: actions.REMOVE_NOTE, note: note });
    this.editNote = false;
  }
}

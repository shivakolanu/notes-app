import { INote } from './note';
import * as actions from './actions';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

export interface IAppState {
    notes: INote[];
}

export const INITIAL_STATE: IAppState = {
    // notes: [JSON.parse(localStorage.getItem("notesList"))]
    // if(JSON.parse(localStorage.getItem("notesList")) == null){
    //     notes: [JSON.parse(localStorage.getItem("notesList"))]
    // }
    // else{
    //     notes: [ ]
    // }
    // notes: []
    notes: getIntialState()
}

export function getIntialState() {
    if (JSON.parse(localStorage.getItem("notesList")) == null) {
        return [];
    }
    return JSON.parse(localStorage.getItem("notesList")).notes;
}

export function rootReducer(state: IAppState, action): IAppState {
    switch (action.type) {
        case actions.ADD_NOTE:
            action.note.id = state.notes.length + 1;
            var addedNote = Object.assign({}, state, {
                notes: state.notes.concat(Object.assign({}, action.note))
            })
            localStorage.setItem("notesList", JSON.stringify(addedNote));
            return addedNote;
        case actions.REMOVE_NOTE:
            var removedNote = Object.assign({}, state, {
                notes: state.notes.filter(t => t.id !== action.note.id),
            })
            localStorage.setItem("notesList", JSON.stringify(removedNote));
            return removedNote;
        case actions.UPDATE_NOTE:
            var note = state.notes.find(t => t.id === action.note.id);
            var index = state.notes.indexOf(note);
            var updatedNote = Object.assign({}, state, {
                notes: [
                    ...state.notes.slice(0, index),
                    Object.assign({}, action.note),
                    ...state.notes.slice(index + 1)
                ],
            });
            localStorage.setItem("notesList", JSON.stringify(updatedNote));
            return updatedNote;
        default:
            return state;
    }

}


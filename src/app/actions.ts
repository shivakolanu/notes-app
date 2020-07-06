export const ADD_NOTE = 'ADD_NOTE';
export const REMOVE_NOTE = 'REMOVE_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const LOAD_NOTES = 'LOAD_NOTES';

export const LoadNotes = payload => ({
    type: LOAD_NOTES,
    payload
});
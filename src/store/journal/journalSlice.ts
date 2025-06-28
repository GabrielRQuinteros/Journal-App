import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Note {
    id?: string,
    title: string,
    body: string,
    date: number | null ,
    imageUrls: string []
}

export interface JournalState {
    isSaving: boolean,
    messageSaved: string,
    notes: Note[],
    activeNote: Note | null
}

const initialState: JournalState = {
    isSaving: false,
    activeNote: null,
    messageSaved: '',
    notes: []

}

export const journalSlice = createSlice({
    name: 'journal',
    initialState,
    reducers: {
        savingNewNote: ( state ) => {
            state.isSaving = true;
        },
        addNewEmptyNote: ( state, action: PayloadAction<Note> ) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: ( state, action: PayloadAction<string>) => {
            state.activeNote = state.notes.find( n => n.id === action.payload ) || null ;
        },
        setNotes: ( state, action: PayloadAction<Note[]> ) => {
            state.notes = action.payload;
        },
        setSaving: ( state, action: PayloadAction<boolean> ) => {
            state.isSaving = action.payload;
        },
        updateNote: ( state, action: PayloadAction<Note>) => {
            const newNotes = state.notes.filter( note => note.id !== action.payload.id );
            newNotes.push( action.payload );
            state.notes = newNotes;
            state.isSaving= false;
        },
        deleteNoteById: (state, action: PayloadAction<string>) => {
            state.notes = state.notes.filter( notes => notes.id !== action.payload );
        }
    }
});


export const { addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, deleteNoteById, savingNewNote } = journalSlice.actions;
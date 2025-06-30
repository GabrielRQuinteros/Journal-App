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
            state.messageSaved='';
        },
        addNewEmptyNote: ( state, action: PayloadAction<Note> ) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: ( state, action: PayloadAction<string>) => {
            state.activeNote = state.notes.find( n => n.id === action.payload ) || null ;
        },
        setActiveNoteFromNote: ( state, action: PayloadAction<Note>) => {
            state.activeNote = action.payload ;
        },
        setNotes: ( state, action: PayloadAction<Note[]> ) => {
            state.notes = action.payload;
        },
        setSaving: ( state, _action: PayloadAction<void> ) => {
            state.isSaving = true;
            state.messageSaved='';
        },
        updateNote: ( state, action: PayloadAction<Note>) => {
            const newNotes = state.notes.filter( note => note.id !== action.payload.id );
            newNotes.push( action.payload );
            state.notes = newNotes;
            state.isSaving= false;
            /// TODO: Mostrar mensaje de Actualización de Nota completada
            state.messageSaved= `La nota "${action.payload.title}" se ha actualizado correctamente.`
        },
        deleteNoteById: (state, action: PayloadAction<string>) => {
            state.notes = state.notes.filter( notes => notes.id !== action.payload );
        },
        setPhotosToActiveNote:  (state, action: PayloadAction<string[]>) => {
            if( state.activeNote )
                state.activeNote.imageUrls = [...state.activeNote.imageUrls, ...action.payload];
        },
    }
});


export const { addNewEmptyNote, setActiveNote, setActiveNoteFromNote, setNotes, setSaving, updateNote, deleteNoteById, savingNewNote, setPhotosToActiveNote } = journalSlice.actions;
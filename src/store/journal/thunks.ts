import { collection, deleteDoc, doc } from "firebase/firestore";
import type { AppDispatch, RootState } from "../store";
import { firebaseDB } from "../../firebase";
import { setDoc } from "firebase/firestore";
import { addNewEmptyNote, deleteNoteById, setActiveNote, setActiveNoteFromNote, setIsDeleting, setNotes, setPhotosToActiveNote, setSaving, updateNote, type Note } from './journalSlice';
import { fileUpload, loadNotes } from "../../helpers";
import { logout } from "../auth";


export const startNewNote = () => {
    return async ( dispatch: AppDispatch, getState: () => RootState ) => {

        const { uid } = getState().auth;

        const newNote: Note = {
                body: '',
                date: new Date().getTime(),
                imageUrls: [],
                title: ''
            };

        try {
          const newDoc = doc( collection( firebaseDB, `${uid}/journal/notes` ) );
          await setDoc( newDoc, newNote );
          newNote.id = newDoc.id;
          dispatch(  addNewEmptyNote( newNote ));
          dispatch( setActiveNote( newNote.id ) );
        } catch (error) {
            console.log(error);
        }
    }
}

export const startLoadingNotes = () => {
    return async ( dispatch: AppDispatch, getState: () => RootState ) => {
        const { uid } = getState().auth;
        if( !uid ) throw new Error('El User ID no existe');
        try {
                dispatch( setNotes( await loadNotes(uid) ) );
        } catch (error) {
            console.log(error);
            dispatch( logout() );
        }
        
    }

}


export const startSavingNote = ( note: Note) => {
    
    return async ( dispatch: AppDispatch, getState: () => RootState ) => {
        const { uid } = getState().auth;
        const noteId = note.id;
        const noteUpdatedFirestore: Note= {...note };
        delete noteUpdatedFirestore.id;
        dispatch( setSaving() );
        try {
            const docRef = doc( firebaseDB, `${uid}/journal/notes/${noteId}`);
            await setDoc( docRef, noteUpdatedFirestore, { merge: true } );
            dispatch( updateNote( note ) );
            dispatch( setActiveNote( noteId! ) );
        } catch (error) {
            console.log(error);
            dispatch( logout() );
        }
        
    };
}


export const startUploadingFiles = ( files: File[] = [] ) => {
     return async ( dispatch: AppDispatch, _getState: () => RootState ) => {

        const filesPromices: Promise<string | null>[] = files.map( file => fileUpload( file ) );

        const filesResponses: (string | null)[] = await Promise.all( filesPromices );

        if( filesResponses.some( resp => resp === null ) ){
            console.log("Ha ocurrido un error al tratar de guardar los archivos de las imagenes.");
            // dispatch(logout());
            return;
        }
        dispatch( setPhotosToActiveNote( filesResponses as string[] ) );
     }
}


export const startDeletingNote = () => {
    return async ( dispatch: AppDispatch, getState: () => RootState ) => {
        dispatch( setIsDeleting(true) )
        const { uid } = getState().auth;
        const { activeNote } = getState().journal;
        if( !activeNote )
            throw new Error ('Se esta tratando de borrar una nota, pero no hay ninguna nota activa.');

        try {
                const docRef = doc( firebaseDB, `${uid}/journal/notes/${activeNote.id}` );
                await deleteDoc( docRef );
                dispatch( deleteNoteById( activeNote.id! ) );
                dispatch( setActiveNoteFromNote( null ) );
        } catch (error) {
            console.log(error);
            dispatch( logout() );      
        }
        finally {
            dispatch( setIsDeleting( false ) );
        }
    };
}



import { collection, doc } from "firebase/firestore";
import type { AppDispatch, RootState } from "../store";
import { firebaseDB } from "../../firebase";
import { setDoc } from "firebase/firestore";
import { addNewEmptyNote, setActiveNote, setNotes, type Note } from "./journalSlice";
import { loadNotes } from "../../helpers";
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
            // dispatch( logout() );
        }
        
    }

}
import { collection, getDocs } from "firebase/firestore";
import { firebaseDB } from "../firebase";
import type { Note } from "../store/journal";

export const loadNotes = async ( uid: string): Promise<Note[]> => {
    if( !uid ) throw new Error('El User ID no existe');
    const collectionRef = collection( firebaseDB, `${uid}/journal/notes`);
    const docs = await getDocs( collectionRef );
    const notes: Note[] = [];
    docs.forEach( doc => {
        const note: Note = doc.data() as Note;
        note.id = doc.id;
        notes.push(note);
    } );
    return notes;
}
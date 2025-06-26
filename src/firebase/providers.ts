import { type FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, OAuthCredential, signInWithPopup, updateProfile, type Auth, type UserCredential, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "./firebaseConfig";
const googleAuthProvider = new GoogleAuthProvider();

export const signInWithGoogle = async (): Promise<SingInResponse> => {  
    /// CONFIGURACION DEL LA FORMA EN QUE ME VOY A AUTENTICAR CON GOOGLE
    const auth = getAuthFromFirebase();
    try {
        const result: UserCredential = await signInWithPopup(auth, googleAuthProvider);
        const credential: OAuthCredential | null = GoogleAuthProvider.credentialFromResult(result);
        const token: string = credential!.accessToken!;
        const { email, uid, photoURL, displayName }= result.user;
        return { 
                ok: true,
                response: {  email , uid, photoURL, displayName, token} as UserProfileInfo
            } as SingInResponse;
    } catch (error) {
        const firebaseError = error as FirebaseError;
        return {
            ok: false,
            response: { code: firebaseError.code, errorMessage: firebaseError.message } as SingInErrorResponse
        } as SingInResponse;
    }
}



export const registerUserWithEmailPassword = async ( username: string, emails: string, password: string ) => {

    try {
        const result: UserCredential = await createUserWithEmailAndPassword( getAuthFromFirebase(), emails, password );
        await updateProfile( firebaseAuth.currentUser!, { displayName: username } );
        const token = await result.user.getIdToken();
        const { email, uid, photoURL }= result.user;
        return { 
                ok: true,
                response: {  email , uid, photoURL, displayName: username, token} as UserProfileInfo
            } as SingInResponse;
    } catch ( error ) {
        const firebaseError: FirebaseError = error as FirebaseError;
        return { ok: false, response: { errorMessage: firebaseError.message, code: firebaseError.code } as SingInErrorResponse  } as SingInResponse;
    }
}

export const signInWithEmailAndPasswordApp = async ( emailP: string, password: string ) => {
     try {
        const result: UserCredential = await signInWithEmailAndPassword(getAuthFromFirebase(), emailP, password);
        const token: string = await result.user.getIdToken();
        const { email, uid, photoURL, displayName } = result.user;

        return {
            ok: true,
            response: { email, uid, photoURL, displayName, token } as UserProfileInfo
        } as SingInResponse;

    } catch (error) {
        console.log(error);
        const firebaseError = error as FirebaseError;
        return {
            ok: false,
            response: { code: firebaseError.code, errorMessage: firebaseError.message } as SingInErrorResponse
        } as SingInResponse;
    }
}

export const logoutFirebase = async () => {
    /// CIERRRA LA SESION DE CUALQUIER TIPO DE AUTENTICACION
    // QUE HAYA HECHO ANTES
    return await firebaseAuth.signOut();
}


export interface UserProfileInfo {
    uid:             string,
    token:           string
    email:           string,
    photoURL:        string,
    displayName:     string,
}

export interface SingInErrorResponse {
    code?: string,
    errorMessage: string
}

export interface SingInResponse {
    ok: boolean,
    response: UserProfileInfo | SingInErrorResponse
}

const getAuthFromFirebase = (): Auth => {
     const auth = getAuth();
    auth.useDeviceLanguage();
    return auth;
}
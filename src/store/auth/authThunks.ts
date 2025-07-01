import { checkingCredentials, login, logout, type AppDispatch, type LoginPayload } from "..";
import { logoutFirebase, registerUserWithEmailPassword, signInWithEmailAndPasswordApp, signInWithGoogle, type SingInErrorResponse, type UserProfileInfo } from "../../firebase";
import { clearNotesOnLogout } from "../journal";
import { type RootState } from '../store';

export const checkingAuthentication = () => {
    return async ( dispatch: AppDispatch, _getState: () => RootState ) => {
        dispatch( checkingCredentials() );
    }
}


export const startGoogleSignIn = () => {
    return async ( dispatch: AppDispatch ) => {
        dispatch( checkingCredentials() );
        try {
            const response = await signInWithGoogle();
            if( response.ok ) {
                const data: UserProfileInfo = response.response as UserProfileInfo;
                const payload: LoginPayload = { 
                    uid: data.uid,
                    displayName: data.displayName,
                    email: data.email,
                    token: data.token,
                    photoURL: data.photoURL,
                }
                dispatch( login( payload ) );
            } else {
                dispatch( logout( (response.response as SingInErrorResponse).errorMessage ) );
                return;
            }
        } catch( error ) {
          console.log( error );  
        }
    }
}


export const startCreatingUserWithEmailPassword = (username: string, email: string, password: string) => {
    return async ( dispatch: AppDispatch ) => {
        dispatch( checkingCredentials() );
        try {
            const response = await registerUserWithEmailPassword(username, email, password);
            if( response.ok ) {
                const data: UserProfileInfo = response.response as UserProfileInfo;
                const payload: LoginPayload = { 
                    uid: data.uid,
                    displayName: data.displayName,
                    email: data.email,
                    token: data.token,
                    photoURL: data.photoURL,
                }
                dispatch( login( payload ) );
            } else {
                dispatch( logout( (response.response as SingInErrorResponse).errorMessage ) );
                return;
            }
        } catch( error ) {
          console.log( error );  
        }
    }
}

export const startSignInWithEmailAndPassword= ( email: string, password: string) => {
    return async ( dispatch: AppDispatch ) => {
        dispatch( checkingCredentials() );
        try {
            const response = await signInWithEmailAndPasswordApp( email, password );
            if( response.ok ) {
                const data: UserProfileInfo = response.response as UserProfileInfo;
                const payload: LoginPayload = { 
                    uid: data.uid,
                    displayName: data.displayName,
                    email: data.email,
                    token: data.token,
                    photoURL: data.photoURL,
                }
                dispatch( login( payload ) );
            } else {
                dispatch( logout( (response.response as SingInErrorResponse).errorMessage ) );
                return;
            }
        } catch( error ) {
          console.log( error );  
        }
    }
}

export const startLogout = () => {
    
    return async ( dispatch: AppDispatch ) => {
        try {
            await logoutFirebase();
            dispatch( clearNotesOnLogout() );
            dispatch( logout() );
        } catch (error) {
            console.log(error);
            logout();
        }

    }
}
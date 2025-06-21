import { checkingCredentials, type AppDispatch } from "..";
import { signInWithGoogle } from "../../firebase";
// import { appAPI } from "../../api/AppAPI";
// import type { LoginRequest } from "../../auth/pages/Login/interfaces/LoginInterfaces";
import { type RootState } from '../store';

export const checkingAuthentication = ( email: string, password: string ) => {
    return async ( dispatch: AppDispatch, getState: () => RootState ) => {
        dispatch( checkingCredentials() );
        try {
                // const requestBody: LoginRequest = {email, password};
                // const { data } = await appAPI.post(`/auth/login`, requestBody );
                // console.log( data );
        } catch( error ) {
          console.log( error );  
        }
    }
}


export const startGoogleSignIn = () => {
    return async ( dispatch: AppDispatch, getState: () => RootState ) => {
        dispatch( checkingCredentials() );
        const response = await signInWithGoogle();
        try {
            //algo
            console.log(response)
        } catch( error ) {
          console.log( error );  
        }
    }
}
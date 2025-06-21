import { type FirebaseError } from "firebase/app";
import { getAuth, GoogleAuthProvider, OAuthCredential, signInWithPopup, type UserCredential } from "firebase/auth";

const googleAuthProvider = new GoogleAuthProvider();

export const signInWithGoogle = async (): Promise<SingInGoogleResponse> => {  
    /// CONFIGURACION DEL LA FORMA EN QUE ME VOY A AUTENTICAR CON GOOGLE
    const auth = getAuth();
    auth.useDeviceLanguage(); // SETEO EL LENGUAJE DEL POPUP
    try {
        const result: UserCredential = await signInWithPopup(auth, googleAuthProvider);
        const credential: OAuthCredential | null = GoogleAuthProvider.credentialFromResult(result);
        const token: string = credential!.accessToken!;
        const { email, uid, photoURL, displayName }= result.user;
        return { ok: true, response: {  email , uid, photoURL, displayName, token} as GoogleUserInfo} as SingInGoogleResponse;
    } catch (error) {
        const firebaseError = error as FirebaseError;
        const response: SingInGoogleResponse = {
            ok: false,
            response: { code: firebaseError.code, errorMessage: firebaseError.message } as GoogleSingInErrorResponse
        }
        return response
    }
}

export interface GoogleUserInfo {
    email:           string,
    uid:             string,
    photoURL:        string,
    displayName:     string,
    token:           string
}

export interface GoogleSingInErrorResponse {
    code: string,
    errorMessage: string
}

export interface SingInGoogleResponse {
    ok: boolean,
    response: GoogleUserInfo | GoogleSingInErrorResponse
}
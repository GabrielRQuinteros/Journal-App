import { createSlice, type PayloadAction } from '@reduxjs/toolkit';


export enum AuthStatus {
    CHECKING= 'CHECKING',
    AUTHENTICATED= 'AUTHENTICATED',
    NOT_AUTHENTICATED= 'NOT_AUTHENTICATED'
}

export interface AuthState {
  status: AuthStatus,
  uid: string | null,
  email: string | null,
  name: string | null,
  photoURL: string | null,
  errorMessage: string | null
}

export interface LoginPayload {
  email: string,
  password: string
}

const initialState: AuthState = {
  status: AuthStatus.NOT_AUTHENTICATED,
  email: null,
  uid: null,
  name: null,
  photoURL: null,
  errorMessage: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<LoginPayload> ) => {
            
        },
        logout: (state) => {
            state.status=  initialState.status;
            state.email=  initialState.email;
            state.uid=  initialState.uid;
            state.name=  initialState.name;
            state.photoURL=  initialState.photoURL;
            state.errorMessage=  initialState.errorMessage;
        },
        checkingCredentials: ( state ) => {
          state.status = AuthStatus.CHECKING;
        }
    }
});

export const { login, logout, checkingCredentials } = authSlice.actions;
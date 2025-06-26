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
  errorMessage: string | null,
  token: string | null,
}

export interface LoginPayload {
  uid:             string,
  displayName:     string | null,
  email:           string | null,
  photoURL:        string | null,
  token:           string | null,
}

const initialState: AuthState = {
  status: AuthStatus.CHECKING,
  email: null,
  uid: null,
  name: null,
  photoURL: null,
  errorMessage: null,
  token: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<LoginPayload> ) => {
          state.status = AuthStatus.AUTHENTICATED;
          state.email=  action.payload.email;
          state.uid=  action.payload.uid;
          state.name=  action.payload.displayName;
          state.photoURL=  action.payload.photoURL;
          state.errorMessage=  null;
          state.token= action.payload.token;
            
        },
        logout: (state, action: PayloadAction<string | undefined>) => {
            state.status= AuthStatus.NOT_AUTHENTICATED;
            state.email=  null;
            state.uid=  null;
            state.name=  null;
            state.photoURL=  null;
            state.errorMessage=  action.payload || null;
            state.token= null;
        },
        checkingCredentials: ( state ) => {
          state.status = AuthStatus.CHECKING;
          state.email=  null;
          state.uid=  null;
          state.name=  null;
          state.photoURL=  null;
          state.errorMessage= null;
          state.token= null;
        }
    }
});

export const { login, logout, checkingCredentials } = authSlice.actions;
import { User } from './../../model/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
    isLoggedIn: boolean;
    logging? :boolean;
    currentUser?: User;
}

export interface LoginPayload {
    username: string;
    password: string;
}

const initialState : AuthState = {
    isLoggedIn: false,
    logging: false,
    currentUser: undefined,
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState ,
    reducers: {
        login(state, action: PayloadAction<LoginPayload>){
            state.logging = true;

        },
        loginSuccess(state, action: PayloadAction<User>){
            state.isLoggedIn = true;
            state.logging = false;
            state.currentUser = action.payload;

        },
        loginfailed(state, action: PayloadAction<string>){
            state.logging = false;
        },

        logout(state){
            state.isLoggedIn = false;
            state.currentUser = undefined;
        }
    }

})
//Actions
export const authActions = authSlice.actions;

// selector

export const selectIsLoggedIn = (state : any) => state.auth.isLoggedIn;
export const selectLogging = (state : any) => state.auth.logging;


// Reducer
const  authReducer = authSlice.reducer;
export default authReducer;
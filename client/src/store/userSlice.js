import { createSlice } from "@reduxjs/toolkit";

const USER_KEY = 'username';

const initialState = {
    userName: localStorage.getItem(USER_KEY)
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUsername: (state, action) => {
            localStorage.setItem(USER_KEY, action.payload);
            state.userName = action.payload;
        }
    }
});

export const selectUsername = state => state.user.userName;

export const { setUsername } = userSlice.actions;

export default userSlice.reducer;
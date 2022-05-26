import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    name: null,
    email: null,
    token: null,
    id: null,
    // name: 'islom',
    // email: 'islom@gmail.com',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.name = action.payload.name
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.id = action.payload.id;
        },
        changeName(state, action) {
            state.name = action.payload;
        },
        removeUser(state) {
            state.name = null;
            state.email = null;
            state.token = null;
            state.id = null;
        },
    },
});

export const {setUser, removeUser,changeName} = userSlice.actions;

export default userSlice.reducer;
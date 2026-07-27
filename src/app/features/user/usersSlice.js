import {createSlice} from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "users",
    initialState: {
        id: null,
        userName: null,
        userPassword: null,
        accessToke: null,
        refreshToken: null,
    },
    reducers: {
        loginUser: (state, action) => {
            state.id = action.payload.id;
            state.userName = action.payload.userName;
            state.userPassword = action.payload.userPassword;
            state.accessToke = action.payload.accessToke;
            state.refreshToken = action.payload.refreshToken;
        }
    }
})
export default userSlice.reducer;
export const {loginUser, logoutUser} = userSlice.actions
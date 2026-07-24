import {createSlice} from "@reduxjs/toolkit";

const textSlice = createSlice({
    name: 'text',
    initialState: {text: ""},
    reducers: {
        setText: (state, action) => {
            state.text = action.payload
        }
    }
})
export default textSlice.reducer
export const {setText} = textSlice.actions
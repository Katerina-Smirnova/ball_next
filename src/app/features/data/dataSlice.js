import { createSlice} from "@reduxjs/toolkit";
import fetchData from "./dataThunk";
const initialState = {
    data: [],
    isLoading: false,
    error: null,
}
const dataSlice = createSlice({
    name: "data",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.isLoading= true;
                state.error = null;
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
})
export default dataSlice.reducer;

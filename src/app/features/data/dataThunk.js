import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const fetchData = createAsyncThunk(
    'fetchData',
    async () => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.data)
            .catch(error => console.error(error));
        return response;
    })
export default fetchData;
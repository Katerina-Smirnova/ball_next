import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const fetchData = createAsyncThunk(
    'fetchData',
    async () => {
        try{
            const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
            return response.data;
        }catch (error){
            let errorMessage = 'Произошла ошибка'
            if (error.response) {
                switch (error.response.status){
                    case 400:
                        errorMessage = 'Неверный запрос. Проверьте введенные данные.';
                        break;
                    case 403:
                        errorMessage = 'Доступ запрещен.';
                        break;
                    case 404:
                        errorMessage = 'Сервер не найден.';
                        break;
                    case 500:
                        errorMessage = 'Внутренняя ошибка сервера. Попробуйте позже.';
                        break;
                    default:
                        errorMessage = `Ошибка сервера: ${error.response.status}`;
                }
            }
            return rejectWithValue(errorMessage);
        }
    })
export default fetchData;
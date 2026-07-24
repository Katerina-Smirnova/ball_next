import {configureStore} from "@reduxjs/toolkit";
import dataReducer from "@/app/features/data/dataSlice";
import userReducer from "@/app/features/user/usersSlice";
import textReducer from "@/app/features/text/textSlice";

export const store = configureStore({
    reducer: {
        data: dataReducer,
        user: userReducer,
        text: textReducer,
    }
})
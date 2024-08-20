import { configureStore } from "@reduxjs/toolkit";
import commonSlice from "../Slices/common/commonSlice";


const store = configureStore({
    reducer: {
        commonData: commonSlice
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export default store;
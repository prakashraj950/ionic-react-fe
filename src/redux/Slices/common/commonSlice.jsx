import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiInstance from "../../ApiInstance";

const initialState = {
    getUserDataLoading: false,
    getUserData: null,
    updateUserDataLoading: false,
    updateUserData: null,
    addUserDataLoading: false,
    addUserData: null,

}


export const getUserData = createAsyncThunk('getUserData', async (data, { rejectWithValue }) => {

    try {
        const response = await ApiInstance.get(`${import.meta.env.VITE_API_URL}/users`);
        return response;
    } catch (err) {
        return rejectWithValue(err)
    }
})



export const updateUserData = createAsyncThunk('updateUserData', async (data, { rejectWithValue }) => {
    try {
        const response = await ApiInstance.post(`${import.meta.env.VITE_API_URL}/${data.id}/booking_status_update`, data);
        return response;
    } catch (err) {
        return rejectWithValue(err)
    }
})

export const addUserData = createAsyncThunk('addUserData', async (data, { rejectWithValue }) => {
    console.log(...data, 'dat');

    try {
        const response = await ApiInstance.post(`${import.meta.env.VITE_API_URL}/users/addUser`, data);
        return response;
    } catch (err) {
        return rejectWithValue(err)
    }
})


const commonSlice = createSlice({
    name: 'commonSlice',
    initialState,
    reducers: {
        setGetUserDataToNull: (state) => {
            state.getUserData = null
        },


        setAddUserDataToNull: (state) => {
            state.addUserData = null
        },

        setUpdateUserDataToNull: (state) => {
            state.updateUserData = null
        }
    },
    extraReducers: (builders) => {
        //getUserData
        builders.addCase(getUserData.fulfilled, (state, action) => {
            state.getUserData = action.payload.data
            state.getUserDataLoading = false
        })
        builders.addCase(getUserData.pending, (state, action) => {
            state.getUserDataLoading = true
        })
        builders.addCase(getUserData.rejected, (state, action) => {
            state.getUserData = action?.payload?.response?.data
            state.getUserDataLoading = false
        })


        //addUserData
        builders.addCase(addUserData.fulfilled, (state, action) => {
            state.addUserData = action.payload.data
            state.addUserDataLoading = false
        })
        builders.addCase(addUserData.pending, (state, action) => {
            state.addUserDataLoading = true
        })
        builders.addCase(addUserData.rejected, (state, action) => {
            state.addUserData = action?.payload?.response?.data
            state.addUserDataLoading = false
        })



        //updateUserData
        builders.addCase(updateUserData.fulfilled, (state, action) => {
            state.updateUserData = action.payload.data
            state.updateUserDataLoading = false
        })
        builders.addCase(updateUserData.pending, (state, action) => {
            state.updateUserDataLoading = true
        })
        builders.addCase(updateUserData.rejected, (state, action) => {
            state.updateUserData = action?.payload?.response?.data
            state.updateUserDataLoading = false
        })
    }
})

export const { setGetUserDataToNull, setUpdateUserDataToNull, setAddUserDataToNull } = commonSlice.actions
export default commonSlice.reducer
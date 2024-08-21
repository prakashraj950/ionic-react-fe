import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiInstance from "../../ApiInstance";

const initialState = {
    getUserDataLoading: false,
    getUserData: null,
    updateUserDataLoading: false,
    updateUserData: null,
    addUserDataLoading: false,
    addUserData: null,

    getUserDataById: null,
    getUserDataByIdLoading: false,
    deleteUserDataById: null,
    deleteUserDataByIdLoading: false,

    openStatus: false,
    message: '',
    severity: 'info'
}

export const openSnackbar = createAction('snack/open', function prepare(data) {
    return {
        payload: {
            ...data
        },
    }
})

export const getUserData = createAsyncThunk('getUserData', async (data, { rejectWithValue }) => {

    try {
        const response = await ApiInstance.get(`${import.meta.env.VITE_API_URL}/users`);
        return response;
    } catch (err) {
        return rejectWithValue(err)
    }
})


export const getUserDataById = createAsyncThunk('getUserDataById', async (data, { rejectWithValue }) => {

    try {
        const response = await ApiInstance.get(`${import.meta.env.VITE_API_URL}/users/${data.id}`);
        return response;
    } catch (err) {
        return rejectWithValue(err)
    }
})



export const updateUserData = createAsyncThunk('updateUserData', async (data, { rejectWithValue }) => {
    try {
        const response = await ApiInstance.patch(`${import.meta.env.VITE_API_URL}/users/${data?.id}`, data?.formData);
        return response;
    } catch (err) {
        return rejectWithValue(err)
    }
})

export const addUserData = createAsyncThunk('addUserData', async (data, { rejectWithValue }) => {

    try {
        const response = await ApiInstance.post(`${import.meta.env.VITE_API_URL}/users/addUser`, data);
        return response;
    } catch (err) {
        return rejectWithValue(err)
    }
})


export const deleteUserDataById = createAsyncThunk('deleteUserDataById', async (data, { rejectWithValue }) => {
    try {
        const response = await ApiInstance.delete(`${import.meta.env.VITE_API_URL}/users/${data.id}`);
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

        setGetUserDataByIdToNull: (state) => {
            state.getUserDataById = null
        },

        setAddUserDataToNull: (state) => {
            state.addUserData = null
        },

        setUpdateUserDataToNull: (state) => {
            state.updateUserData = null
        },

        setDeleteUserDataByIdToNull: (state) => {
            state.deleteUserDataById = null
        },

        resetSnackBarData: (state) => {
            state.openStatus = false;
            state.message = '';
            state.severity = 'info';
        }
    },
    extraReducers: (builders) => {

        //Toast
        builders.addCase(openSnackbar, (state, action) => {
            state.openStatus = true;
            if (action.payload) {
                state.message = action.payload.message || state.message;
                state.severity = action.payload.severity || state.severity;
            }
        });

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

        //getUserDataById
        builders.addCase(getUserDataById.fulfilled, (state, action) => {
            state.getUserDataById = action.payload.data
            state.getUserDataByIdLoading = false
        })
        builders.addCase(getUserDataById.pending, (state, action) => {
            state.getUserDataByIdLoading = true
        })
        builders.addCase(getUserDataById.rejected, (state, action) => {
            state.getUserDataById = action?.payload?.response?.data
            state.getUserDataByIdLoading = false
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

        //deleteUserDataById
        builders.addCase(deleteUserDataById.fulfilled, (state, action) => {
            state.deleteUserDataById = action.payload.data
            state.deleteUserDataByIdLoading = false
        })
        builders.addCase(deleteUserDataById.pending, (state, action) => {
            state.deleteUserDataByIdLoading = true
        })
        builders.addCase(deleteUserDataById.rejected, (state, action) => {
            state.deleteUserDataById = action?.payload?.response?.data
            state.deleteUserDataByIdLoading = false
        })
    }
})

export const { setGetUserDataToNull, setUpdateUserDataToNull, setAddUserDataToNull, resetSnackBarData, setGetUserDataByIdToNull, setDeleteUserDataByIdToNull } = commonSlice.actions
export default commonSlice.reducer
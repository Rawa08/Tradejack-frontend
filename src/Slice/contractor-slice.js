import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllWorkOrders = createAsyncThunk(
    'contractor/fetchAll',
    async (thunkapi) => {
        const res = await axios.get(`http://localhost:3000/api/work/workorders/`, {
            headers: {
                'authorization': localStorage.getItem('accessToken')
            }
        });

        return res.data;
    }
)

const initialState = { status: 'idle', entities: [] };

const contractorSlice = createSlice({
    name: 'contractorOrders',
    initialState,
    reducers: {
        createOffer: (state, action) => {
            state.entities = [...state.entities, action.payload]
        }
    },
    extraReducers: (builders) => {
        builders
            .addCase(fetchAllWorkOrders.fulfilled, (state, action) => {
                state.status = 'done';
                state.entities = [...action.payload];
            })
    }
});


export const { createOffer } = contractorSlice.actions;
export default contractorSlice.reducer;

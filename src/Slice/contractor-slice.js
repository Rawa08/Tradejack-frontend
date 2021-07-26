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

export const fetchAllAssignedWorkOrders = createAsyncThunk(
    'contractor/fetchAssigned',
    async (id, thunkapi) => {
        const res = await axios.get(`http://localhost:3000/api/work/workorders/contractor/${id}`, {
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
        },
        orderFilter: (state, action) => {
            console.log(state.entities)
            const { searchField, searchText } = action.payload;
            if(searchField === 'title'){
                state.entities = state.entities.filter(entity => entity.title.includes(searchText))
            }
            if(searchField === 'desc'){
                state.entities = state.entities.filter(entity => entity.description.includes(searchText))
            }

        }
    },
    extraReducers: (builders) => {
        builders
            .addCase(fetchAllWorkOrders.fulfilled, (state, action) => {
                state.status = 'done';
                console.log('entity.work_done')
                const filteredPayload = action.payload.filter(entity => !entity.work_done
                )
                state.entities = [...filteredPayload];
            })
            .addCase(fetchAllAssignedWorkOrders.fulfilled, (state, action) => {
                state.status = 'done';
                const filteredPayload = action.payload.filter(entity => !entity.work_done
                    )
                    state.entities = [...filteredPayload];
                console.log('Assigned', filteredPayload)
            })
    }
});


export const { createOffer, orderFilter } = contractorSlice.actions;
export default contractorSlice.reducer;

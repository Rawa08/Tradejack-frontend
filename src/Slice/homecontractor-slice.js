import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllContractors= createAsyncThunk(
    'contractor/fetchAllWithRating',
    async (thunkapi) => {
        const res = await axios.get(`http://localhost:3000/api/users/contractors/withrating`, {
            headers: {
                'authorization': localStorage.getItem('accessToken')
            }
        });

        return res.data;
    }
)

const initialState = { status: 'idle', entities: [] };

const homecontractorSlice = createSlice({
    name: 'homecontractor',
    initialState,
    reducers: {
        createOffer: (state, action) => {
            state.entities = [...state.entities, action.payload]
        },
        orderFilter: (state, action) => {
            const { searchField, searchText } = action.payload;
            if(searchField === 'title'){
                state.entities = state.entities.filter(entity => entity.title.toLowerCase().includes(searchText.toLowerCase()))
            }
            if(searchField === 'desc'){
                state.entities = state.entities.filter(entity => entity.description.toLowerCase().includes(searchText.toLowerCase()))
            }

        }
    },
    extraReducers: (builders) => {
        builders
            .addCase(fetchAllContractors.fulfilled, (state, action) => {
                state.status = 'done';
                const sorted = action.payload.sort((a,b) => (a.rating - b.rating))
                state.entities = [...sorted];
            })
    }
});


export const { createOffer, orderFilter } = homecontractorSlice.actions;
export default homecontractorSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchWorkorders = createAsyncThunk(
    'workorder/fetch',
    async (thunkapi) => {
        const res = await axios.get(`http://localhost:3000/api/work/workorders/user/`, {
            headers: {
                'authorization': localStorage.getItem('accessToken')
            }
        });

        return res.data;
    }
)

export const fetchAllWorkOrder = createAsyncThunk(
    'workorder/fetchAll',
    async (thunkapi) => {
        const res = await axios.get(`http://localhost:3000/api/work/workorders/user/`, {
            headers: {
                'authorization': localStorage.getItem('accessToken')
            }
        });

        return res.data;
    }
)

export const createWorkorder = createAsyncThunk(
    'workorder/create',
    async (order, thunkapi) => {
        const res = await axios.post(`http://localhost:3000/api/work/workorders/`, order, {
            headers: {
                'authorization': localStorage.getItem('accessToken')
            }
        });

        return res.data;
    }
);

export const fetchWorkOffers = createAsyncThunk(
    'workOffer/fetch',
    async (id, thunkapi) => {
        const res = await axios.get(`http://localhost:3000/api/work/workOffers/${id}`, {
            headers: {
                'authorization': localStorage.getItem('accessToken')
            }
        });
        return res.data;
    }
);

const initialState = { status: 'idle', entities: [] };

const workorderSlice = createSlice({
    name: 'workorder',
    initialState,
    reducers: {
        changeDoneStatus: (state, action) => {
            state.entities.find(entity => {
                if (entity.id === action.payload) {
                    axios.put(`http://localhost:3000/api/work/workorders/${entity.id}`, {
                        'updatetype': 'work_done',
                        'data': !entity.work_done
                    }, {
                    headers: {
                        'authorization': localStorage.getItem('accessToken')
                    }
                });
                    return entity.work_done = !entity.work_done
                }
                return entity.work_done;
            })
        },
        createOrder: (state, action) => {
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
            .addCase(fetchWorkorders.fulfilled, (state, action) => {
                state.status = 'done';
                state.entities = [...action.payload];
            })
            .addCase(fetchAllWorkOrder.fulfilled, (state, action) => {
                state.status = 'done';
                state.entities = [...action.payload]
            })
            .addCase(fetchWorkOffers.fulfilled, (state, action) => {
                state.status = 'done';
                if (action.payload.length > 0) {
                    action.payload.map(offer => {
                        state.entities.map(entity => {
                            if (entity.id === offer.order_id) {

                                return entity.workOffers = [...action.payload];
                            }
                            return entity;
                        })
                        return offer;
                    })
                }
            })
    }

});


export const { changeDoneStatus, createOrder, orderFilter } = workorderSlice.actions;
export default workorderSlice.reducer;


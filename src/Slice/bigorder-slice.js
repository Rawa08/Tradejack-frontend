import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchOneWorkOrder = createAsyncThunk(
    'order/fetchOne',
    async (id, thunkapi) => {
        const res = await axios.get(`http://localhost:3000/api/work/workorders/${id}`, {
            headers: {
                'authorization': localStorage.getItem('accessToken')
            }
        });
        const resOffer = await axios.get(`http://localhost:3000/api/work/workOffers/${id}`, {
            headers: {
                'authorization': localStorage.getItem('accessToken')
            }
        });
        const response = res.data;
        response[0].workoffers = resOffer.data
        return response;
    }
)

const initialState = { status: 'idle', entities: {} };

const bigorderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        changeDoneStatus: (state, action) => {
                const now = !state.entities.work_done ? new Date() : null
                    axios.put(`http://localhost:3000/api/work/workorders/${action.payload}`, {
                        'updatetype': 'work_done',
                        'data': !state.entities.work_done
                    }, {
                        headers: {
                            'authorization': localStorage.getItem('accessToken')
                        }
                    });
                    axios.put(`http://localhost:3000/api/work/workorders/${action.payload}`, {
                            'updatetype': 'end_date',
                            'data': now
                        }, {
                        headers: {
                            'authorization': localStorage.getItem('accessToken')
                        }
                    });
                    state.entities.work_done = !state.entities.work_done

        }
    },
    extraReducers: (builders) => {
        builders
            .addCase(fetchOneWorkOrder.fulfilled, (state, action) => {
                state.status = 'done';
                state.entities = action.payload[0];
            })
    }
});


export const { createOffer, changeDoneStatus } = bigorderSlice.actions;
export default bigorderSlice.reducer;

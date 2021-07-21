import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchWorkorders = createAsyncThunk(
    'workorder/fetch',
    async (id, thunkapi) => {
        const res = await axios.get(`http://localhost:3000/api/work/workorders/user/${id}`);
        console.log(res.data);
        return res.data;
    }
)
const initialState = { status: 'idle', entities: [] };

const workorderSlice = createSlice({
    name: 'workorder',
    initialState,
    reducers: {
        consoleSomething: (state, action) => console.log('Action: '+action.payload),
        changeDoneStatus: (state, action) => {
          state.entities.find(entity => {
              if(entity.id === action.payload) {
                  console.log(entity.work_done)
                  return entity.work_done = !entity.work_done}
            return entity.work_done;
          })
        }
    },
    extraReducers:(builders) => {
        builders.addCase(fetchWorkorders.fulfilled, (state, action)=> {
            state.status = 'done';
            state.entities = [...action.payload];
        })
    }

})

export const {changeDoneStatus, consoleSomething} = workorderSlice.actions;
export default workorderSlice.reducer;


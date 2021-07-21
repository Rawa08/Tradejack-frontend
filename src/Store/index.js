import { configureStore } from '@reduxjs/toolkit';
import workorderSlice  from '../Slice/workorder-slice';

export const store = configureStore({
    reducer: {
        workorderSlice: workorderSlice
    }
});
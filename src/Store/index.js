import { configureStore } from '@reduxjs/toolkit';
import workorderSlice  from '../Slice/workorder-slice';
import contractorSlice from '../Slice/contractor-slice';
import bigorderSlice from '../Slice/bigorder-slice';



export const store = configureStore({
    reducer: {
        workorderSlice: workorderSlice,
        contractorSlice: contractorSlice,
        bigorderSlice: bigorderSlice
    }
});
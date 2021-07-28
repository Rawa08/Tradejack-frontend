import { configureStore } from '@reduxjs/toolkit';
import workorderSlice  from '../Slice/workorder-slice';
import contractorSlice from '../Slice/contractor-slice';
import bigorderSlice from '../Slice/bigorder-slice';
import homecontractorSlice from '../Slice/homecontractor-slice';

export const store = configureStore({
    reducer: {
        workorderSlice: workorderSlice,
        contractorSlice: contractorSlice,
        bigorderSlice: bigorderSlice,
        homecontractorSlice: homecontractorSlice
    }
});
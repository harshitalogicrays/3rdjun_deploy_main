import { createSlice } from "@reduxjs/toolkit";

const rentalSlice = createSlice({
    name:'rental',
    initialState:{rentalInfo:{}},
    reducers:{
        STORE_RENTAL(state,action){
            state.rentalInfo = action.payload
        }
    }
})
export const {STORE_RENTAL} = rentalSlice.actions
export default rentalSlice.reducer
export const selectRentalInfo = state=>state.rental.rentalInfo
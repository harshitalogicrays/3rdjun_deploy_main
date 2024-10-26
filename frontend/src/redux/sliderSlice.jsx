import { createSlice } from "@reduxjs/toolkit";

const sliderSlice = createSlice({
    name:"slider",
    initialState:{slidersData:[]},
    reducers:{
        STORE_SLIDERS(state,action){
            state.slidersData=action.payload
        }
    }
})
export const {STORE_SLIDERS}=sliderSlice.actions
export default sliderSlice.reducer
export const selectsliders= state=>state.slider.slidersData
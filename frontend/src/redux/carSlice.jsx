import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCars = createAsyncThunk('car/storecar',async(_,thunkAPI)=>{
    try{
        const res = await axios.get(`${import.meta.env.VITE_URL}/cars`)
        return res.data}
    catch(error){
        return thunkAPI.rejectWithValue(error.message)
    }
})

const carSlice = createSlice({
    name:"car",
    initialState:{carsData:[],status:'idle',error:null},
    reducers:{ },
    extraReducers:(builder)=>{
        builder.addCase(fetchCars.pending,(state,action)=>{
            state.status='loading'
        })
        .addCase(fetchCars.fulfilled,(state,action)=>{
                state.status="successed"
                state.carsData =  action.payload
        })
        .addCase(fetchCars.rejected,(state,action)=>{
            state.status="failed"
            state.error=action.payload
        })
    }
})
export default carSlice.reducer
export const selectCars= state=>state.car.carsData
export const selectStatus = state=>state.car.status
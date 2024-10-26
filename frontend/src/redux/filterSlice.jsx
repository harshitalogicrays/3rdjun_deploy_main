import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name:"filter",
    initialState:{filtersData:[],searchval:'',fuelval:'',capval:''},
    reducers:{
        FILTER_BY_SEARCH(state,action){
            let {cars,search}=action.payload
            if(search !=''){
              const filter = cars.filter(c => c.model.toLowerCase().includes(search.toLowerCase()))
              state.filtersData = filter
            }
            state.searchval = search
        },
        FILTER_BY_FUEL(state,action){
          let {cars,fuelType}=action.payload
          if(fuelType !=''){
            const filter = cars.filter(c => c.fuel==fuelType)
            state.filtersData = filter
          }
          state.fuelval = fuelType
        },
        FILTER_BY_CAPACITY(state,action){
            // console.log(action.payload)
            let {cars,capacity}=action.payload
            if(capacity !=''){
              const filter = cars.filter(c => c.capcity==capacity)
              state.filtersData = filter
            }
            state.capval = capacity
        }       
    }
})

export const {FILTER_BY_CAPACITY,FILTER_BY_FUEL,FILTER_BY_SEARCH} = filterSlice.actions
export default filterSlice.reducer
export const selectfilters= state=>state.filter.filtersData
export const selectSearch = state=>state.filter.searchval
export const selectFuel = state=>state.filter.fuelval
export const selectCapacity = state=>state.filter.capval
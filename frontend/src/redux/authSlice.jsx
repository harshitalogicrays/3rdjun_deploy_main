import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:'auth',
    initialState:{isLoggedIn:false,userEmail:'',userName:'',userId:'',userRole:''},
    reducers:{
        LOGIN_USER(state,action){
            let {email,name,id,role}=action.payload
            state.isLoggedIn = true
            state.userEmail=email
            state.userName=name
            state.userId = id
            state.userRole=role 
        },
        LOGOUT_USER(state,action){
            state.isLoggedIn = false
            state.userEmail=''
            state.userName=""
            state.userId = ""
            state.userRole="" 
        }
    }
})

export const {LOGIN_USER,LOGOUT_USER}=authSlice.actions
export default authSlice.reducer
export const selectIsLoggedIn = state=>state.auth.isLoggedIn
export const selectEmail = state=>state.auth.userEmail
export const selectName = state=>state.auth.userName
export const selectId = state=>state.auth.userId
export const selectRole = state=>state.auth.userRole


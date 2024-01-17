import { createSlice } from "@reduxjs/toolkit";

const mailSlice = createSlice({
    name: "mail",
    initialState: { },
    reducers: {
       subscribeRequest(state,action){
            state.loading = true;
       },
       subscribeSuccess(state,action){
            state.loading = false;
            state.message = action.payload.message;
            state.isSubscribe = action.payload.success;
       },
       subscribeFail(state,action){
            state.loading = false;
            state.error = action.payload;
       },
       subscribeReset(state,action){
          state.isSubscribe = false;
       },

       contactRequest(state,action){
            state.loading = true;
       },
       contactSuccess(state,action){
            state.loading = false;
            state.success = action.payload.success;
            state.message = action.payload.message;
       },
       contactFail(state,action){
            state.loading = false;
            state.error = action.payload;
       },
       contactReset(state,action){
          state.success = false;
       },

       sendLettersRequest(state,action){
            state.loading = true;
       },
       sendLettersSuccess(state,action){
            state.loading = false;
            state.message = action.payload;
       },
       sendLettersFail(state,action){
        state.loading = false;
        state.error = action.payload;
        },

        clearError(state,action){
            state.error = null;
        },
        clearMessage(state,action){
            state.message = null;
        }

    }
})

export default mailSlice.reducer;

export const {
    subscribeRequest,
    subscribeSuccess,
    subscribeFail,
    subscribeReset,
    contactRequest,
    contactSuccess,
    contactFail,
    contactReset,
    sendLettersRequest,
    sendLettersSuccess,
    sendLettersFail,
    clearError, 
    clearMessage 
} = mailSlice.actions;



  //BUILDED BY SUBHAM-HYNA @https://github.com/Subham-hyna
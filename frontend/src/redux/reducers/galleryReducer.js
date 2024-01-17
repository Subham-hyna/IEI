import { createSlice } from "@reduxjs/toolkit";

const gallerySlice = createSlice({
    name: "gallery",
    initialState: { activities : [] },
    reducers: {
        allActivityRequest(state,action){
            state.loading = true;
            state.activities = [];
        },
        allActivitySuccess(state,action){
            state.loading = false;
            state.activities = action.payload.activities;
            state.resultPerPage = action.payload.resultPerPage;
            state.activitiesFilteredCount =  action.payload.activitiesFilteredCount;
        },
        allActivityFail(state,action){
            state.loading = false;
            state.error = action.payload;
        },

        newActivityRequest(state,action){
            state.buttonLoading = true;
        },
        newActivitySuccess(state,action){
            state.buttonLoading = false;
            state.isCreated = action.payload.success;
            state.message = action.payload.message;
        },
        newActivityFail(state,action){
            state.buttonLoading = false;
            state.error = action.payload;
        },
        newActivityReset(state,action){
            state.isCreated = false;
        },

        deleteActivityRequest(state,action){
            state.loading = true;
        },
        deleteActivitySuccess(state,action){
            state.loading = false;
            state.isDeleted = action.payload.success;
            state.message = action.payload.message;
        },
        deleteActivityFail(state,action){
            state.loading = false;
            state.error = action.payload;
        },
        deleteActivityReset(state,action){
            state.isDeleted = false;
        },

        clearError(state,action){
            state.error = null;
        },
        clearMessage(state,action){
            state.message = null;
        }
    }
})

export default gallerySlice.reducer;

export const { 
    allActivityRequest,
    allActivitySuccess,
    allActivityFail,
    newActivityRequest,
    newActivitySuccess,
    newActivityFail,
    newActivityReset,
    deleteActivityRequest,
    deleteActivitySuccess,
    deleteActivityFail,
    deleteActivityReset,
    clearError, 
    clearMessage 
} = gallerySlice.actions;


  //BUILDED BY SUBHAM-HYNA @https://github.com/Subham-hyna
import { createSlice } from "@reduxjs/toolkit";

const teamSlice = createSlice({
    name: "team",
    initialState: { fourthYears : [] , thirdYears : [] , secondYears : [] , fic : [] },
    reducers: {
        allTeamRequest(state,action){
            state.loading = true;
            state.fourthYears = [];
            state.thirdYears = [];
            state.secondYears = [];
            state.fic = [];
        },
        allTeamSuccess(state,action){
            state.loading = false;
            state.fourthYears = action.payload.fourthYears;
            state.thirdYears = action.payload.thirdYears;
            state.secondYears =  action.payload.secondYears;
            state.fic =  action.payload.fic;
        },
        allTeamFail(state,action){
            state.loading = false;
            state.error = action.payload;
        },

        newTeamRequest(state,action){
            state.buttonLoading = true;
        },
        newTeamSuccess(state,action){
            state.buttonLoading = false;
            state.isCreated = action.payload.success;
            state.message = action.payload.message;
        },
        newTeamFail(state,action){
            state.buttonLoading = false;
            state.error = action.payload;
        },
        newTeamReset(state,action){
            state.isCreated = false;
        },

        deleteTeamRequest(state,action){
            state.loading = true;
        },
        deleteTeamSuccess(state,action){
            state.loading = false;
            state.isDeleted = action.payload.success;
            state.message = action.payload.message;
        },
        deleteTeamFail(state,action){
            state.loading = false;
            state.error = action.payload;
        },
        deleteTeamReset(state,action){
            state.isDeleted = false;
        },

        updateTeamRequest(state,action){
            state.buttonLoading = true;
        },
        updateTeamSuccess(state,action){
            state.buttonLoading = false;
            state.isUpdated = action.payload.success
        },
        updateTeamFail(state,action){
            state.buttonLoading = false;
            state.error = action.payload;
        },
        updateTeamReset(state,action){
            state.isUpdated = false;
        },

        updateTeamAvatarRequest(state,action){
            state.buttonLoading = true;
        },
        updateTeamAvatarSuccess(state,action){
            state.buttonLoading = false;
            state.isUpdated = action.payload;
        },
        updateTeamAvatarFail(state,action){
            state.buttonLoading = false;
            state.error = action.payload;
        },
        updateTeamAvatarReset(state,action){
            state.isUpdated = false;
        },

        clearError(state,action){
            state.error = null;
        },
        clearMessage(state,action){
            state.message = null;
        }
    }
})

export default teamSlice.reducer;

export const {
    allTeamRequest,
    allTeamSuccess,
    allTeamFail,
    deleteTeamRequest,
    deleteTeamSuccess,
    deleteTeamFail,
    deleteTeamReset,
    newTeamRequest,
    newTeamSuccess,
    newTeamFail,
    newTeamReset, 
    updateTeamRequest,
    updateTeamSuccess,
    updateTeamFail,
    updateTeamReset,
    updateTeamAvatarRequest,
    updateTeamAvatarSuccess,
    updateTeamAvatarFail,
    updateTeamAvatarReset,
    clearError, 
    clearMessage 
} = teamSlice.actions;


  //BUILDED BY SUBHAM-HYNA @https://github.com/Subham-hyna
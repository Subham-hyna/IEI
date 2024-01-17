import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
    name: "event",
    initialState: { events : [] },
    reducers: {
        allEventRequest(state,action){
            state.loading = true;
            state.events = [];
        },
        allEventSuccess(state,action){
            state.loading = false;
            state.events = action.payload.events;
            state.resultPerPage = action.payload.resultPerPage;
            state.eventsFilteredCount =  action.payload.eventsFilteredCount;
        },
        allEventFail(state,action){
            state.loading = false;
            state.error = action.payload;
        },

        newEventRequest(state,action){
            state.buttonLoading = true;
        },
        newEventSuccess(state,action){
            state.buttonLoading = false;
            state.isCreated = action.payload.success;
            state.message = action.payload.message;
        },
        newEventFail(state,action){
            state.buttonLoading = false;
            state.error = action.payload;
        },
        newEventReset(state,action){
            state.isCreated = false;
        },

        deleteEventRequest(state,action){
            state.loading = true;
        },
        deleteEventSuccess(state,action){
            state.loading = false;
            state.isDeleted = action.payload.success;
            state.message = action.payload.message;
        },
        deleteEventFail(state,action){
            state.loading = false;
            state.error = action.payload;
        },
        deleteEventReset(state,action){
            state.isDeleted = false;
        },

        updateEventRequest(state,action){
            state.buttonLoading = true;
        },
        updateEventSuccess(state,action){
            state.buttonLoading = false;
            state.isUpdated = action.payload.success
        },
        updateEventFail(state,action){
            state.buttonLoading = false;
            state.error = action.payload;
        },
        updateEventReset(state,action){
            state.isUpdated = false;
        },

        updateEventPosterRequest(state,action){
            state.buttonLoading = true;
        },
        updateEventPosterSuccess(state,action){
            state.buttonLoading = false;
            state.isUpdated = action.payload
        },
        updateEventPosterFail(state,action){
            state.buttonLoading = false;
            state.error = action.payload;
        },
        updateEventPosterReset(state,action){
            state.isUpdated = false;
        },

        getEventDetailsRequest(state,action){
            state.loading = true;
        },
        getEventDetailsSuccess(state,action){
            state.loading = false;
            state.event = action.payload;
        },
        getEventDetailsFail(state,action){
            state.loading = false;
            state.error = action.payload;
        },

        addEventPhotoRequest(state,action){
            state.buttonLoading = true;
        },
        addEventPhotoSuccess(state,action){
            state.buttonLoading = false;
            state.isCreated = action.payload;
        },
        addEventPhotoFail(state,action){
            state.buttonLoading = false;
            state.error = action.payload;
        },
        addEventPhotoReset(state,action){
            state.isCreated = false;
        },

        deleteEventPhotoRequest(state,action){
            state.loading = true;
        },
        deleteEventPhotoSuccess(state,action){
            state.loading = false;
            state.isDeleted = action.payload;
        },
        deleteEventPhotoFail(state,action){
            state.loading = false;
            state.error = action.payload;
        },
        deleteEventPhotoReset(state,action){
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

export default eventSlice.reducer;

export const {
    allEventRequest,
    allEventSuccess,
    allEventFail,
    newEventRequest,
    newEventSuccess,
    newEventFail,
    newEventReset,
    deleteEventRequest,
    deleteEventSuccess,
    deleteEventFail,
    deleteEventReset, 
    updateEventRequest,
    updateEventSuccess,
    updateEventFail,
    updateEventReset,
    updateEventPosterRequest,
    updateEventPosterSuccess,
    updateEventPosterFail,
    updateEventPosterReset,
    getEventDetailsRequest,
    getEventDetailsSuccess,
    getEventDetailsFail,
    addEventPhotoRequest,
    addEventPhotoSuccess,
    addEventPhotoFail,
    addEventPhotoReset,
    deleteEventPhotoRequest,
    deleteEventPhotoSuccess,
    deleteEventPhotoFail,
    deleteEventPhotoReset,
    clearError, 
    clearMessage 
} = eventSlice.actions;



  //BUILDED BY SUBHAM-HYNA @https://github.com/Subham-hyna
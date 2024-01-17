import axios from "axios";
import { addEventPhotoFail, addEventPhotoRequest, addEventPhotoSuccess, allEventFail, allEventRequest, allEventSuccess, clearError, clearMessage, deleteEventFail, deleteEventPhotoFail, deleteEventPhotoRequest, deleteEventPhotoSuccess, deleteEventRequest, deleteEventSuccess, getEventDetailsFail, getEventDetailsRequest, getEventDetailsSuccess, newEventFail, newEventRequest, newEventSuccess, updateEventFail, updateEventPosterFail, updateEventPosterRequest, updateEventPosterSuccess, updateEventRequest, updateEventSuccess } from "../reducers/eventReducer";
import { server } from "../store";


// Get All Events
export const getEvents = (keyword = "", currentPage = 1, status) => async (dispatch) => {
    try {
      dispatch(allEventRequest());

      let link = `${server}/getEvent?keyword=${keyword}&page=${currentPage}`;

      if(status){
        link = `${server}/getEvent?keyword=${keyword}&page=${currentPage}&status=${status}`;
      }

      const { data } = await axios.get(link);

      dispatch(allEventSuccess(data));
    } catch (error) {
      dispatch(allEventFail(error.response.data.message));
    }
};

// Create Event
export const createEvent = (eventData) => async (dispatch) => {
  try {
    dispatch(newEventRequest());

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(`${server}/admin/addEvent`,
    eventData,
    config,
    { withCredentials: true }
    );

    dispatch(newEventSuccess(data));
  } catch (error) {
    dispatch(newEventFail(error.response.data.message));
  }
};

// Delete Event
export const deleteEvent = (id) => async (dispatch) => {
    try {
      dispatch(deleteEventRequest());
  
      const { data } = await axios.delete(`${server}/admin/deleteEvent/${id}`);
  
      dispatch(deleteEventSuccess(data));
    } catch (error) {
      dispatch(deleteEventFail(error.response.data.message));
    }
};

// Update Event Details
export const updateEvent = (eventData,id) => async (dispatch) => {
    try {
      dispatch(updateEventRequest());
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.put(`${server}/admin/updateEvent/${id}`, eventData, config);
  
      dispatch(updateEventSuccess(data));
    } catch (error) {
      dispatch(updateEventFail(error.response.data.message));
    }
  };


//Update Event Poster
export const updateEventPoster = (eventData,id) => async (dispatch) => {
  try {
    dispatch(updateEventPosterRequest());

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(`${server}/admin/event/updatePoster/${id}`,
   eventData,
    config,
    { withCredentials: true}
    );

    dispatch(updateEventPosterSuccess(data.success));
  } catch (error) {
    dispatch(updateEventPosterFail(error.response.data.message));
  }
};

//Add Event Photo
export const addEventPhoto = (eventPhoto,id) => async (dispatch) => {
  try {
    dispatch(addEventPhotoRequest());

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(`${server}/admin/event/addPhoto/${id}`,
    eventPhoto,
    config,
    { withCredentials: true}
    );

    dispatch(addEventPhotoSuccess(data.success));
  } catch (error) {
    dispatch(addEventPhotoFail(error.response.data.message));
  }
};

// Get Event Details
export const getEventDetails = (id) => async (dispatch) => {
    try {
      dispatch(getEventDetailsRequest());
  
      const { data } = await axios.get(`${server}/getEvent/${id}`);
  
      dispatch(getEventDetailsSuccess(data.event));
    } catch (error) {
      dispatch(getEventDetailsFail(error.response.data.message));
    }
};

// Delete Event Photo
export const deleteEventPhotos = (eventData,id) => async (dispatch) => {
    try {
      dispatch(deleteEventPhotoRequest());
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.put(`${server}/admin/event/removePhoto/${id}`,
      eventData,
      config );
  
      dispatch(deleteEventPhotoSuccess(data.success));
    } catch (error) {
      dispatch(deleteEventPhotoFail(error.response.data.message));
    }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch(clearError());
};

//Clearing Message
export const clearMessages = () => async (dispatch) => {
    dispatch(clearMessage());
};



  //BUILDED BY SUBHAM-HYNA @https://github.com/Subham-hyna
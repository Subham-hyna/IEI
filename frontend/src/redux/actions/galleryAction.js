import axios from "axios";
import { allActivityFail, allActivityRequest, allActivitySuccess, clearError, clearMessage, deleteActivityFail, deleteActivityRequest, deleteActivitySuccess, newActivityFail, newActivityRequest, newActivitySuccess } from "../reducers/galleryReducer";
import { server } from "../store";


// Get All Activities
export const getActivity = (keyword = "", currentPage = 1) => async (dispatch) => {
    try {
      dispatch(allActivityRequest());

      let link = `${server}/getActivity?keyword=${keyword}&page=${currentPage}`;

      const { data } = await axios.get(link);

      dispatch(allActivitySuccess(data));
    } catch (error) {
      dispatch(allActivityFail(error.response.data.message));
    }
};

// Create Activity
export const createActivity = (activityData) => async (dispatch) => {
    try {
      dispatch(newActivityRequest());
  
      const config = { headers: { "Content-Type": "multipart/form-data" } };

      const { data } = await axios.post(`${server}/admin/activity/new`,
      activityData,
      config,
      { withCredentials: true }
      );
  
      dispatch(newActivitySuccess(data));
    } catch (error) {
      dispatch(newActivityFail(error.response.data.message));
    }
};

// Delete Activity
export const deleteActivity = (id) => async (dispatch) => {
    try {
      dispatch(deleteActivityRequest());
  
      const { data } = await axios.delete(`${server}/admin/deleteActivity/${id}`);
  
      dispatch(deleteActivitySuccess(data));
    } catch (error) {
      dispatch(deleteActivityFail(error.response.data.message));
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
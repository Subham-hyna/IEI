import axios from "axios";
import { clearError, clearMessage, contactFail, contactRequest, contactSuccess, sendLettersFail, sendLettersRequest, sendLettersSuccess, subscribeFail, subscribeRequest, subscribeSuccess } from "../reducers/mailReducer";
import { server } from "../store";

export const subscribeLetter = (userData) => async(dispatch) => {
    try {
        dispatch(subscribeRequest());

        const config = { headers: { "Content-Type": "application/json" } };
    
        const { data } = await axios.post(`${server}/subscribe`,
        userData,
        config
        );
    
        dispatch(subscribeSuccess(data));
      } catch (error) {
        dispatch(subscribeFail(error.response.data.message));
      }
}

//Send Letters
export const sendLetters = (mailData) => async(dispatch) => {
    try {
        dispatch(sendLettersRequest());

        const config = { headers: { "Content-Type": "application/json" } };
    
        const { data } = await axios.post(`${server}/admin/sendletters`,
        mailData,
        config
        );
    
        dispatch(sendLettersSuccess(data));
      } catch (error) {
        dispatch(sendLettersFail(error.response.data.message));
      }
}

//Contact Us
export const contactUs = (mailData) => async(dispatch) => {
    try {
        dispatch(contactRequest());

        const config = { headers: { "Content-Type": "application/json" } };
    
        const { data } = await axios.post(`${server}/contactUs`,
        mailData,
        config
        );
    
        dispatch(contactSuccess(data));
      } catch (error) {
        dispatch(contactFail(error.response.data.message));
      }
}

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch(clearError());
};

//Clearing Message
export const clearMessages = () => async (dispatch) => {
    dispatch(clearMessage());
};



  //BUILDED BY SUBHAM-HYNA @https://github.com/Subham-hyna
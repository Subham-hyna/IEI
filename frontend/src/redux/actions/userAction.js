import axios from "axios";
// import { server } from "../store";
import { loginRequest, loginSuccess, loginFail, clearError, loadUserRequest, loadUserSuccess, loadUserFail, logoutFail, logoutSuccess, clearMessage, logoutRequest, updateProfileRequest, updateProfileSuccess, updateProfileFail, updatePasswordRequest, updatePasswordSuccess, updatePasswordFail, forgotPasswordFail, forgotPasswordSuccess, forgotPasswordRequest, resetPasswordRequest, resetPasswordSuccess, resetPasswordFail, signupRequest, signupSuccess, signupFail, updateAvatarRequest, updateAvatarSuccess, updateAvatarFail, deleteUserRequest, deleteUserSuccess, deleteUserFail } from '../reducers/userReducer'
import { server } from "../store";

//Register user
export const signup = (userData) => async (dispatch) => {
  try {
    dispatch(signupRequest());

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(`${server}/register`,
   userData,
    config,
    { withCredentials: true}
    );

    dispatch(signupSuccess(data));
    localStorage.setItem("token",data.token);
  } catch (error) {
    dispatch(signupFail(error.response.data.message));
  }
};

//Login user
export const login = (email,password) => async (dispatch) => {
  try {
    dispatch(loginRequest());

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`${server}/login`,
    { email , password },
    config,
    { withCredentials: true}
    );

    dispatch(loginSuccess(data));
    localStorage.setItem("token",data.token);
  } catch (error) {
    dispatch(loginFail(error.response.data.message));
  }
};

//LoadUser
export const loadUser = (token) => async (dispatch) => {
  try {
    dispatch(loadUserRequest());

    const { data } = await axios.get(`${server}/me?token=${token}`,
    { withCredentials: true}
    );

    dispatch(loadUserSuccess(data.user));
  } catch (error) {
    dispatch(loadUserFail(error.response.data.message));
  }
};

// Update Profile
export const updateProfile = (userData,token) => async (dispatch) => {
    try {
      dispatch(updateProfileRequest());
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.put(`${server}/me/update?token=${token}`, userData, config);
  
      dispatch(updateProfileSuccess(data));
    } catch (error) {
      dispatch(updateProfileFail(error.response.data.message));
    }
};

//Update Avatar
export const updateAvatar = (userData,token) => async (dispatch) => {
  try {
    dispatch(updateAvatarRequest());

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(`${server}/avatar/update?token=${token}`,
   userData,
    config,
    );

    dispatch(updateAvatarSuccess(data));
  } catch (error) {
    dispatch(updateAvatarFail(error.response.data.message));
  }
};

// Update Password
export const updatePassword = (userData,token) => async (dispatch) => {
    try {
      dispatch(updatePasswordRequest());
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.put(`${server}/password/update?token=${token}`, userData, config);
  
      dispatch(updatePasswordSuccess(data));
      localStorage.setItem("token",data.token);
    } catch (error) {
      dispatch(updatePasswordFail(error.response.data.message));
    }
};

// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch(forgotPasswordRequest());

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`${server}/password/forgot`, email, config);

    dispatch(forgotPasswordSuccess(data.message));
  } catch (error) {
    dispatch(forgotPasswordFail(error.response.data.message));
  }
};

// Reset Password
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch(resetPasswordRequest());

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `${server}/password/reset/${token}`,
      passwords,
      config
    );

    dispatch(resetPasswordSuccess(data.success));
    localStorage.setItem("token",data.token);
  } catch (error) {
    dispatch(resetPasswordFail(error.response.data.message));
  }
};

// Delete Account
export const deleteMe = (password,token) => async (dispatch) => {
  try {
    dispatch(deleteUserRequest());

    const { data } = await axios.delete(`${server}/me/delete/${password}?token=${token}`);

    dispatch(deleteUserSuccess(data));
  } catch (error) {
    dispatch(deleteUserFail(error.response.data.message));
  }
};

// Logout User
export const logout = () => async (dispatch) => {
    try {

      dispatch(logoutRequest());
        
      const { data } = await axios.get(`${server}/logout`);
  
      dispatch(logoutSuccess(data.message));
    } catch (error) {
      dispatch(logoutFail(error.response.data.message));
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
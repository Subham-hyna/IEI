import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: { user:{} },
    reducers: {
        loginRequest(state,action){
            state.loading = true;
            state.isAuthenticated = false;
        },
        loginSuccess(state,action){
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.message = action.payload.message;
        },
        loginFail(state,action){
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        },

        signupRequest(state,action){
            state.loading = true;
            state.isAuthenticated = false;
        },
        signupSuccess(state,action){
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.message = action.payload.message;
        },
        signupFail(state,action){
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        },

        loadUserRequest(state,action){
            state.loading = true;
            state.isAuthenticated = false;
        },
        loadUserSuccess(state,action){
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        loadUserFail(state,action){
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null
            state.error = action.payload;
        },

        logoutRequest(state,action){
            state.loading = true;
        },
        logoutSuccess(state,action){
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
            state.message = action.payload;
        },
        logoutFail(state,action){
            state.loading = false;
            state.error = action.payload;
        },

        updateProfileRequest(state,action){
            state.loading = true;
        },
        updateProfileSuccess(state,action){
            state.loading = false;
            state.user = action.payload.user
            state.isUpdated = action.payload.success
        },
        updateProfileFail(state,action){
            state.loading = false;
            state.error = action.payload;
        },
        updateProfileReset(state,action){
            state.isUpdated = false;
        },

        updateAvatarRequest(state,action){
            state.loading = true;
        },
        updateAvatarSuccess(state,action){
            state.loading = false;
            state.user = action.payload.user
            state.isUpdated = action.payload.success
        },
        updateAvatarFail(state,action){
            state.loading = false;
            state.error = action.payload;
        },
        updateAvatarReset(state,action){
            state.isUpdated = false;
        },

        updatePasswordRequest(state,action){
            state.loading = true;
        },
        updatePasswordSuccess(state,action){
            state.loading = false;
            state.message = action.payload.message;
        },
        updatePasswordFail(state,action){
            state.loading = false;
            state.error = action.payload;
        },

        forgotPasswordRequest(state,action){
            state.loading = true;
        },
        forgotPasswordSuccess(state,action){
            state.loading = false;
            state.message = action.payload;
        },
        forgotPasswordFail(state,action){
            state.loading = false;
            state.error = action.payload;
        },

        resetPasswordRequest(state,action){
            state.loading = true;
            state.error = null;
        },
        resetPasswordSuccess(state,action){
            state.loading = false;
            state.success = action.payload;
        },
        resetPasswordFail(state,action){
            state.loading = false;
            state.error = action.payload;
        },
        resetPasswordReset(state,action){
            state.success = false;
        },

        deleteUserRequest(state,action){
            state.loading = true;
        },
        deleteUserSuccess(state,action){
            state.loading = false;
            state.isDeleted = action.payload.success;
            state.message = action.payload.message;
            state.isAuthenticated = false;
        },
        deleteUserFail(state,action){
            state.loading = false;
            state.error = action.payload;
        },
        deleteUserReset(state,action){
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

export default userSlice.reducer;

export const { 
    loginRequest,
    loginSuccess, 
    loginFail,
    signupRequest,
    signupSuccess,
    signupFail, 
    loadUserRequest, 
    loadUserSuccess, 
    loadUserFail, 
    logoutRequest, 
    logoutSuccess, 
    logoutFail, 
    updateProfileRequest, 
    updateProfileSuccess, 
    updateProfileFail, 
    updateProfileReset,
    updateAvatarRequest,
    updateAvatarSuccess,
    updateAvatarFail,
    updateAvatarReset, 
    updatePasswordRequest, 
    updatePasswordSuccess, 
    updatePasswordFail, 
    updatePasswordReset,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    forgotPasswordFail,
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFail, 
    resetPasswordReset,
    deleteUserRequest,
    deleteUserSuccess,
    deleteUserFail,
    deleteUserReset,
    clearError, 
    clearMessage 
} = userSlice.actions;


  //BUILDED BY SUBHAM-HYNA @https://github.com/Subham-hyna
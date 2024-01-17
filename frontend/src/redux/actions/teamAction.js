import axios from "axios";
import { allTeamFail, allTeamRequest, allTeamSuccess, clearError, clearMessage, deleteTeamFail, deleteTeamRequest, deleteTeamSuccess, newTeamFail, newTeamRequest, newTeamSuccess, updateTeamAvatarFail, updateTeamAvatarRequest, updateTeamAvatarSuccess, updateTeamFail, updateTeamRequest, updateTeamSuccess } from "../reducers/teamReducer";
import { server } from "../store";

// Get All Members
export const getTeam = (fy) => async (dispatch) => {
    try {
      dispatch(allTeamRequest());

      let link = `${server}/getMember?FY=${fy}`;

      const { data } = await axios.get(link);

      dispatch(allTeamSuccess(data));
    } catch (error) {
      dispatch(allTeamFail(error.response.data.message));
    }
};

// Create Member
export const createMember = (memberData) => async (dispatch) => {
  try {
    dispatch(newTeamRequest());

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(`${server}/admin/addMember`,
    memberData,
    config,
    { withCredentials: true }
    );

    dispatch(newTeamSuccess(data));
  } catch (error) {
    dispatch(newTeamFail(error.response.data.message));
  }
};

// Delete Member
export const deleteTeam = (id) => async (dispatch) => {
    try {
      dispatch(deleteTeamRequest());
  
      const { data } = await axios.delete(`${server}/admin/deleteMember/${id}`);
  
      dispatch(deleteTeamSuccess(data));
    } catch (error) {
      dispatch(deleteTeamFail(error.response.data.message));
    }
};

// Update Team Details
export const updateTeam = (memberData,id) => async (dispatch) => {
    try {
      dispatch(updateTeamRequest());
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.put(`${server}/admin/updateMember/${id}`, memberData, config);
  
      dispatch(updateTeamSuccess(data));
    } catch (error) {
      dispatch(updateTeamFail(error.response.data.message));
    }
  };

//Update Avatar
export const updateTeamAvatar = (memberData,id) => async (dispatch) => {
  try {
    dispatch(updateTeamAvatarRequest());

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(`${server}/admin/team/updateAvatar/${id}`,
   memberData,
    config,
    { withCredentials: true}
    );

    dispatch(updateTeamAvatarSuccess(data.success));
  } catch (error) {
    dispatch(updateTeamAvatarFail(error.response.data.message));
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
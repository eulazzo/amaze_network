import axios from "axios";

export const GET_USER = "GET_USER";
export const UPDATE_PROFILE_PICTURE = "UPDATE_PROFILE_PICTURE";

export const getUser = (uid) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}api/user/${uid}`
      );
      dispatch({ type: GET_USER, payload: data });
    } catch (err) {
      console.log(err);
    }
  };
};

export const setProfilePicture = (infoUpload) => {
  return async (dispatch) => {
    try {
      const {
        data: { picture },
      } = await axios.post(
        `${process.env.REACT_APP_API_URL}api/user/upload`,
        infoUpload
      );
      dispatch({ type: UPDATE_PROFILE_PICTURE, payload: picture });
    } catch (err) {
      console.log(err);
    }
  };
};

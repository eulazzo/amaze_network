import axios from "axios";

export const GET_USER = "GET_USER";
export const UPDATE_PROFILE_PICTURE = "UPDATE_PROFILE_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";
export const UNFOLLOW_USER = "UNFOLLOW_USER";
export const FOLLOW_USER = "FOLLOW_USER";

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

export const updateBio = (id, newBio) => {
  return async (dispatch) => {
    try {
      const {
        data: { bio },
      } = await axios.put(`${process.env.REACT_APP_API_URL}api/user/${id}`, {
        newBio,
      });
      dispatch({ type: UPDATE_BIO, payload: bio });
    } catch (err) {
      console.log(err);
    }
  };
};

export const followUser = (followerId, idToFollow) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/user/follow/` + followerId,
      data: { idToFollow },
    })
      .then((_res) => {
        dispatch({ type: FOLLOW_USER, payload: { idToFollow } });
      })
      .catch((err) => console.log(err));
  };
};

export const unfollowUser = (followerId, idToUnfollow) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/user/unfollow/` + followerId,
      data: { idToUnfollow },
    })
      .then((res) => {
        dispatch({ type: UNFOLLOW_USER, payload: { idToUnfollow } });
      })
      .catch((err) => console.log(err));
  };
};

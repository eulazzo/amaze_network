import axios from "axios";

export const GET_USER = "GET_USER";

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

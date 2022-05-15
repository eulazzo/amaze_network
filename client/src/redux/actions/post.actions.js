import axios from "axios";

// Posts
export const GET_POSTS = "GET_POSTS";
export const CREATE_POST = "CREATE_POST";
export const DELETE_POST = "DELETE_POST";

export const getPosts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}api/post`
      );
      dispatch({ type: GET_POSTS, payload: data });
    } catch (err) {
      console.log(err);
    }
  };
};

import axios from "axios";

// Posts
export const GET_POSTS = "GET_POSTS";
export const CREATE_POST = "CREATE_POST";
export const DELETE_POST = "DELETE_POST";

//Like/unlike Post
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";

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

export const likePost = (postId, userId) => {
  return async (dispatch) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}api/post/like-post/${postId}`,
        { id: userId }
      );

      dispatch({ type: LIKE_POST, payload: { postId, userId } });
    } catch (err) {
      console.log(err);
      console.log(err);
    }
  };
};

export const unlikePost = (postId, userId) => {
  return async (dispatch) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}api/post/unlike-post/${postId}`,
        { id: userId }
      );

      dispatch({ type: UNLIKE_POST, payload: { postId, userId } });
    } catch (err) {
      console.log(err);
      console.log(err);
    }
  };
};

// 5:36min:10s

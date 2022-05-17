import axios from "axios";

// Posts
export const GET_POSTS = "GET_POSTS";
export const DELETE_POST = "DELETE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const CREATE_POST = "CREATE_POST";

//Like/unlike Post
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";

export const getPosts = (num = 5) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}api/post`
      );
      const arr = data.slice(0, num);
      dispatch({ type: GET_POSTS, payload: arr });
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
    }
  };
};

export const updatePostDescription = (postId, message) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
      data: { message },
    })
      .then(() => {
        dispatch({ type: UPDATE_POST, payload: { message, postId } });
      })
      .catch((err) => console.log(err));
  };
};

export const deletePost = (postId) => {
  return async (dispatch) => {
    try {
      await axios({
        method: "delete",
        url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
      });
      dispatch({ type: DELETE_POST, payload: postId });
    } catch (err) {
      return console.log(err);
    }
  };
};

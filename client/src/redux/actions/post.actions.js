import axios from "axios";

// Posts
export const GET_POSTS = "GET_POSTS";
export const GET_ALL_POSTS = "GET_ALL_POSTS";
export const ADD_POST = "ADD_POST";
export const DELETE_POST = "DELETE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const CREATE_POST = "CREATE_POST";

//Like/unlike Post
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";

//Comments
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

// Errors
export const GET_POST_ERRORS = "GET_POST_ERRORS";

//Trends
export const GET_TRENDS = "GET_TRENDS";

export const addPost = (data) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/post`, data)

      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: GET_POST_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_POST_ERRORS, payload: "" });
        }
      });
  };
};

export const getPosts = (num = 5) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}api/post`
      );
      const arr = data.slice(0, num);
      dispatch({ type: GET_POSTS, payload: arr });
      dispatch({ type: GET_ALL_POSTS, payload: data });
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

export const addComment = (postId, commenterId, text, commenterPseudo) => {
  return async (dispatch) => {
    try {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/post/comment-post/${postId}`,
        data: { commenterId, text, commenterPseudo },
      });
      dispatch({ type: ADD_COMMENT, payload: postId });
    } catch (err) {
      return console.log(err);
    }
  };
};
export const editComment = (postId, commentId, text) => {
  return async (dispatch) => {
    try {
      await axios({
        method: "put",
        url: `${process.env.REACT_APP_API_URL}api/post/edit-comment-post/${postId}`,
        data: { commentId, text },
      });
      dispatch({ type: EDIT_COMMENT, payload: { postId, commentId, text } });
    } catch (err) {
      return console.log(err);
    }
  };
};

export const deleteComment = (postId, commentId) => {
  return async (dispatch) => {
    try {
      await axios({
        method: "DELETE",
        url: `${process.env.REACT_APP_API_URL}api/post/delete-comment-post/${postId}`,
        data: { commentId },
      });
      dispatch({ type: DELETE_COMMENT, payload: { postId, commentId } });
    } catch (err) {
      return console.log(err);
    }
  };
};

export const getTrends = (sortedArray) => {
  return (dispatch) => {
    dispatch({ type: GET_TRENDS, payload: sortedArray });
  };
};

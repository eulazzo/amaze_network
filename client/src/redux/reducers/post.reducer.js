import { GET_POSTS, LIKE_POST, UNLIKE_POST } from "../actions/post.actions";

const initalState = {};

export default function usersReducer(state = initalState, action) {
  switch (action.type) {
    case GET_POSTS:
      return action.payload;
    case LIKE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            likers: [action.payload.userId, ...post.likers],
          };
        }
        return post;
      });
    case UNLIKE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            likers: post.likers.filter(
              (likedID) => likedID !== action.payload.userId
            ),
          };
        }
        return post
      });
    default:
      return state;
  }
}

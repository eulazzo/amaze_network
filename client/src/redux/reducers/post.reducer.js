import { GET_POSTS } from "../actions/post.actions";

const initalState = {};

export default function usersReducer(state = initalState, action) {
  switch (action.type) {
    case GET_POSTS:
      return action.payload;
    default:
      return state;
  }
}

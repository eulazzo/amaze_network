import {
  GET_USER,
  UPDATE_BIO,
  UPDATE_PROFILE_PICTURE,
  FOLLOW_USER,
  UNFOLLOW_USER,
} from "../actions/user.actions";

const initalState = {};

export default function userReducer(state = initalState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    case UPDATE_PROFILE_PICTURE:
      return {
        ...state,
        picture: action.payload,
      };
    case UPDATE_BIO:
      return {
        ...state,
        bio: action.payload,
      };
    case FOLLOW_USER:
      return {
        ...state,
        following: [action.payload.idToFollow, ...state.following],
      };
    case UNFOLLOW_USER:
      return {
        ...state,
        following: state.following.filter(
          (id) => id !== action.payload.idToUnfollow
        ),
      };
    default:
      return state;
  }
}

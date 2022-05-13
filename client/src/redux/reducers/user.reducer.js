import { GET_USER, UPDATE_PROFILE_PICTURE } from "../actions/user.actions";

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

    default:
      return state;
  }
}

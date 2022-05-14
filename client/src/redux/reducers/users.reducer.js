import { GET_USERS } from "../actions/users.actions";


const initalState = {};

export default function usersReducer(state = initalState, action) {
  switch (action.type) {
    case GET_USERS:
      return action.payload;
    default:
      return state;
  }
}

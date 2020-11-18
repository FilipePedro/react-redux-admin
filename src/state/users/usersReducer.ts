import initialState from '../initialState';
import {
  LOAD_USERS_SUCCESS,
  LOAD_USERS_FAIL,
  DELETE_USER_SUCCESS,
  GENERATE_RANDOM_USERS_SUCCESS,
  ADD_USERS_SUCCESS,
  EDIT_USERS_SUCCESS,
  UserActions,
} from './types';

const usersReducer = (
  state = initialState.users,
  action: UserActions,
) => {
  switch (action.type) {
    case LOAD_USERS_SUCCESS:
      return action.users;
    case LOAD_USERS_FAIL:
      return state;
    case DELETE_USER_SUCCESS:
      return state.filter(({ id }) => !action.ids?.includes(id));
    case GENERATE_RANDOM_USERS_SUCCESS:
      return [...state, ...action.users];
    case ADD_USERS_SUCCESS:
      return [{ ...action.user }, ...state];
    case EDIT_USERS_SUCCESS: {
      const index = state.findIndex(({ id }) => id === action.user?.id);
      return [
        ...state.slice(0, index),
        { ...action.user },
        ...state.slice(index + 1),
      ];
    }
    default:
      return state;
  }
};

export default usersReducer;

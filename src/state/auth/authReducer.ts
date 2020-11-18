import initialState from '../initialState';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  AuthActions
} from './types';

const authReducer = (
  state = initialState.auth,
  action: AuthActions) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { isLoggedIn: true, user: localStorage.getItem('user') };
    case LOGIN_FAIL:
      return {};
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export default authReducer;

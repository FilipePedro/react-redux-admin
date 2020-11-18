import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import AuthService from './../../services/authService';
import { beginApiCall, apiCallError } from '../api/apiStatusActions';

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  AuthActions,
  LoginParams
} from './types';


const loginSuccess = (): AuthActions => ({
  type: LOGIN_SUCCESS,
});

const loginFailed = (): AuthActions => ({
  type: LOGIN_FAIL,
});

const logoutSuccess = (): AuthActions => ({
  type: LOGOUT,
});

const loginUser = ({ email, password }: LoginParams):
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      dispatch(beginApiCall());
      await AuthService.login({ email, password });
      dispatch(loginSuccess());
    } catch (err) {
      dispatch(apiCallError());
      dispatch(loginFailed());
      throw err;
    }
  };

const logoutUser = () => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  AuthService.logout();
  dispatch(logoutSuccess());
};

export {
  loginUser,
  logoutUser,
};

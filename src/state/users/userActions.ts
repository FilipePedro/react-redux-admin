import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import {
  LOAD_USERS_SUCCESS,
  LOAD_USERS_FAIL,
  DELETE_USER_SUCCESS,
  GENERATE_RANDOM_USERS_SUCCESS,
  ADD_USERS_SUCCESS,
  EDIT_USERS_SUCCESS,
  UserActions,
} from './types';

import * as usersAPI from '../../api/usersApi';
import { beginApiCall, apiCallError } from '../api/apiStatusActions';
import { IUser } from '../../types';

const loadUsersSuccess = (users: IUser[]): UserActions => ({
  type: LOAD_USERS_SUCCESS,
  users,
});

const loadUsersFailed = (): UserActions => ({
  type: LOAD_USERS_FAIL,
});

const deleteUserSuccess = (ids: number[]): UserActions => ({
  type: DELETE_USER_SUCCESS,
  ids,
});

const generatedUsersSuccess = (users: IUser[]): UserActions => ({
  type: GENERATE_RANDOM_USERS_SUCCESS,
  users,
});

const addUserSuccess = (user: IUser): UserActions => ({
  type: ADD_USERS_SUCCESS,
  user,
});

const editUserSuccess = (user: IUser): UserActions => ({
  type: EDIT_USERS_SUCCESS,
  user,
});

const addUser = (data: IUser):
  ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      dispatch(beginApiCall());
      const user = await usersAPI.addUser(data);
      dispatch(addUserSuccess(user));
    } catch (error) {
      dispatch(apiCallError());
      throw error;
    }
  };

interface EditUsersParams {
  user: IUser,
  data: IUser,
}

const editUser = ({ user: userToUpdate, data }: EditUsersParams):
  ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      dispatch(beginApiCall());
      const user = await usersAPI.editUser({ userToUpdate, data });
      dispatch(editUserSuccess(user));
    } catch (error) {
      dispatch(apiCallError());
      throw error;
    }
  };

const fetchUsers = ():
  ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      dispatch(beginApiCall());
      const users = await usersAPI.fetchUsers();
      dispatch(loadUsersSuccess(users));
    } catch (error) {
      dispatch(apiCallError());
      dispatch(loadUsersFailed());
      throw error;
    }
  };

const deleteUser = (selected: number[]):
  ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      dispatch(beginApiCall());
      const ids = await usersAPI.deleteUser(selected);
      dispatch(deleteUserSuccess(ids));
    } catch (error) {
      dispatch(apiCallError());
      throw error;
    }
  };

const generateRandom = (n = 10):
  ThunkAction<Promise<void>, {}, {}, AnyAction> =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      dispatch(beginApiCall());
      const users = await usersAPI.getRandomUsers(n);
      dispatch(generatedUsersSuccess(users));
    } catch (error) {
      dispatch(apiCallError());
      throw error;
    }
  };

export {
  fetchUsers,
  deleteUser,
  generateRandom,
  addUser,
  editUser,
  loadUsersSuccess,
};

import { IUser } from "../../types";

export const LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS';
export const LOAD_USERS_FAIL = 'LOAD_USERS_FAIL';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const GENERATE_RANDOM_USERS_SUCCESS = 'GENERATE_RANDOM_USERS_SUCCESS';
export const ADD_USERS_SUCCESS = 'ADD_USERS_SUCCESS';
export const EDIT_USERS_SUCCESS = 'EDIT_USERS_SUCCESS';

interface FetchUsersAction {
  type: typeof LOAD_USERS_SUCCESS | typeof LOAD_USERS_FAIL,
  users?: IUser[],
}

interface AddUserAction {
  type: typeof ADD_USERS_SUCCESS,
  user: IUser,
}

interface EditUserAction {
  type: typeof EDIT_USERS_SUCCESS,
  user: IUser,
}

interface DeleteUserAction {
  type: typeof DELETE_USER_SUCCESS,
  ids: number[],
}

interface GenerateUsersAction {
  type: typeof GENERATE_RANDOM_USERS_SUCCESS,
  users: IUser[],
}

export type UserActions = FetchUsersAction
  | AddUserAction
  | EditUserAction
  | DeleteUserAction
  | GenerateUsersAction
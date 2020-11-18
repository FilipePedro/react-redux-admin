// AUTH
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';

export interface AuthLoginAction {
  readonly type: typeof LOGIN_SUCCESS | typeof LOGIN_FAIL;
}

export interface AuthLogoutAction {
  readonly type: typeof LOGOUT;
}

export interface LoginParams {
  email: string;
  password: string;
}

export type AuthActions = AuthLoginAction | AuthLogoutAction;
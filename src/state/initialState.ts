import { IState } from '../types';
// get localStorage auth user
const user = localStorage.getItem('user') || null;

const auth = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const initialState: IState = {
  auth,
  users: [],
  apiCallsInProgress: 0,
}

export default initialState;


import { combineReducers } from 'redux';
import auth from './auth/authReducer';
import users from './users/usersReducer';
import apiCallsInProgress from './api/apiStatusReducer';

const rootReducer = combineReducers({
  auth,
  users,
  apiCallsInProgress,
});

export default rootReducer;
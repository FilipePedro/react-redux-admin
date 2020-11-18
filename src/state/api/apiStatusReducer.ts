import initialState from '../initialState';
import {
  BEGIN_API_CALL,
  API_CALL_ERROR,
  ApiActions
} from './types';

const __actionTypeEndsInSuccess = (type: string): boolean => type.substring(type.length - 8) === '_SUCCESS';

const apiCallStatusReducer = (
  state = initialState.apiCallsInProgress,
  action: ApiActions
): number => {
  if (action.type === BEGIN_API_CALL) return state + 1;

  if (action.type === API_CALL_ERROR || __actionTypeEndsInSuccess(action!.type)) return state - 1;

  return state;
};

export default apiCallStatusReducer;

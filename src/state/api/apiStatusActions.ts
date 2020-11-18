import {
  BEGIN_API_CALL,
  API_CALL_ERROR,
  ApiActions
} from './types';

const beginApiCall = (): ApiActions => ({ type: BEGIN_API_CALL });

const apiCallError = (): ApiActions => ({ type: API_CALL_ERROR });

export { beginApiCall, apiCallError };

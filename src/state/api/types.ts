// API
export const BEGIN_API_CALL = 'BEGIN_API_CALL';
export const API_CALL_ERROR = 'API_CALL_ERROR';

export interface BeginApiCallAction {
  readonly type: typeof BEGIN_API_CALL;
}

export interface ApiCallErrorAction {
  readonly type: typeof API_CALL_ERROR;
}

export type ApiActions = BeginApiCallAction | ApiCallErrorAction;
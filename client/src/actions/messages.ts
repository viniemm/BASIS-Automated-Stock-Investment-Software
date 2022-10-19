import { CREATE_MESSAGE, GET_ERRORS } from './types';

// CREATE MESSAGE
export const createMessage = (msg: any) => {
  return {
    type: CREATE_MESSAGE,
    payload: msg,
  };
};

// RETURN ERRORS
export const returnErrors = (msg: any, status: any) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status },
  };
};

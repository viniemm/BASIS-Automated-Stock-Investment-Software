import { CREATE_MESSAGE, GET_ERRORS } from "./types";

// CREATE MESSAGE
export const createMessage = (msg: string) => {
    return {
        type: CREATE_MESSAGE,
        payload: msg
    };
};

// RETURN ERRORS
export const returnErrors = (msg: string, status: any) => {
    return {
        type: GET_ERRORS,
        payload: { msg, status }
    };
};

// messages list
// success messages
export const deletePortfolioMsg = "Deleted Portfolio"
export const addPortfolioMsg = "Added Portfolio"
// error messages
export const passwordNotMatch = "Passwords do not match"

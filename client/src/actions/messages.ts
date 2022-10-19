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
export const deletePortfolioMsg: string = "deletePortfolio"
export const addPortfolioMsg: string = "addPortfolio"
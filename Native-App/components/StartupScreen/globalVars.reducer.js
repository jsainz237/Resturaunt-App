/**
 * @description set global variables
 * @param {Object} { API_URL, TableNum } 
 */
export function setGlobalVariables({ API_URL, TableNum }) {
    const API_URL_updated = `http://${API_URL}.ngrok.io/api`
    return {
        type: "SET_VARS",
        API_URL: API_URL_updated,
        TableNum,
    }
}

const initialState = {
    API_URL: null,
    TableNum: null
}

export default function GlobalVarsReducer(state = initialState, action) {
    switch(action.type) {
        case "SET_VARS": 
            return { API_URL: action.API_URL, TableNum: action.TableNum };
        default:
            return state;
    }
}


/**
 * @description set the current menu category
 * @param {string} category 
 */
export function setCategory(category) {
    return {
        type: "SET_CATEGORY",
        category
    }
}

const initialState = {
    category: 'Entrees'
}

export default function MenuReducer(state = initialState, action) {
    switch(action.type) {
        case "SET_CATEGORY":
            return { category: action.category };
        default:
            return state;
    }
}


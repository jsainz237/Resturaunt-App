/**
 * @description show the item screen for the passed in item
 * @param {Object} item 
 */
export function toggleItemScreen(item = null) {
    return {
        type: "TOGGLE_ITEM_SCREEN",
        item
    }
}

const initialState = {
    item: null
}

export default function ItemScreenReducer(state = initialState, action) {
    switch(action.type) {
        case "TOGGLE_ITEM_SCREEN":
            return { item: action.item };
        default:
            return state;
    }
}
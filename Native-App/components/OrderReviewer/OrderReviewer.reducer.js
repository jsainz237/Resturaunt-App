/**
 * @description add item to order
 * @param {Object} item 
 */
export function addItemToOrder(item) {
    return {
        type: "ADD_ITEM",
        item
    }
}

/**
 * @description remove item to order
 * @param {Object} item 
 */
export function removeItemFromOrder(item) {
    return {
        type: "REMOVE_ITEM",
        item
    }
}

export function clearOrder() {
    return {
        type: "CLEAR_ORDER"
    }
}

const initialState = {
    items: [],
}

export default function OrderReducer(state = initialState, action) {
    let updatedItems = state.items;
    let itemIndex;
    switch(action.type) {
        case "ADD_ITEM":
            itemIndex = state.items.findIndex(item => item.name === action.item.name);
            
            if(itemIndex === -1) { updatedItems.push(action.item) }
            else { updatedItems[itemIndex].quantity += action.item.quantity }
            
            return { items: updatedItems };

        case "REMOVE_ITEM":
            itemIndex = state.items.findIndex(item => item.name === action.item.name);

            updatedItems[itemIndex].quantity -= 1
            if( updatedItems[itemIndex].quantity === 0 ) {
                updatedItems.splice(itemIndex, 1);
            }
            return { items: updatedItems };

        case "CLEAR_ORDER":
            return { items: [] }
            
        default:
            return state;
    }
}


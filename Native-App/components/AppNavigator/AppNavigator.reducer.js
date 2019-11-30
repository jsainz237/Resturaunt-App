/**
 * @description Set the states current page
 * @param {string} currentPage - name of the component page that the app is on
 */
export function updateCurrentPage(currentPage) {
    return {
        type: "UPDATE_CURRENT_PAGE",
        currentPage
    }
}

const initialState = {
    currentPage: null
}

/**
 * Redux reducer to modify the AppNavigationState
 * @param state
 * @param action
 */
export default function AppNavigationReducer(state = initialState, action) {
    switch(action.type) {
        case "UPDATE_CURRENT_PAGE":
            return { currentPage: action.currentPage }
        default:
            return state;
    }
}
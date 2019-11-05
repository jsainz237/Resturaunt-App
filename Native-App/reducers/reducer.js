// VENDOR
import { combineReducers } from 'redux'

// APP
import AppNavigationReducer from '../components/AppNavigator/AppNavigator.reducer'
import MenuReducer from '../components/Menu/Menu.reducer'

/** combine all reducers for redux states */
const rootReducer = combineReducers({
    AppNav: AppNavigationReducer,
    Menu: MenuReducer
})

export default rootReducer;
// VENDOR
import { combineReducers } from 'redux'

// APP
import AppNavigationReducer from '../components/AppNavigator/AppNavigator.reducer'
import MenuReducer from '../components/Menu/Menu.reducer'
import ItemScreenReducer from '../components/ItemScreen/ItemScreen.reducer'
import OrderReducer from '../components/OrderReviewer/OrderReviewer.reducer'
import GlobalVarsReducer from '../components/StartupScreen/globalVars.reducer'

/** combine all reducers for redux states */
const rootReducer = combineReducers({
    AppNav: AppNavigationReducer,
    Menu: MenuReducer,
    ItemScreen: ItemScreenReducer,
    Order: OrderReducer,
    Global: GlobalVarsReducer
})

export default rootReducer;
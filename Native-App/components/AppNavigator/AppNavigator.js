// VENDOR
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// APP
import ScreenSaver from '../ScreenSaver/ScreenSaver';
import Menu from '../Menu/Menu';
import StartupScreen from '../StartupScreen/StartupScreen';
import SuccessScreen from '../SuccessScreen/SuccessScreen';
import OrderConfirmationButton from '../OrderConfirmationButton/OrderConfirmationButton';

/**
 * adds navigation props to all components
 * allows for routing, in a sense
 */ 
const navigator = createStackNavigator(
    {
        StartupScreen: { screen: StartupScreen },
        ScreenSaver: { screen: ScreenSaver },
        Menu: {
            screen: Menu,
            // disable swiping back to screensaver on Home page
            navigationOptions: {
                title: "Menu",
                headerLeft: null,
                gesturesEnabled: false,
            }
        },
        SuccessScreen: { 
            screen: SuccessScreen,
            navigationOptions: {
                title: "SuccessScreen",
                headerLeft: null,
                gesturesEnabled: false,
            }
        },
        OrderConfirmationButton: { screen: OrderConfirmationButton },
    }, 
    {
        headerMode: 'none'
    }
);

const AppNavigator = createAppContainer(navigator);

export default AppNavigator;
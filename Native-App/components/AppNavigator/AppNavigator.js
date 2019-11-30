// VENDOR
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// APP
import ScreenSaver from '../ScreenSaver/ScreenSaver';
import Menu from '../Menu/Menu';

/**
 * adds navigation props to all components
 * allows for routing, in a sense
 */ 
const navigator = createStackNavigator(
    {
        ScreenSaver: { screen: ScreenSaver },
        Menu: {
            screen: Menu,
            // disable swiping back to screensaver on Home page
            navigationOptions: {
                title: "Menu",
                headerLeft: null,
                gesturesEnabled: false,
            }
        }
    }, 
    {
        headerMode: 'none'
    }
);

const AppNavigator = createAppContainer(navigator);

export default AppNavigator;
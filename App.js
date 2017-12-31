/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import {
    StackNavigator,
} from 'react-navigation';
import HomeScreen from "./components/HomeScreen";
import ContactScreen from "./components/ContactScreen";

// import 'expo'


export const Stack = StackNavigator(
    {
        Home: {
            screen: HomeScreen,
            // Optional: Override the `navigationOptions` for the screen
            navigationOptions: ({navigation}) => ({
                header: null,
            }),
        },
        Contacts: {
            screen: ContactScreen
        },

    },
    {
        headerMode: 'screen'
    }
);

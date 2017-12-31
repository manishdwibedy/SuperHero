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
import DonationScreen from "./components/DonationScreen";



export const Stack = StackNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: ({navigation}) => ({
                header: null,
            }),
        },
        Contacts: {
            screen: ContactScreen,
            navigationOptions: ({navigation}) => ({
                header: null,
            }),
        },
        Donation: {
            screen: DonationScreen,
            navigationOptions: ({navigation}) => ({
                header: null,
            }),
        }

    },
    {
        headerMode: 'screen'
    }
);

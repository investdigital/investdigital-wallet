import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    Image
} from 'react-native';

import {
    StackNavigator,
    TabNavigator
} from 'react-navigation';
import DetailScreen from './pages/DetailScreen';
import KeystoreScreen from './pages/KeystoreScreen';
import MainScreenNavigator from './components/MainScreenNavigator';
const TouchWallet = StackNavigator({
    Home: {screen: MainScreenNavigator},
    Detail:{screen:DetailScreen},
    Keystore:{screen:KeystoreScreen}
});
export default TouchWallet;
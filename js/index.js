import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    Animated,Dimensions,
    Image
} from 'react-native';

import {
    StackNavigator
} from 'react-navigation';
import DetailScreen from './pages/DetailScreen';
import KeystoreScreen from './pages/KeystoreScreen';
import GuideViewScreen from './pages/GuideViewScreen';
import GetSetStorage from './utils/GetSetStorage';
import StartAPPPage from './pages/StartAPPPage';
import RememberMnemonicPage from './pages/RememberMnemonicPage';
import MainScreenNavigator from './components/MainScreenNavigator';

const TouchWallet = StackNavigator({
    Start:{screen:StartAPPPage},
    Home: {screen: MainScreenNavigator},
    Detail:{screen:DetailScreen},
    Keystore:{screen:KeystoreScreen},
    GuideView:{screen:GuideViewScreen},
    Remember:{screen:RememberMnemonicPage}
    }
);
export default TouchWallet;
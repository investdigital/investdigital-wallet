import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    Animated,Dimensions,
    Image,
    Platform
} from 'react-native';

import {
    StackNavigator
} from 'react-navigation';
import DetailScreen from './pages/DetailScreen';
import KeystoreScreen from './pages/KeystoreScreen';
import GuideViewScreen from './pages/GuideViewScreen';
import StartAPPPage from './pages/StartAPPPage';
import MainScreenNavigator from './components/MainScreenNavigator';
import RememberMnemonicPage from './pages/RememberMnemonicPage';
import ScanQrcode from './pages/ScanQrcode';
import CostMinerPage from './pages/CostMinerPage';

import SearchList from './pages/SearchList';

import ScrollViewItem from './pages/ScrollViewItem';

const TouchWallet = StackNavigator({
    Start:{screen:StartAPPPage},
    Home: {screen: MainScreenNavigator},
    Detail:{screen:DetailScreen},
    CostMiner:{screen:CostMinerPage},
    Keystore:{screen:KeystoreScreen},
    GuideView:{screen:GuideViewScreen},
    Remember:{screen:RememberMnemonicPage},
    SearchList:{screen:SearchList},
    ScanQrcode:{screen:ScanQrcode}
    }, {
        navigationOptions: {
            gesturesEnabled:false,

        }
    }
);

export default TouchWallet;
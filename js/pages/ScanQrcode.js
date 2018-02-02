import React, {
    Component,
} from 'react'
import {
    View,
    StyleSheet,
    Text,
    Alert,
} from 'react-native';

import Barcode from 'react-native-smart-barcode';
import TimerEnhance from 'react-native-smart-timer-enhance';
import {AppSizes, AppComponent} from '../style/index';

class ScanQrcode extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <Barcode style={{flex: 1}} ref={ component => this._barCode = component } onBarCodeRead={this._onBarCodeRead}/>
            </View>
        )
    }
    _onBarCodeRead = (e) => {
        const {navigate,goBack,state} = this.props.navigation;
        if( e.nativeEvent.data.code){
            this._stopScan();
            state.params.callback(e.nativeEvent.data.code);
            goBack();
        }
    };
    _startScan = (e) => {
        this._barCode.startScan()
    };

    _stopScan = (e) => {
        this._barCode.stopScan()
    };

}
const styles = StyleSheet.create({
    container:{
        backgroundColor:'black',
        flex:1,
        width:AppSizes.screen.width,
        height:AppSizes.screen.height
    },
});

export default TimerEnhance(ScanQrcode)
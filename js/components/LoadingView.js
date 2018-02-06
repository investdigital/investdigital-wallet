import React, { Component } from 'react';
import {
    View,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Modal,
    Text
} from 'react-native';
import {AppSizes, AppComponent} from '../style/index';
class LoadingView extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        const { showLoading, opacity, backgroundColor } = this.props;
        return (
            <Modal visible={showLoading} transparent>
                <View style={ [styles.loadingView, {opacity: opacity||0.5, backgroundColor: backgroundColor||'black'}]}></View>
                <View style={ styles.loadingText }>
                    <Text style={{color:"white"}}>
                        玩命加载中...
                    </Text>
                </View>
            </Modal>
        )
    }
}
const styles = StyleSheet.create({
    loadingView: {
        flex: 1,
        height:AppSizes.screen.height,
        width:AppSizes.screen.width,
        position: 'absolute'
    },
    loadingText: {
        position: 'absolute',
        height:AppSizes.screen.height,
        width:AppSizes.screen.width,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default LoadingView
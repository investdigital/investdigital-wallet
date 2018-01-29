import React, { Component } from 'react';
import { View, Text, StyleSheet,Animated,Dimensions } from 'react-native';
import GetSetStorage from '../utils/GetSetStorage';
import Toast, {DURATION} from 'react-native-easy-toast';
const splashImg = require('../images/pfb_tabbar_homepage.png');//加载图片
const { width, height } = Dimensions.get('window');
class StartAPPPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bounceValue: new Animated.Value(1)
        };
    }
    static navigationOptions={
        header:null
    };
    componentDidMount() {
        Animated.timing(
            this.state.bounceValue, { toValue: 1.2, duration: 1000 }
        ).start();
        GetSetStorage.removeStorageAsync('isFirst');
        this.timer = setTimeout(() => {
            GetSetStorage.getStorageAsync('isFirst').then((result) => {
                if (result == null || result == '') {
                    //第一次启动
                    this.props.navigation.navigate('GuideView');
                    GetSetStorage.setStorageAsync('isFirst', 'true');
                } else {
                    //第二次启动s
                    this.props.navigation.navigate('Home');
                }
            }).catch((error) => {
                console.log('系统异常' + error);
            });
        }, 1000);
    }
    componentWillUpdate = () => {
        clearTimeout(this.timer);
    };
    render() {
        return (
            <Animated.Image
                style={{
                    width: width,
                    height: height,
                    transform: [{ scale: this.state.bounceValue }]
                }}
                source={splashImg}
            />

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

export default StartAPPPage;
import React, { Component } from 'react';
import { View, Text, StyleSheet,Animated,Dimensions } from 'react-native';
import GetSetStorage from '../utils/GetSetStorage';

const splashImg = require('../images/pfb_tabbar_homepage.png');//加载图片

const { width, height } = Dimensions.get('window');
// create a component
class StartAPPPage extends Component {
    constructor(props) {
        super(props);
        this.state = {  //这是动画效果
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
//        GetSetStorage.removeStorageAsync('isFrist');
        this.timer = setTimeout(() => {
            GetSetStorage.getStorageAsync('isFrist').then((result) => {
                if (result == null || result == '') {
                    //第一次启动
                    this.props.navigation.navigate('GuideView');
                    GetSetStorage.setStorageAsync('isFrist', 'true');
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

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default StartAPPPage;
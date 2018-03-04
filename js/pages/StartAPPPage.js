import React, { Component } from 'react';
import { View, Text, StyleSheet,Animated,Dimensions,NativeModules } from 'react-native';
import GetSetStorage from '../utils/GetSetStorage';
import Toast, {DURATION} from 'react-native-easy-toast';
import JPushModule from 'jpush-react-native';
const splashImg = require('../images/pfb_tabbar_homepage.png');//加载图片
const { width, height } = Dimensions.get('window');
class StartAPPPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bounceValue: new Animated.Value(1),
            tags:['tag1'],
            alias:'alias1'
        };
    }
    static navigationOptions={
        header:null,
    };
    componentDidMount() {
        Animated.timing(
            this.state.bounceValue, { toValue: 1.2, duration: 1000 }
        ).start();
//        GetSetStorage.removeStorageAsync('isFirst');
        this.timer = setTimeout(() => {
            GetSetStorage.getStorageAsync('isFirst').then((result) => {
                if (result == null || result == '') {
                    //第一次启动
                    this.props.navigation.navigate('GuideView');
                    GetSetStorage.setStorageAsync('isFirst', 'true');
                    JPushModule.getRegistrationID(registrationId=> {
                        console.log("registrationId: " + registrationId);
                        GetSetStorage.setStorageAsync('registrationId', registrationId);
                    });
                    // JPushModule.setTags(this.state.tags, success => {
                    //    console.log("tags set success:"+success)
                    // });
                    // JPushModule.setAlias(this.state.alias, success => {
                    //     console.log("alias set success:"+success)
                    // })
                } else {
                    //第二次启动s
                    this.props.navigation.navigate('Home');
                }
            }).catch((error) => {

            });
        }, 1000);
    }
    componentWillUpdate = () => {
        clearTimeout(this.timer);
    };
    componentWillUnmount() {
        JPushModule.removeGetRegistrationIdListener(callback);
    }
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
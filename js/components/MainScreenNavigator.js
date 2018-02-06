import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    Image
} from 'react-native';

import {TabNavigator} from 'react-navigation';
import SendPage from '../pages/SendPage';
import HomePage from '../pages/HomePage';
import MenuPage from '../pages/MenuPage';
import ReceivePage from '../pages/ReceivePage';
const MainScreenNavigator = TabNavigator({
    Home: {
        screen: HomePage,
        navigationOptions: {
            tabBarLabel: '首页',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={require('../images/pfb_tabbar_homepage.png')}
                    style={[{tintColor: tintColor},styles.icon]}
                />
            ),
        }
    },
    Send: {
        screen: SendPage,
        navigationOptions: {
            tabBarLabel: '发送',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={require('../images/pfb_tabbar_merchant.png')}
                    style={[{tintColor: tintColor},styles.icon]}
                />
            ),
        }
    },
    Receive: {
        screen: ReceivePage,
        navigationOptions: {
            tabBarLabel: '接收',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={require('../images/pfb_tabbar_merchant.png')}
                    style={[{tintColor: tintColor},styles.icon]}
                />
            ),
        }
    },
    Menu: {
        screen: MenuPage,
        navigationOptions: {
            tabBarLabel: '菜单',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={require('../images/pfb_tabbar_merchant.png')}
                    style={[{tintColor: tintColor},styles.icon]}
                />
            ),
        }
    },
}, {
    animationEnabled: false, // 切换页面时不显示动画
    tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
    swipeEnabled: false, // 禁止左右滑动
    lazy:true,
    backBehavior: 'none', // 按 back 键是否跳转到第一个 Tab， none 为不跳转
    tabBarOptions: {
        activeTintColor: '#329aff', // 文字和图片选中颜色
        inactiveTintColor: '#999', // 文字和图片默认颜色
        showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
        indicatorStyle: {height: 0}, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了
        style: {
            backgroundColor: '#fff', // TabBar 背景色
        },
        labelStyle: {
            fontSize: 12, // 文字大小
        },
    },
});
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#fff'
    },
    icon: {
        height: 22,
        width: 22,
        resizeMode: 'contain'
    }
});
export default MainScreenNavigator;
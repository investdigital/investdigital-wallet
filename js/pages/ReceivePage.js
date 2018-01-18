import React,{Component} from 'react';
import {
    Button,
    Image,
    View,
    Text,
    StyleSheet
} from 'react-native';
class ReceivePage extends Component{
    static navigationOptions = {
        title:'接收',
        drawerLabel: '接收',
        // Note: By default the icon is only shown on iOS. Search the  showIcon option below.
        drawerIcon: ({ tintColor }) => (
            <Image
                source={require('../images/pfb_tabbar_homepage.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };
    render(){
        return(
            <View style={{backgroundColor:'#fff',flex:1}}>
                <Text style={{padding:20}}>接收</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    },
});
export default ReceivePage;
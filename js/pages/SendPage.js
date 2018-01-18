import React,{Component} from 'react';
import {
    Button,
    Image,
    View,
    Text,
    StyleSheet
} from 'react-native';
class SendPage extends Component{
    static navigationOptions = {
        title:'发送',
        drawerLabel: '发送',
        // Note: By default the icon is only shown on iOS. Search the  showIcon option below.
        drawerIcon: ({ tintColor }) => (
            <Image
                source={require('../images/pfb_tabbar_homepage.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };
    render(){;
        return(
            <View style={{backgroundColor:'#fff',flex:1}}>
                <Text style={{padding:20}}>发送</Text>
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

export default SendPage
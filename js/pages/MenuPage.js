import React,{Component} from 'react';
import {
    Button,
    Image,
    View,
    Text,
    StyleSheet
} from 'react-native';
// Styles
//import {AppSizes} from '@app/style';
class MenuPage extends Component{
    static navigationOptions = {
        title:'菜单',
        drawerLabel: '菜单',
        // Note: By default the icon is only shown on iOS. Search the  showIcon option below.
        drawerIcon: ({ tintColor }) => (
            <Image
                source={require('../images/pfb_tabbar_homepage.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };
    render(){
        const {navigate} = this.props.navigation;
        return(
            <View style={{backgroundColor:'#fff',flex:1}}>
                <Text style={{padding:20}}>菜单</Text>
                <Button
                    style={{padding:20}}
                    onPress={() => navigate('Keystore',{data:'Keystore'})}
                    title="导出Keystore"
                />
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
export default MenuPage;
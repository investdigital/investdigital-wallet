import React,{Component} from 'react';
import {
    Button,
    Image,
    View,
    Text,
    TextInput,
    TouchableHighlight,
    StyleSheet
} from 'react-native';
//import QRCode from 'react-native-qrcode';
import {AppSizes, AppComponent} from '../style/index';
//import ReceiveQRCode from '../components/ReceiveQRCode';

class ReceivePage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            inputShow:false
        };
    }
    static navigationOptions = {
        title:'接收',
        drawerLabel: '我的',
        // Note: By default the icon is only shown on iOS. Search the  showIcon option below.
        drawerIcon: ({ tintColor }) => (
            <Image
                source={require('../images/pfb_tabbar_homepage.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
        headerBackTitle:null,
        headerLeft:null
    };
    onPress(){
        this.setState({
            inputShow:true
        })
        console.log(1);
    }
    render(){
        return(
            <View style={styles.container}>
                <Text style={{padding:20}}>接收二维码</Text>

                <TouchableHighlight style={[AppComponent.btn, styles.btn]} underlayColor="#008AC4" onPress={this.onPress.bind(this)}>
                    <Text style={styles.btnText}>
                        申请金额
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    icon: {
        width: 24,
        height: 24,
    },
    btn: {
        marginTop:AppSizes.margin_20,
    },
    btnText:{
        color:"#fff"
    }

});
export default ReceivePage;

// <ReceiveQRCode inputShow={this.state.inputShow}/>
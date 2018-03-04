import React,{Component} from 'react';
import {
    Button,
    Image,
    View,
    Text,
    TextInput,
    TouchableHighlight,
    Keyboard,
    Alert,
    Platform,
    ScrollView,
    StyleSheet
} from 'react-native';
import {AppSizes, AppComponent} from '../style/index';
import JPushModule from 'jpush-react-native';
import GetSetStorage from '../utils/GetSetStorage';
import AndroidBack from '../components/AndroidBack';
import ReceiveQRCode from '../components/ReceiveQRCode';

class ReceivePage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            inputShow:false,
            pushMsg:''
        };
    }
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
        headerBackTitle:null,
        headerLeft:null
    };
    componentDidMount() {
        if (Platform.OS === 'android') {
            JPushModule.notifyJSDidLoad((resultCode) => {
                if (resultCode === 0) {}
            });
        }
        // 接收自定义消息
        JPushModule.addReceiveCustomMsgListener(map => {
            let data;
            if (Platform.OS === 'android') {
                data=JSON.parse(map.message);
            }
            else{
                data=JSON.parse(map.content);
            }
            console.log(data);
            if(data){
                let item1 ={txId:data.txId, from:data.address, to:data.to, amount:data.amount, status:data.status, blockNumber:data.blockNumber};
                GetSetStorage.getStorageAsync('ethList').then((result) => {
                    if (result == null || result == '') {
                        let ethList = new Object();
                        let array=[];
                        array.unshift(item1);
                        ethList.data=array;
                        GetSetStorage.setStorageAsync('ethList', JSON.stringify(ethList));
                    }else{
                        let ethList= JSON.parse(result);
                        console.log(ethList);
                        ethList.data.unshift(item1);
                        GetSetStorage.setStorageAsync('ethList', JSON.stringify(ethList));
                    }
                })
            }
        })
    }
    componentWillUnmount() {
        JPushModule.removeReceiveCustomMsgListener(callback);
    }
    onPress(){
        this.setState({
            inputShow:true
        });
    }
    render(){
        return(
            <ScrollView style={{flex:1,backgroundColor:'#fff'}} onPress={Keyboard.dismiss()}>
                <AndroidBack router1={this.props.navigation.state.routeName}/>
                <View style={styles.container}>
                    <Text style={[styles.title,styles.btn]}>TouchWallet</Text>
                    <ReceiveQRCode inputShow={this.state.inputShow}/>
                    <TouchableHighlight style={[AppComponent.btn, styles.btn]} underlayColor="#008AC4" onPress={this.onPress.bind(this)}>
                        <Text style={styles.btnText}>
                            申请金额
                        </Text>
                    </TouchableHighlight>
                    <Text style={styles.title}> {this.state.pushMsg}</Text>
                </View>
            </ScrollView>
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
    title:{
        fontSize:25,
        color:'#329aff',
    },
    btn: {
        marginTop:AppSizes.margin_20,
    },
    btnText:{
        color:"#fff"
    }

});
export default ReceivePage;
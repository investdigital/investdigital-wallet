import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    TextInput,
    TouchableHighlight,
    Alert,
    KeyboardAvoidingView,
    Image
} from 'react-native';
import lightwallet from 'eth-lightwallet';
import Toast, {DURATION} from 'react-native-easy-toast';
import {AppSizes, AppComponent} from '../style/index';
import GetSetStorage from '../utils/GetSetStorage';

// Service
import { Api } from '../service';
class GuideViewScreen extends Component{
    static navigationOptions={
        header:null
    };
    constructor(props) {
        super(props);
        this.state = {
            inputShow:true,
            text:'',
            mnemonic:lightwallet.keystore.generateRandomSeed()
        };
    }

//           componentDidMount(){
//             Api.getAllPrice().then(data => {
//             const eth_sudt = data.eth_usdt
//              GetSetStorage.setStorageAsync('price', eth_usdt);
//                    }).catch(err => {
//                       console.log(err);
//                    })
//            }

    showMnemonic(){
        if(this.state.password === ''){
            alert("请输入密码")
        }
        else{
            this.setState({
                inputShow:false
            });
        };
    }
    showMnemonic(){
        if(this.state.text){
            let password = this.state.text;
            let mnemonic = this.state.mnemonic;
            GetSetStorage.setStorageAsync('password', password);
            this.setState({
                inputShow:false,
                text:''
            });
            let global_keystore;
            lightwallet.keystore.createVault({
                password: password,
                seedPhrase: mnemonic,
                hdPathString: "m/0'/0'/0'"
            }, function (err, ks) {
                global_keystore = ks;
                global_keystore.keyFromPassword(password,function(err,pwDerivedKey){
                    global_keystore.generateNewAddress(pwDerivedKey, 1);
                    //获取地址列表 返回当前存储在密钥库中的十六进制字符串地址列表。
                    let address = global_keystore.getAddresses()[0];
                    let privateKey1=global_keystore.exportPrivateKey(address,pwDerivedKey);
                    GetSetStorage.setStorageAsync('privateKey', privateKey1);
                    GetSetStorage.setStorageAsync('address', address);
                });
            });
        }else{
            Alert.alert("请输入密码")
        }
    }
    render() {
        const {navigate} = this.props.navigation;
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior="padding"
            >
                <Text style={[styles.brand]}>TouchWallet</Text>
                {this.state.inputShow ?

                    <View>
                        <Text>请输入密码</Text>

                        <TextInput
                    style={styles.input}
                    password="true"
                    keyboardType='numeric'
                    placeholder="密码"
                    onChangeText={(text)=>{this.setState({text})}}
                />
                        <TouchableHighlight style={[AppComponent.btn]} underlayColor="#008AC4"  onPress={this.showMnemonic.bind(this)}>
                            <Text style={styles.btnText}>
                                确定
                            </Text>
                        </TouchableHighlight>
                    </View>
                    :

                    <View style={styles.mnemonicTitle}>
                        <Text style={[styles.title]}>助记词</Text>
                        <Text style={{marginBottom:AppSizes.margin_20}}>（请牢记您的助记词）</Text>
                        <Text>{this.state.mnemonic}</Text>
                        <TouchableHighlight style={[AppComponent.btn, styles.btn]} underlayColor="#008AC4"  onPress={() => navigate('Remember',{data:this.state.mnemonic})}>
                            <Text style={styles.btnText}>
                                下一步
                            </Text>
                        </TouchableHighlight>
                    </View>
                    }
                <Toast position='top' ref="toast"/>
            </KeyboardAvoidingView>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        height: 22,
        width: 22,
        resizeMode: 'contain'
    },
    mnemonic:{
        width:AppSizes.screen.widthThreeQuarters
    },
    input: {
        width: AppSizes.screen.widthThreeQuarters,
        height: 35,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        marginTop:AppSizes.margin_30,
        marginBottom:AppSizes.margin_20
    },
    mnemonicTitle: {
        alignItems: 'center',
        width: AppSizes.screen.widthThreeQuarters,
        marginBottom:AppSizes.margin_20,
    },
    brand:{
        fontSize:35,
        color:'#329aff',
        marginBottom:60
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
export default GuideViewScreen;
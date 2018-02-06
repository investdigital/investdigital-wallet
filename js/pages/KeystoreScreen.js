import React,{Component} from 'react';
import {
    Button,
    Image,
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    Alert,
    Clipboard,
    ScrollView
} from 'react-native';
import Wallet from 'ethereumjs-wallet';
import GetSetStorage from '../utils/GetSetStorage';
import Toast, {DURATION} from 'react-native-easy-toast';
import {AppSizes, AppComponent} from '../style/index';
class KeystoreScreen extends Component{
    static navigationOptions = {
        title:'导出Keystore',
    };
    constructor(props) {
        super(props);
        this.state = {
            keystore:'loading...',
        };
    }
    componentWillMount() {
        const {params} = this.props.navigation.state;
        let keystore1;
        let password=params.data;
        GetSetStorage.getStorageAsync('privateKey').then((result)=>{
            let key = Buffer.from(result, 'hex');
            let wallet = Wallet.fromPrivateKey(key);
            keystore1 = wallet.toV3String(password, {kdf: "pbkdf2", c: 2000});
            this.setState({
                keystore:keystore1
            })
        })
    }
    _setClipboardContent = async () => {
        Clipboard.setString(this.state.keystore);
        try {
            let content = await Clipboard.getString();
            this.setState({content});
            this.refs.toast.show('复制成功');
        } catch (e) {
            this.setState({content:e.message});
            this.refs.toast.show('复制失败');
        }
    };
    render() {
        return (
            <ScrollView style={styles.mainStyle}>
                <View style={styles.container}>
                    <View style={{padding:20}}>
                        <Text style={styles.title}>离线保存</Text>
                        <Text>请复制粘贴Keystore文件到安全、离线的地方保存。切勿保存至邮箱、网盘、聊天工具等。切勿通过网络工具传输Keystore文件。</Text>
                    </View>
                    <Text style={{margin:20,padding:20,borderWidth:1,borderColor:"grey",borderStyle:"solid",backgroundColor:"#F5F5F5",borderRadius:10}}>{this.state.keystore}</Text>
                    <TouchableHighlight style={[AppComponent.btn, styles.btn]} underlayColor="#008AC4" onPress={this._setClipboardContent}>
                        <Text style={styles.btnText}>
                            复制keystore
                        </Text>
                    </TouchableHighlight>
                    <Toast position='center' ref="toast"/>
                </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        width:AppSizes.screen.width,
        minHeight:AppSizes.screen.height,
    },
    btn: {
        marginTop:AppSizes.margin_20,
    },
    btnText:{
        color:"#fff"
    },
    title:{
        fontSize:20,
        color:'#329aff',
        marginBottom:AppSizes.margin_20,
    },
    loadingView: {
        flex: 1,
        height:AppSizes.screen.height,
        width:AppSizes.screen.width,
        position: 'absolute'
    },
});
export default KeystoreScreen;
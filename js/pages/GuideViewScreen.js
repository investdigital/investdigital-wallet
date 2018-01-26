import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    TextInput,
    TouchableHighlight,
    Image
} from 'react-native';
import {AppSizes, AppComponent} from '../style/index';
class GuideViewScreen extends Component{
    static navigationOptions={
        header:null
    };
    constructor(props) {
        super(props);
        this.state = {
            inputShow:true,
            password: '',
            mnemonic:'oppose receive bracket keen blossom fuel ostrich soup life memory elbow field'
        };
    }
    showMnemonic(){
        if(this.state.password === ''){
            alert("请输入密码")
        }
        else{
            this.setState({
                inputShow:false
            });
        }
    }
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                {this.state.inputShow ?
                    <View>
                        <Text>请输入密码</Text>
                        <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    placeholder="密码"
                    secureTextEntry
                    onChangeText={(password) => this.setState({password})}
                />
                        <TouchableHighlight style={[AppComponent.btn]} underlayColor="#008AC4"  onPress={this.showMnemonic.bind(this)}>
                            <Text style={styles.btnText}>
                                确定
                            </Text>
                        </TouchableHighlight>
                    </View>
                    :
                    <View>
                        <Text style={styles.mnemonicTitle}>助记词（请牢记你的助记词）</Text>
                        <Text style={styles.mnemonic}>{this.state.mnemonic}</Text>
                        <TouchableHighlight style={[AppComponent.btn,styles.btn]} underlayColor="#008AC4"  onPress={() => navigate('Remember',{data:this.state.mnemonic})}>
                            <Text style={styles.btnText}>
                                下一步
                            </Text>
                        </TouchableHighlight>
                    </View>
                    }
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        margin:'auto',
    },
    icon: {
        height: 22,
        width: 22,
        resizeMode: 'contain'
    },
    mnemonic:{
        width:AppSizes.screen.widthThreeQuarters
    },
    mnemonicTitle:{
        marginBottom:AppSizes.margin_20,
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
    btn: {
        marginTop:AppSizes.margin_20,
    },
    btnText:{
        color:"#fff"
    }
});
export default GuideViewScreen;
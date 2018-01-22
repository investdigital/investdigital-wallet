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
import lightwallet from 'eth-lightwallet';
import {AppSizes, AppComponent} from '../style/index';
class GuideViewScreen extends Component{
    static navigationOptions={
        header:null
    };
    constructor(props) {
        super(props);
        this.state = {
            inputShow:true
        };
    }
    showMnemonic(){
        // var s = lightwallet.keystore.generateRandomSeed();
        this.setState({
            inputShow:false
        })
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
                />
                        <TouchableHighlight style={[AppComponent.btn]} underlayColor="#008AC4"  onPress={this.showMnemonic.bind(this)}>
                            <Text style={styles.btnText}>
                                确定
                            </Text>
                        </TouchableHighlight>
                    </View>
                    :
                    <View>
                        <Text>keystore{lightwallet.keystore.generateRandomSeed()}</Text>
                        <TouchableHighlight style={AppComponent.btn} underlayColor="#008AC4"  onPress={() => navigate('Home',{data:'Keystore'})}>
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
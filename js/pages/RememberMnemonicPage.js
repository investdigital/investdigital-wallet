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
import {AppSizes, AppComponent} from '../style/index';
class RememberMnemonicPage extends Component{
    static navigationOptions = {
        title:'助记词检验',
    };
    render(){
        const {navigate} = this.props.navigation;
        return(
            <View style={styles.container}>
                <View>
                    <Text>第三个单词是什么？</Text>
                    <TextInput
                        style={styles.input}
                    />
                    <Text>最后一个单词是什么？</Text>
                    <TextInput
                        style={styles.input}
                    />
                    <TouchableHighlight style={[AppComponent.btn]} underlayColor="#008AC4" onPress={() => navigate('Home',{data:'Keystore'})}>
                        <Text style={styles.btnText}>
                            确定
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
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

export default RememberMnemonicPage;
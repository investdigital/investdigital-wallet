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
    // static navigationOptions = {
    //     title:'助记词检验',
    // };
    constructor(props) {
        super(props);
        this.state = {
            question1:'',
            question2:''
        };
    }
    handleRemember(val){
        let question1=this.state.question1;
        let question2=this.state.question2;
        if(question1 == val[2]){
            if(question2 == val[11]){
                this.props.navigation.navigate('Home',{data:'Keystore'})
            }
            else{
                alert('请核对问题二输入是否正确');
            }
        }else{
            alert('请核对问题一输入是否正确');
        }
    }
    render(){
        const {params} = this.props.navigation.state;
        const mnemonicData=params.data.split(' ');
        return(
            <View style={styles.container}>
                <View>
                    <Text>请输入助记词的第三个单词</Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize='none'
                        onChangeText={(question1) => this.setState({question1})}
                    />
                    <Text>请输入助记词的最后一个单词</Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize='none'
                        onChangeText={(question2) => this.setState({question2})}
                    />
                    <TouchableHighlight style={[AppComponent.btn]} underlayColor="#008AC4" onPress={this.handleRemember.bind(this,mnemonicData)}>
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
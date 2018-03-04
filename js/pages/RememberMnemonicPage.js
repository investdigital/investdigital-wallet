import React,{Component} from 'react';
import {
    Button,
    Image,
    View,
    Text,
    TouchableHighlight,
    TextInput,
    Alert,
    StyleSheet,
    Platform,
    KeyboardAvoidingView
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast';
import GetSetStorage from '../utils/GetSetStorage';
import { Api } from '../service';
// Styles
import {AppSizes, AppComponent} from '../style/index';
class RememberMnemonicPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            question1Index1:'',
            question1Index2:'',
            questionTitle1:'',
            questionTitle2:'',
            question1:'',
            question2:'',
        };
    }
    componentDidMount(){
        const arr = ["一","二","三","四","五","六","七","八","九","十","十一","十二"];
        let index1 = Math.floor((Math.random()*arr.length));
        console.log(arr);
        this.setState({
            question1Index1:index1,
            questionTitle1:arr[index1],
        });
        arr.splice(index1,1);
        console.log(arr);
        let index2 = Math.floor((Math.random()*arr.length));
        console.log(index2);
        this.setState({
            question1Index2:index2,
            questionTitle2:arr[index2],
        });
    }
    handleRemember(val){
        console.log(val);
        let index1=this.state.question1Index1;
        let index2=this.state.question1Index2;
        let question1=this.state.question1;
        let question2 =this.state.question2;
        console.log(val);
        console.log(index1,question1,index2,question2);
        if(question1 && question2){
            if(val[index1]== question1){
                val.splice(index1,1);
                if(val[index2]== question2){
                    GetSetStorage.getStorageAsync('address').then((result) => {
                        const address=result;
                        console.log(Platform.OS);
                        GetSetStorage.getStorageAsync('registrationId').then((result) => {
                            const registrationId=result;
                            const initData ={
                                address:address,
                                imei:'',
                                type:Platform.OS,
                                registrationID:registrationId
                            };
                            Api.initDevice({initData}).then(data => {
                                console.log(data);
                                this.props.navigation.navigate('Home')
                            });
                        })
                    });
                }
                else{
                    this.refs.toast.show('请核对问题二 ');
                }
            }else {
                this.refs.toast.show('请核对问题一');
                // Alert.alert("请核对问题一");
            }
        }else{
            this.refs.toast.show('请输入正确答案');
            // Alert.alert('请输入正确答案');
        }
    }
    render(){
        const {params} = this.props.navigation.state;
        let mnemonic=(params.data).split(' ');
        return(
            <KeyboardAvoidingView
                style={styles.container}
                behavior="padding"
            >
                <View style={styles.container}>
                    <Text style={styles.title}>助记词真的记住了吗？</Text>
                    <View>
                        <Text>请输入第{this.state.questionTitle1}个单词</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            underlineColorAndroid="transparent"
                            onChangeText={(question1)=>{this.setState({question1})}}

                        />
                        <Text>请输入第{this.state.questionTitle2}个单词</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            underlineColorAndroid="transparent"
                            onChangeText={(question2)=>{this.setState({question2})}}
                        />
                        <TouchableHighlight style={[AppComponent.btn]} underlayColor="#008AC4"  onPress={this.handleRemember.bind(this,mnemonic)}>
                            <Text style={styles.btnText}>
                                确定
                            </Text>
                        </TouchableHighlight>
                    </View>
                    <Toast position='top' ref="toast"/>
                </View>
            </KeyboardAvoidingView>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        height: AppSizes.screen.height-60,
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
    title:{
        fontSize:25,
        color:'#329aff',
        marginBottom:AppSizes.margin_20*2
    },
    btnText:{
        color:"#fff"
    }
});
export default RememberMnemonicPage;
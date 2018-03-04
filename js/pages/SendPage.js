import React,{Component} from 'react';
import {
    Button,
    Image,
    View,
    Text,
    StyleSheet,
    TextInput,
    Clipboard,
    PanResponder,
    Alert,
    ScrollView,
    Keyboard,
    KeyboardAvoidingView,
    TouchableHighlight,
} from 'react-native';
// Service
import { Api } from '../service';
import GetSetStorage from '../utils/GetSetStorage';
import * as Progress from 'react-native-progress';
import Tx from 'ethereumjs-tx';
import ScanQrcode from './ScanQrcode';
import {AppSizes, AppComponent} from '../style/index';
import getQueryString from '../utils/StringUtils';
import AndroidBack from '../components/AndroidBack';
class SendPage extends Component{
constructor(props) {
        super(props);
         this.state = {
             text:"",
             num:"",
             tip:"",
             progressShow:true,
             progress: 0,
             gasLimit:'100000',
             gasPrice:'20',
             gas:'0.002',
         };
    }
    static navigationOptions = {
        title:'发送',
        headerBackTitle:null,
        headerLeft:null
    };
    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderGrant: (evt, gestureState) => {
                this._progress = this.state.progress;
                this._length = parseFloat((this._progress + gestureState.dx/200).toFixed(2));
                if(this._length<=0){
                    this._length=0
                }
                else if(this._length>1){
                    this._length=1
                }
            },
            onPanResponderMove: (evt, gestureState) => {
                this._length = parseFloat((this._progress + gestureState.dx/200).toFixed(2));
                if(this._length<=0){
                    this._length=0
                }
                else if(this._length>1){
                    this._length=1
                }
                this.setState({
                    progress: this._length,
                    gasPrice:(parseInt((this._length)*80)+20).toString(),
                    gas:(parseInt((this._length)*80)+20)*this.state.gasLimit/1e9
                })
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                this.setState({
                    progress: this._length,
                    gasPrice:(parseInt((this._length)*80)+20).toString(),
                    gas:(parseInt((this._length)*80)+20)*this.state.gasLimit/1e9
                });
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                return true;
            },
        });
    }
    changeFormat(val){
        let data =parseInt(val).toString(16);
        if(data%2 == 0){
            return "0x"+data;
        }else{
            return "0x0"+data;
        }
    }
    onSend(){
     const text = this.state.text;
     const num = this.state.num;
     const tip = this.state.tip;
     if(text === '' ) {
         Alert.alert('地址不能为空');
     } else if(num === ''){
         Alert.alert('金额不能为空');
     }else{
         GetSetStorage.getStorageAsync('address').then((result) => {
             let address=result;
             console.log("address"+address);
             Api.getNonce({address}).then(data => {
                 let nonce=data.data;
                 console.log('nonce1'+nonce);
                 if(data.status==1){
                     GetSetStorage.getStorageAsync('privateKey').then((result) => {
                         const privateKey=result;
                         console.log(num *1e18);
                         let key =new Buffer(privateKey, 'hex');
                         let rawTx = {
                             nonce: nonce,
                             gasPrice: this.changeFormat(this.state.gasPrice),
                             gasLimit: this.changeFormat(this.state.gasLimit),
                             from: address,
                             to: this.state.text,//the to address
                             value: this.changeFormat(num * 1e18),//the amount of ether sent
                         };
                         console.log(rawTx);

                         let tx = new Tx(rawTx);
                         tx.sign(key);
                         let serializedTx = tx.serialize();
                         let txStr = "0x" + serializedTx.toString("hex");
                         console.log(txStr);
                         Api.sendETH({txStr}).then((data)=>{
                         console.log('==发送交易成功====');
                             console.log(data);
                             if(data.status==1){
                                 Alert.alert("交易成功");
                                 let item1 ={txId:data.data.txId,from:data.data.address, to:data.data.to,amount:data.data.amount,status:data.data.status,blockNumber:data.data.blockNumber};
                                 GetSetStorage.getStorageAsync('ethList').then((result) => {
                                     if (result == null || result == '') {
                                         var ethList = new Object();
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
                             else{
                                 Alert.alert(data.message);
                             }
                         })
                     });
                 }
             }).catch(err => {
                 console.log(err);
             });
         });
     }
    }
      scanQrcode(data){
          let message=data;
          let text = data;
          let amount;
          if (message.indexOf(":") > -1 && message.indexOf("?") > -1) {
              text = message.substring(message.indexOf(":") + 1, message.indexOf("?"));
          } else if (message.indexOf(":") > -1) {
              text = message.substr(message.indexOf(":") + 1);
          } else if (message.indexOf("?") > -1) {
              text = message.substring(0, message.indexOf("?"));
          }

          if (data.indexOf("?") > -1) {
              amount = getQueryString(data.substr(data.indexOf("?")), "amount");
          }
          this.setState({num: amount, text:text});
      }
    advancedSetting(){
        this.setState({progressShow:!this.state.progressShow});
    }
    render(){
        const {navigate} = this.props.navigation;
        return(
            <ScrollView style={{flex:1,backgroundColor:'#fff'}}>
                <AndroidBack router1={this.props.navigation.state.routeName}/>
            <KeyboardAvoidingView
                style={styles.container}
                behavior="padding"
            >

                <View>
                    <Text style={{padding:20}}>发送</Text>
                    <TextInput
                        style={styles.textinput}
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}
                         placeholder="至"
                        underlineColorAndroid="transparent"
                         clearButtonMode='while-editing'
                      />
                    <TextInput
                    style={styles.textinput}
                       onChangeText={(num) => this.setState({num})}
                        value={this.state.num}
                        type='number'
                        placeholder="金额"
                        underlineColorAndroid="transparent"
                        clearButtonMode='while-editing'
                         />
                    <TextInput
                       style={styles.textinput}
                       onChangeText={(tip) => this.setState({tip})}
                       value={this.state.tip}
                       type='tip'
                       placeholder="备注"
                        underlineColorAndroid="transparent"
                       clearButtonMode='while-editing'
                        />
                </View>
                <View style={styles.progress}>
                    <Text style={{width:AppSizes.screen.widthThreeQuarters-20}}>
                        矿工费用
                    </Text>
                    <TouchableHighlight underlayColor="#008AC4" onPress={() => navigate('CostMiner')}>
                        <Text style={styles.btnText}>
                            <Image
                                source={require('../images/question.jpg')}
                                style={{width: 20, height: 20}}
                            />
                        </Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.progress}>
                    <View {...this._panResponder.panHandlers}>
                        <Text>{this.state.gas}ether</Text>
                        {this.state.progressShow?
                            <Progress.Bar
                                progress={this.state.progress}
                                width={AppSizes.screen.widthThreeQuarters}
                                style={{marginBottom:10}}
                            />:
                            <View>
                                <TextInput
                                    style={styles.textinput}
                                    onChangeText={(gasPrice) => {this.setState({gasPrice:gasPrice,gas:gasPrice*this.state.gasLimit/1e9,progress:parseFloat((gasPrice-20)/80)})}}
                                    value={this.state.gasPrice}
                                    type='number'
                                    placeholder="自定义Gas Price"
                                    underlineColorAndroid="transparent"
                                    clearButtonMode='while-editing'
                                />
                                <TextInput
                                    style={styles.textinput}
                                    onChangeText={(gasLimit) => this.setState({gasLimit:gasLimit,gas:this.state.gasPrice*gasLimit/1e9})}
                                    value={this.state.gasLimit}
                                    type='number'
                                    placeholder="自定义Gas"
                                    underlineColorAndroid="transparent"
                                    clearButtonMode='while-editing'
                                />
                            </View>
                        }
                    </View>
                </View>
                <View style={styles.advancedSetting}>
                    <Text style={{width:50,fontSize:12,color:this.state.progressShow ?'black':"#329aff"}} onPress={this.advancedSetting.bind(this)}>
                        高级设置
                    </Text>
                </View>
                <View>
                    <TouchableHighlight style={[AppComponent.btn, styles.btn]} underlayColor="#008AC4" onPress={this.onSend.bind(this)}>
                        <Text style={styles.btnText}>
                           发送
                        </Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={[AppComponent.btn, styles.btn]} underlayColor="#008AC4" onPress={() => navigate('ScanQrcode',{callback:(data)=>{this.scanQrcode(data)}})}>
                        <Text style={styles.btnText}>
                            扫描
                        </Text>
                    </TouchableHighlight>
                </View>

            </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    },
    container:{
        backgroundColor:'#fff',
        flex:1,
        alignItems: 'center',
        width:AppSizes.width,
    },
    textinput:{
        width: AppSizes.screen.widthThreeQuarters,
        height: 35,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        marginBottom:AppSizes.margin_20
    },
    btn: {
        marginTop:AppSizes.margin_20,
        width:AppSizes.screen.widthThreeQuarters,
    },
    btnText:{
         color:"#fff"
    },
    progress:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:"flex-end"
    },
    advancedSetting:{
        flexDirection: 'row',
        width:AppSizes.screen.widthThreeQuarters,
        justifyContent:'flex-end'
    }
});
export default SendPage


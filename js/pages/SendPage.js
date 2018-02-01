import React,{Component} from 'react';
import {
    Button,
    Image,
    View,
    Text,
    StyleSheet,
    TextInput,
    Clipboard,
    AlertIOS,
    PanResponder,
    TouchableHighlight,
} from 'react-native';

// Service
import { Api } from '../service';

import GetSetStorage from '../utils/GetSetStorage';

import * as Progress from 'react-native-progress';
import Tx from 'ethereumjs-tx';

import {AppSizes, AppComponent} from '../style/index';
class SendPage extends Component{
constructor(props) {
        super(props);
         this.state = {
             text:"",
             num:"",
             tip:"",
             progress: 0,
             gasLimit:'100000',
             gasPrice:'20',
             gas:0.002
         };
    }
    static navigationOptions = {
        title:'发送',
        drawerLabel: '发送',
        drawerIcon: ({ tintColor }) => (
            <Image
                source={require('../images/pfb_tabbar_homepage.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
        headerBackTitle:null,
        headerLeft:null,
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
                //手指开始
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
                    gasPrice:parseInt((this._length)*80)+20,
                    gas:(parseInt((this._length)*80)+20)*this.state.gasLimit/1e9
                })
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                //手指离开屏幕
                this.setState({
                    progress: this._length,
                    gasPrice:parseInt((this._length)*80)+20,
                    gas:(parseInt((this._length)*80)+20)*this.state.gasLimit/1e9
                });
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                // Returns whether this component should block native components from becoming the JS
                // responder. Returns true by default. Is currently only supported on android.
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
    onClick(){
     const text = this.state.text;
     const num = this.state.num;
     const tip = this.state.tip;

     if(text === '' || num === '' ){
        if(text === ''){
           alert('地址不能为空')
        }else{
           alert('金额不能为空')
        }
      }
         GetSetStorage.getStorageAsync('address').then((result) => {
             let address=result;
             console.log("address"+address);
             Api.getNonce({address}).then(data => {
                 let nonce=data.data;
                 console.log('nonce1'+nonce);
                 if(data.status==1){
                     GetSetStorage.getStorageAsync('privateKey').then((result) => {
                         const privateKey=result;
                         console.log(privateKey);
                         let key =new Buffer(privateKey, 'hex');
                         let rawTx = {
                             nonce: nonce,
                             gasPrice: this.changeFormat(this.state.gasPrice),
                             gasLimit: this.changeFormat(this.state.gasLimit),
                             from: address,
                             to: this.state.text,//the to address
                             value: this.changeFormat(num * e18),//the amount of ether sent
                         };
                         console.log(rawTx)
                         let tx = new Tx(rawTx);
                         tx.sign(key);
                         let serializedTx = tx.serialize();
                         let txStr = "0x" + serializedTx.toString("hex");
                         Api.sendETH({txStr}).then((data)=>{
                             console.log(data);
                            if(data.status==1){
                                alert("交易成功");
                                let item1 ={txId:data.data,from:address, to:this.state.text, time:new Date().toLocaleString(),amount:this.state.num};
                                GetSetStorage.getStorageAsync('ethList').then((result) => {
                                    if (result == null || result == '') {
                                        var ethList = new Object();
                                        let array=[];
                                        array.unshift(item1);
                                        ethList.data=array;
                                        GetSetStorage.setStorageAsync('ethList', JSON.stringify(ethList));
                                    }else{
                                        let ethList= JSON.parse(result);
                                        ethList.data.unshift(item1);
                                        GetSetStorage.setStorageAsync('ethList', JSON.stringify(ethList));
                                    }
                                })
                            }
                            else{
                                alert("交易失败")
                            }
                         })
                     });
                 }
             }).catch(err => {
                 console.log(err);
             });
         });

      }

    render(){
        const {navigate} = this.props.navigation;
        return(
            <View style={styles.container}>
            <Text style={{padding:20}}>发送</Text>
                 <TextInput
                    style={styles.textinput}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                     placeholder="至"
                     clearButtonMode='while-editing'
                  />
                   <TextInput
                    style={styles.textinput}
                       onChangeText={(num) => this.setState({num})}
                        value={this.state.num}
                        type='number'
                        placeholder="金额"
                        clearButtonMode='while-editing'
                         />
                   <TextInput
                    style={styles.textinput}
                       onChangeText={(tip) => this.setState({tip})}
                       value={this.state.tip}
                       type='tip'
                       placeholder="备注"
                       clearButtonMode='while-editing'
                        />
                    <View style={styles.progress}>
                        <View style={styles.progressBar} {...this._panResponder.panHandlers}>
                            <Text>{this.state.gas}</Text>
                            <Progress.Bar
                                progress={this.state.progress}
                                width={AppSizes.screen.widthThreeQuarters-18}
                            />
                        </View>
                        <TouchableHighlight underlayColor="#008AC4" onPress={() => navigate('CostMiner')}>
                            <Text style={styles.btnText}>
                                <Image
                                    source={require('../images/question.jpg')}
                                    style={{width: 18, height: 18}}
                                />
                            </Text>

                        </TouchableHighlight>
                    </View>
                    <TouchableHighlight style={[AppComponent.btn, styles.btn]} underlayColor="#008AC4" onPress={this.onClick.bind(this)}>
                        <Text style={styles.btnText}>
                           发送
                        </Text>
                    </TouchableHighlight>

            </View>
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
        height: 35,
        width:300,
        paddingLeft:10,
        marginLeft:40,
        marginBottom:20,
        fontSize:15,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius:8
    },
    btn: {
        marginTop:AppSizes.margin_20,
        width:300,
    },
    btnText:{
         color:"#fff"
    },
    progress:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:"flex-end"
    },
    progressBar:{

    }
});
export default SendPage


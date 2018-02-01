import React,{Component} from 'react';
import {
    Button,
    Image,
    View,
    Text,
    StyleSheet,
    Clipboard,
    AlertIOS,
    TouchableHighlight
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast'
import {AppSizes} from '../style/index';
class DetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            position: 'top',
            isHiden:true
        }
    }
    static navigationOptions = {
        title:'交易详情',

    };
     onClick(text, position) {
            this.setState({
                position: position,
            })
            this.refs.toast.show('已复制');
        }

        getButton(text, position) {
             Clipboard.setString(text);
            return(
                <TouchableHighlight
                   underlayColor='#fff'
                    style={{padding:5,alignItems:'center'}}
                    onPress={()=>this.onClick(text, position)}>
                    <Text>{text}</Text>
                </TouchableHighlight>
            )
        }
    _Unfoldthecontent(){
       this.setState({isHiden: false})
    }

    render() {
        const {params} = this.props.navigation.state;

//        onPress={() => { this.props.navigation.navigate(`https://etherscan.io/tx/0x4cf723d7823454e88f985ae5d2722618540b606094d7c314748c7235496c33b7`)}}
        return (
            <View style={styles.container}>
                <Text style={{padding:5,marginTop:20}}>{params.time}</Text>
                <Text style={{padding:5}} onPress={this._setClipboardContent}>已接收 idt </Text>
                 <Text style={{padding:5}}>在 {params.from}</Text>
                 <Text style={{padding:5}}>状态 : 完成</Text>
                 <Text style={{padding:5}}>备忘录 : </Text>
                 <Text style={{padding:5}}>金额 : </Text>
                 <Text style={{padding:5}}>期初余额 : B0</Text>
                 <Text style={{padding:5}}>期末余额 : B2,000 </Text>
                 <Text style={{padding:5}}>已在此地址接收 </Text>
                 {this.getButton(params.to, 'top', DURATION.LENGTH_SHORT)}
                 <Toast ref="toast" position={this.state.position}/>

                 {this.state.isHiden ? <View style={{flex:1}}>
                  <Text style={{padding:5}} onPress={this._Unfoldthecontent.bind(this)}>更多... </Text></View>
                  : <View>
                        <Text style={{padding:5}}>比特币交易ID</Text>
                        <Text style={{padding:5}}>{params.txId}</Text>
                        <Text style={{padding:5}}>已在区块中确认</Text>
                        <Text style={{padding:5}}>123095</Text>
                    </View>
                 }
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: AppSizes.width,
        paddingLeft:20,
        backgroundColor:'#fff',
        flex:1,
        alignItems:'flex-start'
    },

});
export default DetailScreen;
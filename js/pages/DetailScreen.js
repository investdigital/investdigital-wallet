import React,{Component} from 'react';
import {
    Button,
    Image,
    View,
    Text,
    StyleSheet,
    Clipboard,
    AlertIOS,
    TouchableHighlight,
    Linking
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
     openSocial(url) {
            Linking.openURL(url).catch(error => console.warn('An error occurred: ', error))
          }

    render() {
        const {params} = this.props.navigation.state;

        const data = params.data
//        console.log('-----详情页里获取到的数据------')
//        console.log(params.data)
        return (
            <View style={styles.container}>
                <Text style={{padding:5,marginTop:20}}>{data.time}</Text>
                <Text style={{padding:5}} onPress={this._setClipboardContent}>已接收 IDT </Text>
                 <Text style={{padding:5}}>在 {data.from}</Text>
                 <Text style={{padding:5}}>状态 : {data.status == 0 ? '进行中':dedatatail.status == 1?'已完成':'未知'}</Text>
                 <Text style={{padding:5}}>备忘录 : </Text>
                 <Text style={{padding:5}}>金额 : {data.amount}</Text>
                 <Text style={{padding:5}}>已在此地址接收 </Text>
                 {this.getButton(data.to, 'top', DURATION.LENGTH_SHORT)}
                 <Toast ref="toast" position={this.state.position}/>

                 {this.state.isHiden ? <View style={{flex:1}}>
                  <Text style={{padding:5}} onPress={this._Unfoldthecontent.bind(this)}>更多... </Text></View>
                  : <View>
                        <Text style={{padding:5}}>比特币交易ID</Text>
                        <Text style={{padding:5}} onPress={() => { this.openSocial('https://etherscan.io/tx')}} >{data.txId}</Text>
                        <Text style={{padding:5}}>已在区块中确认</Text>
                        <Text style={{padding:5}}>{data.blockNumber}</Text>
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
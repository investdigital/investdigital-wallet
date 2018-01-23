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
     console.log(text)
            this.setState({
                position: position,
            })
            this.refs.toast.show('已复制到剪切板');
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
    console.log(this.state.isHiden)
       this.setState({isHiden: false})
    }

    render() {
        const {params} = this.props.navigation.state;
        return (
            <View style={styles.container}>
                <Text style={{padding:5,marginTop:20}}>2017年11月20日 下午3:30</Text>
                <Text style={{padding:5}} onPress={this._setClipboardContent}>已接收 idt {params.user}</Text>
                 <Text style={{padding:5}}>在 {params.address}</Text>
                 <Text style={{padding:5}}>状态 : 完成</Text>
                 <Text style={{padding:5}}>备忘录 : </Text>
                 <Text style={{padding:5}}>金额 : </Text>
                 <Text style={{padding:5}}>期初余额 : B0</Text>
                 <Text style={{padding:5}}>期末余额 : B2,000 </Text>
                 <Text style={{padding:5}}>已在此地址接收 </Text>
                 {this.getButton(params.address, 'top', DURATION.LENGTH_SHORT)}
                 <Toast ref="toast" position={this.state.position}/>

                 {this.state.isHiden ? <View style={{flex:1}}>
                  <Text style={{padding:5}} onPress={this._Unfoldthecontent.bind(this)}>更多... </Text></View>
                  : <View>
                        <Text style={{padding:5}}>比特币交易ID</Text>
                        <Text style={{padding:5}}>2e2r1rt2yu34io5jnbc67sf8bx7gd79svx9gs345d6546fvcb869cbnm897fhg12ffd45gsfs</Text>
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
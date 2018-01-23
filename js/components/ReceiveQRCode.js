//import React,{Component} from 'react';
//import {
//    Button,
//    View,
//    Text,
//    Picker,
//    Dimensions,
//    TextInput,
//    StyleSheet
//} from 'react-native';
//import QRCode from 'react-native-qrcode';
//import {AppSizes} from '../style/index';
//
//export default class ReceiveQRCode extends Component{
//    constructor(props) {
//        super(props);
//        this.state = {
//            loading: false,
//            firstLoader: true,
//            text: '',
//        };
//    }
//    render() {
//        console.log(this.props.inputShow);
//        return (
//            <View>
//                {!this.props.inputShow ? <Text></Text> : <TextInput
//                    style={styles.input}
//                    onChangeText={(text) => this.setState({text: text})}
//                    value={this.state.text}
//                    keyboardType='numeric'
//                    placeholder="金额"
//                />}
//
//                <View style={styles.code}>
//                    <QRCode
//                        value={`http://facebook.github.io/react-native/${this.state.text}`}
//                        size={AppSizes.screen.widthHalf}
//                        bgColor='black'
//                        fgColor='white'/>
//                </View>
//            </View>
//        );
//    }
//}
//const styles = StyleSheet.create({
//    input: {
//        width: AppSizes.screen.widthThreeQuarters,
//        height: 35,
//        borderColor: 'gray',
//        borderWidth: 1,
//        borderRadius: 5,
//        padding: 5,
//        marginTop:AppSizes.margin_30,
//        marginBottom:AppSizes.margin_20
//    },
//    code:{
//        alignItems: 'center',
//        justifyContent: 'center',
//        alignSelf: 'center',
//    }
//});
import React,{Component} from 'react';
import {
    Button,
    View,
    Text,
    Picker,
    Dimensions,
    TextInput,
    StyleSheet
} from 'react-native';
import GetSetStorage from '../utils/GetSetStorage';
import QRCode from 'react-native-qrcode';
import {AppSizes} from '../style/index';

export default class ReceiveQRCode extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            firstLoader: true,
            text:'',
            address:''
        };
    }
    componentWillMount() {
        GetSetStorage.getStorageAsync('address').then((result)=>{
            this.setState({
                address:result
            })
        })
    }
    render() {
        return (
            <View>
                {!this.props.inputShow ? <Text></Text> :
                    <View>
                    <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({text: text})}
                    value={this.state.text}
                    keyboardType='numeric'
                    placeholder="ETH数量"
                />
                    </View>
                        }
                {this.state.text ? <View style={styles.code}>
                    <QRCode
                        value={`${this.state.address}?amount=${this.state.text}`}
                        size={AppSizes.screen.widthHalf}
                        bgColor='black'
                        fgColor='white'/>
                </View> :<View style={styles.code}>
                    <QRCode
                        value={`${this.state.address}`}
                        size={AppSizes.screen.widthHalf}
                        bgColor='black'
                        fgColor='white'/>
                </View>}


            </View>
        );
    }
}
const styles = StyleSheet.create({
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
    code:{
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    }
});
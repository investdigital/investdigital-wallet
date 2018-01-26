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
    TouchableHighlight,
} from 'react-native';
var Progress = require('react-native-progress');

// Service
import { Api } from '../service';

import {AppSizes, AppComponent} from '../style/index';
class SendPage extends Component{
constructor(props) {
        super(props);
         this.state = {
              text:"",
              num:"",
              tip:"",
              progress: 0,
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
    }
    componentDidMount(){
        this.animate()
      }

      animate() {
        var progress = 0;
        this.setState({ progress });
        setTimeout(() => {
          this.setState({ indeterminate: false });
          setInterval(() => {
            progress += Math.random()/5;
            if(progress > 1) {
              progress = 1;
            }
            this.setState({ progress });
          }, 500);
        }, 1500);
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
      }else{
      //数据请求方式...
        alert(' 发送成功')
      }
     }
    render(){;
        return(
            <View style={styles.container}>
            <Text style={{padding:20}}>发送 {this.state.text}</Text>
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
                        <Progress.Bar
                                              style={styles.progress}
                                              progress={this.state.progress}
                                              indeterminate={this.state.indeterminate}
                                            />
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
    progress: {
        margin: 10,
      },
});

export default SendPage
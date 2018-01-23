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
} from 'react-native';
//var Toast = require('react-native-toast');
class SendPage extends Component{
constructor(props) {
        super(props);
         this.state = {
              text:"",
              num:"",
              tip:"",
            };
    }
    static navigationOptions = {
        title:'发送',
        drawerLabel: '发送',
        // Note: By default the icon is only shown on iOS. Search the  showIcon option below.
        drawerIcon: ({ tintColor }) => (
            <Image
                source={require('../images/pfb_tabbar_homepage.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
        headerBackTitle:null,
        headerLeft:null,
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
            <View style={{backgroundColor:'#fff',flex:1,}}>
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
                    <Button
                     style={{padding:20}}
                     onPress={() =>this.onClick()}
                     title="发送"
                    />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    },
    textinput:{
    height: 30,
    width:270,
    paddingLeft:10,
    marginLeft:20,
    marginBottom:20,
    fontSize:14,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius:8
    }
});

export default SendPage
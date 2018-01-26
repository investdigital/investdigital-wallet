import React,{Component} from 'react';
import  {
    Image,
    TextInput,
    View,
    Text,
    Platform,
    StyleSheet,
    TouchableHighlight,
    ScrollView
} from 'react-native';

import {AppSizes, AppComponent} from '../style/index';

// Service
import { Api } from '../service';

export default class SearchList extends Component{
   constructor(props) {
           super(props);
            this.state = {
              data:{
                list1:[],
                list2:[],
              },
               status:0
           };
       }
 static navigationOptions = ({ navigation }) => ({
    title: '搜索订单',
  });

  changeOpen(status){
   const lastStatus = this.state.status;
  console.log(status)
  if(lastStatus === status){
    this.setState({
        status:0,
        text:""
      })
    }else{
    this.setState({
            status
        })
    }
    const orderStatus = this.state.status;
    const inputText = this.state.text;
    //数据请求的方法
  }
    render(){
        return (
         <View>
             <View style={styles.container}>
                <View style={styles.searchBox}>
                     <Image source={require('../images/pfb_tabbar_homepage.png')} style={styles.searchIcon}/>
                     <TextInput style={styles.inputText}
                                onChangeText={(text) => this.setState({text})}
                                value={this.state.text}
                                keyboardType='web-search'
                                placeholder='搜索订单'
                                clearButtonMode='while-editing'/>
                      <Image source={require('../images/pfb_tabbar_homepage.png')} style={styles.voiceIcon}/>
                </View>
                <Image source={require('../images/pfb_tabbar_homepage.png')} style={styles.scanIcon}/>
             </View>
             <View style={styles.btnlist}>
                <TouchableHighlight style={[styles.btn,{backgroundColor:this.state.status === 1 ?'#329aff':'#fff'}]} underlayColor="#fff" onPress={()=>{
                  this.changeOpen(1)
                  }}>
                  <Text style={[styles.btnText,{color:this.state.status === 1 ?'#fff':'#329aff'}]}>
                       已完成
                  </Text>
                </TouchableHighlight>

                <TouchableHighlight style={[styles.btn,{backgroundColor:this.state.status === 2 ?'#329aff':'#fff'}]} underlayColor="#fff" onPress={()=>{
                   this.changeOpen(2)
                    }}>
                  <Text style={[styles.btnText,{color:this.state.status === 2 ?'#fff':'#329aff'}]}>
                     未完成
                   </Text>
                </TouchableHighlight>

                <TouchableHighlight style={[styles.btn,{backgroundColor:this.state.status === 3 ?'#329aff':'#fff'}]} underlayColor="#fff" onPress={()=>{
                  this.changeOpen(3)
                  }}>
                  <Text style={[styles.btnText,{color:this.state.status === 3 ?'#fff':'#329aff'}]}>
                     已发送
                   </Text>
                </TouchableHighlight>
                <TouchableHighlight style={[styles.btn,{backgroundColor:this.state.status === 4 ?'#329aff':'#fff'}]} underlayColor="#fff" onPress={()=>{
                   this.changeOpen(4)
                  }}>
                   <Text style={[styles.btnText,{color:this.state.status === 4 ?'#fff':'#329aff'}]}>
                      未发送
                   </Text>
                </TouchableHighlight>
             </View>
             <View style={styles.list}>
                <ScrollView>
                  <Text onPress={() => { this.props.navigation.navigate('Detail',{user:'fengxiali',address:'Xv7serw31fikjhjberwov3nb28vz62'})}}  style={styles.boxshaow}>111111111111111111111111111111111111111111111111</Text>
                  <Text onPress={() => { this.props.navigation.navigate('Detail',{user:'fengxiali',address:'Xv7serw31fikjhjberwov3nb28vz62'})}} style={styles.boxshaow}>2222222222222222222222222222222222222222222222222</Text>
                  <Text onPress={() => { this.props.navigation.navigate('Detail',{user:'fengxiali',address:'Xv7serw31fikjhjberwov3nb28vz62'})}}  style={styles.boxshaow}>111111111111111111111111111111111111111111111111</Text>
                  <Text onPress={() => { this.props.navigation.navigate('Detail',{user:'fengxiali',address:'Xv7serw31fikjhjberwov3nb28vz62'})}} style={styles.boxshaow}>2222222222222222222222222222222222222222222222222</Text>
                  <Text onPress={() => { this.props.navigation.navigate('Detail',{user:'fengxiali',address:'Xv7serw31fikjhjberwov3nb28vz62'})}}  style={styles.boxshaow}>111111111111111111111111111111111111111111111111</Text>
                  <Text onPress={() => { this.props.navigation.navigate('Detail',{user:'fengxiali',address:'Xv7serw31fikjhjberwov3nb28vz62'})}} style={styles.boxshaow}>2222222222222222222222222222222222222222222222222</Text>
                </ScrollView>
             </View>
          </View>
        )
    }
}

//样式
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',   // 水平排布
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: Platform.OS === 'ios' ? 20 : 0,  // 处理iOS状态栏
        height: Platform.OS === 'ios' ? 68 : 48,   // 处理iOS状态栏
        backgroundColor: '#329AFF',
        alignItems: 'center'  // 使元素垂直居中排布, 当flexDirection为column时, 为水平居中
    },
    searchBox:{//搜索框
      height:30,
      flexDirection: 'row',   // 水平排布
      flex:1,
      borderRadius: 5,  // 设置圆角边
      backgroundColor: 'white',
      alignItems: 'center',
      marginLeft: 8,
      marginRight: 8,
    },
    searchIcon: {//搜索图标
        height: 20,
        width: 20,
        marginLeft: 5,
        resizeMode: 'stretch'
    },
    inputText:{
      flex:1,
      backgroundColor:'transparent',
      fontSize:15,
    },
    voiceIcon: {
        marginLeft: 5,
        marginRight: 8,
        width: 15,
        height: 20,
        resizeMode: 'stretch'
    },
    scanIcon: {//搜索图标
        height: 26.7,
        width: 26.7,
        resizeMode: 'stretch'
    },
    btnlist:{
       flexDirection: 'row',   // 水平排布
       flex:1,
       justifyContent: 'space-around',
       marginBottom:30,
    },
    btn: {
         marginTop:AppSizes.margin_40,
         width:60,
         height: 30,
         alignItems: 'center',
        justifyContent: 'center',
         alignSelf: 'center',
         backgroundColor:'#fff',
         borderRadius:10,
        },
    btnText:{
             color:"#329aff"
        },
        list:{
//                backgroundColor:'#fff',
                  justifyContent:'center',
                  alignItems:'center'
            },
        boxshaow :{
                width:300,
                   height:60,
                   backgroundColor:'#fff',
                   marginTop:20,
                   padding:10,
                   alignItems:'center',
                   elevation: 50,
                   shadowColor:'#ADADAD',
                   shadowOpacity:0.4,
                   shadowRadius:5,
                   shadowOffset : {width:0, height:0},
                },
});
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

//本地存取
import GetSetStorage from '../utils/GetSetStorage';
import ScrollViewItem from './ScrollViewItem.js';
export default class SearchList extends Component{
   constructor(props) {
           super(props);
            this.state = {
              data:{
                list1:[],
                list2:[],
              },
               status:'',
               type:'',
               isHidden:false,
               details:[]
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
        status:'',
        text:"",
      })
    }else{
    this.setState({
            status
        })
    }
    const orderStatus = this.state.status;
    const inputText = this.state.text;
    //数据请求的方法

    GetSetStorage.getStorageAsync('ethList').then((result) => {
//         console.log(JSON.parse(result).data)
         this.setState({
            details : JSON.parse(result).data
       })
   })
  }
  changeOpentype(type){
  const lastType = this.state.type;
    console.log(type)
    if(lastType === type){
      this.setState({
         type:''
        })
      }else{
      this.setState({
              type
          })
      }

    GetSetStorage.getStorageAsync('ethList').then((result) => {
  //         console.log(JSON.parse(result).data)
           this.setState({
              details : JSON.parse(result).data
         })
  })
  }
  renderExpenseItem(item , i) {
  console.log('----search-----')
  console.log(item)
  const status = this.state.status;
  console.log(status)
     return (
          <ScrollViewItem key={i} detail={item} isHidden={`${item.status === this.state.status ? true : false}`}  navigator={this.props.navigation}/>
        )}
    render(){

    const { details } = this.state;
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

                </View>
                <Text style={{color:'#fff'}} onPress={() => { this.props.navigation.navigate('Home')}}> 取消</Text>
             </View>
              <View>
             <View style={styles.btnlist}>
                <TouchableHighlight style={[styles.btn,{backgroundColor:this.state.type === 1 ?'#329aff':'#fff'}]} underlayColor="#fff" onPress={()=>{
                  this.changeOpentype(1)
                  }}>
                  <Text style={[styles.btnText,{color:this.state.type === 1 ?'#fff':'#329aff'}]}>
                       发送
                  </Text>
                </TouchableHighlight>

                <TouchableHighlight style={[styles.btn,{backgroundColor:this.state.status === 0 ?'#329aff':'#fff'}]} underlayColor="#fff" onPress={()=>{
                   this.changeOpen(0)
                    }}>
                  <Text style={[styles.btnText,{color:this.state.status === 0 ?'#fff':'#329aff'}]}>
                     确认中
                   </Text>
                </TouchableHighlight>

                <TouchableHighlight style={[styles.btn,{backgroundColor:this.state.status === 1 ?'#329aff':'#fff'}]} underlayColor="#fff" onPress={()=>{
                  this.changeOpen(1)
                  }}>
                  <Text style={[styles.btnText,{color:this.state.status === 1 ?'#fff':'#329aff'}]}>
                     已完成
                   </Text>
                </TouchableHighlight>
                <TouchableHighlight style={[styles.btn,{backgroundColor:this.state.status === -1 ?'#329aff':'#fff'}]} underlayColor="#fff" onPress={()=>{
                   this.changeOpen(-1)
                  }}>
                   <Text style={[styles.btnText,{color:this.state.status === -1 ?'#fff':'#329aff'}]}>
                      失败
                   </Text>
                </TouchableHighlight>
             </View>
             <View style={styles.list}>
                <ScrollView  keyboardDismissMode={'on-drag'}>
                  {
                     details.map((item,i)=>this.renderExpenseItem(item,i))
                  }
                </ScrollView>
             </View>
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
       marginBottom:50,
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
//                 backgroundColor:'#fff',
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
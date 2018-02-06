import React,{Component} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ToastAndroid,
  View,
  Alert,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import Detail from './DetailScreen.js';

const ScrollViewItem = ({ detail ,navigator}) => {

//console.log('----传到详情页的数据-----');
//console.log(detail)

    return(
    <TouchableOpacity onPress={() => {navigator.navigate('Detail',{data :detail})}}>
      <View style={styles.list}>
       <Text  style={styles.boxshaow}>{detail.txId}{'\n'}
         <Text style={styles.orderstatus}> {detail.status == 0 ? '确认中':detail.status == 1?'已完成':'失败'}</Text>
       </Text>
      </View>
      </TouchableOpacity>
    );
}

var styles = StyleSheet.create({
 list:{
     justifyContent:'center',
     alignItems:'center',

     },
     boxshaow :{
        width:320,
        height:90,
        fontSize:12,
        marginTop:10,
        marginBottom:10,
        paddingTop:10,
        paddingLeft:20,
        paddingRight:20,
        paddingBottom:10,
        backgroundColor:'#fff',
        alignItems:'center',
        elevation: 50,
        shadowColor:'#ADADAD',
        shadowOpacity:0.4,
        shadowRadius:3,
        shadowOffset : {width:0, height:0},
      },
      orderstatus:{
                lineHeight:22,
                fontSize:13
              }

});

 export default ScrollViewItem;
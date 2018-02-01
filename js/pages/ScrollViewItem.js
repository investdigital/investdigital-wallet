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

const ScrollViewItem = ({ detail ,navigator}) => {

console.log(detail)

    return(
    <TouchableOpacity>
      <View style={styles.list}>
       <Text  style={styles.boxshaow}>{detail.txId}{'\n'}
         <Text style={styles.orderstatus}> 完成</Text>
       </Text>
      </View>
      </TouchableOpacity>
    );

}

var styles = StyleSheet.create({
 list:{
     justifyContent:'center',
     alignItems:'center'
     },
     boxshaow :{
        width:320,
        height:85,
        fontSize:12,
        marginTop:30,
        padding:10,
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
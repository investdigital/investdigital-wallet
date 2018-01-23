import React,{Component} from 'react';
import  {
    Image,
    TextInput,
    View,
    Platform,
    StyleSheet
} from 'react-native';


//export 因为要在其他类中使用
export default class SearchList extends Component{

 static navigationOptions = ({ navigation }) => ({
    title: '搜索订单',
  });
    render(){
        return (
           <View style={styles.container}>
            <View style={styles.searchBox}>
                 <Image source={require('../images/pfb_tabbar_homepage.png')} style={styles.searchIcon}/>
                 <TextInput style={styles.inputText}
                            keyboardType='web-search'
                            placeholder='搜索订单' />

                  <Image source={require('../images/pfb_tabbar_homepage.png')} style={styles.voiceIcon}/>
            </View>

            <Image source={require('../images/pfb_tabbar_homepage.png')} style={styles.scanIcon}/>

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
    logo: {//图片logo
        height: 24,
        width: 64,
        resizeMode: 'stretch'  // 设置拉伸模式
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
});
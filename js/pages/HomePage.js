import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    Image,
    ScrollView,
    TouchableOpacity,
    Platform,
    Linking,
    BackHandler,
    ToastAndroid,
    Dimensions,
    ActivityIndicator
} from 'react-native';
import Modal from 'react-native-modalbox';
import JPushModule from 'jpush-react-native';

import {PullView} from 'react-native-pull';//PullView相当于ScrollView
const receiveCustomMsgEvent = 'receivePushMsg';
import {AppSizes} from '../style';
// Service
import { Api } from '../service';

import GetSetStorage from '../utils/GetSetStorage';
import ScrollViewItem from './ScrollViewItem.js';
import AndroidBack from '../components/AndroidBack';
class HomePage extends Component{

    static navigationOptions={
        title: '首页',//设置标题内容,
        headerBackTitle:null,
        headerLeft:null,
    };
    constructor(props) {
        super(props);
        this.state = {
             isChange:true,
             money:'',
             price:1000,
             details:[],
             pushMsg:'',
             refreshing: false
        };
        this.onPullRelease = this.onPullRelease.bind(this);
        this.topIndicatorRender = this.topIndicatorRender.bind(this);
    }
    onPullRelease(resolve) {
    		//do something
    		setTimeout(() => {
                resolve();
            }, 3000);
        }
        topIndicatorRender(pulling, pullok, pullrelease) {
                const hide = {position: 'absolute', left: 10000};
                const show = {position: 'relative', left: 0};
                setTimeout(() => {
                    if (pulling) {
                        this.txtPulling && this.txtPulling.setNativeProps({style: show});
                        this.txtPullok && this.txtPullok.setNativeProps({style: hide});
                        this.txtPullrelease && this.txtPullrelease.setNativeProps({style: hide});
                    } else if (pullok) {
                        this.txtPulling && this.txtPulling.setNativeProps({style: hide});
                        this.txtPullok && this.txtPullok.setNativeProps({style: show});
                        this.txtPullrelease && this.txtPullrelease.setNativeProps({style: hide});
                    } else if (pullrelease) {
                        this.txtPulling && this.txtPulling.setNativeProps({style: hide});
                        this.txtPullok && this.txtPullok.setNativeProps({style: hide});
                        this.txtPullrelease && this.txtPullrelease.setNativeProps({style: show});
                    }
                }, 1);
        		return (
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 60}}>
                        <ActivityIndicator size="small" color="gray" />
                        <Text ref={(c) => {this.txtPulling = c;}}>下拉刷新pulling...</Text>
                        <Text ref={(c) => {this.txtPullok = c;}}>松开刷新pullok......</Text>
                        <Text ref={(c) => {this.txtPullrelease = c;}}>玩命刷新中pullrelease......</Text>
            		</View>
                );
        	}

    componentDidMount() {
    // GetSetStorage.removeStorageAsync('ethList');
       GetSetStorage.getStorageAsync('address').then((result) => {
       console.log('address---'+ result);
           const address = result;
           const type = 'eth';
                  Api.getBalance({address,type}).then(data => {
                     this.setState({
//                       money:data.data
                      money:data.data.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                     })
                   }).catch(err => {
                   })
  })
           Api.getAllPrice().then(data => {
                 this.setState({
//                 price:data.eth_usdt || ''
 //              price:data.eth_usdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                   })
                 }).catch(err => {

                  })
           GetSetStorage.getStorageAsync('ethList').then((result) => {
                     console.log('-----从本地获取的数组-----')
                       console.log(JSON.parse(result).data)
                        this.setState({
                           details : JSON.parse(result).data
                        })
            })

      }
    onClick(){
     const ischange = this.state.isChange;
          if( ischange == true){
             this.setState({ isChange: false})
          }else{
             this.setState({ isChange: true})
          }
      }
     renderExpenseItem(item , i) {
          return (
            <ScrollViewItem key={i} detail={item} navigator={this.props.navigation}/>
          )
        }
    render() {
      const { money, price, details } = this.state;
      const rmb = (parseInt(money) * price);
        return (
            <View style={styles.container}>
            <AndroidBack router1={this.props.navigation.state.routeName}/>
             <View style={styles.banner}>
                 <View style={styles.header}>
                     <Text style={styles.title}>touchwallet</Text>
                     <Text style={[styles.title,styles.search]} onPress={() => { this.props.navigation.navigate('SearchList')}}> 搜索 {'\n'}</Text>
                 </View>
                  {this.state.isChange ? <View style={[styles.left]}>
                                           <Text style={styles.title2}  onPress={this.onClick.bind(this)}>b {money ? money :'loading'}
                                              <Text style={styles.title3}> = ¥{price ? rmb :'loading'}</Text>
                                            </Text>
                                         </View>
                   : <View style={[styles.left,styles.toggle]}>
                       <Text style={styles.title2}  onPress={this.onClick.bind(this)}>¥{price ? rmb :'loading'}
                          <Text style={styles.title3}> = b {money ? money :'loading'}</Text>
                           <Text style={styles.title3}> {this.state.pushMsg}</Text>
                       </Text>
                     </View>
                            }
                     </View>
             <View style={styles.list}>
             <PullView style={{width: Dimensions.get('window').width,backgroundColor:'#fff'}} keyboardDismissMode={'on-drag'} onPullRelease={this.onPullRelease} topIndicatorRender={this.topIndicatorRender} topIndicatorHeight={160}>
             <View style={{backgroundColor:'#fff'}}>
                {
                    details.map((item,i)=>this.renderExpenseItem(item,i))
                }
              </View>
              </PullView>
             </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
banner: {
   backgroundColor: '#329AFF',
    padding: 10,
    height:140,
  },
  header:{
  width:AppSizes.widthThreeQuarters,
   flexDirection: 'row',
   justifyContent:'space-between',
    marginLeft:20,
    marginTop:20,
    marginRight:20
  },
  left:{
     marginLeft:20,
  },
  title: {
    fontSize: 20,
    fontWeight: '400',
    color: '#fff',
  },
  title2: {
      fontSize: 20,
      fontWeight: '400',
      color: '#fff',
    },
  search :{
    color:'#fff',
    position:'relative',
    left:-50
  },
  title1:{
        fontSize: 11,
        fontWeight: '200',
         color: 'black',
        marginTop:8,
  },
  title3:{
      fontSize: 14,
      fontWeight: '400',
      color: '#fff',
      marginTop:8,
  },
    container:{
        flex: 1,
        backgroundColor:'#fff',
    },
    list:{
          justifyContent:'center',
          alignItems:'center'
    },
    icon: {
        height: 22,
        width: 22,
        resizeMode: 'contain'
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
export default HomePage;
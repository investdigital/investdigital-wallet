import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    Image,
    ScrollView,
    TouchableOpacity,
    Linking
} from 'react-native';
import Modal from 'react-native-modalbox';
import {AppSizes} from '../style';

// Service
import { Api } from '../service';

import GetSetStorage from '../utils/GetSetStorage';
import ScrollViewItem from './ScrollViewItem.js';

//const ScrollViewItem = ({ detail ,navigator}) => {
//
//console.log(detail)
//
//    return(
//    <TouchableOpacity >
//      <View style={styles.list} onPress={() => { this.props.navigation.navigate( 'Detail')}}>
//       <Text  style={styles.boxshaow}>{detail.txId}{'\n'}
//         <Text style={styles.orderstatus}> 完成</Text>
//       </Text>
//      </View>
//      </TouchableOpacity>
//    );
//
//}



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
             details:[]
            };
    }

    renderExpenseItem(item , i) {
        return <ScrollViewItem key={i} detail={item} onPress={() => { this.props.navigation.navigate('Detail',{data:item})}}/>;
      }

     componentDidMount() {
       GetSetStorage.getStorageAsync('address').then((result) => {
       console.log('address---'+ result)
           const address = result;
           const type = 'eth'
                  Api.getBalance({address,type}).then(data => {
                   console.log(data);
                     this.setState({
                       money:data.data
//                      money:data.data.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                     })
                   }).catch(err => {
                     console.log(err);
                   })
  })
//           Api.getAllPrice().then(data => {
//                 console.log(data);
//                 console.log(data.eth_usdt);
//                 this.setState({
//                 price:data.eth_usdt
// //              price:data.eth_usdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
//                   })
//                 }).catch(err => {
//                    console.log(err);
//                  })
           GetSetStorage.getStorageAsync('ethList').then((result) => {
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
openSocial(url) {
    Linking.openURL(url).catch(error => console.warn('An error occurred: ', error))
  }
    render() {

     const { money, price, details } = this.state;
      const rmb = (money * price)
      console.log(price)

        return (
            <View style={styles.container}>
             <View style={styles.banner}>
                 <View style={styles.header}>
                     <Text style={styles.title} onPress={() => { this.openSocial('https://weibo.com/nocower')}}>bread
                        <Text style={[styles.title,styles.search]} onPress={() => { this.props.navigation.navigate('SearchList')}}> 搜索 {'\n'}</Text>
                     </Text>
                 </View>
                  {this.state.isChange ? <View style={[styles.header,styles.toggle]}>
                                           <Text style={styles.title2}  onPress={this.onClick.bind(this)}>b {money ? money :'loading'}
                                              <Text style={styles.title3}> = ¥{price ? rmb :'loading'}</Text>
                                            </Text>
                                         </View>
                   : <View style={[styles.header,styles.toggle]}>
                       <Text style={styles.title2}  onPress={this.onClick.bind(this)}>¥{price ? rmb :'loading'}
                          <Text style={styles.title3}> = b {money ? money :'loading'}</Text>
                       </Text>
                     </View>
                            }
                     </View>
             <View style={styles.list}>
             <ScrollView style={{backgroundColor:'#fff'}} keyboardDismissMode={'on-drag'}>
                {
                    details.map((item,i)=>this.renderExpenseItem(item,i))
                }
              </ScrollView>
             </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
banner: {
   backgroundColor: '#329AFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    height:140,
  },
  header:{
    marginLeft:20,
  },
  toggle:{
     flex:1,
     top:30,
     left:-120
  },
  title: {
    fontSize: 20,
    fontWeight: '400',
    color: '#fff',
    position:'relative',
    top:-10
  },
  title2: {
      fontSize: 20,
      fontWeight: '400',
      color: '#fff',
    },
  search :{
    flex:1,
    color:'red',
    justifyContent:'space-around'
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
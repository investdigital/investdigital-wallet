import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    Image,
    ScrollView
} from 'react-native';
import Modal from 'react-native-modalbox';
import {AppSizes} from '../style';

// Service
import { Api } from '../service';

import GetSetStorage from '../utils/GetSetStorage';

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
             price:'',
            };
    }
    componentWillMount(){


    }
     componentDidMount() {

         const address = '0x0127eb89fF5bdD96af11b7e4e01cda03F22b28e1';
          const type = 'eth'
        Api.getBalance({address,type}).then(data => {
        console.log(data.data);
          this.setState({
            money:data.data
//             money:data.data.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          })
        }).catch(err => {
          console.log(err);
        })

           Api.getAllPrice().then(data => {
                       console.log(data);
//                       this.state.price = data.eth_usdt
                          this.setState({
                          price:data.eth_usdt
        //                    price:data.eth_usdt.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                          })
                    }).catch(err => {
                       console.log(err);
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

    render() {

     const { money, price } = this.state;


      const rmb = (money * price).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') ;
      console.log(price)

        return (
            <View style={styles.container}>
             <View style={styles.banner}>
                 <View style={styles.header}>
                     <Text style={styles.title} >bread

                        <Text style={[styles.title,styles.search]} onPress={() => { this.props.navigation.navigate('SearchList')}}> 搜索 {'\n'}</Text>
                     </Text>

                 </View>
                  {this.state.isChange ? <View style={[styles.header,styles.toggle]}>
                                           <Text style={styles.title2}  onPress={this.onClick.bind(this)}>b{money}
                                              <Text style={styles.title3}> = ¥{rmb}</Text>
                                            </Text>
                                         </View>
                   : <View style={[styles.header,styles.toggle]}>
                       <Text style={styles.title2}  onPress={this.onClick.bind(this)}>¥{rmb}
                          <Text style={styles.title3}> = b{money}</Text>
                       </Text>
                     </View>
                            }
                     </View>
             <View style={styles.list}>
             <ScrollView style={{backgroundColor:'#fff'}}>
                  <Text onPress={() => { this.props.navigation.navigate('Detail',{user:'fengxiali',address:'Xv7serw31fikjhjberwov3nb28vz62'})}}  style={styles.boxshaow}>0x0127eb89fF5bdD96af11b7e4e01cda03F22b28e1{'\n'}
                     <Text style={styles.orderstatus}> 完成</Text>
                  </Text>
                  <Text onPress={() => { this.props.navigation.navigate('Detail',{user:'fengxiali',address:'Xv7serw31fikjhjberwov3nb28vz62'})}} style={styles.boxshaow}>0x0127eb89fF5bdD96af11b7e4e01cda03F22b28e1{'\n'}
                    <Text style={styles.orderstatus}> 未完成</Text>
                  </Text>
                  <Text onPress={() => { this.props.navigation.navigate('Detail',{user:'fengxiali',address:'Xv7serw31fikjhjberwov3nb28vz62'})}}  style={styles.boxshaow}>0x0127eb89fF5bdD96af11b7e4e01cda03F22b28e1{'\n'}
                     <Text style={styles.orderstatus}> 完成</Text>
                  </Text>

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
       height:60,
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
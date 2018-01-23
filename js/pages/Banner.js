/* @flow */

import React,{Component} from 'react';

import { Image, Button, Platform, StyleSheet, Text, View } from 'react-native';

class Banner extends Component{

constructor(props) {
    super(props);
    this.state = {
       isChange:true
    };
  }
   static navigationOptions = {
      title: 'Banner',
    };
  onClick(){
    this.setState({ isChange: false})
  }
   render(){
//      const { navigate } = this.props.navigation;
    return(
         <View style={styles.banner}>
            <View style={styles.header}>
                <Text style={styles.title}  onPress={() => this.props.navigation.navigate('SearchList')}>bread
                     <Text style={styles.title1}> (Testnet){'\n'}</Text>
                </Text>
            </View>

             {this.state.isChange ? <View style={styles.header,styles.toggle}>
                                         <Text style={styles.title}  onPress={this.onClick.bind(this)}>b2,000
                                           <Text style={styles.title2}> = ¥142.71</Text>
                                         </Text>
                                       </View>
                 : <View style={styles.header,styles.toggle}>
                      <Text style={styles.title}  onPress={this.onClick.bind(this)}>¥142.71
                        <Text style={styles.title2}> = b2,000</Text>
                      </Text>
                   </View>
               }
        </View>
     )}

}


export default Banner;

const styles = StyleSheet.create({
  bannerContainer: {
    backgroundColor: '#329AFF',

  },
  banner: {
   backgroundColor: '#329AFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    height:130,
  },
  header:{
    marginLeft:20,

  },
  toggle:{
     flex:1,
     top:30,
     left:-100

  },
  title: {
    fontSize: 20,
    fontWeight: '400',
    color: '#fff',
    marginTop:8,
  },
  title1:{
        fontSize: 11,
        fontWeight: '200',
         color: 'black',
        marginTop:8,
  },
  title2:{
      fontSize: 14,
      fontWeight: '400',
      color: '#fff',
      marginTop:8,
  },
});

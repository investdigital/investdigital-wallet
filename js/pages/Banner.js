/* @flow */

import React,{Component} from 'react';

import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';

class Banner extends Component{
constructor(props) {
    super(props);

    this.state = {

    };
  }

  onClick(){
    alert('2222')
  }
   render(){
    return(
        <SafeAreaView
            style={styles.bannerContainer}
            forceInset={{ vertical: 'never' }}
          >
            <View style={styles.banner}>
              <Text style={styles.title}>bread
                <Text style={styles.title1}> (Testnet)</Text>
                  <Text style={styles.title}  onPress={this.onClick.bind(this)}> {'\r\n'}{'\r\n'}b2,000
                    <Text style={styles.title2}> = ¥142.71</Text>
                  </Text>

              </Text>

            </View>
          </SafeAreaView>
     )}

}


export default Banner;

const styles = StyleSheet.create({
  bannerContainer: {
    backgroundColor: '#329AFF',
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    height:130
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

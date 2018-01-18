/* @flow */

import React,{Component} from 'react';

import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
//import ModalDropdown from 'react-native-modal-dropdown';
import ModalDropdown from './ModalDropdown';




class Banner extends Component{
constructor(props) {
    super(props);

    this.state = {
      dropdown_4_options: null,
      dropdown_4_defaultValue: 'loading...',
      dropdown_6_icon_heart: true,
    };
  }
   render(){

   const DEMO_OPTIONS_1 = ['option 1', 'option 2', 'option 3', 'option 4', 'option 5', 'option 6', 'option 7', 'option 8', 'option 9'];

       return(
        <SafeAreaView
            style={styles.bannerContainer}
            forceInset={{ vertical: 'never' }}
          >
            <View style={styles.banner}>
              <Text style={styles.title}>bread
                <Text style={styles.title1}> (Testnet)</Text>
                  <Text style={styles.title}> {'\r\n'}{'\r\n'}b2,000</Text>
                   <Text style={styles.title2}>= ¥142.71</Text>
              </Text>
             <View style={styles.cell}>
                         <ModalDropdown style={styles.dropdown_6}
                                        options={DEMO_OPTIONS_1}
                                        onSelect={(idx, value) => this._dropdown_6_onSelect(idx, value)}>
                         </ModalDropdown>
                       </View>

            </View>
          </SafeAreaView>
     )}

}


export default Banner;

const styles = StyleSheet.create({
  bannerContainer: {
    backgroundColor: '#EA668F',
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    height:130
  },
  title: {
    fontSize: 18,
    fontWeight: '200',
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
      fontSize: 12,
      fontWeight: '200',
      color: '#fff',
      marginTop:8,
  },
  cell: {
//      flex: 1,
       borderWidth: StyleSheet.hairlineWidth,
       top:30,
       right: -78,
       height:26,
       padding:5,
    },
    dropdown_6: {
        flex: 1,
      },
});

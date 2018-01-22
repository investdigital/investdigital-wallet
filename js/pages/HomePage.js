import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    Image,
    ScrollView
} from 'react-native';
import Modal from 'react-native-modalbox';
import Banner from './Banner';
import {AppSizes} from '../style';
class HomePage extends React.Component{

    static navigationOptions={
        title: '首页',//设置标题内容
    };
    constructor(props) {
        super(props);
         this.state = {
              isOpen: false,
              isDisabled: false,
              swipeToClose: true,

            };
    }
     onClose() {
        console.log('Modal just closed');
      }

      onOpen() {
        console.log('Modal just openned');
      }

      onClosingState(state) {
        console.log('the open/close of the swipeToClose just changed');
      }
    render() {
        const {navigate} = this.props.navigation;
        console.log("------------");
//        var BContent = <Button onPress={() => this.setState({isOpen: false})} style={[styles.btn, styles.btnModal]}  title="X"/>;
        return (
            <View style={styles.container}>
              <Banner />
             <View style={styles.list}>
             <ScrollView>
              <Text onPress={() => { this.props.navigation.navigate('Detail',{user:'fengxiali',address:'Xv7serw31fikjhjberwov3nb28vz62'})}}  style={styles.boxshaow}>111111111111111111111111111111111111111111111111</Text>
              <Text onPress={() => { this.props.navigation.navigate('Detail',{user:'fengxiali',address:'Xv7serw31fikjhjberwov3nb28vz62'})}} style={styles.boxshaow}>2222222222222222222222222222222222222222222222222</Text>
              <Text onPress={() => { this.props.navigation.navigate('Detail',{user:'fengxiali',address:'Xv7serw31fikjhjberwov3nb28vz62'})}}  style={styles.boxshaow}>111111111111111111111111111111111111111111111111</Text>
              <Text onPress={() => { this.props.navigation.navigate('Detail',{user:'fengxiali',address:'Xv7serw31fikjhjberwov3nb28vz62'})}} style={styles.boxshaow}>2222222222222222222222222222222222222222222222222</Text>
              <Text onPress={() => { this.props.navigation.navigate('Detail',{user:'fengxiali',address:'Xv7serw31fikjhjberwov3nb28vz62'})}}  style={styles.boxshaow}>111111111111111111111111111111111111111111111111</Text>
              <Text onPress={() => { this.props.navigation.navigate('Detail',{user:'fengxiali',address:'Xv7serw31fikjhjberwov3nb28vz62'})}} style={styles.boxshaow}>2222222222222222222222222222222222222222222222222</Text>
              </ScrollView>
             </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
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
     modal: {
        height:350,
        width:AppSizes.widthHalf,
        justifyContent: 'center',
        alignItems: 'center'
      },
      btn: {
          margin: 10,
          backgroundColor: "#3B5998",
          color: "white",
          padding: 10
        },

        btnModal: {
          position: "absolute",
          top: 0,
          right: 0,
          width: 50,
          height: 50,
          backgroundColor: "transparent"
        },
        text: {
          color: "black",
          fontSize: 22
        },
        boxshaow :{
           width:250,
           height:60,
           marginTop:20,
           alignItems:'center',
//           shadowColor:'black',
//           shadowOpacity:0.2,
//           shadowRadius:1,
           borderWidth:1,
           borderColor:"#dddddd"
        },
//        shadowOffset :{width: 10, height: 10},

});
export default HomePage;
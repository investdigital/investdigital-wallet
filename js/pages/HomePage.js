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
import Banner from './Banner';
import {AppSizes} from '../style';

class HomePage extends Component{

    static navigationOptions={
        title: '首页',//设置标题内容,
        headerBackTitle:null,
        headerLeft:null,
    };
    constructor(props) {
        super(props);
         this.state = {

            };
    }
    render() {
        return (
            <View style={styles.container}>
              <Banner />
             <View style={styles.list}>
             <ScrollView>
              <Text onPress={() => { this.props.navigation.navigate('SearchList',{user:'fengxiali',address:'Xv7serw31fikjhjberwov3nb28vz62'})}}  style={styles.boxshaow}>111111111111111111111111111111111111111111111111</Text>
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
        boxshaow :{
           width:280,
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
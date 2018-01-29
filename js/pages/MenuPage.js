import React,{Component} from 'react';
import {
    Button,
    Image,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SectionList,
    ListItem,
    AsyncStorage,
    Touchable,
    ScrollView
} from 'react-native';
import EditView from '../components/EditView';
import GetSetStorage from '../utils/GetSetStorage';
import Toast, {DURATION} from 'react-native-easy-toast'
// Styles
import {AppSizes, AppComponent} from '../style/index';
class MenuPage extends Component{
    static navigationOptions = {
        title:'菜单',
        drawerLabel: '菜单',
        drawerIcon: ({ tintColor }) => (
            <Image
                source={require('../images/pfb_tabbar_homepage.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
        headerBackTitle:null,
        headerLeft:null,
    };
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            password:''
        };
    }
    componentWillMount() {
        GetSetStorage.getStorageAsync('password').then((result)=>{this.setState({password:result})});
    }
    render(){
        return(
            <View style={{backgroundColor:'#fff',flex:1}}>
                <ScrollView style={styles.mainStyle}>
                    {this.renderItem()}
                </ScrollView>
                <EditView
                    // 在组件中使用this.editView即可访拿到EditView组件
                    ref="editView"
                    inputText={this.state.name}
                    titleTxt={'请输入密码'}
                    ensureCallback={(name) => {this.setState({name:''});  console.log(name,this.state.password);if(name == this.state.password ){
                        this.props.navigation.navigate('Keystore',{data:name});
                    }else{this.refs.toast.show('密码错误');}}}
                />
                <Toast position='top' ref="toast"/>
            </View>
        );
    }
    renderItem() {
        const {navigate} = this.props.navigation;
        // 数组
        var itemAry = [];
        var action = ['导出Keystore'];
        // 遍历
        for (var i = 0; i<action.length; i++) {
            itemAry.push(
                <View key={i} style={[styles.itemStyle]}>
                    {/*<Text onPress={() => navigate('Keystore',{data:'Keystore'})}>{action[i]}</Text>*/}
                    <TouchableOpacity onPress={()=>this.refs.editView.show()}>
                        <View style={styles.text}>
                            <Text>导出keystore</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }
        return itemAry;
    }
}
const styles = StyleSheet.create({
    mainStyle:{
        width:AppSizes.screen.width,
        height:AppSizes.screen.height,
        backgroundColor:"#F5F5F5"
    },
    itemStyle: {
        // 尺寸
        paddingLeft:20,
        paddingRight:20,
        height:40,
        backgroundColor:"white",
        borderBottomWidth:1,
        borderColor:'#DCDCDC',
        borderStyle:'solid',
    },
    text:{
        height:40,
        justifyContent:'center',

    }
});
export default MenuPage;

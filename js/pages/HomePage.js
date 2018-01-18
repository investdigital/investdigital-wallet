import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    Image
} from 'react-native';
class HomePage extends React.Component{

    static navigationOptions={
        title: '首页',//设置标题内容
    };
    constructor(props) {
        super(props);
    }
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text style={{padding:10}}>Hello, Navigation!</Text>
                <Button
                    onPress={() => navigate('Detail',{user:'Sybil'})}
                    title="详情"/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#fff'
    },
    icon: {
        height: 22,
        width: 22,
        resizeMode: 'contain'
    }
});
export default HomePage;
import React from 'react';
import {
    Button,
    Image,
    View,
    Text
} from 'react-native';

class DetailScreen extends React.Component {
    static navigationOptions = {
        title:'详情',
    };

    render() {
        const {params} = this.props.navigation.state;
        return (
            <View style={{backgroundColor:'#fff',flex:1}}>
                <Text style={{padding:20}}>with {params.user}</Text>
            </View>

        );
    }
}
export default DetailScreen;
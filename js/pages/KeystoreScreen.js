import React from 'react';
import {
    Button,
    Image,
    View,
    Text
} from 'react-native';

class KeystoreScreen extends React.Component {
    static navigationOptions = {
        title:'导出Keystore',
    };

    render() {
        const {params} = this.props.navigation.state;
        return (
            <View style={{backgroundColor:'#fff',flex:1}}>
                <Text style={{padding:20}}>导出 {params.data}</Text>

            </View>

        );
    }
}
export default KeystoreScreen;
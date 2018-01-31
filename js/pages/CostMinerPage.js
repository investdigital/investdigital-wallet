import React,{Component} from 'react';
import {
    Button,
    Image,
    View,
    Text,
    StyleSheet,
    Clipboard,
    AlertIOS,
    TouchableHighlight
} from 'react-native';
import {AppSizes} from '../style/index';
class CostMinerPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            position: 'top',
            isHiden:true
        }
    }
    static navigationOptions = {
        title:'矿工费用说明',

    };

    render() {
        const {params} = this.props.navigation.state;
        return (
            <View style={styles.container}>
                <View style={{padding:20}}>
                    <Text style={{paddingBottom:20}}>
                        在一个公有链上, 任何人都可以读写数据。读取数据是免费的, 但是向公有链中写数据时需要花费一定费用的, 这种开销有助于阻止垃圾内容, 并通过支付保护其安全性。 网络上的任何节点(每个包含账本拷贝的连接设备被称作节点) 都可以参与称作挖矿的方式来保护网络。由于挖矿需要计算能力和电费, 所以矿工们的服务需要得到一定的报酬, 这也是矿工费的由来。
                    </Text>
                    <Text style={{paddingBottom:20}}>
                        矿工会优先打包 gas 合理，gas price 高的交易。如果用户交易时所支付的矿工费非常低, 那么这笔交易可能不会被矿工打包, 从而造成交易失败。
                    </Text>
                    <Text style={{paddingBottom:20}}>
                        touchwallet 的交易费用 (也是以太坊的交易费用) = gas 数量 * gas price (gas 单价, 以太币计价)
                    </Text>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: AppSizes.width,
        backgroundColor:'#fff',
        flex:1,
        alignItems:'center'
    },

});
export default CostMinerPage;
/**
 *
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Animated,
    Easing,
    Platform,
    TextInput,
    Image,
    Modal,
    Dimensions
} from 'react-native';
import {AppSizes, AppComponent} from '../style/index';
export default class EditView extends Component {
    constructor(props) {
        super(props);
        this.show = this.show.bind(this);
        this._close = this._close.bind(this);
        this.state = {
            isShow: false,
            inputText: '',
            opacityAnimationValue: new Animated.Value(0),
            scaleAnimationValue: new Animated.Value(0)
        }
    }
    // 打开对话框
    show() {
        this.setState({
            isShow: true,
            inputText: this.props.inputText
        });

        //Animated.parallel == 同时执行多个动画
        Animated.parallel([
            //Animated.timing == 推动一个值按照一个过渡曲线而随时间变化
            Animated.timing(this.state.opacityAnimationValue, {
                toValue: 1,
                duration: 200,
                easing:Easing.linear
            }),
            //Animated.spring == 产生一个基于Rebound和Origami实现的Spring动画。它会在toValue值更新的同时跟踪当前的速度状态，以确保动画连贯,比timing动画连贯流畅
            Animated.spring(this.state.scaleAnimationValue, {
                toValue: 1,
                duration: 200,
                friction: 5
            })
        ]).start();
    }
    // 关闭对话框
    _close() {
        this.setState({isShow: false});
        this.state.opacityAnimationValue.setValue(0);
        this.state.scaleAnimationValue.setValue(0);
    }
    render() {
        if (!this.state.isShow) return null;
        const {ensureCallback,titleTxt} = this.props;
        return (
            <Modal transparent onRequestClose={()=> this._close}>
            {/*// 最外层是一个半透明的黑色蒙版背景,点击的时候对话框也会消失*/}
            <Animated.View style={[styles.container, {opacity: this.state.opacityAnimationValue}]}>
                <TouchableOpacity
                    activeOpacity={1}
                    style={{flex: 1, alignItems: 'center', paddingTop: 100}}
                    onPress={this._close}
                >
                    <Animated.View
                        style={[styles.contentContainer, {transform: [{scale: this.state.scaleAnimationValue}]}]}
                    >
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.promptContainer}
                        >
                            <Text style={{fontSize: 15, color: 'black',marginTop:30}}>{titleTxt}</Text>
                            <View style={{flexDirection: 'row', margin: 15}}>
                                <View style={[styles.center, {width: 230}]}>
                                    <TextInput
                                        style={{fontSize: 16, color: '#999',padding:0,height:40,width: 230}}
                                        value={this.state.inputText}
                                        autoFocus={true}
                                        password="true"
                                        keyboardType='numeric'
                                        underlineColorAndroid="transparent"
                                        onChangeText={text => this.setState({inputText:text})}
                                        clearButtonMode='while-editing'
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                activeOpacity={0.75}
                                style={[styles.center, {flex: 4.5}]}
                                onPress={this._close}
                            >
                                <Text style={{fontSize: 16, color: 'black'}}>取消</Text>
                            </TouchableOpacity>
                            <View style={[styles.line]}/>
                            <TouchableOpacity
                                activeOpacity={0.75}
                                style={[styles.center, {flex: 4.5}]}
                                onPress={() => {
                                    this._close();
                                    // 子组件传递数据到父组件
                                    ensureCallback(this.state.inputText);
                                }}
                            >
                                <Text style={{fontSize: 16, color: 'black'}}>确定</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </TouchableOpacity>
            </Animated.View>
            </Modal>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        backgroundColor: 'rgba(1, 1, 1, 0.5)',
        height:AppSizes.screen.height,
        width:AppSizes.screen.width,
    },
    contentContainer: {
        top:50,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#d9d9d9',
        borderWidth: 1,
        height: 150,
        width: AppSizes.screen.widthThreeQuarters,
        backgroundColor: 'rgb(234, 234, 235)',
        borderRadius: 5,
    },
    promptContainer: {
        height: 100,
        width: AppSizes.screen.widthThreeQuarters,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        height: 50,
        width: AppSizes.screen.widthThreeQuarters,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderColor: '#d9d9d9'
    },
    line: {
        height: 46,
        width: 1,
        backgroundColor: '#d9d9d9'
    },
    center: {
        height:50,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
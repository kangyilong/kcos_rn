import * as React from 'react';
import {
    View,
    Text,
    Alert
} from "react-native";
import PasswordGesture from 'react-native-gesture-password';

export default class GesturesPassword extends React.PureComponent {
    state = {
        status: 'normal',
        message: '',
        password: '1234'
    };
    _startGesture = () => {
        this.setState({
            status: 'normal',
            message: 'Password is right, success.'
        })
    };
    _endGesture = (password) => {
        Alert.alert(password);
        if(password === this.state.password) {
            Alert.alert('验证成功');
            this.setState({
                status: 'right',
                message: 'ok'
            })
        }else {
            Alert.alert('失败');
            this.setState({
                status: 'wrong',
                message: 'error'
            })
        }
    };
    render() {
        const {status, message} = this.state;
        return (
            <PasswordGesture
                ref='pg'
                style={{
                    backgroundColor: '#f5f5f5'
                }}
                status={status}
                message={message}
                onStart={this._startGesture}
                onEnd={this._endGesture}
            />
        )
    }
}
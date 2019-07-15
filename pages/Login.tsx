import * as React from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    TextInput
} from 'react-native';
import ToastMsg from '../components/toastMsg/ToastMsg';
import NavigatorUtil from '../methods/NavigatorUtil';
import {setUserId, setUserMsg} from '../methods/util';
import {GET_USER_MSG} from '../methods/sqlStatements';
import Fetch from "../methods/Fetch";

interface Props {
    navigation: {
        navigate: Function
    }
}

export default class Login extends React.Component<Props, any> {
    state = {
        toastMsg: '登录成功',
        isShow: false,
        user_nick_name: '',
        user_paw: ''
    };
    toastFn = (tit) => {
        this.setState({
            isShow: true,
            toastMsg: tit
        });
        setTimeout(() => {
            this.setState({
                isShow: false
            });
        }, 1500);
    };
    loginSubmit = () => {
        const {toastMsg, isShow, user_nick_name, user_paw} = this.state;
        if(!user_nick_name || !user_paw) {
            this.toastFn('请填写完整');
            return false;
        }
        Fetch({
            statements: GET_USER_MSG,
            parameter: JSON.stringify([user_nick_name, user_paw])
        }).then(data => {
            if(data.length === 0) {
                this.toastFn('密码或用户名错误');
                return false;
            }
            setUserMsg(data[0]);
            setUserId(data[0].user_id);
            NavigatorUtil.goPage('HomePage');
        });
    };
    render () {
        const {toastMsg, isShow, user_nick_name, user_paw} = this.state;
        return(
            <View style={styles.Page}>
                <View style={styles.header}>
                    <View style={styles.lName}>
                        <Text style={styles.loginName}>KCOS_LV</Text>
                    </View>
                    <View>
                        <Text style={styles.loginTit}>WELCOME TO LOGIN</Text>
                    </View>
                </View>
                <View style={styles.loginForm}>
                    <View style={styles.nick_box}>
                        <Text style={styles.label_txt}>用户名：</Text>
                        <TextInput
                            placeholder="请输入登录名"
                            style={styles.login_iup}
                            value={user_nick_name}
                            autoCapitalize='none'
                            onChangeText={(v) => {
                                this.setState({
                                    user_nick_name: v
                                })
                            }}
                        />
                    </View>
                    <View style={styles.paw_box}>
                        <Text style={styles.label_txt}>密码：</Text>
                        <TextInput
                            placeholder="请输入密码"
                            secureTextEntry={true}
                            style={styles.login_iup}
                            autoCapitalize='none'
                            value={user_paw}
                            onChangeText={(v) => {
                                this.setState({
                                    user_paw: v
                                })
                            }}
                        />
                    </View>
                </View>
                <Button
                    title={'登 录'}
                    onPress={this.loginSubmit}
                />
                <ToastMsg toastMsg={toastMsg} isShow={isShow}/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    Page: {
        flex: 1
    },
    header: {
        marginBottom: 10,
        marginTop: 120
    },
    lName: {
        marginBottom: 20
    },
    loginName: {
        fontSize: 24,
        color: '#091E42',
        textAlign: 'center',
        fontWeight: '600'
    },
    loginTit: {
        fontSize: 20,
        color: '#091E42',
        textAlign: 'center',
        fontWeight: '600'
    },
    loginForm: {
        marginTop: 40,
        marginBottom: 50,
        paddingLeft: 50
    },
    nick_box: {
        marginBottom: 25,
        flexDirection: 'row'
    },
    paw_box: {
        flexDirection: 'row'
    },
    label_txt: {
        width: 80,
        textAlign: 'right',
        marginRight: 5,
        fontSize: 17
    },
    login_iup: {
        fontSize: 16
    }
});
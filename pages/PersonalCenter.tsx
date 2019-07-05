import React, {Component} from 'react';
import { withNavigationFocus } from 'react-navigation';
import VislidationLogin from '../components/HOCComponent/ValidationLogin';
import {
    View,
    Text,
    Button,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import NavigatorUtil from '../methods/NavigatorUtil';
import {delUserId, getUserId} from '../methods/util';
import {actionTintColor, actionUserId} from '../redux/action';
import PersonalHeader from './PersonalComponent/PersonalHeader';
import PersonalContainer from './PersonalComponent/PersonalContainer';

interface Props {
    navigation: {
        navigate: Function
    },
    isFocused: boolean,
    actionTintColorFn: Function,
    actionUserIdFn: Function,
    tintColor: string
}

function mapStateToProps(state) {
    return {
        tintColor: state.changeTintColor,
        userId: state.saveUserId
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actionTintColorFn(color) {
            dispatch(actionTintColor(color));
        },
        actionUserIdFn(userId) {
            dispatch(actionUserId(userId));
        }
    }
}

class PersonalCenter extends Component<Props, any> {
    async componentDidMount() {
        const userId = await getUserId();
        this.props.actionUserIdFn(userId);
    }
    render () {
        const { tintColor } = this.props;
        return(
            <View style={styles.Page}>
                <PersonalHeader tintColor={tintColor} />
                <View style={styles.hr20}></View>
                <PersonalContainer />
                <View>
                    <Button
                        title={'设置主题颜色（红色）'}
                        onPress={() => {
                            this.props.actionTintColorFn('red');
                        }}
                    />
                    <Button
                        title={'注销登录'}
                        onPress={() => {
                            delUserId();
                            NavigatorUtil.goPage('HomePage')
                        }}
                    />
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    Page: {
        flex: 1,
        backgroundColor: '#fff'
    },
    hr20: {
        height: 20,
        backgroundColor: '#F4F5F7'
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(VislidationLogin(withNavigationFocus<any>(PersonalCenter)));

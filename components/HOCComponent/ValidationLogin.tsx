import React, {PureComponent} from 'react';
import {isLogin} from '../../methods/util';

interface Props {
    navigation: any
}
export default function VislidationLogin(Wc) {
    return class extends PureComponent<Props, any>{
        state = {
            isLogin: false
        };
        async componentDidMount() {
            const booLogin = await isLogin();
            if(booLogin) {
                this.setState({
                    isLogin: booLogin
                });
            } else {
                this.props.navigation.navigate('Login');
            }
        }
        render() {
            if(this.state.isLogin) {
                return <Wc {...this.props} />
            }
            return null;
        }
    }
}
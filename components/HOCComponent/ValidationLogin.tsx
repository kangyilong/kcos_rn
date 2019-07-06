import * as React from 'react';
import {isLogin} from '../../methods/util';

interface Props {
    navigation: any
}
export default function VislidationLogin(Wc) {
    return class extends React.PureComponent<Props, any>{
        private _navListener: any;
        state = {
            isLogin: false
        };
        componentDidMount() {
            this._navListener = this.props.navigation.addListener('didFocus', async () => {
                const booLogin = await isLogin();
                if(booLogin) {
                    this.setState({
                        isLogin: booLogin
                    });
                } else {
                    this.props.navigation.navigate('Login');
                }
            });
        }
        componentWillUnmount() {
            this._navListener.remove();
        }
        render() {
            if(this.state.isLogin) {
                return <Wc {...this.props} />
            }
            return null;
        }
    }
}
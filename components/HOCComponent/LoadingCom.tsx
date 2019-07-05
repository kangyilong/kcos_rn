import React, {PureComponent} from 'react';
import {
    View
} from 'react-native';
import Loading from '../loading/Loading';

interface Props {
    isLoadOk: boolean
}
export default function LoadingCom (WC) {
    return class extends PureComponent<Props, any> {
        render() {
            const { isLoadOk } = this.props;
            if(!isLoadOk) {
                return (<Loading />)
            }else {
                return (<WC {...this.props} />)
            }
        }
    }
}
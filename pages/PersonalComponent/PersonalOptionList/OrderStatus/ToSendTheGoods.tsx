/*
* 待发货
* */
import * as React from 'react';
import {
    View,
    Text
} from 'react-native';
import OrderStatusComponent from './OrderStatusComponent/Index';
import {OWNERORDER_DFH} from '../../../../methods/sqlStatements';

export default class ToSendTheGoods extends React.PureComponent {
    render() {
        return (
            <OrderStatusComponent QUERY_SQL={OWNERORDER_DFH} tigText={'暂无待发货订单'}/>
        )
    }
}
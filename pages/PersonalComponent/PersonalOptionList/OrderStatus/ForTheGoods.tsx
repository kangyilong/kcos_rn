/*
* 待收货
* */
import * as React from 'react';
import {
    View,
    Text
} from 'react-native';
import OrderStatusComponent from './OrderStatusComponent/Index';
import {OWNERORDER_DSH} from '../../../../methods/sqlStatements';

export default class ForTheGoods extends React.PureComponent {
    render() {
        return (
            <OrderStatusComponent QUERY_SQL={OWNERORDER_DSH} tigText={'暂无待收货订单'}/>
        )
    }
}
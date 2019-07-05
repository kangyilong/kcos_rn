/*
* 待收货
* */
import React, {PureComponent} from 'react';
import {
    View,
    Text
} from 'react-native';
import OrderStatusComponent from './OrderStatusComponent/Index';
import {OWNERORDER_DSH} from '../../../../methods/sqlStatements';

export default class ForTheGoods extends PureComponent {
    render() {
        return (
            <OrderStatusComponent QUERY_SQL={OWNERORDER_DSH} tigText={'暂无待收货订单'}/>
        )
    }
}
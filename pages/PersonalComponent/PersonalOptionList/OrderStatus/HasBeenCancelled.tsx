/*
* 已取消
* */
import * as React from 'react';
import {
    View,
    Text
} from 'react-native';
import OrderStatusComponent from './OrderStatusComponent/Index';
import {OWNERORDER_YQX} from '../../../../methods/sqlStatements';

export default class HasBeenCancelled extends React.PureComponent {
    render() {
        return (
            <OrderStatusComponent QUERY_SQL={OWNERORDER_YQX} tigText={'暂无已取消订单'}/>
        )
    }
}
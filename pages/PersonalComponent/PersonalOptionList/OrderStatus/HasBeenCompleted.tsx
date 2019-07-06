/*
* 已完成
* */
import * as React from 'react';
import {
    View,
    Text
} from 'react-native';
import OrderStatusComponent from './OrderStatusComponent/Index';
import {OWNERORDER_YWC} from '../../../../methods/sqlStatements';

export default class HasBeenCompleted extends React.PureComponent {
    render() {
        return (
            <OrderStatusComponent QUERY_SQL={OWNERORDER_YWC} tigText={'暂无已完成订单'}/>
        )
    }
}
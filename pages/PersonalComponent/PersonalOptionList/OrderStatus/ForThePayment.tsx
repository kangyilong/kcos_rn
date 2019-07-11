/*
* 待付款
* */
import * as React from 'react';
import {
    View,
    Text
} from 'react-native';
import OrderStatusComponent from './OrderStatusComponent/Index';
import {OWNERORDER_ALL} from '../../../../methods/sqlStatements';

export default class ForThePayment extends React.PureComponent {
    render() {
        return (
            <OrderStatusComponent QUERY_SQL={OWNERORDER_ALL} and_sql="AND u.o_status = '待付款'" tigText={'暂无待付款订单'}/>
        )
    }
}
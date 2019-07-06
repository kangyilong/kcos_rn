/*
* 待付款
* */
import * as React from 'react';
import {
    View,
    Text
} from 'react-native';
import OrderStatusComponent from './OrderStatusComponent/Index';
import {OWNERORDER_DFK} from '../../../../methods/sqlStatements';

export default class ForThePayment extends React.PureComponent {
    render() {
        return (
            <OrderStatusComponent QUERY_SQL={OWNERORDER_DFK} tigText={'暂无待付款订单'}/>
        )
    }
}
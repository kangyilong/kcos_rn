/*
* 待评价
* */
import * as React from 'react';
import {
    View,
    Text
} from 'react-native';
import OrderStatusComponent from './OrderStatusComponent/Index';
import {OWNERORDER_ALL} from '../../../../methods/sqlStatements';

export default class ToEvaluate extends React.PureComponent {
    render() {
        return (
            <OrderStatusComponent QUERY_SQL={OWNERORDER_ALL} and_sql="AND u.o_status = '待评价'" tigText={'暂无待评价订单'}/>
        )
    }
}
/*
* 待评价
* */
import * as React from 'react';
import {
    View,
    Text
} from 'react-native';
import OrderStatusComponent from './OrderStatusComponent/Index';
import {OWNERORDER_DPJ} from '../../../../methods/sqlStatements';

export default class ToEvaluate extends React.PureComponent {
    render() {
        return (
            <OrderStatusComponent QUERY_SQL={OWNERORDER_DPJ} tigText={'暂无待评价订单'}/>
        )
    }
}
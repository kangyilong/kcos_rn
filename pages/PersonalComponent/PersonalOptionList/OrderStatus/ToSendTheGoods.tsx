/*
* 待发货
* */
import React, {PureComponent} from 'react';
import {
    View,
    Text
} from 'react-native';
import OrderStatusComponent from './OrderStatusComponent/Index';
import {OWNERORDER_DFH} from '../../../../methods/sqlStatements';

export default class ToSendTheGoods extends PureComponent {
    componentDidMount() {

    }
    render() {
        return (
            <OrderStatusComponent QUERY_SQL={OWNERORDER_DFH}/>
        )
    }
}
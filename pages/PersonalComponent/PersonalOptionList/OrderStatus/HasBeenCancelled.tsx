/*
* 已取消
* */
import React, {PureComponent} from 'react';
import {
    View,
    Text
} from 'react-native';
import OrderStatusComponent from './OrderStatusComponent/Index';
import {OWNERORDER_YQX} from '../../../../methods/sqlStatements';

export default class HasBeenCancelled extends PureComponent {
    componentDidMount() {

    }
    render() {
        return (
            <OrderStatusComponent QUERY_SQL={OWNERORDER_YQX}/>
        )
    }
}
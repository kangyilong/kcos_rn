/*
* 已完成
* */
import React, {PureComponent} from 'react';
import {
    View,
    Text
} from 'react-native';
import OrderStatusComponent from './OrderStatusComponent/Index';
import {OWNERORDER_YWC} from '../../../../methods/sqlStatements';

export default class HasBeenCompleted extends PureComponent {
    componentDidMount() {

    }
    render() {
        return (
            <OrderStatusComponent QUERY_SQL={OWNERORDER_YWC}/>
        )
    }
}
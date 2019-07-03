/*
* 待评价
* */
import React, {PureComponent} from 'react';
import {
    View,
    Text
} from 'react-native';
import OrderStatusComponent from './OrderStatusComponent/Index';
import {OWNERORDER_DPJ} from '../../../../methods/sqlStatements';

export default class ToEvaluate extends PureComponent {
    componentDidMount() {

    }
    render() {
        return (
            <OrderStatusComponent QUERY_SQL={OWNERORDER_DPJ}/>
        )
    }
}
import React, {PureComponent} from 'react';
import {
    View
} from 'react-native';
import OrderStatusComponent from './OrderStatus/OrderStatusComponent/Index';
import { OWNERORDER_ALL } from '../../../methods/sqlStatements';

export default class OwnerOrder extends PureComponent {
    render() {
        return (
            <OrderStatusComponent QUERY_SQL={OWNERORDER_ALL}/>
        )
    }
}
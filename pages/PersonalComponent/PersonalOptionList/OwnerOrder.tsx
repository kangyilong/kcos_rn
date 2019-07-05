import React, {PureComponent} from 'react';
import {
    View
} from 'react-native';
import OrderStatusComponent from './OrderStatus/OrderStatusComponent/Index';
import {OWNERORDER_ALL} from '../../../methods/sqlStatements';

class OwnerOrder extends PureComponent {
    render() {
        return (
            <OrderStatusComponent QUERY_SQL={OWNERORDER_ALL} tigText={'暂无订单'}/>
        )
    }
}
export default OwnerOrder;
import * as React from 'react';
import {
    View
} from 'react-native';
import OrderStatusComponent from './OrderStatus/OrderStatusComponent/Index';
import {OWNERORDER_ALL} from '../../../methods/sqlStatements';

class OwnerOrder extends React.PureComponent {
    render() {
        return (
            <OrderStatusComponent QUERY_SQL={OWNERORDER_ALL} and_sql=' ' tigText={'暂无订单'}/>
        )
    }
}
export default OwnerOrder;
import {createMaterialTopTabNavigator} from 'react-navigation';
import OwnerOrder from '../pages/PersonalComponent/PersonalOptionList/OwnerOrder';
import ForTheGoods from '../pages/PersonalComponent/PersonalOptionList/OrderStatus/ForTheGoods';
import ForThePayment from '../pages/PersonalComponent/PersonalOptionList/OrderStatus/ForThePayment';
import HasBeenCancelled from '../pages/PersonalComponent/PersonalOptionList/OrderStatus/HasBeenCancelled';
import HasBeenCompleted from '../pages/PersonalComponent/PersonalOptionList/OrderStatus/HasBeenCompleted';
import ToEvaluate from '../pages/PersonalComponent/PersonalOptionList/OrderStatus/ToEvaluate';
import ToSendTheGoods from '../pages/PersonalComponent/PersonalOptionList/OrderStatus/ToSendTheGoods';

export default createMaterialTopTabNavigator({
    OwnerOrder: {
        screen: OwnerOrder,
        navigationOptions: () => ({
            title: '全部'
        })
    },
    ForThePayment: {
        screen: ForThePayment,
        navigationOptions: () => ({
            title: '待付款'
        })
    },
    ToSendTheGoods: {
        screen: ToSendTheGoods,
        navigationOptions: () => ({
            title: '待发货'
        })
    },
    ForTheGoods: {
        screen: ForTheGoods,
        navigationOptions: () => ({
            title: '待收货'
        })
    },
    ToEvaluate: {
        screen: ToEvaluate,
        navigationOptions: () => ({
            title: '待评价'
        })
    },
    HasBeenCompleted: {
        screen: HasBeenCompleted,
        navigationOptions: () => ({
            title: '已完成'
        })
    },
    HasBeenCancelled: {
        screen: HasBeenCancelled,
        navigationOptions: () => ({
            title: '已取消'
        })
    }
}, {
    initialRouteName: 'OwnerOrder',
    swipeEnabled: true,
    lazy: true,
    tabBarOptions: {
        activeTintColor: '#6b52ae',
        inactiveTintColor: '#222',
        upperCaseLabel: false,
        scrollEnabled: true,
        style: {
            backgroundColor: '#fff'
        }
    }
});
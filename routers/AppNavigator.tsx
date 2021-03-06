import * as React from 'react';
import {
    Button
} from 'react-native';
import StorePage from '../pages/StorePage';
import Login from '../pages/Login';
import WelcomePage from '../pages/WelcomePage';
import OwnerCollection from '../pages/PersonalComponent/PersonalOptionList/OwnerCollection';
import OwnerConsumption from '../pages/PersonalComponent/PersonalOptionList/OwnerConsumption';
import OwnerAddress from '../pages/PersonalComponent/PersonalOptionList/OwnerAddress';
import GesturesPassword from '../pages/PersonalComponent/PersonalOptionList/GesturesPassword';
import UserShopCart from '../pages/page02Component/userShopCart/UserShopCart';
import ConfirmOrder from '../pages/confirmOrder/ConfirmOrder';
import {
    createStackNavigator,
    createBottomTabNavigator,
    createAppContainer,
    createDrawerNavigator,
    createSwitchNavigator
} from 'react-navigation';
import BottomNavigator from './BottomNavigator';
import TopNavigator from './TopNavigator';

const AppNavigator = createStackNavigator({
    BottomNavigator: { // 底部tab
        screen: BottomNavigator,
        navigationOptions: {
            header: null
        }
    },
    TopNavigator: { // 顶部tab
        screen: TopNavigator
    },
    Login: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    },
    StorePage: { // 商品详情页
        screen: StorePage,
        navigationOptions: ({navigation}) => {
            const {state} = navigation;
            const {params} = state;
            return {
                title: params.name ? params.name : 'StorePage'
            }
        }
    },
    OwnerCollection: { // 用户收藏页
        screen: OwnerCollection
    },
    OwnerConsumption: {
        screen: OwnerConsumption,
        navigationOptions: () => ({title: '消费明细'})
    },
    OwnerAddress: {
        screen: OwnerAddress
    },
    GesturesPassword: {
        screen: GesturesPassword
    },
    UserShopCart: {
        screen: UserShopCart,
        navigationOptions: () => ({
            title: '购物车',
            headerStyle: {
                backgroundColor: '#FF9752'
            },
            headerTitleStyle: {
                fontSize: 18,
                color: '#fff',
                borderWidth: 0
            }
        })
    }
});

const SwitchNavigator = createSwitchNavigator({
    WelcomePage: {
        screen: WelcomePage,
        navigationOptions: {
            header: null
        }
    },
    AppNavigator: {
        screen: AppNavigator
    },
    ConfirmOrder: {
        screen: ConfirmOrder,
        navigationOptions: () => ({title: '确认订单'})
    }
});

export default createAppContainer(SwitchNavigator);
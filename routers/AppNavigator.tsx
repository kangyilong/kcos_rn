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
        screen: BottomNavigator
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
        screen: OwnerCollection,
        navigationOptions: () => ({title: '商品收藏'})
    },
    OwnerConsumption: {
        screen: OwnerConsumption,
        navigationOptions: () => ({title: '消费明细'})
    },
    OwnerAddress: {
        screen: OwnerAddress
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
    }
});

export default createAppContainer(SwitchNavigator);
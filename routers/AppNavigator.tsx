import React from 'react';
import {
    Button,
    Image
} from 'react-native';
import HomePage from '../pages/HomePage';
import PersonalCenter from '../pages/PersonalCenter';
import StorePage from '../pages/StorePage';
import Login from '../pages/Login';
import WelcomePage from '../pages/WelcomePage';
import {
    createStackNavigator,
    createBottomTabNavigator,
    createAppContainer,
    createDrawerNavigator,
    createSwitchNavigator
} from 'react-navigation';
import User from 'react-native-vector-icons/AntDesign';
import Store from 'react-native-vector-icons/MaterialIcons';

const BottomNavigator = createBottomTabNavigator({
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            tabBarLabel: '商城',
            tabBarIcon: ({focused, tintColor}) => (
                <Store
                    name='store'
                    size={24}
                    color={tintColor}
                    paddingTop={10}
                />
            )
        }
    },
    PersonalCenter: {
        screen: PersonalCenter,
        navigationOptions: {
            tabBarLabel: '个人中心',
            tabBarIcon: ({focused, tintColor}) => (
                <User
                    name='user'
                    size={20}
                    color={tintColor}
                    paddingTop={10}
                />
            )
        }
    }
}, {
    tabBarOptions: {
        activeTintColor: '#4BC1D2',
        inactiveTintColor: '#000',
        showIcon: true,
        labelStyle: {
            fontSize: 13
        }
    }
});

const AppNavigator = createStackNavigator({
    BottomNavigator: {
        screen: BottomNavigator
    },
    Login: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    },
    StorePage: {
        screen: StorePage,
        navigationOptions: ({navigation}) => {
            const { state } = navigation;
            const { params } = state;
            return {
                title: params.name ? params.name : 'StorePage'
            }
        }
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
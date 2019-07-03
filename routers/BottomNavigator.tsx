import React from 'react';
import {
    createBottomTabNavigator
} from 'react-navigation';
import HomePage from "../pages/HomePage";
import PersonalCenter from "../pages/PersonalCenter";
import User from 'react-native-vector-icons/AntDesign';
import Store from 'react-native-vector-icons/MaterialIcons';

export default createBottomTabNavigator({
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
            ),
            header: null
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
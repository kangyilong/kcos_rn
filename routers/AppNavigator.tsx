import {
    Button,
    Image
} from 'react-native';
import StorePage from '../pages/StorePage';
import Login from '../pages/Login';
import WelcomePage from '../pages/WelcomePage';
import OwnerOrder from '../pages/PersonalComponent/PersonalOptionList/OwnerOrder';
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
    BottomNavigator: {
        screen: BottomNavigator
    },
    TopNavigator: {
        screen: TopNavigator
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
    },
    // OwnerOrder: {
    //     screen: OwnerOrder,
    //     navigationOptions: () => ({title: '订单列表'})
    // }
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
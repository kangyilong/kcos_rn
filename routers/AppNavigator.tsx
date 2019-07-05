import {
    Button,
    Image
} from 'react-native';
import StorePage from '../pages/StorePage';
import Login from '../pages/Login';
import WelcomePage from '../pages/WelcomePage';
import OwnerCollection from '../pages/PersonalComponent/PersonalOptionList/OwnerCollection';
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
            const { state } = navigation;
            const { params } = state;
            return {
                title: params.name ? params.name : 'StorePage'
            }
        }
    },
    OwnerCollection: { // 用户收藏页
        screen: OwnerCollection,
        navigationOptions: () => ({title: '商品收藏'})
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
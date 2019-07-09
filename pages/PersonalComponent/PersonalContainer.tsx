import * as React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import NavigatorUtil from '../../methods/NavigatorUtil';
import appStyles from '../styles/appStyles';
import OwnerConsumption from "./PersonalOptionList/OwnerConsumption";

const singleList = [
    {
        id: '0',
        title: '我的订单'
    },{
        id: '1',
        title: '我的购物车'
    },{
        id: '2',
        title: '我的收藏'
    },{
        id: '3',
        title: '消费明细'
    },{
        id: '4',
        title: '收货地址'
    },{
        id: '5',
        title: '修改个人信息'
    }
];

export default class PersonalContainer extends React.PureComponent {
    toLookDetail = (id) => {
        switch(id) {
            case '0':
                NavigatorUtil.goPage('OwnerOrder');
                break;
            case '1':
                NavigatorUtil.goPage('UserShopCart');
                break;
            case '2':
                NavigatorUtil.goPage('OwnerCollection');
                break;
            case '3':
                NavigatorUtil.goPage('OwnerConsumption');
                break;
            case '4':
                NavigatorUtil.goPage('OwnerAddress');
                break;
            case '5':
                break;
        }
    };
    render() {
        return (
            <View style={styles.personal_container}>
                {
                    singleList.map(item => (
                        <TouchableOpacity
                            activeOpacity={0.9}
                            key={item.id}
                            onPress={() => this.toLookDetail(item.id)}
                        >
                            <View style={styles.con_single}>
                                <View>
                                    <Text style={{...styles.left_text, ...appStyles.f18}}>{item.title}</Text>
                                </View>
                                <View>
                                    <Image
                                        style={styles.right_img}
                                        source={require('../../assets/images/icon_arrow.png')}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    personal_container: {
        marginTop: 10,
        paddingLeft: 20,
        paddingRight: 10,
        marginBottom: 20
    },
    con_single: {
        height: 60,
        borderBottomWidth: 0.5,
        borderStyle: 'solid',
        borderColor: '#e5e5e5',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    left_text: {
        color: '#091E42',
        fontFamily: 'PingFangSC-Regular'
    },
    right_img: {
        width: 24,
        height: 24
    }
});
import * as React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    ScrollView
} from 'react-native';
import OrderAddress from './orderComponent/OrderAddress';
import OrderShopMsg from './orderComponent/OrderShopMsg';
import appStyles from "../styles/appStyles";

const {width} = Dimensions.get('window');

export default class ConfirmOrder extends React.PureComponent {
    render() {
        return (
            <View style={{position: 'relative', flex: 1, backgroundColor: '#f5f5f5'}}>
                <ScrollView style={{padding: 10}}>
                    <OrderAddress/>
                    <OrderShopMsg/>
                </ScrollView>
                <View style={styles.foo}>
                    <Text style={styles.foo_btn}>提交订单</Text>
                    <Text style={{...appStyles.price, fontSize: 16}}>￥123123</Text>
                    <Text style={styles.foo_total}>合计:</Text>
                    <Text style={styles.foo_num}>共1件,</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    foo: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width,
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingBottom: 30,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        overflow: 'hidden'
    },
    foo_num: {
        fontSize: 13,
        color: '#666',
        marginRight: 10
    },
    foo_total: {
        fontSize: 15,
        color: '#222'
    },
    foo_btn: {
        marginLeft: 10,
        color: '#fff',
        backgroundColor: '#FF5B57',
        fontSize: 15,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 16,
        marginRight: 10,
        overflow: 'hidden'
    }
});
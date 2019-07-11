import * as React from 'react';
import {useState, useCallback, useEffect} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions
} from 'react-native';
import {UN_SELECT_ICON, SELECT_ICON} from "../../../methods/requireImage";

const {width} = Dimensions.get('window');

export default function OrderShopMsg() {
    return (
        <View style={styles.order_con}>
            <View style={styles.shop_list}>
                <View style={styles.shop_left}>
                    <Image
                        style={{width: 100, height: 100}}
                        source={null}
                    />
                </View>
                <View style={styles.shop_right}>
                    <View style={styles.right_head}>
                        <Text style={styles.head_left}>asd</Text>
                        <View>
                            <Text style={{fontSize: 16, color: '#222'}}>180.00</Text>
                            <Text style={{fontSize: 12, color: '#222', textAlign: 'right'}}>×3</Text>
                        </View>
                    </View>
                    <View style={styles.shop_type}>
                        <Text style={{color: '#666', fontSize: 14}}>白色，套餐类型：官方标配</Text>
                    </View>
                    <View style={styles.shop_foo}>
                        <Text style={{color: '#FF9752'}}>发货时间：卖家承诺12小时</Text>
                    </View>
                </View>
            </View>
            <View style={styles.ps_type}>
                <Text style={{fontSize: 18, color: '#111', marginBottom: 15}}>配送方式</Text>
                <View style={{...styles.type_box, ...styles.type_con}}>
                    <View style={{...styles.type_box, marginRight: 10}}>
                        <Image
                            style={{width: 15, height: 15, marginRight: 8}}
                            source={SELECT_ICON}
                        />
                        <Text>快递配送(免运费)</Text>
                    </View>
                    <View style={styles.type_box}>
                        <Image
                            style={{width: 15, height: 15, marginRight: 8}}
                            source={UN_SELECT_ICON}
                        />
                        <Text>EMS加急</Text>
                    </View>
                </View>
            </View>
            <View style={styles.zf_type}>
                <Text style={{fontSize: 18, color: '#111', marginBottom: 15}}>支付方式</Text>
                <View style={{...styles.type_box, ...styles.type_con}}>
                    <View style={{...styles.type_box, marginRight: 10}}>
                        <Image
                            style={{width: 15, height: 15, marginRight: 8}}
                            source={SELECT_ICON}
                        />
                        <Text>在线支付</Text>
                    </View>
                    <View style={styles.type_box}>
                        <Image
                            style={{width: 15, height: 15, marginRight: 8}}
                            source={UN_SELECT_ICON}
                        />
                        <Text>货到付款</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    order_con: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10
    },
    shop_list: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    shop_left: {},
    shop_right: {
        width: width - 140
    },
    right_head: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    head_left: {
        color: '#222',
        fontSize: 16
    },
    type_con: {
        marginBottom: 20
    },
    shop_type: {
        marginBottom: 10
    },
    shop_foo: {},
    ps_type: {},
    type_box: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    zf_type: {},
});
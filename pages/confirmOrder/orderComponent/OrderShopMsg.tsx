import * as React from 'react';
import {useState, useCallback, useEffect} from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import {UN_SELECT_ICON, SELECT_ICON} from "../../../methods/requireImage";
import appStyles from "../../styles/appStyles";
import NavigatorUtil from "../../../methods/NavigatorUtil";

const {width} = Dimensions.get('window');

interface Props {
    shopList: any,
    zfOption: Function,
    psOption: Function
}
export default function OrderShopMsg(props: Props) {
    const {shopList, zfOption, psOption} = props;
    const [psIndex, setPsIndex] = useState(1);
    const [zfIndex, setZfIndex] = useState(1);
    return (
        <View style={styles.order_con}>
            {
                shopList.length > 0 && shopList.map(item => (
                    <TouchableOpacity
                        key={item.shop_id}
                        activeOpacity={0.9}
                        onPress={() => {
                            NavigatorUtil.goPage('StorePage', {
                                name: item.shop_name,
                                productId: item.product_id,
                                shopId: item.shop_id
                            })
                        }}
                    >
                        <View style={styles.shop_list}>
                            <View>
                                <Image
                                    style={{width: 100, height: 100}}
                                    source={{uri: item.shop_pic}}
                                />
                            </View>
                            <View style={styles.shop_right}>
                                <View style={styles.right_head}>
                                    <Text style={styles.head_left}>{item.shop_name}</Text>
                                    <View>
                                        <Text style={{fontSize: 16, ...appStyles.price}}>￥{item.shop_pri}</Text>
                                        <Text style={{fontSize: 12, color: '#444', textAlign: 'right'}}>×{item.shop_val}</Text>
                                    </View>
                                </View>
                                <View style={styles.shop_type}>
                                    <Text style={{color: '#666', fontSize: 14}}>{item.shop_name.split('-')[1] || ''} 套餐类型：官方标配</Text>
                                </View>
                                <View>
                                    <Text style={{color: '#FF9752'}}>发货时间：卖家承诺12小时</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))
            }
            <View style={styles.ps_type}>
                <Text style={{fontSize: 18, color: '#111', marginBottom: 15}}>配送方式</Text>
                <View style={{...styles.type_box}}>
                    <TouchableOpacity
                        style={{...styles.type_box, marginRight: 20}}
                        activeOpacity={0.9}
                        onPress={() => {
                            setPsIndex(1);
                            zfOption(1);
                        }}
                    >
                        <Image
                            style={{width: 15, height: 15, marginRight: 8}}
                            source={psIndex === 1 ? SELECT_ICON : UN_SELECT_ICON}
                        />
                        <Text>快递配送(免运费)</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.type_box}
                        activeOpacity={0.9}
                        onPress={() => {
                            setPsIndex(2);
                            zfOption(2);
                        }}
                    >
                        <Image
                            style={{width: 15, height: 15, marginRight: 8}}
                            source={psIndex === 2 ? SELECT_ICON : UN_SELECT_ICON}
                        />
                        <Text>EMS加急</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.zf_type}>
                <Text style={{fontSize: 18, color: '#111', marginBottom: 15}}>支付方式</Text>
                <View style={{...styles.type_box}}>
                    <TouchableOpacity
                        style={{...styles.type_box, marginRight: 20}}
                        activeOpacity={0.9}
                        onPress={() => {
                            setZfIndex(1);
                            psOption(1);
                        }}
                    >
                        <Image
                            style={{width: 15, height: 15, marginRight: 8}}
                            source={zfIndex === 1 ? SELECT_ICON : UN_SELECT_ICON}
                        />
                        <Text>在线支付</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.type_box}
                        activeOpacity={0.9}
                        onPress={() => {
                            setZfIndex(2);
                            psOption(2);
                        }}
                    >
                        <Image
                            style={{width: 15, height: 15, marginRight: 8}}
                            source={zfIndex === 2 ? SELECT_ICON : UN_SELECT_ICON}
                        />
                        <Text>货到付款</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    order_con: {
        marginTop: 20,
        borderRadius: 10
    },
    shop_list: {
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
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
    shop_type: {
        marginBottom: 10
    },
    ps_type: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 16,
        paddingTop: 16,
        backgroundColor: '#fff',
        marginTop: 20,
        borderRadius: 8
    },
    type_box: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    zf_type: {
        padding: 10,
        paddingBottom: 26,
        backgroundColor: '#fff',
        borderRadius: 8
    }
});
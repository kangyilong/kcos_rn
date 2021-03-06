import * as React from 'react';
import {useState, useCallback, useEffect} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import moment from 'moment';
import appStyles from '../../../styles/appStyles';
import NavigatorUtil from "../../../../methods/NavigatorUtil";

interface Props {
    singleOrderData: {
        code: string,
        orderTime: string,
        shopTotal: string,
        zfTypeName: string,
        psTypeName: string,
        mergeList: Array<any>
    }
}

export default function SingleOrder(props: Props) {
    const [code, setCode] = useState('');
    const [mergeList, setMergeList] = useState([]);
    const [shopSum, setShopSum] = useState('');
    const [shopTotal, setShopTotal] = useState('');
    const [orderTime, setOrderTime] = useState('');
    const [zfTypeName, setZfTypeName] = useState('');
    const [psTypeName, setPsTypeName] = useState('');
    const orderDetails = useCallback((shopMsg) => {
        NavigatorUtil.goPage('StorePage', {
            name: shopMsg.shopName,
            productId: shopMsg.product_id,
            shopId: shopMsg.shop_id
        });
    }, []);
    const singleOrderData = useCallback(() => {
        let {code, mergeList, orderTime, shopTotal, zfTypeName, psTypeName} = props.singleOrderData;
        if (orderTime) {
            orderTime = moment(parseInt(orderTime)).format('YYYY-MM-DD HH:mm:ss');
        }
        setCode(code);
        setMergeList(mergeList);
        setShopSum(shopSum);
        setShopTotal(shopTotal);
        setOrderTime(orderTime);
        setZfTypeName(zfTypeName);
        setPsTypeName(psTypeName);
    }, []);
    useEffect(() => {
        singleOrderData();
    }, [props.singleOrderData]);
    return (
        <View style={styles.single_order}>
            <View style={styles.single_header}>
                <View style={{...appStyles.flex_direction, ...styles.order_code}}>
                    <Text style={appStyles.f14}>订单号：{code}</Text>
                </View>
                <View style={{...appStyles.flex_direction, ...styles.order_type}}>
                    <Text style={{...appStyles.f14, ...styles.o_type}}>{zfTypeName}</Text>
                    <Text style={{...appStyles.f14, ...styles.o_type}}>{psTypeName}</Text>
                </View>
                <View style={{...appStyles.flex_direction, ...styles.order_box}}>
                    <View style={{...appStyles.flex_direction, ...appStyles.align_items}}>
                        <Text style={{...appStyles.f16}}>订单金额：</Text>
                        <Text style={{...appStyles.price, ...appStyles.f20}}>{shopTotal} 元</Text>
                    </View>
                    <View>
                        <Text style={{...appStyles.f14, ...styles.order_time}}>{orderTime}</Text>
                    </View>
                </View>
            </View>
            {
                mergeList.length > 0 && mergeList.map(item => (
                    <TouchableOpacity
                        key={item.shop_id}
                        activeOpacity={0.9}
                        onPress={() => orderDetails({
                            shopName: item.shopName,
                            product_id: item.product_id,
                            shop_id: item.shop_id
                        })}
                    >
                        <View style={styles.single_box}>
                            <View style={styles.order_left}>
                                <View style={styles.img_box}>
                                    <Image
                                        style={styles.left_img}
                                        source={{uri: item.shopPic}}
                                    />
                                </View>
                                <View style={styles.left_container}>
                                    <View style={styles.con_name}>
                                        <Text style={{...appStyles.textColor, ...appStyles.f18}}>{item.shopName}</Text>
                                    </View>
                                    <View style={appStyles.flex_direction}>
                                        <Text style={{...appStyles.f14}}>{item.shopPrice}元 x </Text>
                                        <Text style={{...appStyles.f14, ...appStyles.price}}>{item.shopVal}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.right_box}>
                                <Image
                                    style={appStyles.right_icon}
                                    source={require('../../../../assets/images/icon_arrow.png')}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    single_order: {
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomWidth: 0.5,
        borderStyle: 'solid',
        borderColor: '#e5e5e5'
    },
    single_header: {
        borderBottomWidth: 0.5,
        borderStyle: 'solid',
        borderColor: '#e5e5e5',
        paddingTop: 10,
        paddingBottom: 8
    },
    single_box: {
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    order_code: {
        marginBottom: 8,
        justifyContent: 'space-between'
    },
    order_type: {
        marginBottom: 8
    },
    o_type: {
        borderWidth: 1,
        borderColor: '#1890FF',
        borderStyle: 'solid',
        borderRadius: 6,
        backgroundColor: '#fff',
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 6,
        paddingRight: 6,
        color: '#1890FF',
        marginRight: 20
    },
    order_box: {
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    order_left: {
        flexDirection: 'row'
    },
    img_box: {
        borderRadius: 8,
        overflow: 'hidden',
        marginRight: 10
    },
    left_img: {
        width: 60,
        height: 60
    },
    left_container: {
        paddingTop: 10
    },
    con_name: {
        marginBottom: 6
    },
    right_box: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    order_time: {
        color: '#333',
        marginLeft: 20
    }
});
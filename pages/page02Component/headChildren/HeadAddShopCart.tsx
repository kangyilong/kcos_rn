import * as React from 'react';
import {useState, useCallback, useEffect} from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import ModalComponent from '../../../components/HOCComponent/ModalComponent';
import {ADD_SHOP_CART} from '../../../methods/sqlStatements';
import appStyles from "../../styles/appStyles";
import {getUserId} from "../../../methods/util";
import Fetch from "../../../methods/Fetch";
import NavigatorUtil from "../../../methods/NavigatorUtil";

interface Props {
    hideModalVisibleFn: Function,
    headItem: Array<any>,
    sIndex: number
}

function HeadAddShopCart(props: Props) {
    const [number, setNumber] = useState('1');
    const [sIndex, setSIndex] = useState(props.sIndex);
    const {headItem} = props;
    const addShopNumber = useCallback(() => {
        let num = +number;
        num ++;
        setNumber(num.toString());
    }, [number]);
    const subShopNumber = useCallback(() => {
        let num = +number;
        if(num > 1) {
            num --;
            setNumber(num.toString());
        }
        return;
    }, [number]);
    const addShopCart = useCallback(() => {
        getUserId().then(user_id => {
            if(!user_id) {
                props.hideModalVisibleFn();
                NavigatorUtil.goPage('Login');
                return;
            }
            props.hideModalVisibleFn('start');
            const {shop_id, product_id, shop_pri} = props.headItem[sIndex];
            const shop_val = number, code = `kcos_ios${new Date().getTime()}${Math.floor(Math.random() * 1000)}`;
            Fetch({
                statements: ADD_SHOP_CART,
                parameter: JSON.stringify([code, user_id, shop_id, product_id, shop_val, shop_pri])
            }).then(() => {
                props.hideModalVisibleFn('end');
            })
        });
    }, []);
    return (
        <View style={{position: 'relative'}}>
            <View style={styles.add_cart_head}>
                <View>
                    <Image
                        style={styles.cart_head_left}
                        source={{uri: headItem[sIndex].shop_pic}}
                    />
                </View>
                <View style={styles.cart_head_right}>
                    <Text style={{...appStyles.price, ...appStyles.f16}}>￥{headItem[sIndex].shop_pri}</Text>
                    <Text style={styles.right_kc}>库存 {headItem[sIndex].shop_Num}</Text>
                </View>
            </View>
            <View style={styles.add_cart_con}>
                <View><Text style={{fontSize: 16, marginTop: 4, marginBottom: 6}}>机身颜色</Text></View>
                <View style={styles.single_box}>
                    {
                        headItem.length > 0 && headItem.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                activeOpacity={0.9}
                                onPress={() => {setSIndex(index)}}
                            >
                                <View style={index === sIndex ? styles.set_single : styles.single}>
                                    <Image
                                        style={styles.single_img}
                                        source={{uri: item.shop_pic}}
                                    />
                                    <Text style={index === sIndex ? styles.set_color : styles.s_color}>{item.shop_name.split('-')[1]}</Text>
                                </View>
                            </TouchableOpacity>
                        ))
                    }
                </View>
                <View style={styles.add_num}>
                    <Text style={appStyles.f16}>购买数量</Text>
                    <View style={styles.buy_box}>
                        <Text style={styles.op} onPress={subShopNumber}>-</Text>
                        <TextInput value={number} style={styles.iup_num}/>
                        <Text style={styles.op} onPress={addShopNumber}>+</Text>
                    </View>
                </View>
            </View>
            <View style={styles.foo_box}>
                <Text style={styles.foo_txt} onPress={addShopCart}>确定</Text>
            </View>
            <View style={styles.close}>
                <Text style={{fontSize: 24, color: '#333'}} onPress={() => {props.hideModalVisibleFn()}}>×</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    add_cart_head: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    cart_head_left: {
        width: 80,
        height: 80
    },
    cart_head_right: {
        marginRight: 12
    },
    right_kc: {
        fontSize: 13,
        color: '#999',
        marginTop: 5
    },
    add_cart_con: {
        marginTop: 16
    },
    single_box: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 10
    },
    single: {
        flexDirection: 'row',
        backgroundColor: '#f1f1f1',
        borderStyle: 'solid',
        borderWidth: 0.5,
        borderColor: '#f1f1f1',
        borderRadius: 5,
        padding: 5,
        alignItems: 'center',
        marginRight: 10
    },
    set_single: {
        flexDirection: 'row',
        backgroundColor: '#f1f1f1',
        borderRadius: 5,
        padding: 5,
        alignItems: 'center',
        marginRight: 10,
        borderStyle: 'solid',
        borderWidth: 0.5,
        borderColor: '#FF5B57'
    },
    single_img: {
        width: 20,
        height: 20,
        marginRight: 5
    },
    s_color: {
        fontSize: 14,
        color: '#111'
    },
    set_color: {
        fontSize: 14,
        color: '#FF5B57'
    },
    add_num: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buy_box: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    op: {
        backgroundColor: '#f1f1f1',
        color: '#666',
        width: 25,
        height: 25,
        textAlign: 'center',
        lineHeight: 25,
        fontSize: 18
    },
    iup_num: {
        backgroundColor: '#eee',
        width: 25,
        height: 25,
        textAlign: 'center',
        marginLeft: 1,
        marginRight: 1
    },
    foo_box: {
        marginTop: 20
    },
    foo_txt: {
        backgroundColor: '#FF5B57',
        color: '#fff',
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: 'center',
        fontSize: 16,
        borderStyle: 'solid',
        borderWidth: 0.5,
        borderColor: 'transparent',
        borderRadius: 15,
        overflow: 'hidden'
    },
    close: {
        position: 'absolute',
        right: 0,
        top: -20
    }
});

export default ModalComponent(HeadAddShopCart);
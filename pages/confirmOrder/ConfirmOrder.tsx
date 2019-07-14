import * as React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    ScrollView,
    TextInput
} from 'react-native';
import Textarea from 'react-native-textarea';
import OrderAddress from './orderComponent/OrderAddress';
import OrderShopMsg from './orderComponent/OrderShopMsg';
import {
    GET_DEFAULT_ADDRESS,
    GET_SHOPID_DETAIL,
    SUBMIT_ORDER,
    ADD_ORDER_DETAIL,
    UPDATE_SHOP_NUM,
    REMOVE_CART_SHOP
} from '../../methods/sqlStatements';
import appStyles from "../styles/appStyles";
import Fetch from "../../methods/Fetch";
import Loading from "../../components/loading/Loading";
import ToastMsg from '../../components/toastMsg/ToastMsg';
import ToastLoading from '../../components/toastLoading/ToastLoading';
import {getUserId} from "../../methods/util";
import NavigatorUtil from "../../methods/NavigatorUtil";

const {width} = Dimensions.get('window');

interface Props {
    navigation: any
}

export default class ConfirmOrder extends React.PureComponent<Props, any> {
    user_id = '';
    state = {
        shopList: [],
        addressData: {
            address_id: ''
        },
        zf_type: 1,
        ps_type: 1,
        totalNum: 0,
        totalPrice: 0,
        isLoadOk: false,
        isToastShow: false,
        isToastLoadingShow: false,
    };

    componentDidMount() {
        const {navigation} = this.props;
        const {state} = navigation;
        const {params} = state;
        const {selectedShopList} = params;
        if (!selectedShopList && !Array.isArray(selectedShopList)) {
            return false;
        }
        getUserId().then(user_id => {
            this.user_id = user_id;
            if (!user_id) {
                NavigatorUtil.goPage('Login');
                return;
            }
            Fetch({
                statements: GET_DEFAULT_ADDRESS, parameter: JSON.stringify([user_id])
            }).then(data => {
                this.setState({
                    addressData: data[0]
                })
            });
        });
        let sql = '', len = selectedShopList.length - 1, totalNum = 0, totalPrice = 0;
        selectedShopList.forEach((item, index) => {
            if (len === index) {
                sql += `shop_id = '${item.shop_id}'`;
            } else {
                sql += `shop_id = '${item.shop_id}' OR `;
            }
            totalNum += parseInt(item.shop_val);
            totalPrice += parseInt(item.shop_val) * parseInt(item.shop_pri);
        });
        Fetch({statements: GET_SHOPID_DETAIL({sql})}).then(data => {
            this.setState({
                shopList: data.map((item, index) => ({
                    ...item,
                    shop_val: selectedShopList[index].shop_val
                })),
                totalNum,
                totalPrice,
                isLoadOk: true
            })
        });
    }

    zfOption = (index) => {
        this.setState({
            zf_type: index
        })
    };

    psOption = (index) => {
        this.setState({
            ps_type: index
        })
    };

    submitOrder = () => {
        this.setState({
            isToastLoadingShow: true
        });
        getUserId().then(user_id => {
            const { refRemark } = this.refs;
            const { refs } = refRemark;
            const { textarea } = refs;
            const { _lastNativeText } = textarea;
            const {totalNum, totalPrice, addressData, zf_type, ps_type} = this.state;
            let oTime = new Date().getTime();
            let p_code = `kcos1314_o_ios${oTime}${Math.floor(Math.random() * 1000)}`;
            let parameter = JSON.stringify([
                p_code,
                user_id,
                totalPrice,
                totalNum,
                addressData.address_id,
                zf_type,
                ps_type,
                oTime,
                _lastNativeText
            ]);
            Fetch({statements: SUBMIT_ORDER, parameter}).then(() => {
                const { shopList } = this.state;
                for(let i = 0, len = shopList.length; i < len; i ++) {
                    Fetch({
                        statements: ADD_ORDER_DETAIL,
                        parameter: JSON.stringify([
                            `kcos1314_Od_ios${oTime}${Math.floor(Math.random() * 1000)}`,
                            shopList[i].product_id,
                            shopList[i].shop_id,
                            p_code,
                            shopList[i].shop_pri,
                            shopList[i].shop_val
                        ])
                    });
                    Fetch({
                        statements: UPDATE_SHOP_NUM,
                        parameter: JSON.stringify([
                            parseInt(shopList[i].shop_Num) - parseInt(shopList[i].shop_val),
                            shopList[i].shop_id
                        ]),
                    });
                    Fetch({
                        statements: REMOVE_CART_SHOP,
                        parameter: JSON.stringify([
                            shopList[i].shop_id,
                            user_id
                        ])
                    })
                }
                this.setState({
                    isToastShow: true,
                    isToastLoadingShow: false
                });
                setTimeout(() => {
                    NavigatorUtil.goPage('ForThePayment');
                }, 1500);
            }, () => {
                this.setState({
                    isToastLoadingShow: false
                });
            }).catch(() => {
                this.setState({
                    isToastLoadingShow: false
                });
            });
        });
    };

    render() {
        const {shopList, addressData, totalNum, totalPrice, isLoadOk, isToastShow, isToastLoadingShow} = this.state;
        if (!isLoadOk) {
            return <Loading/>
        }
        return (
            <View style={{position: 'relative', flex: 1, backgroundColor: '#f5f5f5', paddingBottom: 60, paddingTop: 50}}>
                <ScrollView style={{padding: 10}}>
                    <OrderAddress addressData={addressData}/>
                    <OrderShopMsg shopList={shopList} zfOption={this.zfOption} psOption={this.psOption}/>
                    <View style={styles.area_box}>
                        <Text style={appStyles.f18}>商家备注</Text>
                        <Textarea style={styles.remark} placeholder='请填写商家备注' ref="refRemark"/>
                    </View>
                </ScrollView>
                <View style={styles.foo}>
                    <Text style={styles.foo_btn} onPress={this.submitOrder}>提交订单</Text>
                    <Text style={{...appStyles.price, fontSize: 16}}>￥{totalPrice}</Text>
                    <Text style={styles.foo_total}>合计:</Text>
                    <Text style={styles.foo_num}>共{totalNum}件,</Text>
                </View>
                <ToastMsg toastMsg="提交成功" isShow={isToastShow}/>
                <ToastLoading isShow={isToastLoadingShow}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    area_box: {
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingRight: 10
    },
    remark: {
        height: 100,
        width: width - 40,
        borderRadius: 6,
        borderColor: '#eee',
        borderStyle: 'solid',
        borderWidth: 1,
        marginTop: 15,
        padding: 10
    },
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
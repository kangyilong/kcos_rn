import * as React from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    StyleSheet,
    Dimensions,
    ImageBackground
} from 'react-native';
import FooComponent from '../../../components/fooComponent/FooComponent';
import NoData from '../../../components/noData/NoData';
import SingleShopMsg from './SingleShopMsg';
import {GET_SHOP_CART_LIST, DELETE_CART_SHOP} from '../../../methods/sqlStatements';
import appStyles from "../../styles/appStyles";
import Fetch from "../../../methods/Fetch";
import {getUserId} from "../../../methods/util";
import NavigatorUtil from "../../../methods/NavigatorUtil";
import Loading from "../../../components/loading/Loading";
import {SELECT_ICON, UN_SELECT_ICON} from "../../../methods/requireImage";

const {width} = Dimensions.get('window');

export default class UserShopCart extends React.PureComponent {
    user_id = '';
    state = {
        cartData: [],
        cloneCartData: [],
        shopIdList: [],
        selectedShopList: [],
        isLoading: false,
        isShowFoo: false,
        isLoadOk: false,
        isSelAll: false,
        isChange: false,
        tigText: '购物车空空如也~',
        setUpTitle: '设置',
        totalPrice: 0,
        totalNum: 0
    };

    componentDidMount() {
        getUserId().then(user_id => {
            if (!user_id) {
                NavigatorUtil.goPage('Login');
                return;
            }
            this.user_id = user_id;
            Fetch({statements: GET_SHOP_CART_LIST, parameter: JSON.stringify([user_id])}).then(data => {
                this.setState({
                    isLoadOk: true,
                    cartData: data,
                    cloneCartData: JSON.parse(JSON.stringify(data))
                });
            });
        });
    }

    selectSingleShop = (shopMsg, type = '') => {
        const {shop_id} = shopMsg;
        let list: Array<any> = this.state.shopIdList;
        let selectedList = this.state.selectedShopList;
        let len = this.state.cartData.length;
        let dex = list.indexOf(shop_id);
        if (!type) {
            if (dex !== -1) {
                list.splice(dex, 1);
                selectedList.splice(dex, 1);
            } else {
                list.push(shop_id);
                selectedList.push(shopMsg);
            }
        } else {
            selectedList[dex] = shopMsg;
        }
        let totalList = selectedList.map(item => (parseFloat(item.shop_pri) * parseInt(item.shop_val)));
        this.setState({
            shopIdList: list,
            selectedShopList: selectedList,
            totalPrice: totalList.length && totalList.reduce((x, y) => x + y),
            totalNum: totalList.length
        });
        if (len === list.length) {
            this.setState({
                isSelAll: true
            });
        } else {
            this.setState({
                isSelAll: false
            });
        }
    };
    optionSingleShop = (msg) => {
        const {num, index} = msg;
        let {cartData} = this.state;
        cartData[index].shop_val = num;
        this.setState({
            cartData
        });
    };
    selectedAddShop = () => {
        const {isSelAll, isChange, cartData} = this.state;
        const len = cartData.length;
        if (!isSelAll) {
            this.setState({
                isSelAll: !isSelAll,
                isChange: !isChange,
                shopIdList: cartData.map(item => item.shop_id),
                selectedShopList: cartData.map((item, index) => ({
                    shop_id: item.shop_id,
                    shop_val: item.shop_val,
                    shop_pri: item.shop_pri,
                    index
                })),
                totalPrice: cartData.map(item => parseFloat(item.shop_pri) * parseInt(item.shop_val)).reduce((x, y) => x + y),
                totalNum: len
            });
        } else {
            this.setState({
                isSelAll: !isSelAll,
                isChange: !isChange,
                shopIdList: [],
                totalPrice: 0,
                totalNum: 0
            });
        }
    };
    delShopOption = () => {
        let {selectedShopList, shopIdList, cartData, cloneCartData} = this.state;
        if (selectedShopList.length > 0) {
            let list = selectedShopList.map(item => item.index);
            list.forEach(item => {
                cartData[item] = false;
                cloneCartData[item] = false;
            });
            let sql = '', len = shopIdList.length - 1;
            shopIdList.forEach((item, index) => {
                if (len === index) {
                    sql += `shop_id = '${item}'`;
                } else {
                    sql += `shop_id = '${item}' OR `;
                }
            });
            console.log(DELETE_CART_SHOP({user_id: this.user_id, sql}));
            Fetch({statements: DELETE_CART_SHOP({user_id: this.user_id, sql})}).then(() => {
                this.setState({
                    cartData: cartData.filter(item => item),
                    cloneCartData: cloneCartData.filter(item => item)
                });
            });
        } else {
        }
    };

    render() {
        const {
            cartData,
            isLoading,
            tigText,
            isShowFoo,
            isLoadOk,
            isSelAll,
            isChange,
            setUpTitle,
            totalPrice,
            totalNum,
            cloneCartData
        } = this.state;
        let len = cartData.length;
        if (!isLoadOk) {
            return <Loading/>
        }
        return (
            <View style={styles.cart_box}>
                <View style={len > 0 ? styles.cart_header : appStyles.none}>
                    <Text style={styles.head_tit}>共{len}件宝贝</Text>
                    <Text
                        style={{color: '#fff'}}
                        onPress={() => {
                            let isUp = setUpTitle === '设置' ? true : false;
                            this.setState({
                                setUpTitle: isUp ? '完成' : '设置',
                                isShowFoo: isUp,
                                isSelAll: false,
                                isChange: !isChange,
                                shopIdList: [],
                                selectedShopList: [],
                                totalPrice: 0,
                                totalNum: 0,
                                cartData: JSON.parse(JSON.stringify(cloneCartData))
                            });
                        }}>{setUpTitle}</Text>
                </View>
                <FlatList
                    data={cartData}
                    renderItem={({item, index}) => <SingleShopMsg
                        key={item.code}
                        singleMsg={item}
                        isSelAll={isSelAll}
                        isChange={isChange}
                        defIndex={index}
                        selectSingleShop={this.selectSingleShop}
                        optionSingleShop={this.optionSingleShop}
                    />}
                    refreshing={isLoading}
                    ListFooterComponent={() => <FooComponent isLoading={isLoading}/>}
                    onEndReachedThreshold={0.5}
                    ListEmptyComponent={() => <NoData tigText={tigText}/>}
                />
                <View style={len > 0 ? styles.cart_foo : appStyles.none}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <ImageBackground
                            style={{width: 20, height: 20, marginRight: 6}}
                            source={isSelAll ? SELECT_ICON : UN_SELECT_ICON}
                        >
                            <Text style={styles.all_select} onPress={this.selectedAddShop}/>
                        </ImageBackground>
                        <Text style={{fontSize: 14}} onPress={this.selectedAddShop}>全选</Text>
                    </View>
                    <View style={isShowFoo ? '' : appStyles.none}>
                        <Text style={styles.shop_del} onPress={this.delShopOption}>删除</Text>
                    </View>
                    <View style={isShowFoo ? appStyles.none : styles.js_box}>
                        <Text style={{fontSize: 14}}>合计:</Text>
                        <Text style={{...appStyles.price, ...appStyles.f14}}>￥{totalPrice}</Text>
                        <Text style={styles.js_btn} onPress={() => {
                            NavigatorUtil.goPage('ConfirmOrder');
                        }}>结算({totalNum})</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cart_box: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        position: 'relative',
        backgroundColor: '#f1f1f1',
        paddingTop: 59,
        paddingBottom: 80
    },
    cart_header: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 9,
        width,
        backgroundColor: '#FF9752',
        paddingBottom: 20,
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    head_tit: {
        color: '#fff',
        fontSize: 14
    },
    cart_foo: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width,
        backgroundColor: '#fff',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 15,
        paddingBottom: 30,
        paddingTop: 10,
        justifyContent: 'space-between'
    },
    all_select: {
        width: 20,
        height: 20,
        borderStyle: 'solid',
        borderColor: '#ccc',
        borderWidth: 1.5,
        borderRadius: 10,
        overflow: 'hidden'
    },
    shop_del: {
        borderStyle: 'solid',
        borderColor: '#FF5B57',
        borderWidth: 1,
        borderRadius: 16,
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 20,
        paddingRight: 20,
        color: '#FF5B57'
    },
    js_box: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    js_btn: {
        marginLeft: 10,
        borderRadius: 16,
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 20,
        paddingRight: 20,
        color: '#fff',
        backgroundColor: '#FF5B57',
        fontSize: 16,
        overflow: 'hidden'
    }
});
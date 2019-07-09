import * as React from 'react';
import {useState, useEffect, useCallback} from 'react';
import {
    View,
    Text,
    Button,
    Image,
    StyleSheet,
    Dimensions,
    FlatList,
    RefreshControl,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import HeadAddShopCart from './headChildren/HeadAddShopCart';
import ToastLoading from '../../components/toastLoading/ToastLoading';
import ToastMsg from '../../components/toastMsg/ToastMsg';
import FETCH, {default as Fetch} from '../../methods/Fetch';
import NavigatorUtil from "../../methods/NavigatorUtil";
import {ADD_COLLECTION} from '../../methods/sqlStatements';
import {getUserId} from "../../methods/util";

const {width} = Dimensions.get('window');

interface Props {
    navigation: {
        navigate: Function,
        goBack: Function,
        state: {
            params: {
                name: string,
                productId: string,
                shopId: string
            }
        }
    }
}

export default function (props: Props) {
    const [headerImageData, setHeaderImageData] = useState([]);
    const [imgSize, setImgSize] = useState(0);
    const [sIndex, setIndex] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [toastIsShow, setToastIsShow] = useState(false);
    const [loadingIsShow, setLoadingIsShow] = useState(false);
    const getShopDetail = useCallback(() => {
        const {navigation} = props;
        const {state} = navigation;
        const {params} = state;
        if (!params) {
            setTimeout(() => {
                navigation.goBack();
            }, 1000);
            return;
        }
        FETCH({
            statements: `SELECT shop_id, shop_pic, shop_pri, shop_Num, product_id, shop_txt, shop_name FROM shopMsg WHERE product_id = '${params.productId}'`
        }).then(data => {
            setHeaderImageData(data);
            data.forEach((item, index) => {
                if (item.shop_id === params.shopId) {
                    setIndex(index);
                }
            });
            Image.getSize(data[0].shop_pic, (width, height) => {
                setImgSize(height / width);
            }, (err) => {
                console.log(err);
            });
        })
    }, [props.navigation]);
    const hideModalVisibleFn = useCallback((type = '') => {
        setModalVisible(false);
        if(type === 'start') {
            setLoadingIsShow(true);
        }
        if(type === 'end') {
            setLoadingIsShow(false);
            setToastIsShow(true);
            setTimeout(() => {
                setToastIsShow(false);
                NavigatorUtil.goPage('UserShopCart');
            }, 1500);
        }
    }, []);
    const addCollectionFn = useCallback(() => {
        getUserId().then(user_id => {
            if(!user_id) {
                NavigatorUtil.goPage('Login');
                return;
            }
            setLoadingIsShow(true);
            let code = `kcos_ios${new Date().getTime()}${Math.floor(Math.random() * 1000)}`;
            const {productId, shopId} = props.navigation.state.params;
            Fetch({
                statements: ADD_COLLECTION,
                parameter: JSON.stringify([user_id, productId, shopId, code])
            }).then(() => {
                setLoadingIsShow(false);
                setToastIsShow(true);
                setTimeout(() => {
                    setToastIsShow(false);
                }, 1500);
            }, () => {
                setLoadingIsShow(false);
            }).catch(() => {
                setLoadingIsShow(false);
            });
        });
    }, []);
    useEffect(() => {
        getShopDetail();
    }, [props.navigation]);
    return (
        <View>
            {
                headerImageData.length > 0 ? (
                    <View style={styles.shopDetailHeader}>
                        <View style={styles.headerImage}>
                            <Image
                                style={{...styles.hImage, height: width * imgSize * 0.7}}
                                source={{uri: headerImageData[sIndex].shop_pic}}
                            />
                        </View>
                        <View style={styles.headerImgList}>
                            {
                                headerImageData.map((imageItem, index) => (
                                    <TouchableOpacity
                                        activeOpacity={0.9}
                                        key={index}
                                        onPress={() => {
                                            setIndex(index)
                                        }}
                                    >
                                        <View style={{
                                            ...styles.fooSingle,
                                            borderColor: sIndex === index ? '#abcdef' : '#ccc'
                                        }}>
                                            <Image
                                                style={{...styles.fImage, height: (width / 5 - 10) * imgSize}}
                                                source={{uri: imageItem.shop_pic}}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                        <View style={styles.headerFoo}>
                            <View style={styles.productCon}>
                                <Text style={styles.productName}>{headerImageData[sIndex].shop_name}：</Text>
                                <Text style={styles.productPri}>{headerImageData[sIndex].shop_pri} 元</Text>
                            </View>
                            <View style={styles.op_btns}>
                                <Text
                                    style={{...styles.shop_btn, ...styles.add_cart}}
                                    onPress={() => {setModalVisible(true)}}
                                >加入购物车</Text>
                                <Text
                                    style={{...styles.shop_btn, ...styles.add_coll}}
                                    onPress={addCollectionFn}
                                >加入收藏</Text>
                            </View>
                            <Text style={styles.productTxt}>{headerImageData[sIndex].shop_txt}</Text>
                        </View>
                    </View>
                ) : null
            }
            <View style={styles.cart_icon_box}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {NavigatorUtil.goPage('UserShopCart')}}
                >
                    <Image
                        style={styles.cart_icon}
                        source={require('../../assets/images/shopCart.jpeg')}
                    />
                </TouchableOpacity>
            </View>
            <HeadAddShopCart
                modalVisible = {modalVisible}
                hideModalVisibleFn = {hideModalVisibleFn}
                headItem = {headerImageData}
                sIndex={sIndex}
            />
            <ToastLoading isShow={loadingIsShow}/>
            <ToastMsg toastMsg="操作成功" isShow={toastIsShow}/>
        </View>
    )
}

const styles = StyleSheet.create({
    shopDetailHeader: {
        width: width,
        paddingBottom: 30
    },
    headerImage: {
        width: width,
        paddingTop: 20,
        marginBottom: 15,
        justifyContent: 'center'
    },
    hImage: {
        width: width
    },
    headerImgList: {
        flexDirection: 'row'
    },
    fooSingle: {
        width: width / 5 - 10,
        marginLeft: 10,
        borderWidth: 1,
        borderStyle: 'solid',
        overflow: 'hidden'
    },
    fImage: {
        width: width / 5 - 10,
    },
    headerFoo: {
        marginTop: 20,
        paddingLeft: 10,
        paddingRight: 10
    },
    productTxt: {
        fontSize: 14,
        color: '#555'
    },
    productCon: {
        flexDirection: 'row',
        marginBottom: 3
    },
    productName: {
        fontSize: 18,
        color: '#222'
    },
    productPri: {
        fontSize: 18,
        color: 'red'
    },
    op_btns: {
        marginTop: 10,
        marginBottom: 20,
        flexDirection: 'row'
    },
    add_cart: {
        borderWidth: 0.5,
        borderStyle: 'solid',
        borderColor: '#1890ff',
        marginRight: 20,
        color: '#1890ff'
    },
    add_coll: {
        borderColor: '#ddd',
        borderWidth: 1,
        borderStyle: 'solid',
        color: '#333'
    },
    shop_btn: {
        borderRadius: 10,
        height: 40,
        width: 120,
        textAlign: 'center',
        alignItems: 'center',
        lineHeight: 40,
        fontSize: 17
    },
    cart_icon_box: {
        position: 'absolute',
        right: 20,
        top: 10
    },
    cart_icon: {
        width: 30,
        height: 30
    }
});
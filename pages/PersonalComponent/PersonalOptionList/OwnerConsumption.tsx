import * as React from 'react';
import {
    View,
    Text,
    Image,
    Modal,
    StyleSheet,
    FlatList,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import appStyles from '../../styles/appStyles';
import FooComponent from '../../../components/fooComponent/FooComponent';
import NoData from '../../../components/noData/NoData';
import Loading from '../../../components/loading/Loading';
import SingleConsumption from './SingleComponent/SingleConsumption';
import {USER_CONSUMPTION_LIST} from '../../../methods/sqlStatements';
import {getUserId, replaceStr, mergeConsumotion} from "../../../methods/util";
import Fetch from "../../../methods/Fetch";
import NavigatorUtil from "../../../methods/NavigatorUtil";

const {width} = Dimensions.get('window');

export default class OwnerConsumption extends React.PureComponent {
    state = {
        consumptionData: [],
        singleConsumptionData: [],
        isLoading: false,
        isLoadOk: false,
        modalVisible: false,
        tigText: '暂无流水'
    };

    componentDidMount() {
        getUserId().then(userId => {
            let str = replaceStr(USER_CONSUMPTION_LIST, userId);
            Fetch({statements: str}).then(data => {
                let list = mergeConsumotion(data);
                this.setState({
                    consumptionData: list,
                    isLoadOk: true
                });
            });
        });
    }

    lookShop = (pCode) => {
        this.setModalVisible(true);
        let singleList = this.state.consumptionData.filter(item => item.p_code === pCode);
        this.setState({
            singleConsumptionData: singleList[0].shopList
        })
    };

    setModalVisible = (visible) => {
        this.setState({modalVisible: visible});
    };

    render() {
        const {consumptionData, isLoading, tigText, isLoadOk, modalVisible, singleConsumptionData} = this.state;
        if (!isLoadOk) {
            return <Loading/>
        }
        return (
            <View style={{...appStyles.flex, paddingLeft: 5, paddingRight: 5}}>
                <View style={styles.consump_header}>
                    <Text style={{...appStyles.f16, ...appStyles.textColor}}>交易类型</Text>
                    <Text
                        style={{...appStyles.f16, ...appStyles.textColor, width: 135, textAlign: 'center'}}>交易时间</Text>
                    <Text style={{...appStyles.f16, ...appStyles.textColor}}>交易总额</Text>
                    <Text style={{...appStyles.f16, ...appStyles.textColor}}>交易明细</Text>
                </View>
                <View>
                    <FlatList
                        data={consumptionData}
                        renderItem={({item, index}) => <SingleConsumption singleData={item} lookShop={this.lookShop}
                                                                          key={index}/>}
                        refreshing={isLoading}
                        ListFooterComponent={() => <FooComponent isLoading={isLoading}/>}
                        onEndReachedThreshold={0.5}
                        ListEmptyComponent={() => <NoData tigText={tigText}/>}
                    />
                </View>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                    presentationStyle="fullScreen"
                    onRequestClose={() => {
                        alert("Modal has been closed.");
                    }}
                >
                    <View style={styles.modal_box}>
                        <View style={styles.consump_header}>
                            <Text style={{
                                ...appStyles.f14, ...appStyles.textColor,
                                width: 100,
                                textAlign: 'center'
                            }}>商品名称</Text>
                            <Text
                                style={{...appStyles.f14, ...appStyles.textColor}}>商品图片</Text>
                            <Text style={{...appStyles.f14, ...appStyles.textColor}}>交易数量</Text>
                            <Text style={{...appStyles.f14, ...appStyles.textColor}}>交易价格</Text>
                        </View>
                        <View>
                            {
                                singleConsumptionData.length > 0 && singleConsumptionData.map((item, index) => (
                                    <View style={styles.con_single} key={index}>
                                        <Text numberOfLines={1}
                                              style={{
                                                  ...appStyles.f12, ...appStyles.textColor333,
                                                  width: 90
                                              }}>{item.shop_name}</Text>
                                        <TouchableOpacity
                                            activeOpacity={0.9}
                                            onPress={() => {
                                                this.setState({
                                                    modalVisible: false
                                                });
                                                NavigatorUtil.goPage('StorePage', {
                                                    name: item.shop_name,
                                                    productId: item.product_id,
                                                    shopId: item.shop_id
                                                });
                                            }}>
                                            <Image
                                                style={{width: 50, height: 50, marginLeft: -20}}
                                                source={{uri: item.shop_pic}}
                                            />
                                        </TouchableOpacity>
                                        <Text
                                            style={{...appStyles.f12, ...appStyles.textColor333}}>{item.shopValue}</Text>
                                        <Text
                                            style={{...appStyles.f12, ...appStyles.price}}>{parseFloat(item.shop_pri) * item.shopValue} 元</Text>
                                    </View>
                                ))
                            }
                        </View>
                        <View style={styles.modal_top}>
                            <Text
                                style={{fontSize: 36, color: '#444', textAlign: 'right'}}
                                onPress={() => {
                                    this.setState({
                                        modalVisible: false
                                    })
                                }}
                            >×</Text>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    consump_header: {
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        borderStyle: 'solid',
        borderColor: '#e5e5e5',
        borderBottomWidth: 1
    },
    modal_box: {
        width: width - 20,
        marginLeft: 10,
        padding: 10,
        marginTop: 30
    },
    con_single: {
        height: 80,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        borderStyle: 'solid',
        borderColor: '#e5e5e5',
        borderBottomWidth: 0.5
    },
    modal_top: {
        marginTop: 30,
        marginRight: 10
    }
});
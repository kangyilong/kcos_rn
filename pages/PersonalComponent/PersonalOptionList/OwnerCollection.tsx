import * as React from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    FlatList,
    ScrollView,
    Dimensions,
    ImageBackground,
    ActivityIndicator
} from 'react-native';
import SingleCollection from './SingleComponent/SingleCollection';
import NoData from '../../../components/noData/NoData';
import Loading from '../../../components/loading/Loading';
import FooComponent from '../../../components/fooComponent/FooComponent';
import {replaceStr, getUserId} from '../../../methods/util';
import {USER_COLLECTION_LIST, BATCH_DEL_COLL} from '../../../methods/sqlStatements';
import appStyles from '../../styles/appStyles';
import Fetch from "../../../methods/Fetch";
import {SELECT_ICON, UN_SELECT_ICON} from "../../../methods/requireImage";

let _this = null;
const {width} = Dimensions.get('window');

interface Props {
    navigation: any
}

export default class OwnerCollection extends React.PureComponent<Props, any> {
    static navigationOptions = ({navigation}) => {
        const {state} = navigation;
        const {params} = state;
        const btnTitle = params.btnTitle || '设置';
        return {
            title: '商品收藏',
            headerRight: (<Button title={btnTitle} onPress={() => {
                _this.setOwnerAddress();
            }}/>)
        }
    };
    userId = '';
    state = {
        isLoading: false,
        tigText: '暂无商品收藏',
        collectionData: [],
        shopIdList: [],
        shopIndexList: [],
        isLoadOk: false,
        isShow: false,
        isReset: false,
        isSetAll: false,
        isSetChange: false
    };
    setOwnerAddress = () => {
        const {navigation} = this.props;
        const {setParams, state} = navigation;
        const {params} = state;
        let tit = params.btnTitle === '设置' ? '完成' : '设置';
        let isShow = params.btnTitle === '设置';
        if (!params.btnTitle) {
            tit = '完成';
            isShow = true;
        }
        setParams({
            btnTitle: tit
        });
        this.setState({
            isShow,
            isReset: !this.state.isReset,
            isSetAll: false
        })
    };
    setSingleColl = (msg) => {
        const {shopIdList, shopIndexList, collectionData} = this.state;
        let list = shopIdList;
        let indexList = shopIndexList;
        let index = list.indexOf(msg.shop_id);
        let len = collectionData.length;
        if (index !== -1) {
            list.splice(index, 1);
            indexList.splice(index, 1);
        } else {
            list.push(msg.shop_id);
            indexList.push(msg.dIndex);
        }
        this.setState({
            shopIdList: list,
            shopIndexList: indexList,
            isSetAll: len === list.length
        })
    };
    deleteCollection = () => {
        let {shopIdList, shopIndexList, collectionData} = this.state;
        if (shopIdList.length === 0) {
            return false;
        }
        shopIndexList.forEach(item => {
            collectionData[item] = false;
        });
        let sql = '', len = shopIdList.length;
        shopIdList.forEach((item, index) => {
            if (index !== len - 1) {
                sql += `shop_id = '${item}' OR `
            } else {
                sql += `shop_id = '${item}'`
            }
        });
        console.log(BATCH_DEL_COLL({
            user_id: this.userId,
            sql
        }));
        Fetch({statements: BATCH_DEL_COLL({
                user_id: this.userId,
                sql
            })}).then(() => {
            collectionData = collectionData.filter(item => item);
            this.setState({
                collectionData,
                isReset: !this.state.isReset
            });
        });
    };

    async componentDidMount() {
        _this = this;
        this.userId = await getUserId();
        let statements = replaceStr(USER_COLLECTION_LIST, this.userId);
        Fetch({statements}).then(data => {
            this.setState({
                collectionData: data,
                isLoadOk: true
            })
        });
    }

    render() {
        const {collectionData, isLoading, tigText, isLoadOk, isShow, isReset, isSetAll, isSetChange} = this.state;
        if (!isLoadOk) {
            return <Loading/>
        }
        return (
            <View style={{paddingTop: 10, ...appStyles.flex, position: 'relative'}}>
                <ScrollView>
                    <FlatList
                        data={collectionData}
                        renderItem={({item, index}) => <SingleCollection
                            singleCollectionData={item}
                            key={index}
                            dIndex={index}
                            isShow={isShow}
                            isReset={isReset}
                            isSetAll={isSetAll}
                            isSetChange={isSetChange}
                            setSingleColl={this.setSingleColl}
                        />}
                        refreshing={isLoading}
                        ListFooterComponent={() => <FooComponent isLoading={isLoading}/>}
                        onEndReachedThreshold={0.5}
                        ListEmptyComponent={() => <NoData tigText={tigText}/>}
                        numColumns={2}
                        horizontal={false}
                    />
                </ScrollView>
                <View style={{...styles.cart_foo, opacity: isShow ? 1 : 0}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <ImageBackground
                            style={{width: 20, height: 20, marginRight: 6}}
                            source={isSetAll ? SELECT_ICON : UN_SELECT_ICON}
                        >
                            <Text style={appStyles.all_select} onPress={() => {
                                this.setState({
                                    isSetAll: !isSetAll,
                                    isSetChange: !isSetChange,
                                    shopIdList: !isSetAll ? collectionData.map(item => item.shop_id) : [],
                                    shopIndexList: !isSetAll ? collectionData.map((item, index) => index) : []
                                })
                            }}/>
                        </ImageBackground>
                        <Text style={{fontSize: 14}} onPress={() => {
                            this.setState({
                                isSetAll: !isSetAll,
                                isSetChange: !isSetChange,
                                shopIdList: !isSetAll ? collectionData.map(item => item.shop_id) : [],
                                shopIndexList: !isSetAll ? collectionData.map((item, index) => index) : []
                            })
                        }}>全选</Text>
                    </View>
                    <View>
                        <Text style={styles.shop_del} onPress={this.deleteCollection}>移出收藏</Text>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    cart_foo: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width,
        backgroundColor: '#fff',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 40,
        justifyContent: 'space-between'
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
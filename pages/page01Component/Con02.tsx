import React, {useState, useEffect, useCallback} from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    Image,
    FlatList,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import ShopSingle from './Single';
import FETCH from '../../methods/Fetch';

const {width} = Dimensions.get('window');

interface Props {
    navigation: any
}

export default function Con02Component(props: Props) {
    const [shopMsg, setShopMsg] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const getShopMsg = useCallback(() => {
        let statements = `SELECT product_id, shop_id, shop_pic, shop_pri, shop_name, shop_txt FROM shopMsg`;
        FETCH({statements}).then(data => {
            let obj = {};
            let arr = [];
            data.forEach((item: any) => {
                if(obj[item.product_id]) {
                    obj[item.product_id].push(item);
                }else {
                    obj[item.product_id] = [item];
                    arr.push(obj[item.product_id]);
                }
            });
            setShopMsg(arr);
            setIsLoading(false);
        }, () => {
            setIsLoading(false);
        });
    }, []);
    const fooComponent = useCallback(() => (
        <View style={styles.indicatorView}>
            <ActivityIndicator
                style={styles.indicator}
                animating={true}
            />
            <Text style={styles.indicatorText}>loading...</Text>
        </View>
    ), []);
    const _endReached = useCallback(() => {
        // console.log(1);
    }, []);
    const emptyComponent = useCallback(() => {
        return <View style={{
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Text style={{
                fontSize: 16
            }}>暂无数据下拉刷新</Text>
        </View>
    }, []);
    useEffect(() => {
        getShopMsg();
    }, []);
    return (
        <View style={styles.con02}>
            <View style={styles.box}>
                <FlatList
                    data={shopMsg}
                    renderItem={({item, index}) => (<ShopSingle singleData={item} key={index} navigation={props.navigation}/>)}
                    refreshing={isLoading}
                    ListFooterComponent={fooComponent}
                    onEndReached={_endReached}
                    // ListEmptyComponent={emptyComponent}
                    onEndReachedThreshold={0.5}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    con02: {
        overflow: 'hidden',
        backgroundColor: '#fff'
    },
    box: {
        width: width,
        flexWrap: 'wrap'
    },
    show: {
        display: 'flex'
    },
    none: {
        display: 'none'
    },
    indicatorView: {
        marginBottom: 20,
        alignItems: 'center',
        paddingTop: 10
    },
    indicator: {
        marginBottom: 10
    },
    indicatorText: {
        color: 'green',
        fontSize: 15
    }
});
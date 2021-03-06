import * as React from 'react';
import {useState, useEffect, useCallback} from 'react';
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
import { HOMEPAGE_SHOP_LIST, SCREENING_HOMEPAGE_SHOP } from '../../methods/sqlStatements';
import {replaceStr} from "../../methods/util";

const {width} = Dimensions.get('window');

interface Props {
    isScreening: boolean,
    conditions: {
        key: string,
        value: string
    }
}

export default function Con02Component(props: Props) {
    const [shopMsg, setShopMsg] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const getShopMsg = useCallback(() => {
        let sql = '', params = {};
        if(props.isScreening && props.conditions.value !== '全部') {
            sql = replaceStr(SCREENING_HOMEPAGE_SHOP, props.conditions.key);
            params = {statements: sql, parameter: JSON.stringify([props.conditions.value])}
        }else {
            sql = HOMEPAGE_SHOP_LIST;
            params = {statements: sql};
        }
        FETCH(params).then(data => {
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
    }, [props.conditions]);
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
    }, [props.conditions]);
    return (
        <View style={styles.con02}>
            <View style={styles.box}>
                <FlatList
                    data={shopMsg}
                    renderItem={({item, index}) => (<ShopSingle singleData={item} key={index}/>)}
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
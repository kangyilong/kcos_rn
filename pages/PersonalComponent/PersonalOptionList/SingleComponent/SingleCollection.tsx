import * as React from 'react';
import {useState, useCallback, useEffect} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import appStyles from '../../../styles/appStyles';
import NavigatorUtil from "../../../../methods/NavigatorUtil";

const {width} = Dimensions.get('window');

interface Props {
    singleCollectionData: any
}

export default function SingleCollection(props: Props) {
    const {shop_pic = '', shop_id, shop_name, product_id, shop_pri} = props.singleCollectionData;
    const callectionDetails = useCallback((params) => {
        NavigatorUtil.goPage('StorePage', params);
    }, []);
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => callectionDetails({
                name: shop_name,
                productId: product_id,
                shopId: shop_id
            })}
        >
            <View style={styles.single_collection}>
                <View style={{alignItems: 'center'}}>
                    <Image
                        style={styles.coll_img}
                        source={{uri: shop_pic}}
                    />
                </View>
                <View style={styles.foo_box}>
                    <Text
                        numberOfLines={1}
                        style={{...appStyles.f16, ...appStyles.textColor, marginBottom: 6}}
                    >{shop_name}</Text>
                    <Text style={{...appStyles.f20, ...appStyles.price}}>{shop_pri} 元</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    single_collection: {
        width: width / 2 - 30,
        paddingTop: 6,
        paddingBottom: 20,
        marginLeft: 20
    },
    coll_img: {
        width: width / 2 - 30 - 20,
        height: 120,
        borderRadius: 6
    },
    foo_box: {
        marginTop: 6,
        alignItems: 'center'
    }
});
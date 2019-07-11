import * as React from 'react';
import {useState, useCallback, useEffect} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ImageBackground
} from 'react-native';
import appStyles from '../../../styles/appStyles';
import NavigatorUtil from "../../../../methods/NavigatorUtil";
import {SELECT_ICON, UN_SELECT_ICON} from "../../../../methods/requireImage";

const {width} = Dimensions.get('window');

interface Props {
    singleCollectionData: any,
    isShow: boolean,
    isReset: boolean,
    isSetAll: boolean,
    isSetChange: boolean,
    dIndex: number,
    setSingleColl: Function
}

export default function SingleCollection(props: Props) {
    const {isShow, isReset, isSetAll, isSetChange, dIndex, singleCollectionData, setSingleColl} = props;
    const {shop_pic = '', shop_id, shop_name, product_id, shop_pri} = singleCollectionData;
    const [isShowIcon, setIsShowIcon] = useState(false);
    const callectionDetails = useCallback((params) => {
        NavigatorUtil.goPage('StorePage', params);
    }, []);
    const showIcon = useCallback(() => {
        setIsShowIcon(!isShowIcon);
        setSingleColl({shop_id, dIndex});
    }, [isShowIcon]);
    useEffect(() => {
        setIsShowIcon(false);
    }, [isReset]);
    useEffect(() => {
        setIsShowIcon(isSetAll);
    }, [isSetChange]);
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
                <ImageBackground
                    style={{width: 20, height: 20, position: 'absolute', top: 0, right: 6, opacity: isShow ? 1 : 0}}
                    source={isShowIcon ? SELECT_ICON : UN_SELECT_ICON}
                >
                    <Text
                        style={{...appStyles.all_select}}
                        onPress={showIcon}
                    />
                </ImageBackground>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    single_collection: {
        width: width / 2 - 30,
        paddingTop: 6,
        paddingBottom: 20,
        marginLeft: 20,
        position: 'relative'
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
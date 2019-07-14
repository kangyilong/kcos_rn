import * as React from 'react';
import {useState, useCallback, useEffect} from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    StyleSheet,
    Dimensions,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import appStyles from "../../styles/appStyles";
import {SELECT_ICON, UN_SELECT_ICON} from "../../../methods/requireImage";

const {width} = Dimensions.get('window');

interface Props {
    defIndex: number,
    singleMsg: any,
    isSelAll: boolean,
    isChange: boolean,
    selectSingleShop: Function,
    optionSingleShop: Function
}
export default function SingleShopMsg(props: Props) {
    const { singleMsg, defIndex, selectSingleShop, optionSingleShop } = props;
    const { shop_name, shop_pic, shop_pri, shop_val, shop_id } = singleMsg;
    const [iupNumber, setInpNumber] = useState(shop_val.toString());
    const [isShowIcon, setIsShowIcon] = useState(false);
    const addShopNumber = useCallback(() => {
        let num = +iupNumber;
        num ++;
        setInpNumber(num.toString());
        optionSingleShop({num, index: defIndex});
        if(isShowIcon) {
            selectSingleShop({shop_id, shop_val: num, shop_pri, index: defIndex}, 'OPTION');
        }
    }, [iupNumber, isShowIcon]);
    const subShopNumber = useCallback(() => {
        let num = +iupNumber;
        if(num > 1) {
            num --;
            setInpNumber(num.toString());
            optionSingleShop({num, index: defIndex});
            if(isShowIcon) {
                selectSingleShop({shop_id, shop_val: num, shop_pri, index: defIndex}, 'OPTION');
            }
        }
        return;
    }, [iupNumber, isShowIcon]);
    useEffect(() => {
        setIsShowIcon(props.isSelAll);
    }, [props.isChange]);
    useEffect(() => {
        setInpNumber(shop_val.toString());
    }, [shop_val]);
    return (
        <View style={styles.shop_single_box}>
            <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                activeOpacity={0.9}
                onPress={() => {
                    setIsShowIcon(!isShowIcon);
                    selectSingleShop({shop_id, shop_val: iupNumber, shop_pri, index: defIndex});
                }}
            >
                <ImageBackground
                    style={{width: 20, height: 20}}
                    source={isShowIcon ? SELECT_ICON : UN_SELECT_ICON}
                >
                    <Text style={styles.all_select}/>
                </ImageBackground>
                <Image
                    style={{width: 100, height: 100}}
                    source={{uri: shop_pic}}
                />
            </TouchableOpacity>
            <View style={{marginLeft: 10}}>
                <Text style={styles.shop_name} numberOfLines={1}>{shop_name}</Text>
                <Text style={styles.shop_det}>{shop_name.indexOf('-') !== -1 ? shop_name.split('-')[1] : ''}</Text>
                <View style={styles.shop_foo}>
                    <Text style={{...appStyles.price, fontSize: 18}}>￥{shop_pri}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{...styles.op}} onPress={subShopNumber}>-</Text>
                        <TextInput style={styles.iup} value={iupNumber}/>
                        <Text style={{...styles.op}} onPress={addShopNumber}>+</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    shop_single_box: {
        padding: 10,
        marginTop: 15,
        borderRadius: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center'
    },
    shop_name: {
        color: '#091E42',
        fontSize: 18,
        marginBottom: 10
    },
    shop_det: {
        fontSize: 14,
        color: '#666',
        marginBottom: 15
    },
    shop_foo: {
        width: width - 175,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    op: {
        height: 30,
        width: 35,
        lineHeight: 30,
        textAlign: 'center',
        color: '#333',
        borderStyle: 'solid',
        borderColor: '#eee',
        borderWidth: 0.5
    },
    iup: {
        borderStyle: 'solid',
        borderWidth: 0.5,
        borderColor: '#eee',
        textAlign: 'center',
        width: 40,
        height: 30
    },
    all_select: {
        width: 20,
        height: 20,
        borderStyle: 'solid',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        overflow: 'hidden'
    },
});
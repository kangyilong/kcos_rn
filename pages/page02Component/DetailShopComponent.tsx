import * as React from 'react';
import {useState, useCallback, useEffect} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions
} from 'react-native';
import { GET_SHOP_DETMSG } from '../../methods/sqlStatements';
import Fetch from "../../methods/Fetch";

const {width} = Dimensions.get('window');

interface Props {
    product_id: string
}
export default function DetailShopComponent(props: Props) {
    const [shopMsgList, setShopMsgList] = useState([]);
    const getShopDetailMsg = useCallback(() => {
        Fetch({statements: GET_SHOP_DETMSG, parameter: JSON.stringify([props.product_id])}).then(data => {
            let list = JSON.parse(data[0].product_det);
            console.log(list);
            setShopMsgList(list);
        });
    }, [props.product_id]);
    useEffect(() => {
        getShopDetailMsg();
    }, [props.product_id]);
    return (
        <View style={{marginTop: 30}}>
            <View>
                <Text style={styles.det_header_tit}>产品信息</Text>
            </View>
            <View style={styles.det_shop_box}>
                {
                    shopMsgList.length > 0 && shopMsgList.map((item, index) => (
                        <Image
                            key={index}
                            style={styles.det_image}
                            source={{uri: item.detImg}}
                        />
                    ))
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    det_header_tit: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333'
    },
    det_shop_box: {
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 15
    },
    det_image: {
        width: width - 20
    }
});
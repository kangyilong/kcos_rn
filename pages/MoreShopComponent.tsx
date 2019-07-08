import * as React from 'react';
import {useState, useCallback, useEffect} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { OTHER_SHOP_LIST } from '../methods/sqlStatements';
import appStyles from "./styles/appStyles";
import Fetch from "../methods/Fetch";
import { getProductFirst } from '../methods/util';
import Loading from "../components/loading/Loading";
import NavigatorUtil from "../methods/NavigatorUtil";

const { width } = Dimensions.get('window');

interface Props {
    shopMsg: {
        productId: string,
        shopId: string
    }
}
export default function MoreShopComponent(props: Props) {
    const [otherShopList, setOtherShopList] = useState([]);
    const getOtherShop = useCallback(() => {
        Fetch({
            statements: OTHER_SHOP_LIST,
            parameter: JSON.stringify([props.shopMsg.productId])
        }).then(data => {
            setOtherShopList(getProductFirst(data));
        });
    }, [props.shopMsg]);
    useEffect(() => {
        getOtherShop();
    }, [props.shopMsg]);
    if(otherShopList.length === 0) {
        return <Loading />
    }
    return (
        <View>
            <View style={styled.more_shop_tit}>
                <Text style={{...appStyles.f20, ...appStyles.textColor333, fontWeight: '600'}}>其他商品</Text>
            </View>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={true}
            >
                {
                     otherShopList.map((item, index) => (
                         <TouchableOpacity
                             key={index}
                             activeOpacity={0.9}
                             onPress={() => {
                                 NavigatorUtil.goPage('StorePage', {
                                     name: item.shop_name,
                                     productId: item.product_id,
                                     shopId: item.shop_id
                                 });
                             }}
                         >
                             <View style={styled.shopSingle}>
                                 <View style={styled.imgBox}>
                                     <Image
                                         style={styled.img}
                                         source={{uri: item.shop_pic}}
                                     />
                                 </View>
                                 <View>
                                     <Text style={styled.shopName}>{item.shop_name}</Text>
                                     <Text style={styled.shopPic}>{item.shop_pri} 元</Text>
                                 </View>
                             </View>
                         </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </View>
    )
}

const styled = StyleSheet.create({
    more_shop_tit: {
        marginBottom: 10,
        paddingLeft: 10
    },
    shopSingle: {
        width: width / 2
    },
    imgBox: {
        padding: 10
    },
    img: {
        width: width / 2 - 20,
        height: 120
    },
    shopName: {
        color: '#23527c',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 6
    },
    shopPic: {
        color: '#f96868',
        fontSize: 14,
        textAlign: 'center'
    }
});
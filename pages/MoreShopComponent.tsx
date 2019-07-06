import * as React from 'react';
import {useState, useCallback, useEffect} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');

export default function MoreShopComponent() {
    const [otherShopList, setOtherShopList] = useState([1, 2, 3, 4, 5, 6]);
    return (
        <View style={styled.moreShop}>
            {
                otherShopList.length > 0 && otherShopList.map((item, index) => (
                    <View style={styled.shopSingle} key={index}>
                        <View style={styled.imgBox}>
                            <Image
                                style={styled.img}
                                source={require('../assets/images/y3.png')}
                            />
                        </View>
                        <View style={styled.txtBox}>
                            <Text style={styled.shopName}>入耳式耳机</Text>
                            <Text style={styled.shopPic}>199.00元</Text>
                        </View>
                    </View>
                ))
            }
        </View>
    )
}

const styled = StyleSheet.create({
    moreShop: {
        flexDirection: 'row',
        overflow: 'scroll',
        marginTop: 30
    },
    shopSingle: {
        width: width / 4
    },
    imgBox: {
        padding: 10
    },
    img: {
        width: width / 4 - 20,
        height: 200
    },
    txtBox: {
        marginTop: 10
    },
    shopName: {
        color: '#23527c',
        fontSize: 16
    },
    shopPic: {
        color: '#f96868',
        fontSize: 14
    }
});
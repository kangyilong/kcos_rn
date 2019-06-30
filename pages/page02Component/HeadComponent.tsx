import React, {useState, useEffect, useCallback} from 'react';
import {
    View,
    Text,
    Button,
    Image,
    StyleSheet,
    Dimensions,
    FlatList,
    RefreshControl,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';

import FETCH from '../../methods/Fetch';

const { width, height } = Dimensions.get('window');

interface Props {
    navigation: {
        navigate: Function,
        goBack: Function,
        state: {
            params: {
                name: string,
                productId: string,
                selIndex: number
            }
        }
    }
}

export default function(props: Props) {
    const [headerImageData, setHeaderImageData] = useState([]);
    const [imgSize, setImgSize] = useState(0);
    const [sIndex, setIndex] = useState(0);
    const getShopDetail = useCallback(() => {
        const { navigation } = props;
        const { state } = navigation;
        const { params } = state;
        if(!params) {
            setTimeout(() => {
                navigation.goBack();
            }, 1000);
            return;
        }
        setIndex(params.selIndex);
        FETCH({
            statements: `SELECT shop_id, shop_pic, shop_pri, shop_Num, shop_txt, shop_name FROM shopMsg WHERE product_id = '${params.productId}'`
        }).then(data => {
            setHeaderImageData(data);
            Image.getSize(data[0].shop_pic, (width, height) => {
                setImgSize(height / width);
            }, (err) => {
                console.log(err);
            });
        })
    }, []);
    useEffect(() => {
        getShopDetail();
    }, []);
    return (
        <>
            {
                headerImageData.length > 0 ? (
                    <View style={styles.shopDetailHeader}>
                        <View style={styles.headerImage}>
                            <Image
                                style={{...styles.hImage, height: width * imgSize * 0.7}}
                                source={{uri: headerImageData[sIndex].shop_pic}}
                            />
                        </View>
                        <View style={styles.headerImgList}>
                            {
                                headerImageData.map((imageItem, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => {
                                            setIndex(index)
                                        }}
                                    >
                                        <View style={{...styles.fooSingle, borderColor: sIndex === index ? '#abcdef' : '#ccc'}}>
                                            <Image
                                                style={{...styles.fImage, height: (width / 5 - 10) * imgSize}}
                                                source={{uri: imageItem.shop_pic}}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                        <View style={styles.headerFoo}>
                            <View style={styles.productCon}>
                                <Text style={styles.productName}>{headerImageData[sIndex].shop_name}：</Text>
                                <Text style={styles.productPri}>{headerImageData[sIndex].shop_pri} 元</Text>
                            </View>
                            <Text style={styles.productTxt}>{headerImageData[sIndex].shop_txt}</Text>
                        </View>
                    </View>
                ) : null
            }
        </>
    )
}

const styles = StyleSheet.create({
    shopDetailHeader: {
        width: width,
        paddingBottom: 20
    },
    headerImage: {
        width: width,
        paddingTop: 20,
        marginBottom: 15,
        justifyContent: 'center'
    },
    hImage: {
        width: width
    },
    headerImgList: {
        flexDirection: 'row'
    },
    fooSingle: {
        width: width / 5 - 10,
        marginLeft: 10,
        borderWidth: 1,
        borderStyle: 'solid',
        overflow: 'hidden'
    },
    fImage: {
        width: width / 5 - 10,
    },
    headerFoo: {
        marginTop: 20,
        paddingLeft: 10,
        paddingRight: 10
    },
    productTxt: {
        fontSize: 14,
        color: '#555'
    },
    productCon: {
        flexDirection: 'row',
        marginBottom: 3
    },
    productName: {
        fontSize: 18,
        color: '#222'
    },
    productPri: {
        fontSize: 18,
        color: 'red'
    }
});
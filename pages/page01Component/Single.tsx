import * as React from 'react';
import {useState, useCallback, useEffect} from 'react';
import {
    View,
    Text,
    Image,
    Button,
    Dimensions,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import NavigatorUtil from '../../methods/NavigatorUtil';

const {width} = Dimensions.get('window');

interface Props {
    singleData: Array<any>
}

export default function ShopSingle(props: Props) {
    const [selIndex, setSelIndex] = useState(0);
    const [imgSize, setImgSize] = useState(0);
    const getImageSize = useCallback(() => {
        Image.getSize(props.singleData[selIndex].shop_pic, (width, height) => {
            setImgSize(height / width);
        }, (err) => {
            console.log(err);
        });
    }, []);
    useEffect(() => {
        getImageSize();
    }, []);
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
                NavigatorUtil.goPage('StorePage', {
                    name: props.singleData[selIndex].shop_name,
                    productId: props.singleData[selIndex].product_id,
                    shopId: props.singleData[selIndex].shop_id
                });
            }}
            style={styled.single}
        >
            <View style={styled.imageBox}>
                <View style={styled.imgList}>
                    <Image
                        source={{uri: props.singleData[selIndex].shop_pic}}
                        style={{...styled.image, height: (width - 120) * imgSize}}
                    />
                    <View style={styled.solt}>
                        {
                            props.singleData.length > 0 && props.singleData.map((soltItem, index) => (
                              <TouchableOpacity
                                  activeOpacity={0.9}
                                  onPress={() => {
                                  setSelIndex(index);
                              }} key={index}>
                                  <View
                                      style={{...styled.singleSolt, borderColor: selIndex === index ? 'red' : '#ccc' }}
                                  >
                                  </View>
                              </TouchableOpacity>
                            ))
                        }
                    </View>
                </View>
                <View style={{marginTop: 5}}>
                    <Text style={styled.tit}>{props.singleData[selIndex].shop_name}</Text>
                </View>
                <View style={{marginTop: 5}}>
                    <Text style={styled.txt}>{props.singleData[selIndex].shop_txt}</Text>
                </View>
                <View style={{marginTop: 5}}>
                    <Text style={styled.price}>{props.singleData[selIndex].shop_pri}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styled = StyleSheet.create({
    single: {
        width: width,
        padding: 10
    },
    imageBox: {
        paddingBottom: 20
    },
    imgList: {
        flexDirection: 'row',
        overflow: 'hidden',
        position: 'relative',
        justifyContent: 'center'
    },
    solt: {
        position: 'absolute',
        bottom: 2,
        width: width,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    singleSolt: {
        width: 14,
        height: 14,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 14,
        marginRight: 7
    },
    image: {
        width: width - 120
    },
    tit: {
        fontSize: 18,
        textAlign: 'center'
    },
    txt: {
        fontSize: 12,
        color: '#999',
        textAlign: 'center'
    },
    price: {
        fontSize: 17,
        color: '#c30a18',
        textAlign: 'center'
    }
});
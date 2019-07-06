import * as React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    Text
} from 'react-native';

const con01Data = [
    {
        pic: require('../../assets/images/1495693824.png'),
        tit: '配件周边',
        txt: '开售提醒 参与抽奖'
    }, {
        pic: require('../../assets/images/1495697648.png'),
        tit: '热门产品',
        txt: '周一上午10:00 限时开抢'
    }, {
        pic: require('../../assets/images/1495693914.png'),
        tit: '线下聚会',
        txt: '来自五湖四海 志趣相投'
    }, {
        pic: require('../../assets/images/1495693941.png'),
        tit: '旅游活动',
        txt: '带上PRO 放下单反'
    }
];

const { width } = Dimensions.get('window');

export default function Con01Component() {
    return (
        <View style={styles.con01Box}>
            {
                Array.isArray(con01Data) && con01Data.map((item, index) => (
                    <View style={styles.con01Singe} key={index}>
                        <Image source={item.pic} style={{width: 100}} height={50}/>
                        <Text style={styles.tit}>{item.tit}</Text>
                        <Text style={styles.txt}>{item.txt}</Text>
                    </View>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    text: {
        fontSize: 12
    },
    con01Box: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBottom: 30,
        marginBottom: 20,
        backgroundColor: '#fff'
    },
    con01Singe: {
        marginRight: 10,
        marginLeft: 10,
        marginTop: 10,
        width: width / 2 - 20,
        alignItems: 'center'
    },
    tit: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5
    },
    txt: {
        fontSize: 12,
        color: '#666'
    }
});
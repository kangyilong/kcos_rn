import * as React from 'react';
import {useState, useCallback, useEffect} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import {ADDRESS_ICON, RIGHT} from '../../../methods/requireImage';
import appStyles from "../../styles/appStyles";

export default function OrderAddress() {
    return (
        <View style={styles.address_con}>
            <View style={styles.address_left}>
                <View>
                    <Image
                        style={{width: 30, height: 40}}
                        source={ADDRESS_ICON}
                    />
                </View>
                <View style={styles.right}>
                    <View style={styles.right_head}>
                        <Text style={appStyles.f18}>ksy</Text>
                        <Text style={{fontSize: 14, color: '#333', marginLeft: 5}}>13030522115</Text>
                    </View>
                    <Text numberOfLines={1} style={{fontSize: 14, color: '#111', marginTop: 6}}>马鞍山雅苑</Text>
                </View>
            </View>
            <View style={styles.address_right}>
                <Image
                    style={{width: 25, height: 25}}
                    source={RIGHT}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    address_con: {
        backgroundColor: '#fff',
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 10,
        paddingRight: 0,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    address_left: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    address_right: {},
    right: {
        marginLeft: 10
    },
    right_head: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    }
});
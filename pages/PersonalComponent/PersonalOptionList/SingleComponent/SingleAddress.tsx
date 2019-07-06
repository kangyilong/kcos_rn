import * as React from 'react';
import {useState, useCallback, useEffect} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import {UN_SELECT_ICON, SELECT_ICON, EXIT_ICON, DELETE_ICON} from '../../../../methods/requireImage';
import appStyles from "../../../styles/appStyles";

interface Props {
    singleData: any,
    setOwnerAddress: Function,
    showOrHide: boolean
}

export default function SingleAddress(props: Props) {
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {props.setOwnerAddress(112312)}}
        >
            <View style={styles.single_address}>
                <View style={styles.address_con}>
                    <View>
                        <Image
                            style={props.showOrHide ? styles.left_image : {}}
                            source={props.showOrHide ? UN_SELECT_ICON : null}
                        />
                    </View>
                    <View>
                        <Text style={{...appStyles.f18, marginBottom: 5}}>ksy-13030522115</Text>
                        <Text numberOfLines={1} style={appStyles.f14}>江西省吉安市永新县象形乡</Text>
                    </View>
                </View>
                <View style={{...styles.address_right, display: props.showOrHide ? 'flex' : 'none'}}>
                    <Image
                        style={styles.right_icon}
                        source={EXIT_ICON}
                    />
                    <Image
                        style={styles.right_icon}
                        source={DELETE_ICON}
                    />
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    single_address: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 70,
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomWidth: 0.5,
        borderColor: '#e1e1e1',
        borderStyle: 'solid',
        backgroundColor: '#f5f5f5',
        justifyContent: 'space-between'
    },
    address_con: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    left_image: {
        width: 25,
        height: 25,
        marginRight: 10
    },
    address_right: {
        width: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    right_icon: {
        width: 16,
        height: 16
    }
});
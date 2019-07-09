import * as React from 'react';
import {useState, useCallback, useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';
import appStyles from "../../pages/styles/appStyles";

const { width } = Dimensions.get('window');

interface Props {
    toastMsg: string,
    isShow: boolean
}
export default function ToastMsg(props: Props) {
    const isShow = props.isShow;
    return (
        <View style={isShow ? styles.toast_box : appStyles.none}>
            <Text style={{color: '#fff', ...appStyles.f16}}>{props.toastMsg}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    toast_box: {
        display: 'flex',
        position: 'absolute',
        top: 60,
        left: width / 2 - 50,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 18,
        paddingRight: 18,
        borderRadius: 8
        // transform: [{ translateX: -100 }]
    }
});
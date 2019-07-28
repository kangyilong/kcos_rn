import * as React from 'react';

import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ActivityIndicator
} from 'react-native';

const {width} = Dimensions.get('window');

interface Props {
    isShow: boolean
}
export default function ToastLoading(props: Props) {
    const isShow = props.isShow;
    if(!isShow) {
        return null;
    }
    return (
        <View style={styled.loadBox}>
            <ActivityIndicator
                style={styled.indicator}
                size="large"
                color="#111"
                animating={true}
            />
        </View>
    )
}

const styled = StyleSheet.create({
    loadBox: {
        position: 'absolute',
        top: 100,
        right: width / 2 - 50,
        width: 100
    },
    indicator: {
        marginBottom: 6
    },
    loadText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#333'
    }
});
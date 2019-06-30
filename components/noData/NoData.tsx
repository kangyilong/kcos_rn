import React from 'react';

import {
    View,
    Text,
    Dimensions,
    StyleSheet
} from 'react-native';

const {width} = Dimensions.get('window');

export default function NoData() {
    return (
        <View style={styled.noDataBox}>
            <Text style={styled.noDataText}>暂无数据</Text>
        </View>
    )
}

const styled = StyleSheet.create({
    noDataBox: {
        width: width,
        height: width / 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noDataText: {
        fontSize: 18,
        color: '#555',
        whiteSpace: 0.1
    }
});
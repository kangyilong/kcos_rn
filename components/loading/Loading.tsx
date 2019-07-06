import * as React from 'react';

import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    ActivityIndicator
} from 'react-native';

export default function Loading() {
    return (
        <View style={styled.loadBox}>
            <ActivityIndicator
                style={styled.indicator}
                animating={true}
            />
            <Text style={styled.loadText}>Loading...</Text>
        </View>
    )
}

const styled = StyleSheet.create({
    loadBox: {
        flex: 1,
        paddingTop: 100
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
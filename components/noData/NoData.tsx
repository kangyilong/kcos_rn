import * as React from 'react';

import {
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet
} from 'react-native';

import { NO_DATA_ICON } from '../../methods/requireImage';

const {width} = Dimensions.get('window');

export default function NoData(props) {
    const { tigText } = props;
    return (
        <View style={styled.noDataBox}>
            <View>
                <Image
                    style={styled.no_img}
                    source={NO_DATA_ICON}
                />
            </View>
            <View><Text style={styled.noDataText}>{tigText}</Text></View>
        </View>
    )
}

const styled = StyleSheet.create({
    noDataBox: {
        width: width,
        height: width / 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100
    },
    no_img: {
        width: width / 2,
        height: width / 2,
        marginBottom: 30
    },
    noDataText: {
        fontSize: 18,
        color: '#555',
        marginBottom: 50
    }
});
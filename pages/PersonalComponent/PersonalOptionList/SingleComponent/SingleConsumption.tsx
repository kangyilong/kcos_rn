import * as React from 'react';
import {useState, useCallback, useEffect} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import moment from 'moment';
import appStyles from "../../../styles/appStyles";

interface Props {
    singleData: any,
    lookShop: Function
}
export default function SingleConsumption(props: Props) {
    const { singleData, lookShop } = props;
    return (
        <View style={styles.single_consump}>
            <Text style={{...appStyles.f12, ...appStyles.textColor333, width: 50}}>{singleData.run_type}</Text>
            <Text style={{...appStyles.f12, ...appStyles.textColor333, width: 135, textAlign: 'center'}}>{moment(parseInt(singleData.run_time)).format('YYYY-MM-DD HH:mm:ss')}</Text>
            <Text numberOfLines={1} style={{...appStyles.f12, ...appStyles.textColor333, ...appStyles.price}}>{singleData.money_run} 元</Text>
            <Text
                style={{...appStyles.hrefColor, ...appStyles.f12}}
                onPress={() => {lookShop(singleData.p_code)}}
            >查看商品</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    single_consump: {
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        borderStyle: 'solid',
        borderColor: '#e5e5e5',
        borderBottomWidth: 0.5
    }
});
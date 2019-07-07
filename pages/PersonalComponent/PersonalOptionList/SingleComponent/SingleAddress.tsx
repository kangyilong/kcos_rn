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
import { SET_ADDRESS_DEFAULTE, DEL_ADDRESS_DEFAULTE } from '../../../../methods/sqlStatements';
import appStyles from "../../../styles/appStyles";
import Fetch from "../../../../methods/Fetch";
import {getUserId, replaceStr} from "../../../../methods/util";

interface Props {
    singleData: any,
    setOwnerAddress: Function,
    resetAddressData: Function,
    isShowToast: Function,
    showOrHide: boolean
}

export default function SingleAddress(props: Props) {
    const selectDefault = useCallback(() => {
        let isNo = !!props.singleData.is_default;
        getUserId().then(userId => {
            const { address_id } = props.singleData;
            let sql = replaceStr(SET_ADDRESS_DEFAULTE, address_id);
            let del_sql = replaceStr(DEL_ADDRESS_DEFAULTE, address_id, '%');
            del_sql = replaceStr(del_sql, userId);
            if(!isNo) {
                sql = replaceStr(sql, 1, '$');
                Promise.all([
                    Fetch({statements: sql}),
                    Fetch({statements: del_sql})
                ]).then(() => {
                    props.isShowToast();
                    props.resetAddressData();
                });
            }
        });
    }, [props.singleData]);
    const {user_name, user_province, user_city, user_county, user_area, user_mobile, is_default} = props.singleData;
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {props.setOwnerAddress(112312)}}
        >
            <View style={styles.single_address}>
                <View style={styles.address_con}>
                    <View>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={selectDefault}
                        >
                            <Image
                                style={props.showOrHide ? styles.left_image : {}}
                                source={props.showOrHide ? is_default ? SELECT_ICON : UN_SELECT_ICON : null}
                            />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={{...appStyles.f18, marginBottom: 5}}>{user_name}-{user_mobile}</Text>
                        <Text numberOfLines={1} style={appStyles.f14}>{user_province}{user_city}{user_county}{user_area}</Text>
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
        marginRight: 16
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
import * as React from 'react';
import {
    View,
    Button,
    Text,
    TextInput,
    FlatList,
    Modal,
    StyleSheet,
    Keyboard,
    Dimensions,
    Platform,
    TouchableOpacity
} from 'react-native';
import Picker from 'react-native-picker';
import FooComponent from '../../../components/fooComponent/FooComponent';
import NoData from '../../../components/noData/NoData';
import SingleAddress from './SingleComponent/SingleAddress';
import ToastMsg from '../../../components/toastMsg/ToastMsg';
import appStyles from "../../styles/appStyles";
import {getUserId, replaceStr} from "../../../methods/util";
import {
    OWNER_ADDRESS_LIST,
    GET_SINGLE_ADDRESS,
    EDIT_ADDRESS_DATA,
    ADD_ADDRESS_DATA,
    DELETE_ADDRESS
} from "../../../methods/sqlStatements";
import Fetch from "../../../methods/Fetch";
import Loading from "../../../components/loading/Loading";
import ToastLoading from "../../../components/toastLoading/ToastLoading";
import {cityDataFn} from '../../../methods/util';

let _this = null;
const {width} = Dimensions.get('window');

interface Props {
    navigation: any
}

export default class OwnerAddress extends React.PureComponent<Props, any> {
    static navigationOptions = ({navigation}) => {
        const {state} = navigation;
        const {params} = state;
        let btnTitle = '设置', mode = 'cancel';
        if (!!params.btnTitle) {
            btnTitle = params.btnTitle;
        }
        if (!!params.mode) {
            mode = params.mode;
        }
        return {
            title: '收货地址',
            headerRight: (<Button title={btnTitle} onPress={() => {
                _this.setOwnerAddress(mode);
            }}/>)
        }
    };
    state = {
        addressData: [],
        isLoading: false,
        isLoadOk: false,
        showOrHide: false,
        isShow: false,
        modalVisible: false,
        isShowMengCeng: false,
        isShowToastLoading: false,
        toastMsg: '',
        tigText: '还未添加地址哦',
        language: '',
        params: {
            user_name: '',
            user_mobile: '',
            user_province: '',
            user_city: '',
            user_county: '',
            user_area: '',
            address_id: '',
            user_id: '',
            is_default: 0
        },
        companyAreaArray: [],
        userCity: '',
        userId: ''
    };

    setOwnerAddress = (type) => {
        const {navigation} = this.props;
        const {setParams} = navigation;
        switch (type) {
            case 'cancel':
                setParams({btnTitle: '取消', mode: 'set'});
                this.setState({
                    showOrHide: true
                });
                break;
            case 'set':
                setParams({btnTitle: '设置', mode: 'cancel'});
                this.setState({
                    showOrHide: false
                });
                break;
        }
    };

    getAddressData = () => {
        let str = replaceStr(OWNER_ADDRESS_LIST, this.state.userId);
        Fetch({statements: str}).then(data => {
            this.setState({
                addressData: data,
                isLoadOk: true
            });
        });
    };

    exitAddress = (address_id) => {
        let sql = replaceStr(GET_SINGLE_ADDRESS, address_id);
        Fetch({statements: sql}).then(data => {
            let userCity = `${data[0].user_province}-${data[0].user_city}-${data[0].user_county}`;
            this.setState({
                modalVisible: true,
                params: data[0],
                userCity
            });
        });
    };

    deleteAddress = (address_id) => {
        console.log(address_id);
        this.setState({
            isShowToastLoading: true
        });
        Fetch({statements: DELETE_ADDRESS, parameter: JSON.stringify([address_id])}).then(() => {
            this.getAddressData();
            this.setState({
                isShowToastLoading: false
            });
        });
    };

    resetAddressData = () => {
        this.getAddressData();
    };

    isShowToast = (toastMsg = '操作成功') => {
        this.setState({
            isShow: true,
            toastMsg
        }, () => {
            setTimeout(() => {
                this.setState({
                    isShow: false
                })
            }, 1500);
        });
    };

    _companyAreaClickAction = () => {
        Keyboard.dismiss();
        this.setState({isShowMengCeng: true});
        Picker.init({
            pickerData: cityDataFn(),
            selectedValue: this.state.companyAreaArray,
            pickerConfirmBtnText: '确认',
            pickerCancelBtnText: '取消',
            pickerConfirmBtnColor: [70, 123, 237, 1],
            pickerCancelBtnColor: [144, 144, 144, 1],
            pickerTitleColor: [51, 51, 51, 1],
            pickerToolBarBg: [255, 255, 255, 1],
            pickerToolBarFontSize: 15,
            pickerBg: [245, 245, 245, 1],
            pickerFontColor: [48, 48, 48, 1],
            pickerFontSize: 17,
            pickerRowHeight: 48,
            pickerTitleText: '选择城市',
            onPickerConfirm: data => {
                this.setState({
                    companyAreaArray: data,
                    userCity: data.join('-'),
                    isShowMengCeng: false,
                })
            },
            onPickerCancel: () => {
                this.setState({isShowMengCeng: false})
            },
        });
        Picker.show();
    };

    saveAddressMsg = () => {
        let {userCity, params} = this.state;
        if (!params.user_name || !params.user_mobile) {
            this.isShowToast('请输入完整');
            return false;
        }
        if (params.address_id) {
            if (userCity) {
                let list = userCity.split('-');
                params = {
                    ...params,
                    user_id: this.state.userId,
                    user_province: list[0],
                    user_city: list[1],
                    user_county: list[2]
                };
                const {user_province, user_city, user_area, user_mobile, user_name, user_county, is_default, address_id, user_id} = params;
                Fetch({
                    statements: EDIT_ADDRESS_DATA,
                    parameter: JSON.stringify([user_province, user_city, user_area, user_mobile, user_name, user_county, is_default, address_id, user_id])
                }).then(() => {
                    this.getAddressData();
                    this.isShowToast();
                    this.setOwnerAddress('set');
                    setTimeout(() => {
                        this.setState({
                            modalVisible: false
                        });
                    }, 100);
                });
            }
        } else {
            if (!userCity) {
                this.isShowToast('请选择省市区/县');
                return false;
            }
            let list = userCity.split('-');
            params = {
                ...params,
                address_id: `kcos1314_Ar${new Date().getTime()}${Math.floor(Math.random() * 1000)}`,
                user_id: this.state.userId,
                user_province: list[0],
                user_city: list[1],
                user_county: list[2]
            };
            const {user_province, user_city, user_area, user_mobile, user_name, user_county, is_default, address_id, user_id} = params;
            Fetch({
                statements: ADD_ADDRESS_DATA,
                parameter: JSON.stringify([address_id, user_id, user_name, user_mobile, user_province, user_city, user_county, user_area, is_default])
            }).then(() => {
                this.getAddressData();
                this.isShowToast();
                this.setOwnerAddress('set');
                setTimeout(() => {
                    this.setState({
                        modalVisible: false
                    });
                }, 100);
            });
        }
    };

    componentDidMount() {
        _this = this;
        getUserId().then(userId => {
            this.setState({
                userId
            }, () => {
                this.getAddressData();
            })
        });
    }

    render() {
        const {
            addressData,
            isLoading,
            tigText,
            isLoadOk,
            showOrHide,
            isShow,
            toastMsg,
            modalVisible,
            params,
            userCity,
            isShowToastLoading
        } = this.state;
        if (!isLoadOk) return <Loading/>;
        return (
            <View style={{...appStyles.flex}}>
                <FlatList
                    data={addressData}
                    renderItem={({item, index}) =>
                        <SingleAddress
                            singleData={item}
                            showOrHide={showOrHide}
                            key={index}
                            resetAddressData={this.resetAddressData}
                            isShowToast={this.isShowToast}
                            exitAddress={this.exitAddress}
                            deleteAddress={this.deleteAddress}
                        />}
                    refreshing={isLoading}
                    ListFooterComponent={() => <FooComponent isLoading={isLoading}/>}
                    onEndReachedThreshold={0.5}
                    ListEmptyComponent={() => <NoData tigText={tigText}/>}
                />
                <ToastMsg toastMsg={toastMsg} isShow={isShow}/>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                    presentationStyle="fullScreen"
                >
                    <View style={styles.modal_box}>
                        <View style={styles.modal_con}>
                            <View style={styles.input_box}>
                                <Text style={styles.input_box_l}>姓名：</Text>
                                <TextInput
                                    style={styles.input_box_r}
                                    value={params.user_name}
                                    onChangeText={(value) => {
                                        this.setState({
                                            params: {
                                                ...params,
                                                user_name: value
                                            }
                                        })
                                    }}
                                />
                            </View>
                            <View style={styles.input_box}>
                                <Text style={styles.input_box_l}>电话：</Text>
                                <TextInput
                                    style={styles.input_box_r}
                                    value={params.user_mobile}
                                    onChangeText={(value) => {
                                        this.setState({
                                            params: {
                                                ...params,
                                                user_mobile: value
                                            }
                                        })
                                    }}
                                />
                            </View>
                            <View style={styles.input_box}>
                                <Text style={styles.input_box_l}>省市区/县：</Text>
                                <View style={styles.input_box_r}>
                                    <Text onPress={this._companyAreaClickAction} numberOfLines={1}>{userCity}</Text>
                                </View>
                            </View>
                            <View style={styles.input_box}>
                                <Text style={styles.input_box_l}>详细地址：</Text>
                                <TextInput
                                    style={styles.input_box_r}
                                    value={params.user_area}
                                    onChangeText={(value) => {
                                        this.setState({
                                            params: {
                                                ...params,
                                                user_area: value
                                            }
                                        })
                                    }}
                                />
                            </View>
                            <View style={styles.con_btn}>
                                <Text
                                    style={styles.btn}
                                    onPress={this.saveAddressMsg}
                                >确 定</Text>
                            </View>
                        </View>
                        <View style={styles.modal_foo}>
                            <Text
                                style={{fontSize: 36, color: '#444', textAlign: 'right'}}
                                onPress={() => {
                                    this.setState({
                                        modalVisible: false,
                                        isShowMengCeng: false
                                    })
                                }}
                            >×</Text>
                        </View>
                    </View>
                </Modal>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        this.setState({
                            modalVisible: true
                        })
                    }}
                >
                    <View style={styles.foo_add}>
                        <Text style={styles.foo_add_tit}>+</Text>
                    </View>
                </TouchableOpacity>
                <ToastLoading isShow={isShowToastLoading} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    modal_box: {
        marginTop: 50
    },
    modal_con: {
        paddingLeft: 10,
        paddingRight: 10
    },
    input_box: {
        flexDirection: 'row',
        height: 68,
        alignItems: 'center'
    },
    input_box_l: {
        width: 100,
        textAlign: 'right'
    },
    input_box_r: {
        width: width - 120,
        borderStyle: 'solid',
        borderBottomWidth: 0.5,
        borderColor: '#eee',
        paddingBottom: 5
    },
    con_btn: {
        marginTop: 15
    },
    btn: {
        backgroundColor: 'rgb(33, 182, 255)',
        color: '#fff',
        fontSize: 17,
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: 'center',
        borderRadius: 18
    },
    modal_foo: {
        marginTop: 30,
        marginRight: 10
    },
    foo_add: {
        position: 'absolute',
        bottom: 50,
        left: width / 2 - 30,
        width: 60,
        height: 60,
        borderRadius: 60,
        justifyContent:'center',
        alignItems: 'center',
        textAlignVertical:'center',
        borderStyle: 'solid',
        borderWidth: 0.5,
        borderColor: '#ddd',
        ...Platform.select({
            ios: { lineHeight: 60},
            android: {}
        })
    },
    foo_add_tit: {
        fontSize: 30,
        color: '#222'
    }
});
import * as React from 'react';
import {
    View,
    Button,
    Text,
    TextInput,
    FlatList,
    Modal,
    StyleSheet,
    Keyboard
} from 'react-native';
import Picker from 'react-native-picker';
import FooComponent from '../../../components/fooComponent/FooComponent';
import NoData from '../../../components/noData/NoData';
import SingleAddress from './SingleComponent/SingleAddress';
import ToastMsg from '../../../components/toastMsg/ToastMsg';
import appStyles from "../../styles/appStyles";
import {getUserId, replaceStr} from "../../../methods/util";
import {OWNER_ADDRESS_LIST} from "../../../methods/sqlStatements";
import Fetch from "../../../methods/Fetch";
import Loading from "../../../components/loading/Loading";
import { cityDataFn } from '../../../methods/util';

let _this = null;

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
        toastMsg: '操作成功',
        tigText: '还未添加地址哦',
        language: '',
        params: {
            name: '',
            mobile: '',
            province: '',
            city: '',
            county: '',
            area: '',
            address_id: '',
            is_default: 0
        },
        companyAreaArray: [],
        userCity: ''
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
            case 'save':
                setParams({btnTitle: '保存', mode: 'set'});
                this.setState({
                    showOrHide: false
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
        getUserId().then(userId => {
            let str = replaceStr(OWNER_ADDRESS_LIST, userId);
            Fetch({statements: str}).then(data => {
                this.setState({
                    addressData: data,
                    isLoadOk: true
                });
            });
        });
    };

    resetAddressData = () => {
        this.getAddressData();
    };

    isShowToast = () => {
        this.setState({
            isShow: true
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
                }, () => {
                    console.log('userCity', this.state.userCity);
                })
            },
            onPickerCancel: () => {
                this.setState({isShowMengCeng: false})
            },
        });
        Picker.show();
    };

    componentDidMount() {
        _this = this;
        this.getAddressData();
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
            params
        } = this.state;
        if (!isLoadOk) return <Loading/>;
        return (
            <View style={appStyles.flex}>
                <FlatList
                    data={addressData}
                    renderItem={({item, index}) =>
                        <SingleAddress
                            singleData={item}
                            showOrHide={showOrHide}
                            key={index}
                            setOwnerAddress={this.setOwnerAddress}
                            resetAddressData={this.resetAddressData}
                            isShowToast={this.isShowToast}
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
                                <Text>姓名：</Text>
                                <TextInput
                                    value={params.name}
                                    onChangeText={(value) => {this.setState({
                                        params: {
                                            ...params,
                                            name: value
                                        }
                                    })}}
                                />
                            </View>
                            <View style={styles.input_box}>
                                <Text>电话：</Text>
                                <TextInput
                                    value={params.mobile}
                                    onChangeText={(value) => {this.setState({
                                        params: {
                                            ...params,
                                            mobile: value
                                        }
                                    })}}
                                />
                            </View>
                            <View style={styles.input_box}>
                                <Text onPress={this._companyAreaClickAction}>详细地址：</Text>
                                <TextInput
                                    value={params.area}
                                    onChangeText={(value) => {this.setState({
                                        params: {
                                            ...params,
                                            area: value
                                        }
                                    })}}
                                />
                            </View>
                        </View>
                        <View style={styles.modal_foo}>
                            <Text
                                style={{fontSize: 36, color: '#444', textAlign: 'right'}}
                                onPress={() => {
                                    this.setState({
                                        modalVisible: false
                                    })
                                }}
                            >×</Text>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    modal_box: {},
    modal_con: {},
    input_box: {},
    modal_foo: {
        marginTop: 30,
        marginRight: 10
    }
});
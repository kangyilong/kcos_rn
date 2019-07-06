import * as React from 'react';
import {
    View,
    Button,
    FlatList
} from 'react-native';
import FooComponent from '../../../components/fooComponent/FooComponent';
import NoData from '../../../components/noData/NoData';
import SingleAddress from './SingleComponent/SingleAddress';
import appStyles from "../../styles/appStyles";
import {getUserId, replaceStr} from "../../../methods/util";
import { OWNER_ADDRESS_LIST } from "../../../methods/sqlStatements";
import Fetch from "../../../methods/Fetch";
import Loading from "../../../components/loading/Loading";

let _this = null;
interface Props {
    navigation: any
}
export default class OwnerAddress extends React.PureComponent<Props, any> {
    static navigationOptions = ({navigation}) => {
        const { state } = navigation;
        const { params } = state;
        let btnTitle = '设置', mode = 'cancel';
        if(!!params.btnTitle) {
            btnTitle = params.btnTitle;
        }
        if(!!params.mode) {
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
        addressData: [1, 2, 3],
        isLoading: false,
        isLoadOk: false,
        showOrHide: false,
        tigText: '还未添加地址哦'
    };
    setOwnerAddress = (type) => {
        const { navigation } = this.props;
        const { setParams } = navigation;
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

    componentDidMount() {
        _this = this;
        getUserId().then(userId => {
            let str = replaceStr(OWNER_ADDRESS_LIST, userId);
            Fetch({statements: str}).then(data => {
                console.log(data);
                this.setState({
                    addressData: data,
                    isLoadOk: true
                });
            });
        });
    }

    render() {
        const {addressData, isLoading, tigText, isLoadOk, showOrHide} = this.state;
        if(!isLoadOk) return <Loading />;
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
                        />}
                    refreshing={isLoading}
                    ListFooterComponent={() => <FooComponent isLoading={isLoading}/>}
                    onEndReachedThreshold={0.5}
                    ListEmptyComponent={() => <NoData tigText={tigText}/>}
                />
            </View>
        )
    }
}
import React, {PureComponent} from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator
} from 'react-native';
import SingleCollection from './SingleComponent/SingleCollection';
import NoData from '../../../components/noData/NoData';
import Loading from '../../../components/loading/Loading';
import { replaceStr, getUserId } from '../../../methods/util';
import { USER_COLLECTION_LIST } from '../../../methods/sqlStatements';
import appStyles from '../../styles/appStyles';
import Fetch from "../../../methods/Fetch";

export default class OwnerCollection extends PureComponent {
    state = {
        isLoading: false,
        tigText: '暂无商品收藏',
        collectionData: [],
        isLoadOk: false
    };
    async componentDidMount() {
        let userId = await getUserId();
        let statements = replaceStr(USER_COLLECTION_LIST, userId);
        Fetch({statements}).then(data => {
            this.setState({
                collectionData: data,
                isLoadOk: true
            })
        });
    }
    fooComponent = () => {
        if (this.state.isLoading) {
            return (
                <View style={appStyles.indicatorView}>
                    <ActivityIndicator
                        style={appStyles.indicator}
                        animating={true}
                    />
                    <Text style={appStyles.indicatorText}>loading...</Text>
                </View>
            )
        } else {
            return null;
        }
    };
    render() {
        const {collectionData, isLoading, tigText, isLoadOk} = this.state;
        if(!isLoadOk) {
            return <Loading />
        }
        return (
            <View style={{paddingTop: 20, ...appStyles.flex}}>
                <FlatList
                    data={collectionData}
                    renderItem={({item, index}) => <SingleCollection singleCollectionData={item} key={index}/>}
                    refreshing={isLoading}
                    ListFooterComponent={this.fooComponent}
                    onEndReachedThreshold={0.5}
                    ListEmptyComponent={() => <NoData tigText={tigText}/>}
                    numColumns={2}
                    horizontal={false}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    collection_box: {}
});
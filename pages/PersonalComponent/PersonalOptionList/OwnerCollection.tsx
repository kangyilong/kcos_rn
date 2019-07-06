import * as React from 'react';
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
import FooComponent from '../../../components/fooComponent/FooComponent';
import { replaceStr, getUserId } from '../../../methods/util';
import { USER_COLLECTION_LIST } from '../../../methods/sqlStatements';
import appStyles from '../../styles/appStyles';
import Fetch from "../../../methods/Fetch";

export default class OwnerCollection extends React.PureComponent {
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
                    ListFooterComponent={() => <FooComponent isLoading={isLoading} />}
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
import * as React from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import NoData from '../../../../../components/noData/NoData';
import SingleOrder from '../../SingleComponent/SingleOrder';
import Loading from '../../../../../components/loading/Loading';
import Fetch from '../../../../../methods/Fetch';
import {getUserId, mergeAttribute} from '../../../../../methods/util';
import appStyles from '../../../../styles/appStyles';

interface Props {
    QUERY_SQL: Function,
    and_sql: string,
    tigText: string
}

class OrderStatusComponent extends React.PureComponent<Props, any> {
    state = {
        orderData: [],
        isLoading: false,
        isLoadOk: false
    };

    componentDidMount() {
        getUserId().then(userId => {
            const { QUERY_SQL, and_sql } = this.props;
            let str = QUERY_SQL({user_id: userId, and_sql});
            Fetch({statements: str}).then(data => {
                let arr = mergeAttribute(data);
                this.setState({
                    orderData: arr,
                    isLoadOk: true
                })
            });
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
        const {orderData, isLoading, isLoadOk} = this.state;
        if(!isLoadOk) {
            return <Loading />
        }else {
            return (
                <View style={appStyles.flex}>
                    <FlatList
                        data={orderData}
                        renderItem={({item}) => <SingleOrder singleOrderData={item} key={item.code}/>}
                        refreshing={isLoading}
                        ListFooterComponent={this.fooComponent}
                        onEndReachedThreshold={0.5}
                        ListEmptyComponent={() => <NoData tigText={this.props.tigText}/>}
                    />
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    owner_order: {
        paddingRight: 10
    }
});

export default OrderStatusComponent;
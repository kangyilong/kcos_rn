import React, {PureComponent} from 'react';
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
import Fetch from '../../../../../methods/Fetch';
import {mergeAttribute} from '../../../../../methods/util';
import appStyles from '../../../../styles/appStyles';

interface Props {
    QUERY_SQL: string
}

export default class OrderStatusComponent extends PureComponent<Props, any> {
    state = {
        orderData: [],
        isLoading: false
    };

    componentDidMount() {
        const { QUERY_SQL } = this.props;
        Fetch({statements: QUERY_SQL}).then(data => {
            let arr = mergeAttribute(data);
            this.setState({
                orderData: arr
            })
        });
    }

    fooComponent = () => {
        if (this.state.isLoading) {
            return (
                <View style={styles.indicatorView}>
                    <ActivityIndicator
                        style={styles.indicator}
                        animating={true}
                    />
                    <Text style={styles.indicatorText}>loading...</Text>
                </View>
            )
        } else {
            return null;
        }
    };

    render() {
        const {orderData, isLoading} = this.state;
        return (
            <View style={appStyles.flex}>
                <FlatList
                    data={orderData}
                    renderItem={({item}) => <SingleOrder singleOrderData={item} key={item.code}/>}
                    refreshing={isLoading}
                    ListFooterComponent={this.fooComponent}
                    onEndReachedThreshold={0.5}
                    ListEmptyComponent={() => <NoData tigText="暂无订单哦"/>}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    owner_order: {
        paddingRight: 10
    },
    indicatorView: {
        marginBottom: 20,
        alignItems: 'center',
        paddingTop: 10
    },
    indicator: {
        marginBottom: 10
    },
    indicatorText: {
        color: 'green',
        fontSize: 15
    }
});
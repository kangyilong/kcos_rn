import React, {PureComponent} from 'react';
import {
    View,
    Text,
    Button,
    Image,
    StyleSheet,
    Dimensions,
    FlatList,
    RefreshControl,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import HeadComponent from './page02Component/HeadComponent';
import MoreShopComponent from './MoreShopComponent';

interface Props {
    navigation: {
        navigate: Function,
        goBack: Function,
        state: {
            params: {
                name: string,
                productId: string,
                selIndex: number
            }
        }
    }
}

const { width, height } = Dimensions.get('window');

export default class StorePage extends PureComponent<Props, any> {
    state = {};
    render () {
        return(
            <View style={styles.container}>
                <HeadComponent
                    navigation={this.props.navigation}
                />
                <MoreShopComponent />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});
import * as React from 'react';
import {
    View,
    StyleSheet,
    ScrollView
} from 'react-native';
import HeadComponent from './page02Component/HeadComponent';
import DetailShopComponent from './page02Component/DetailShopComponent';
import MoreShopComponent from './MoreShopComponent';

interface Props {
    navigation: {
        navigate: Function,
        goBack: Function,
        state: {
            params: {
                name: string,
                productId: string,
                shopId: string
            }
        }
    }
}

export default class StorePage extends React.PureComponent<Props, any> {
    render () {
        const {state} = this.props.navigation;
        const {productId, shopId} = state.params;
        return(
            <ScrollView
                showsVerticalScrollIndicator={true}
            >
                <View style={styles.container}>
                    <HeadComponent
                        navigation={this.props.navigation}
                    />
                    <MoreShopComponent shopMsg={{productId, shopId}}/>
                    {/*<DetailShopComponent product_id={productId}/>*/}
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginBottom: 50
    }
});
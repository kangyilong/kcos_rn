import * as React from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    Dimensions,
    Image,
    FlatList,
    SafeAreaView,
    ScrollView
} from 'react-native';
import NavigatorUtil from '../methods/NavigatorUtil';
import SwiperComponent from '../components/swiper/Swiper';
import Con01Component from './page01Component/Con01';
import Con02Component from './page01Component/Con02';
import FETCH from '../methods/Fetch';
import { HOMEPAGE_BANNER } from '../methods/sqlStatements';

const { width, height } = Dimensions.get('window');

interface Props {
    navigation: {
        navigate: Function,
        addListener: Function
    }
}
export default class HomePage extends React.Component<Props, any> {
    private _navListener: any;
    state = {
        swiperData: []
    };
    componentDidMount() {
        FETCH({statements: HOMEPAGE_BANNER}).then(data => {
            let picData = data.map(item => ({
                sourceUrl: item.banner_pic,
                bannerHref: item.banner_href
            }));
            this.setState({
                swiperData: picData
            })
        });
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            console.log('home');
        });
    }
    componentWillUnmount() {
        this._navListener.remove();
    }
    render () {
        const {navigation} = this.props;
        NavigatorUtil.navigation = navigation;
        return(
            <ScrollView>
                <SafeAreaView style={styles.Page}>
                    {
                        this.state.swiperData.length > 0
                            ? (<SwiperComponent
                                swiperHeight={ width * 40 / 75 }
                                autoplayTimeout={4}
                                swiperData={this.state.swiperData}
                                isButtons={false}
                                isDot={false}
                            />)
                            : (<View style={styles.noBanner}>
                                <Text style={styles.noBannerText}>努力加载中...</Text>
                            </View>)
                    }
                    <Con01Component />
                    <Con02Component/>
                </SafeAreaView>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    Page: {
        flex: 1,
        minHeight: height,
        backgroundColor: '#f5f5f5',
        paddingBottom: 30
    },
    swiper: {
        height: 100
    },
    text: {
        fontSize: 12
    },
    noBanner: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noBannerText: {
        color: '#888',
        fontSize: 16
    }
});
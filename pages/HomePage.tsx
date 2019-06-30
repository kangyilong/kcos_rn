import React, {Component} from 'react';
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
import SwiperComponent from '../components/swiper/Swiper';
import Con01Component from './page01Component/Con01';
import Con02Component from './page01Component/Con02';
import FETCH from '../methods/Fetch';

const { width, height } = Dimensions.get('window');

interface Props {
    navigation: {
        navigate: Function
    }
}
export default class HomePage extends Component<Props, any> {
    state = {
        swiperData: []
    };
    componentDidMount() {
        FETCH({statements: 'SELECT * FROM bannerMsg'}).then(data => {
            let picData = data.map(item => ({
                sourceUrl: item.banner_pic,
                bannerHref: item.banner_href
            }));
            this.setState({
                swiperData: picData
            })
        })
    }
    render () {
        const {navigation} = this.props;
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
                    <Con02Component navigation={navigation}/>
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
    flex: {
        flex: 1
    },
    f20: {
        fontSize: 20
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
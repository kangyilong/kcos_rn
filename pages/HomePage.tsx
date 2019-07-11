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
    ScrollView,
    TextInput
} from 'react-native';
import SideMenu from 'react-native-side-menu';
import NavigatorUtil from '../methods/NavigatorUtil';
import SwiperComponent from '../components/swiper/Swiper';
import Con01Component from './page01Component/Con01';
import Con02Component from './page01Component/Con02';
import FETCH from '../methods/Fetch';
import {HOMEPAGE_BANNER} from '../methods/sqlStatements';

const {width, height} = Dimensions.get('window');

interface Props {
    navigation: {
        navigate: Function,
        addListener: Function
    }
}

export default class HomePage extends React.Component<Props, any> {
    private _navListener: any;
    iupTarget = null;
    state = {
        swiperData: [],
        screeningList: [{
            title: '全部'
        },{
            title: '电脑'
        },{
            title: '手机'
        },{
            title: '耳机'
        },{
            title: '衣服'
        },{
            title: '其他'
        }],
        sIndex: 0,
        isOpen: false,
        isSideOpen: false,
        isScreening: false,
        conditions: {
            key: '',
            value: ''
        }
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

    SideMenuComponent = () => {
        const {screeningList, sIndex, isSideOpen} = this.state;
        return (
            <View style={{paddingLeft: 20, paddingTop: 10, flex: 1, display: isSideOpen ? 'flex': 'none'}}>
                <View style={{marginBottom: 25}}><Text style={{textAlign: 'center', fontSize: 18}}>筛选</Text></View>
                {/*<View style={styles.side_search}>*/}
                    {/*<TextInput*/}
                        {/*placeholder="请输入商品名"*/}
                        {/*style={{height: 44, width: width / 2}}*/}
                        {/*ref={(target) => {*/}
                            {/*this.iupTarget = target;*/}
                        {/*}}*/}
                    {/*/>*/}
                    {/*<Text style={{marginLeft: 5}} onPress={() => {*/}
                            {/*this.setState({*/}
                                {/*isOpen: false,*/}
                                {/*isScreening: true,*/}
                                {/*conditions: {*/}
                                    {/*key: 'shop_name',*/}
                                    {/*value: this.iupTarget._lastNativeText*/}
                                {/*}*/}
                            {/*}, () => {*/}
                                {/*this.iupTarget.value = '';*/}
                            {/*});*/}
                        {/*}*/}
                    {/*}>🔍</Text>*/}
                {/*</View>*/}
                <View>
                    <Text style={{fontSize: 20, color: '#222', marginBottom: 16}}>产品分类</Text>
                    <View style={styles.single_con}>
                        {
                            screeningList.map((item, index) => (
                                <Text
                                    style={sIndex === index ? styles.set_con_s : styles.con_s}
                                    key={index}
                                    onPress={
                                        () => {
                                            this.setState({
                                                sIndex: index,
                                                isOpen: true
                                            })
                                        }
                                    }
                                >{item.title}</Text>
                            ))
                        }
                    </View>
                </View>
                <View style={styles.foo_box}>
                    <Text style={styles.foo_txt} onPress={() => {
                        this.setState({
                            isOpen: false,
                            isSideOpen: false,
                            isScreening: true,
                            conditions: {
                                key: 'type',
                                value: screeningList[sIndex].title
                            }
                        });
                    }}>确定</Text>
                </View>
            </View>
        )
    };

    componentWillUnmount() {
        this._navListener.remove();
    }

    render() {
        const {navigation} = this.props;
        const {isScreening, conditions, swiperData} = this.state;
        NavigatorUtil.navigation = navigation;
        return (
            <SideMenu
                isOpen={this.state.isOpen}
                menuPosition='left'
                edgeHitWidth={100}
                menu={this.SideMenuComponent()}
                onMove={(number) => {
                    if(number > 100) {
                        this.setState({
                            isSideOpen: true
                        })
                    }else {
                        this.setState({
                            isSideOpen: false
                        })
                    }
                }}
            >
                <ScrollView>
                    <SafeAreaView style={styles.Page}>
                        {
                            swiperData.length > 0
                                ? (<SwiperComponent
                                    swiperHeight={width * 40 / 75}
                                    autoplayTimeout={4}
                                    swiperData={swiperData}
                                    isButtons={false}
                                    isDot={false}
                                />)
                                : (<View style={styles.noBanner}>
                                    <Text style={styles.noBannerText}>努力加载中...</Text>
                                </View>)
                        }
                        <Con01Component/>
                        <Con02Component isScreening={isScreening} conditions={conditions}/>
                    </SafeAreaView>
                </ScrollView>
            </SideMenu>
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
    },
    side_search: {
        flexDirection: 'row',
        marginBottom: 15,
        alignItems: 'center'
    },
    single_con: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    con_s: {
        marginRight: 8,
        marginBottom: 16,
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 18,
        paddingRight: 18,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: 'rgb(244, 245, 247)',
        color: '#42526E'
    },
    set_con_s: {
        marginRight: 8,
        marginBottom: 16,
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 18,
        paddingRight: 18,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#FF8457',
        color: '#fff'
    },
    foo_box: {
        position: 'absolute',
        bottom: 10,
        width: width / 2 + 60,
        padding: 10
    },
    foo_txt: {
        backgroundColor: '#FF5B57',
        color: '#fff',
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: 'center',
        fontSize: 16,
        borderStyle: 'solid',
        borderWidth: 0.5,
        borderColor: 'transparent',
        borderRadius: 15,
        overflow: 'hidden'
    }
});
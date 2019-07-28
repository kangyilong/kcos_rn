import * as React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {SET_USER_HPIC} from '../../methods/sqlStatements';
import appStyles from '../styles/appStyles';
import ImagePicker from 'react-native-image-picker';
import Fetch from "../../methods/Fetch";
import {setUserMsg} from "../../methods/util";

const photoOptions = {
    title: '请选择',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '选择相册',
    quality: 0.75,
    allowEditing: true,
    noData: false,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

interface Props {
    tintColor: string,
    navigation: {
        addListener: Function
    }
}

export default class PersonalHeader extends React.PureComponent<Props, any> {
    _navListener = null;
    state = {
        url: '',
        userMsg: {
            user_hpic: '',
            user_nick_name: '',
            userLevel: '',
            user_id: ''
        },
        user_hpic: ''
    };
    componentDidMount() {
        AsyncStorage.getItem('userMsg').then(msg => {
            let userMsg = JSON.parse(msg);
            this.setState({
                userMsg
            });
        });
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            AsyncStorage.getItem('userMsg').then(msg => {
                let userMsg = JSON.parse(msg);
                this.setState({
                    userMsg
                });
            });
        });
    }
    uploadImage = (uri) => {
        const {userMsg} = this.state;
        let params = {
            statements: SET_USER_HPIC,
            parameter: JSON.stringify([uri, userMsg.user_id])
        };
        Fetch(params).then(()=>{
            this.setState({
                userMsg: {
                    ...userMsg,
                    user_hpic: uri
                }
            });
            setUserMsg(JSON.stringify({
                ...userMsg,
                user_hpic: uri
            }))
        }).catch((error) => {console.error('error',error)});
    };
    openMyCamera = () => {
        ImagePicker.showImagePicker(photoOptions, (res) => {
            if(res.didCancel || !res.uri) {
                return;
            }
            this.uploadImage(res.uri);
        })
    };
    componentWillUnmount() {
        this._navListener.remove();
    }
    render() {
        const { tintColor } = this.props;
        const {userMsg} = this.state;
        return (
            <View style={styles.personal_header}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.openMyCamera()}
                >
                    <View style={styles.left_box}>
                        <Image
                            style={styles.left_img}
                            source={{uri: userMsg ? userMsg.user_hpic : ''}}
                        />
                    </View>
                </TouchableOpacity>
                <View style={styles.right_box}>
                    <View style={styles.name}>
                        <Text style={{...appStyles.f24, color: tintColor}}>{userMsg ? userMsg.user_nick_name : ''}</Text>
                    </View>
                    <View>
                        <Text style={{...appStyles.f18, color: tintColor}}>
                            等级：{userMsg ? userMsg.userLevel : ''}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    personal_header: {
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10
    },
    left_box: {
        width: 80,
        height: 80,
        borderRadius: 10,
        backgroundColor: '#F4F5F7',
        overflow: 'hidden'
    },
    left_img: {
        width: 80,
        height: 80
    },
    right_box: {
        marginLeft: 20,
        paddingTop: 10
    },
    name: {
        marginBottom: 15
    }
});
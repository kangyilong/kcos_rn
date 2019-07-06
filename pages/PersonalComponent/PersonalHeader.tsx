import * as React from 'react';

import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import appStyles from '../styles/appStyles';
import ImagePicker from 'react-native-image-picker';

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
    tintColor: string
}

export default class PersonalHeader extends React.PureComponent<Props, any> {
    state = {
        url: ''
    };
    uploadImage = (uri) => {
        let formData = new FormData();
        let file: any = {uri, type: 'multipart/form-data', name: 'image.png'};
        formData.append("files", file);
        console.log('formData:', formData);
        let params = {
            statements: '',
            parameter: formData
        };
        // Fetch(params).then((responseData)=>{
        //     console.log(responseData)  //得到的uri（http格式）拿到后进行操作吧
        // }).catch((error)=>{console.error('error',error)});
    };
    openMyCamera = () => {
        ImagePicker.showImagePicker(photoOptions, (res) => {
            console.log('ImagePicker', res);
            if(res.didCancel || !res.uri) {
                return;
            }
            this.uploadImage(res.uri);
        })
    };
    render() {
        const { tintColor } = this.props;
        return (
            <View style={styles.personal_header}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.openMyCamera()}
                >
                    <View style={styles.left_box}>
                        <Image
                            style={styles.left_img}
                            source={require('../../assets/images/ky.jpg')}
                        />
                    </View>
                </TouchableOpacity>
                <View style={styles.right_box}>
                    <View style={styles.name}>
                        <Text style={{...appStyles.f24, color: tintColor}}>ksy</Text>
                    </View>
                    <View>
                        <Text style={{...appStyles.f18, color: tintColor}}>
                            等级：超级会员
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
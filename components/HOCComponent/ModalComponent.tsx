import * as React from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';

const {width} = Dimensions.get('window');

interface Props {
    modalVisible: boolean,
    hideModalVisibleFn: Function,
    headItem: Array<any>,
    sIndex: number
}
export default function ModalComponent(WC) {
    return class extends React.PureComponent<Props, any> {
        render() {
            return (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.props.modalVisible}
                    onRequestClose={() => { // 安卓机必填
                    }}
                >
                    <View style={styles.modal_box}>
                        <View style={styles.modal_con}>
                            <WC {...this.props} />
                        </View>
                    </View>
                </Modal>
            )
        }
    }
}

const styles = StyleSheet.create({
    modal_box: {
        backgroundColor: 'rgba(0, 0, 0, .6)',
        flex: 1,
        position: 'relative'
    },
    modal_con: {
        position: 'absolute',
        width: width,
        bottom: 0,
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 30,
        backgroundColor: '#fff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderStyle: 'solid',
        borderWidth: 0.5,
        borderColor: 'transparent'
    }
});
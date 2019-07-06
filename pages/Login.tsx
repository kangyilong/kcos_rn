import * as React from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet
} from 'react-native';
import NavigatorUtil from '../methods/NavigatorUtil';
import {setUserId} from '../methods/util';

interface Props {
    navigation: {
        navigate: Function
    }
}

export default class Login extends React.Component<Props, any> {
    render () {
        return(
            <View style={styles.Page}>
                <View style={styles.header}>
                    <View style={styles.lName}>
                        <Text style={styles.loginName}>KCOS_LV</Text>
                    </View>
                    <View>
                        <Text style={styles.loginTit}>WELCOME TO LOGIN</Text>
                    </View>
                </View>
                <View style={styles.loginForm}>

                </View>
                <Button
                    title={'登 录'}
                    onPress={() => {
                        setUserId('kcos131415485718985843628');
                        NavigatorUtil.goPage('HomePage');
                    }}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    Page: {
        flex: 1
    },
    header: {
        marginBottom: 30,
        marginTop: 120
    },
    lName: {
        marginBottom: 20
    },
    loginName: {
        fontSize: 24,
        color: '#091E42',
        textAlign: 'center',
        fontWeight: '600'
    },
    loginTit: {
        fontSize: 20,
        color: '#091E42',
        textAlign: 'center',
        fontWeight: '600'
    },
    loginForm: {}
});
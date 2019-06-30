import React, {Component} from 'react';
import VislidationLogin from '../components/HOCComponent/ValidationLogin';
import {
    View,
    Text,
    Button,
    StyleSheet
} from 'react-native';

interface Props {
    navigation: {
        navigate: Function
    }
}

class PersonalCenter extends Component<Props, any> {
    render () {
        const {navigation} = this.props;
        return(
            <View style={styles.Page}>
                <Text style={styles.f20}>PersonalCenter</Text>
                <Button
                    title={'Go To HomePage'}
                    onPress={() => {
                        navigation.navigate('HomePage');
                    }}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    Page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    f20: {
        fontSize: 20
    }
});
export default VislidationLogin(PersonalCenter);

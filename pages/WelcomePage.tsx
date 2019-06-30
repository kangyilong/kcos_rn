import React, {PureComponent} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

interface Props {
    navigation: any
}

export default class WelcomePage extends PureComponent<Props, any> {
    private interTime: any;
    private outTime: any;
    state = {
        timer: 3
    };
    componentDidMount() {
        console.disableYellowBox = true;
        let { timer } = this.state;
        let load = 'loading...';
        this.interTime = setInterval(() => {
            timer --;
            if(timer === 0) {
                this.setState({
                    timer: load
                })
            }else {
                this.setState({
                    timer
                })
            }
        }, 1000);
        this.outTime = setTimeout(() => {
            this.props.navigation.navigate('AppNavigator');
        }, 3500);
    }
    componentWillUnmount() {
        this.interTime && clearInterval(this.interTime);
        this.outTime && clearTimeout(this.outTime);
    }
    render () {
        return(
            <View style={styles.container}>
                <View style={{'marginBottom': 15}}><Text style={{'fontSize': 20}}>WelcomePage</Text></View>
                <View><Text style={{'fontSize': 16}}>{this.state.timer}</Text></View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    }
});
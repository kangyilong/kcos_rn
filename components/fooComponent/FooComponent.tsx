import * as React from 'react';
import {
    View,
    Text,
    ActivityIndicator
} from 'react-native';
import appStyles from "../../pages/styles/appStyles";

interface Props {
    isLoading: boolean
}
export default function FooComponent(props: Props) {
    if (props.isLoading) {
        return (
            <View style={appStyles.indicatorView}>
                <ActivityIndicator
                    style={appStyles.indicator}
                    animating={true}
                />
                <Text style={appStyles.indicatorText}>loading...</Text>
            </View>
        )
    } else {
        return null;
    }
}
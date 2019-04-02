import React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';

export default function (props) {
    const height = (isIphoneX()) ? 16 : 0;
    const { backgroundColor } = props;

    return (
        <View style={{ height, backgroundColor }}>
            <StatusBar { ...props } />
        </View>
    );
}
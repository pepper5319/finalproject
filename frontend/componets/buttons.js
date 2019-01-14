import React from 'react';
import { StyleSheet, Text, TouchableOpacity} from 'react-native';

const Button = (props) => {
    return (
        <TouchableOpacity 
            onPress={props.onPress}
            style={styles.buttonbody}>
            <Text style={styles.buttontext}>
                {props.children}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonbody:{
        backgroundColor: '#000000',
        width: '20%',
        borderRadius: 8,
        bottom: 0
    },
    buttontext:{
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    }
});

export { Button };
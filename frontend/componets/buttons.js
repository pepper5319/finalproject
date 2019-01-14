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
        backgroundColor: '#00aeef',
        width: '100%',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    buttontext:{
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    }
});

export { Button };
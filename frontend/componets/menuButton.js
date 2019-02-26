import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { styles } from '../styles/defaultStyle';

export class MenuButton extends React.Component {
    render() {
        return(
            <Button 
            
            onPress={this.props.navigation.toggleDrawer()}
            style={{position: 'absolute',
            top: 40,
            left: 20}}>
            Toggle
           </Button>
        )
    }
}

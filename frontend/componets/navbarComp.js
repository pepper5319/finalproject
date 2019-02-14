import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Appbar } from 'react-native-paper';

export default class NavbarComp extends React.Component {
    render() {
        return(
            <Appbar style={styles.barcontainer}>
            <Appbar.Action icon="menu" onPress={this.props.button1} />
            <Appbar.Content title={this.props.titleTxt} />
            <Appbar.Action icon="add-a-photo" onPress={this.props.button2} />
            </Appbar>
        )
    }
}

const styles = StyleSheet.create({
    barcontainer: {
      backgroundColor: '#000',
    },
  
  });
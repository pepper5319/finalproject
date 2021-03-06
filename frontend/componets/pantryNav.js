import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

export default class PantryNav extends React.Component {
    render() {
        return(
            <Appbar style={styles.barcontainer}>
            <Appbar.Action icon="menu" onPress={this.props.button1} />
            <Appbar.Content title={this.props.titleTxt} />
            <Appbar.Action icon="add" onPress={this.props.button2} />
            </Appbar>
        )
    }
}

const styles = StyleSheet.create({
    barcontainer: {
      backgroundColor: '#cc0000',
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
      paddingTop: 16
    },
  
  });
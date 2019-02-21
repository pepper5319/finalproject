import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Appbar } from 'react-native-paper';

export default class BasicBackNav extends React.Component {
    render() {
        return(
            <Appbar style={styles.barcontainer}>
            <Appbar.Action icon="chevron-left" onPress={() => {this.props.button1('recipe')}} />
            <Appbar.Content title={this.props.titleTxt} />
            </Appbar>
        )
    }
}

const styles = StyleSheet.create({
    barcontainer: {
      backgroundColor: '#000',
    },
  
  });
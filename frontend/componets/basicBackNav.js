import React from 'react';
import { StyleSheet} from 'react-native';
import { Appbar } from 'react-native-paper';

export default class BasicBackNav extends React.Component {
    render() {
        return(
            <Appbar style={styles.barcontainer}>
            <Appbar.Action icon="chevron-left" onPress={() => {this.props.button1(this.props.backTo)}} />
            <Appbar.Content title={this.props.titleTxt} />
            {this.props.button2 !== undefined && <Appbar.Action icon="favorite" onPress={this.props.button2} />}
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

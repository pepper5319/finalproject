import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from './componets/buttons';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.buttoncontainer, styles.titlebar]}>
          <Button onPress={() => console.log('button pressed!')}> 
            menu
          </Button>
          <Text> Home Screen </Text>
          <Button onPress={() => console.log('button pressed!')}> 
            camera
          </Button>
        </View>
        <View style={[styles.buttoncontainer, styles.restofscreen]}>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  buttoncontainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titlebar:{
    backgroundColor: '#09BD09',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  restofscreen:{
    flex: 6,
    backgroundColor: '#fff'
  },
  titletext:{
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  }
});

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from './componets/buttons';


export default class App extends React.Component {
  getStudents = _ => {
    fetch('http://localhost:8000/api/Recipes')
    .then(console.log('button pressed!'))
    .then(response => response.json())
  //  .then(response => this.setState({students: response.data}))
    .catch(err => console.error(err))
}
  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.buttoncontainer, styles.titlebar]}>
          <Button onPress={() => this.getStudents()}>
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

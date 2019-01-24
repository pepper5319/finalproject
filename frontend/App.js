import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { Button } from './componets/buttons';
import { picFound } from './actions/picActions.js';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

class App extends Component<Props> {

  constructor() {
    super();
  };

  PhotoPic = () =>{
    const options = {
      noData: true
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.uri) {
        this.props.picFound(response.uri);
        console.log("response", this.props.url);
      }
    });
  };

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
          <Button onPress={this.PhotoPic}>
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

const mapStateToProps = state => ({
  url: state.pics.picURL,
});

//#endregion

export default connect(mapStateToProps, { picFound })(App);

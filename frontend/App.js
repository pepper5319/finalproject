import React, {Component} from 'react';
import {Platform, StyleSheet, View, Text, Image,AsyncStorage} from 'react-native';
import { picFound } from './actions/picActions.js';
import { connect } from 'react-redux';
import HomeScreen from './screens/homeScreen.js';
import SignUpScreen from './screens/signUpScreen.js';

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
  render(){
    return(
        <SignUpScreen/>
    );
  }
}

const mapStateToProps = state => ({
  url: state.pics.picURL,
});

//#endregion

export default connect(mapStateToProps, { picFound })(App);

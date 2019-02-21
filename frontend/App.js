import React, {Component} from 'react';
import { picFound } from './actions/picActions.js';
import { navAction } from './actions/navigationAction.js';
import { connect } from 'react-redux';
//import HomeScreen from './screens/homeScreen.js';
import SignUpScreen from './screens/signUpScreen.js';
import LoginScreen from './screens/loginScreen.js';
import LogoutScreen from './screens/logoutScreen.js';
import TestScreen from './screens/testScreen.js';
import MainNavigation from './mainNavigation.js';


type Props = {};
class App extends Component<Props> {

  state = {
    active: 'first'
  };
  constructor() {
    super();
  };

  render() {
    return (
    <LoginScreen/>
    );

  }
}

const mapStateToProps = state => ({
  url: state.pics.picURL,
  tag: state.tags.activeTag
});

export default connect(mapStateToProps, { picFound, navAction })(App);

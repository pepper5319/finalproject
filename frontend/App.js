import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import Main from './Main';
//#region Import Actions and Reducers
import {addNumber} from "./redux/actions/mathActions";
import {subtractNumber} from "./redux/actions/mathActions";
import store from "./redux/store";
//#endregion

//#region Import Components

//#endregion

export default class App extends React.Component {
  constructor() {
    super();
  };
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}

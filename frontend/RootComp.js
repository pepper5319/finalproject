import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Provider} from 'react-redux';
import  App  from './App';
import { Provider as PaperProvider } from 'react-native-paper';
import store from './store';
import StatusBar from './statusBar';

export default class RootComp extends React.Component {
  constructor() {
    super();
  };
  render() {
    return (
      <Provider store={store}>
      <PaperProvider>
      <StatusBar backgroundColor="#fff" />
        <App />
      </PaperProvider>
      </Provider>
    );
  }
}

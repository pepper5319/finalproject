import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Provider} from 'react-redux';
import  App  from './App';
import store from './store';
import { Provider as PaperProvider } from 'react-native-paper';


export default class RootComp extends React.Component {
  constructor() {
    super();
  };
  render() {
    return (
      <Provider store={store}>
        <PaperProvider>
          <App />
        </PaperProvider>
      </Provider>
    );
  }
}

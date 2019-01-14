import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider, connect } from 'react-redux';
import {store} from './redux/store'



//#region Import Actions and Reducers
import {addNumber} from "./redux/actions/mathActions"
import {subtractNumber} from "./redux/actions/mathActions"
//#endregion

//#region Import Components

//#endregion

class App extends React.Component {
  constructor() {
    super();
    this.state = {test: []}
  };

  render() {
    return (
      <Provider store={store}>
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

//#region Map State and Dispatch

const mapStateToProps = (state) =>{
  return{
    math: state.math
  };
};

const mapDispatchToProps = (dispatch) =>{
  return{
    addNumber: (num) =>{
      dispatch(addNumber(num));
    },
    subtractNumber: (num) =>{
      dispatch(subtractNumber(num));
    }
  };
};

//#endregion

export default connect(mapStateToProps, mapDispatchToProps)(App);
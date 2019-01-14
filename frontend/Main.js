import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
//#region Import Actions and Reducers
import {addNumber} from "./redux/actions/mathActions"
import {subtractNumber} from "./redux/actions/mathActions"
import { Provider } from 'react-redux';
//#endregion

//#region Import Components

//#endregion
class Main extends React.Component {
  constructor() {
    super();
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
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

//#endregion

export default connect(mapStateToProps)(Main);

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
//#region Import Actions and Reducers
import {addNumber} from "./redux/actions/mathActions"
import {subtractNumber} from "./redux/actions/mathActions"
import { Provider } from 'react-redux';
import { Button } from './componets/buttons';

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

//#region Map State and Dispatch

const mapStateToProps = (state) =>{
  return{
    math: state.math
  };
};

//#endregion

export default connect(mapStateToProps)(Main);

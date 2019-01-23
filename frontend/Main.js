import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import  {connect}  from 'react-redux';
//#region Import Actions and Reducers
import {addNumber} from "./redux/actions/mathActions"
import {subtractNumber} from "./redux/actions/mathActions"
import { Provider } from 'react-redux';
import { Button } from './componets/buttons';
import ImagePicker from 'react-native-image-picker';
//#endregion

//#region Import Components

//#endregion
class Main extends React.Component {
  constructor() {
    super();
  };

  state = {
    things: 'https://cdn.pixabay.com/photo/2017/05/21/15/14/balloon-2331488_960_720.jpg'
  };

  PhotoPic = () =>{
    const options = {
      noData: true
    };
    ImagePicker.showImagePicker(options, response => {
      console.log("response", response)
      if (response.uri) {
        this.setState({ things: response.uri });
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

//#region Map State and Dispatch

const mapStateToProps = (state) =>{
  return{
    math: state.math
  };
};

//#endregion

export default connect(mapStateToProps)(Main);

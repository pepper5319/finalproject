import React, {Component} from 'react';
import {Platform, StyleSheet, View, Text, Image} from 'react-native';
import { picFound } from './actions/picActions.js';
import { navAction } from './actions/navigationAction.js';
import { connect } from 'react-redux';
import SideBar from './navigation/drawerStyle';
import { Drawer } from 'native-base';
import { Appbar } from 'react-native-paper';
import SignUpScreen from './screens/signUpScreen.js';
import HomeScreen from './screens/HomeScreen.js';
import ImagePicker from 'react-native-image-picker';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

class App extends Component<Props> {

  state = {
    active: 'first'
  };
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
onChangeTag = (tag) => {
  this.setState({ active: tag })
  console.log('tag change')
}

closeDrawer = () => {
  this.drawer._root.close()
};
openDrawer = () => {
  this.drawer._root.open()
};

 
  render() {
    return (
      <Drawer
      ref={(ref) => { this.drawer = ref; }}
      content={<SideBar 
        navigator={this.navigator}
        changeTag={this.onChangeTag.bind(this)}
        />}
        onOpen={() => console.log(this.state)}
        onClose={() => this.closeDrawer} 
        openDrawerOffset={0.3}
        panCloseMask={0.3}>
            {this.state.active == 'first' ? <Appbar style={styles.barcontainer}>
                <Appbar.Action icon="menu"  onPress={this.openDrawer} />
                <Appbar.Content title="Home"/>
                <Appbar.Action icon="add-a-photo" onPress={this.PhotoPic} /> 
      </Appbar> : <Text/>} 
    {this.state.active == 'first' &&
    
    <HomeScreen/>
    || this.state.active == 'second' &&
    <SignUpScreen/>}
  </Drawer>

    );
    
  }
}

const mapStateToProps = state => ({
  url: state.pics.picURL,
  tag: state.tags.activeTag
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  barcontainer:{
    backgroundColor: '#000',
  },
  
});

//#endregion
export default connect(mapStateToProps, { picFound, navAction })(App);

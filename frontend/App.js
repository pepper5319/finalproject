import React, {Component} from 'react';
import {Platform, StyleSheet, View, Text, Image} from 'react-native';
import { picFound } from './actions/picActions.js';
import { navAction } from './actions/navigationAction.js';

import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import SideBar from './navigation/DrawerStyle';
import { Drawer } from 'native-base';
import ActionBar from 'react-native-action-bar';
import { Button, Card, Title, Appbar } from 'react-native-paper';


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
        this.props.navAction('response.uri');

        console.log("response", this.props.url);
      }
    });
  };

  onChangeTag = (tag) => {
    this.setState({ active: tag })
    console.log('tag change')
  }

  getStudents = _ => {
      fetch('http://localhost:8000/api/Recipes')
      .then(console.log('button pressed!'))
      .then(response => response.json())
    //  .then(response => this.setState({students: response.data}))
      .catch(err => console.error(err))
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
        panCloseMask={0.3}	>
      <View>
        <Appbar>
          <Appbar.Action icon="archive" onPress={this.openDrawer} />
          <Appbar.Action icon="mail" onPress={() => console.log('Pressed mail')} />
          <Appbar.Action icon="label" onPress={this.PhotoPic}/>
          <Appbar.Action icon="delete" onPress={() => console.log('Pressed delete')} />
        </Appbar>
       
        {this.state.active == 'first' &&
       <Card elevation ={6}>
       <Card.Content>
         <Title>Card 1</Title>
       </Card.Content>
       <Card.Cover source={{uri: 'http://placehold.it/480x270'}}/>
       <Card.Actions>
         <Button onPress={() => console.log('pressed')} color='#000'>
           ok
         </Button>
       </Card.Actions>
     </Card>
|| this.state.active == 'second' &&
<Card elevation ={6}>
<Card.Content>
  <Title>Card 2</Title>
</Card.Content>
<Card.Cover source={{uri: 'http://placehold.it/480x270'}}/>
<Card.Actions>
  <Button onPress={() => console.log('pressed')} color='#000'>
    sup
  </Button>
</Card.Actions>
</Card>
|| this.state.active == 'third' &&
<Card elevation ={6}>
<Card.Content>
  <Title>Card 3</Title>
</Card.Content>
<Card.Cover source={{uri: 'http://placehold.it/480x270'}}/>
<Card.Actions>
  <Button onPress={() => console.log('pressed')} color='#000'>
    ok
  </Button>
</Card.Actions>
</Card>
      }
      </View>
      </Drawer>
    );
  }
}

//PantryScreen props={this.props.url}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 35
  },
  barcontainer:{
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  
});

const mapStateToProps = state => ({
  url: state.pics.picURL,
  tag: state.tags.activeTag
});

//#endregion

export default connect(mapStateToProps, { picFound, navAction })(App);
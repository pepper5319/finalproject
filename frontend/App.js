import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { Button } from './componets/buttons';
import { picFound } from './actions/picActions.js';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage} from 'react-native-material-cards';
import ActionBar from 'react-native-action-bar';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

class App extends Component<Props> {

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
        
          <ActionBar
            containerStyle={styles.bar}
            backgroundColor={'#000'}
            title={'Home Screen'}
            leftIconName={'menu'}
            leftbadge={''}
            onLeftPress={() => this.getStudents()}
            onTitlePress={() => console.log('Title!')}
            rightIcons={[
              {
                name: 'plus',
                badge: '1',
                onPress: () => this.PhotoPic,
              },
            ]}
          />
          <Card>
            <CardImage
              source={{uri: 'http://placehold.it/480x270'}}
              title="Above all i am"
            />
            <CardAction
              separator={true}
              inColumn={false}>
              <CardButton
                onPress={() => console.log()}
                title="Push"
                color="blue"
              />
              <CardButton
                onPress={() => console.log()}
                title="later"
                color="blue"
              />
            </CardAction>
          </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  buttoncontainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  restofscreen:{
    flex: 6,
    backgroundColor: '#fff'
  },
});

const mapStateToProps = state => ({
  url: state.pics.picURL,
});

//#endregion

export default connect(mapStateToProps, { picFound })(App);

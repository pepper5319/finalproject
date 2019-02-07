import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { picFound } from './actions/picActions.js';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import ActionBar from 'react-native-action-bar';
import { Button, Card, Title, Paragraph } from 'react-native-paper';

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

  getReceipt = _ => {
      fetch('http://localhost:8000/api/Recipes')
      .then(console.log('button pressed!'))
      .then(response => response.json())
    //  .then(response => this.setState({students: response.data}))
      .catch(err => console.error(err))
  }
  registerUser = _ => {
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:8000/api/rest-auth/registration/";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
          var json = JSON.parse(xhr.responseText);
          console.log(json.email + ", " + json.password);
        }
      };
    var data = JSON.stringify({
    "username": "sdfsf",
    "email": "Tesjksdhfkjsdfhlskjfh@example.com",
    "password1": "fkjsdfhsdf232232",
    "password2": "fkjsdfhsdf232232"
});
    xhr.send(data);
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
            onLeftPress={() => this.registerUser()}
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
            <Card.Content>
              <Title>Card title</Title>
            </Card.Content>
            <Card.Cover source={{uri: 'http://placehold.it/480x270'}}/>
            <Card.Actions>
              <Button>
                onPress={()=> console.log()}
                ok
              </Button>
            </Card.Actions>
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
});

const mapStateToProps = state => ({
  url: state.pics.picURL,
});

//#endregion

export default connect(mapStateToProps, { picFound })(App);

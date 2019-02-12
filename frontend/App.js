import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,AsyncStorage} from 'react-native';
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

  postReceipt = _ => {
      fetch('http://localhost:8000/api/Recipes')
      .then(console.log('button pressed!'))
      .then(response => response.json())
    //  .then(response => this.setState({students: response.data}))
      .catch(err => console.error(err))
  }
  registerUser = (First,Last,Email,Username,Password,DOB) => {
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
    "username": Username,
    "email": Email,
    "password1": Password,
    "password2": Password
    });
    xhr.send(data);
    saveToken()
  }
  loginUser = _ => {
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:8000/api/rest-auth/login/";
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
    "password": "fkjsdfhsdf232232",
    });
    xhr.send(data);
    saveToken();
  }

  logoutUser = _ => {
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:8000/api/rest-auth/logout/";
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
    deleteUserToken()
  }
  getUserToken = _ => (){
    const userToken = async () => {
      let userToken = '';
        try {
          userToken = await AsyncStorage.getItem('userToken') || 'none';
          }
            catch (error) {
              // Error retrieving data
              console.log(error.message);
    }
    return userToken;
  }
}

  saveUserToken = _ => (){
    const userToken = async userId => {
      try {
        await AsyncStorage.setItem('userToken', userToken);
        } catch (error) {
          // Error retrieving data
          console.log(error.message);
        }
      };
  }

  deleteUserToken = _ => (){
    const userToken = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
    }
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
            onLeftPress={() => this.postReceipt()}
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

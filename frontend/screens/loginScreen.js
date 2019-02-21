import React from 'react';
import {StyleSheet, View, Text,AsyncStorage} from 'react-native';
import { TextInput,Button } from 'react-native-paper';

export default class SignUpScreen extends React.Component {
    state = {
        textuser:'',
        textpass:''
    };
    loginUser = _ => {
      var xhr = new XMLHttpRequest();
      var url = "http://localhost:8000/api/rest-auth/login/";
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            _storeData = async () => {
          try {
            await AsyncStorage.setItem('Token', JSON.stringify(json));
          } catch (error) {
            // Error saving data
          }
        };
            console.log(json);
          }
        };
      var data = JSON.stringify({
      "username": this.state.textuser,
      "password": this.state.textpass
      });
      xhr.send(data);
    }

    render(){
        return(
            <View style={styles.Contain}>
                <TextInput
                    mode='outlined'
                    label='Username'
                    value={this.state.textuser}
                    onChangeText={textuser => this.setState({ textuser })}
                />
                <TextInput
                    mode='outlined'
                    label='Password'
                    value={this.state.textpass}
                    onChangeText={textpass => this.setState({ textpass })}
                />

                <Button style={styles.Buttontest} mode="contained" onPress={this.loginUser}>
                    Login
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Contain:{
        justifyContent:'space-between',
    },
    Buttontest: {
        width: '50%',
        alignSelf: 'center',
    },
    DOBrow: {
        flexDirection: 'row',
    },
    dayandmonthCon: {
        justifyContent:'space-between',
        width: '25%',
        height: '10%',
    },
    yearCon: {
        justifyContent:'space-between',
        width: '25%',
        height: '10%',
    },
    textboxC:{
        borderColor:'black'
    }
  });

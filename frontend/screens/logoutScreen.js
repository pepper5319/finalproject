import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { TextInput,Button } from 'react-native-paper';

export default class SignUpScreen extends React.Component {
    state = {
        textuser:'',
        textpass:''
    };
    logoutUser = _ => {
      _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('Token');
          if (value !== null) {
          }
        } catch (error) {
        }
      };
      var xhr = new XMLHttpRequest();
      var url = "http://localhost:8000/api/rest-auth/logout/";
      xhr.open("GET", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader('Authorization', 'Token ' + value)
      xhr.send();
      _deleteData = async () => {
        try {
          const value = await AsyncStorage.removeItem('Token');
          if (value !== null) {
          }
        } catch (error) {
        }
      };
    }
    render(){
        return(
            <View style={styles.Contain}>
                <Button style={styles.Buttontest} mode="contained" onPress={this.logoutUser}>
                    Logout
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

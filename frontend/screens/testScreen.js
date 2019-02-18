import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { TextInput,Button } from 'react-native-paper';

export default class SignUpScreen extends React.Component {
    state = {
        userToken:"5d337a8d11a03c854f6c8a46b894e42ebe460e29",
    };

    getPItems = _ => {
      var xhr = new XMLHttpRequest();
      var url = "http://localhost:8000/api/pItems/";
      xhr.open("GET", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader('Authorization', 'Token ' + this.state.userToken)
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            //this.state.pantry(json)
            console.log(json);
          }
        };
      var data = JSON.stringify({
      });
      xhr.send();
    }
    render(){
        return(
            <View style={styles.Contain}>
                <Button style={styles.Buttontest} mode="contained" onPress={this.getPItems}>
                    Test
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

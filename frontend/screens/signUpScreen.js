import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { TextInput,Button } from 'react-native-paper';

export default class SignUpScreen extends React.Component {
    state = {
        textfirst:'',
        textlast:'',
        textemail:'',
        textuser:'',
        textpass:'',
        textpassC:'',
        textMonth:'',
        textDay:'',
        textYear:'',
    };
    registerUser = () => {

      if (this.state.textpass === this.state.textpassC && this.state.textemail != '' && this.state.textuser != '' && this.state.textpass != '' && this.state.textpassC != '') {
      var xhr = new XMLHttpRequest();
      var url = "http://localhost:8000/api/rest-auth/registration/";
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            console.log(json)
            console.log(json.email + ", " + json.password);
          }
        };
      var data = JSON.stringify({
      "username": this.state.textuser,
      "email": this.state.textemail,
      "password1": this.state.textpass,
      "password2": this.state.textpassC
      });
      xhr.send(data);
    }
  }
    render(){
        return(
            <View style={styles.Contain}>
                <TextInput
                    mode='outlined'
                    label='First Name'
                    value={this.state.textfirst}
                    onChangeText={textfirst => this.setState({ textfirst })}
                />
                <TextInput
                    mode='outlined'
                    label='Last Name'
                    value={this.state.textlast}
                    onChangeText={textlast => this.setState({ textlast })}
                />
                <TextInput
                    mode='outlined'
                    label='Email'
                    value={this.state.textemail}
                    onChangeText={textemail => this.setState({ textemail })}
                />
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
                <TextInput
                    mode='outlined'
                    label='Confirm Password'
                    value={this.state.textpassC}
                    onChangeText={textpassC => this.setState({ textpassC })}
                />
                <Text style={{fontWeight: 'bold'}}>
                    Date of Birth
                </Text>
                <View style={styles.DOBrow}>
                    <TextInput
                        style={styles.dayandmonthCon}
                        mode='outlined'
                        label='Month'
                        maxLength={2}
                        placeholder='##'
                        value={this.state.textMonth}
                        onChangeText={textMonth => this.setState({ textMonth })}
                    />
                    <TextInput
                        style={styles.dayandmonthCon}
                        mode='outlined'
                        label='Day'
                        maxLength={2}
                        placeholder='##'
                        value={this.state.textDay}
                        onChangeText={textDay => this.setState({ textDay })}
                    />
                    <TextInput
                        style={styles.yearCon}
                        mode='outlined'
                        label='Year'
                        maxLength={4}
                        placeholder='####'
                        value={this.state.textYear}
                        onChangeText={textYear => this.setState({ textYear })}
                    />
                </View>
                <Button style={styles.Buttontest} mode="contained" onPress={this.registerUser}>
                    Create Account
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

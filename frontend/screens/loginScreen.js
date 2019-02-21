import React from 'react';
import {StyleSheet, View, Text,ImageBackground,Image} from 'react-native';
import { TextInput,Button } from 'react-native-paper';

export default class LoginScreen extends React.Component {
    state = {
        textuser:'',
        textpass:''
    };
    onChangeTag = (tag) => {
        this.setState({ active: tag })
        console.log('tag change')
        this.props.changeTag7(tag)
      }
    loginUser = _ => {
      var xhr = new XMLHttpRequest();
      var url = "http://localhost:8000/api/rest-auth/login/";
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
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
            <ImageBackground source={require('../backgroundImages/loginback.jpg')} style={{ width: '100%', height: '100%' }}>
                <View style={{padding: 10}}>
                    <Image
                            style={{justifyContent:'center',width:'100%',height:150,resizeMode:'contain'}}
                            source={require('../backgroundImages/Logo.png')}
                    />
                </View>
                <View style={{padding: 16}}>
                    
                    <TextInput
                        theme={{ colors: { primary: 'red' } }}
                        style={[styles.textboxC, {marginBottom: 16}]}
                        mode='flat'
                        label='Username'
                        value={this.state.textuser}
                        onChangeText={textuser => this.setState({ textuser })}
                    />
                    <TextInput
                        theme={{ colors: { primary: 'red' } }}
                        style={[styles.textboxC, {marginBottom: 16}]}
                        mode='flat'
                        label='Password'
                        value={this.state.textpass}
                        onChangeText={textpass => this.setState({ textpass })}
                    />
                    <Button style={[styles.Buttontest,{marginBottom:16}]} mode="contained" onPress={this.loginUser}>
                        Login
                    </Button>
                    <Button style={styles.Buttontest2} mode="contained" onPress={() => {this.props.changeTag7('signup')}}>
                        sign up
                    </Button>
                </View>
            </ImageBackground>
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
    textboxC: {
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
    Buttontest: {
        width: '60%',
        alignSelf: 'center',
        backgroundColor: 'red'
    },
    Buttontest2: {
        width: '60%',
        alignSelf: 'center',
        backgroundColor: 'black'
    },
  });

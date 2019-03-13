import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

export default class SignUpScreen extends React.Component {
    state = {
        textfirst: '',
        textlast: '',
        textemail: '',
        textuser: '',
        textpass: '',
        textpassC: '',
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
    render() {
        return (
            <ImageBackground source={require('../backgroundImages/food.jpg')} style={{ width: '100%', height: '100%' }}>
                <View style={{padding: 16}}>
                    <TextInput
                        theme={{ colors: { primary: 'black' } }}
                        style={[styles.textboxC, {marginBottom: 16}]}
                        mode='flat'
                        label='First Name'
                        placeholder='name'
                        placeholderTextColor='black'
                        value={this.state.textfirst}
                        onChangeText={textfirst => this.setState({ textfirst })}
                    />
                
                    <TextInput
                        theme={{ colors: { primary: 'black' } }}
                        style={[styles.textboxC, {marginBottom: 16}]}
                        mode='flat'
                        label='Last Name'
                        value={this.state.textlast}
                        onChangeText={textlast => this.setState({ textlast })}
                    />
                    <TextInput
                        theme={{ colors: { primary: 'black' } }}
                        style={[styles.textboxC, {marginBottom: 16}]}
                        mode='flat'
                        label='Email'
                        value={this.state.textemail}
                        onChangeText={textemail => this.setState({ textemail })}
                    />
                    <TextInput
                        theme={{ colors: { primary: 'black' } }}
                        style={[styles.textboxC, {marginBottom: 16}]}
                        mode='flat'
                        label='Username'
                        value={this.state.textuser}
                        onChangeText={textuser => this.setState({ textuser })}
                    />
                    <TextInput
                        theme={{ colors: { primary: 'black' } }}
                        style={[styles.textboxC, {marginBottom: 16}]}
                        mode='flat'
                        label='Password'
                        value={this.state.textpass}
                        onChangeText={textpass => this.setState({ textpass })}
                    />
                    <TextInput
                        theme={{ colors: { primary: 'black' } }}
                        style={[styles.textboxC, {marginBottom: 16}]}
                        mode='flat'
                        label='Confirm Password'
                        value={this.state.textpassC}
                        onChangeText={textpassC => this.setState({ textpassC })}
                    />
                    <Button style={styles.Buttontest} mode="contained" onPress={this.registerUser}>
                        Create Account
                    </Button>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    Contain: {
        justifyContent: 'space-between',
    },
    Buttontest: {
        width: '60%',
        alignSelf: 'center',
        backgroundColor: 'red'
    },
    textboxC: {
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
    padbox: {
        padding: 10
    }
});

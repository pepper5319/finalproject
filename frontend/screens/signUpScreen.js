import React from 'react';
import { StyleSheet, View, Text, ImageBackground,Alert, TouchableOpacity} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import UserAction from '../actions/userAction'
import { connect } from 'react-redux';
import { setUserToken } from '../actions/tokenAction.js'

class SignUpScreen extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            textfirst: '',
            textlast: '',
            textemail: '',
            textuser: '',
            textpass: '',
            textpassC: '',
        }
        this.loginUser =this.loginUser.bind(this)
    }
    checkTextIsEmpty = () =>{
        const{textfirst} = this.state;
        const{textlast} = this.state;
        const{textemail} = this.state;
        const{textuser} = this.state;
        const{textpass} = this.state;
        const{textpassC} = this.state;

        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;


        if(textfirst == '' || textlast=='' || textemail == '' || textuser=='' || textpass == '' || textpassC==''){
            Alert.alert('Some input may be missing')
        }
        else{
            this.registerUser();
        }
    }

    saveUserToken = async userId => {
      try {
        await AsyncStorage.setItem('token', userId);
      } catch (error) {
        // Error retrieving data
        console.log(error.message);
      }
    }
    loginUser = () => {
      var xhr = new XMLHttpRequest();
      var url = "https://pantryplatter.herokuapp.com/api/rest-auth/login/";
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log('testing')
            var json = JSON.parse(xhr.responseText);
            this.saveUserToken(json.key);
            this.props.setUserToken(json.key);
            this.props.changeTag2('home');
            console.log(this.props)

          }
        };
      var data = JSON.stringify({
        "username": this.state.textuser,
        "password": this.state.textpass,
      });
      xhr.send(data);
    }
    registerUser = () => {

        if (this.state.textpass === this.state.textpassC && this.state.textemail != '' && this.state.textuser != '' && this.state.textpass != '' && this.state.textpassC != '') {
            var xhr = new XMLHttpRequest();
            var url = "https://pantryplatter.herokuapp.com/api/rest-auth/registration/";
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = () => {
                 if (xhr.readyState === 4 && xhr.status === 200 || xhr.status === 400) {
                      this.loginUser()
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
    onChangeTag = (tag) => {
        this.setState({ active: tag })
        console.log('tag change')
        this.props.changeTag2(tag)
    }
    closeDrawer = () => {
        this.drawer._root.close()
    };
    openDrawer = () => {
        this.drawer._root.open()
    };
    userTag = (user) => {
        this.state.textuser(user);
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
                        autoCapitalize={false}
                        theme={{ colors: { primary: 'black' } }}
                        style={[styles.textboxC, {marginBottom: 16}]}
                        mode='flat'
                        label='Email'
                        value={this.state.textemail}
                        onChangeText={textemail => this.setState({ textemail })}
                    />
                    <TextInput
                        autoCapitalize={false}
                        theme={{ colors: { primary: 'black' } }}
                        style={[styles.textboxC, {marginBottom: 16}]}
                        mode='flat'
                        label='Username'
                        value={this.state.textuser}
                        onChangeText={textuser => this.setState({ textuser })}
                    />
                    <TextInput
                        autoCapitalize={false}
                        secureTextEntry
                        theme={{ colors: { primary: 'black' } }}
                        style={[styles.textboxC, {marginBottom: 16}]}
                        mode='flat'
                        label='Password'
                        value={this.state.textpass}
                        onChangeText={textpass => this.setState({ textpass })}
                    />
                    <TextInput
                        autoCapitalize={false}
                        secureTextEntry
                        theme={{ colors: { primary: 'black' } }}
                        style={[styles.textboxC, {marginBottom: 16}]}
                        mode='flat'
                        label='Confirm Password'
                        value={this.state.textpassC}
                        onChangeText={textpassC => this.setState({ textpassC })}
                    />
                    <Button style={[styles.Buttontest,{marginBottom:16}]} mode="contained" onPress={this.checkTextIsEmpty.bind(this)}>
                        Create Account
                    </Button>
                    <TouchableOpacity  mode="contained" onPress={() => {this.props.changeTag2('login')}}>
                        <Text style={styles.backtext}>
                            My Bad Bro
                        </Text>
                    </TouchableOpacity>
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
        backgroundColor: '#cc0000'
    },
    backtext:{
        alignSelf: 'center',
        color: '#cc0000',
        fontSize: 20
    },
    textboxC: {
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
    padbox: {
        padding: 10
    }
});

const mapStateToProps = state => ({
    user: state.users.userName,
    token: state.token.token
});

export default connect(mapStateToProps, {UserAction, setUserToken})(SignUpScreen);

import React from 'react';
import { connect } from 'react-redux';
import {StyleSheet, View, ImageBackground,Image,Alert,AsyncStorage} from 'react-native';
import { TextInput,Button} from 'react-native-paper';
import UserAction from '../actions/userAction'
import { setUserToken } from '../actions/tokenAction.js';

class LoginScreen extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            textuser:'',
            textpass:'',
        }
        this.loginUser =this.loginUser.bind(this)
    }

    checkTextIsEmpty = () =>{
        const{textuser} = this.state;
        const{textpass} = this.state;

        if(textuser == '' || textpass==''){
            Alert.alert('Some input may be missing')
        }else{
            this.loginUser();
        }
    }

    onChangeTag = (tag) => {
        this.setState({ active: tag })
        console.log('tag change')
        this.props.changeTag7(tag)
    }
    loginUser = () => {
      console.log(this.props)
      var xhr = new XMLHttpRequest();
      var url = "https://pantryplatter.herokuapp.com/api/rest-auth/login/";
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            this.props.setUserToken(json.key);
            this.props.changeTag7('home');
            const saveUserToken = async userId => {
              try {
                await AsyncStorage.setItem('token', json);
              } catch (error) {
                // Error retrieving data
                console.log(error.message);
              }
            };
          }
        };
      var data = JSON.stringify({
      "username": this.state.textuser,
      "password": this.state.textpass
      });
      xhr.send(data);
    }
    userTag = (user) => {
        this.state.textuser(user);
    }
    render(){
        return(
            <ImageBackground source={require('../backgroundImages/loginback.jpg')} style={{ width: '100%', height: '100%' }}>
                <View style={{padding: 10}}>
                    <Image
                        style={{justifyContent:'center',width:'100%',height:150,resizeMode:'contain'}}
                        source={require('../backgroundImages/logo.png')}
                    />
                </View>
                <View style={{padding: 16}}>
                    <TextInput
                        autoCapitalize={false}
                        theme={{ colors: { primary: 'red' } }}
                        style={[styles.textboxC, {marginBottom: 16}]}
                        mode='flat'
                        label='Username'
                        value={this.state.textuser}
                        onChangeText={textuser => this.setState({textuser})}
                    />
                    <TextInput
                        autoCapitalize={false}
                        secureTextEntry
                        theme={{ colors: { primary: 'red' } }}
                        style={[styles.textboxC, {marginBottom: 16}]}
                        mode='flat'
                        label='Password'
                        value={this.state.textpass}
                        onChangeText={textpass => this.setState({textpass})}
                    />
                    <Button style={[styles.Buttontest,{marginBottom:16}]} mode="contained" onPress={this.checkTextIsEmpty}>
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

  const mapStateToProps = state => ({
    user: state.users.userName,
    token: state.token.token
  });

  export default connect(mapStateToProps, {setUserToken})(LoginScreen);

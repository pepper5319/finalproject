import React from 'react';
import { connect } from 'react-redux';
import {StyleSheet, View, Text,ImageBackground,Alert, AsyncStorage} from 'react-native';
import {Button} from 'react-native-paper';
import UserAction from '../actions/userAction'

class LogoutScreen extends React.Component {
    onChangeTag = (tag) => {
        this.setState({ active: tag })
        console.log('tag change')
        this.props.changeTag(tag)
    }
    closeDrawer = () => {
        this.drawer._root.close()
    };
    openDrawer = () => {
        this.drawer._root.open()
    };

    _removeToken = async () => {
      try {
        await AsyncStorage.removeItem('token');
      } catch (error) {
        // Error retrieving data
        console.log(error.message);
      }
    }
    logoutUser = () => {
      this._removeToken();
      var xhr = new XMLHttpRequest();
      var url = "https://pantryplatter.herokuapp.com/api/rest-auth/logout/";
      xhr.open("GET", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send();
      this.props.changeTag9('login');
    }
    userTag = (user) => {
        this.state.textuser(user);
    }
    testfunction = () => {
        this.logoutUser();
    }
    alertfun(){
        Alert.alert(
            'Logout',
            'Do you wish to logout',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
                {text: 'Accept', onPress: () => this.testfunction()}
            ]
        )
    }
    render(){
        return(
            <ImageBackground source={require('../backgroundImages/logoutback.jpg')} style={{ width: '100%', height: '100%' }}>
                <Text
                    user
                />
                <View style={styles.bottom}>
                    <Button style={styles.Buttontest} mode="contained" onPress={this.alertfun.bind(this)}>
                        Logout
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
        position:'relative',
        bottom:0,

    },
    bottom:{
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36
    }
  });

  const mapStateToProps = state => ({
    user: state.users.userName
  });

  export default connect(mapStateToProps, {UserAction})(LogoutScreen);

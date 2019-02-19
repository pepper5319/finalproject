import React from 'react';
import { StyleSheet, View } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Button, Card, Title, Appbar } from 'react-native-paper';
import { Drawer } from 'native-base';
import SideBar from '../navigation/drawerStyle';
import { picFound } from '../actions/picActions.js';
import { navAction } from '../actions/navigationAction.js';
import { connect } from 'react-redux';
import NavbarComp from '../componets/navbarComp.js'
import CardComp from '../componets/cardComp.js'
class HomeScreen extends React.Component {

export default class HomeScreen extends React.Component {
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
            .then(response => this.setState({students: response.data}))
            .catch(err => console.error(err))
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
    });
  };
  PhotoPic = () => {
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

  render() {
    return (
      <Drawer
      ref={(ref) => { this.drawer = ref; }}
      content={<SideBar
        navigator={this.navigator}
        changeTag={this.onChangeTag.bind(this)}
        />}
        onClose={() => this.closeDrawer}
        onPress={() => this.closeDrawer}
        openDrawerOffset={0.3}
        panCloseMask={0.3}>
      <View>
          <NavbarComp  button1={this.openDrawer} button2={this.PhotoPic} titleTxt={'Home'}/>
          <CardComp imgUri={'http://placehold.it/480x270'} titleTxt={'Home Screen'}/>
      </View>
      </Drawer>
    );
  }
}


const mapStateToProps = state => ({
  url: state.pics.picURL,
  tag: state.tags.activeTag
});

export default connect(mapStateToProps, { picFound, navAction })(HomeScreen);
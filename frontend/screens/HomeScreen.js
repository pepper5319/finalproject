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
        PhotoPic = () =>{
          const options = {
            noData: true
          };
          ImagePicker.showImagePicker(options, response => {
            if (response.uri) {
              postReceipt(response.uri)
              this.props.picFound(response.uri);
              console.log("response", this.props.url);
            }
          });
        };

        postReceipt = (url) => {
          var xhr = new XMLHttpRequest();
          var url = "http://localhost:8000/api/receipt/";
          xhr.open("GET", url, true);
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.setRequestHeader('Authorization', 'Token ' + this.state.userToken)
          xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var json = JSON.parse(xhr.responseText);
                console.log(json);
              }
            };
          var data = JSON.stringify({
          //  'url' = url
          });
          xhr.send(data);
        }


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

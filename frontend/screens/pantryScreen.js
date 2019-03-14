import React from 'react';
import { StyleSheet, View,Text } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Drawer } from 'native-base';
import DrawerStyle from '../navigation/drawerStyle';
import { picFound } from '../actions/picActions.js';
import { navAction } from '../actions/navigationAction.js';
import { connect } from 'react-redux';
import PantryList from '../componets/pantryList.js';
import NavbarComp from '../componets/navbarComp.js';

class PantryScreen extends React.Component {
  state = {
      userToken:"39f3fa646bf550befee5852f088676282356e32c",
      pantry: null
  };

  getPItems = _ => {
    var xhr = new XMLHttpRequest();
    var url = "https://pantryplatter.herokuapp.com/api/pItems/";
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader('Authorization', 'Token ' + this.state.userToken)
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
          var json = JSON.parse(xhr.responseText);
          this.setState({ pantry: json })
          console.log(this.state.pantry);
        }
      }.bind(this);
    var data = JSON.stringify({
    });
    xhr.send();
  }
  PhotoPic = () => {
    const options = {
      noData: true
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.uri) {
        this.props.picFound(response.uri);
      }
    });
  };

  onChangeTag = (tag) => {
    this.setState({ active: tag })
    this.props.changeTag3(tag)
  }
  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open()
  };
  componentDidMount()
  {
    this.getPItems()
  }

  render() {
    return (
      <Drawer
      ref={(ref) => { this.drawer = ref; }}
      content={<DrawerStyle
        navigator={this.navigator}
        changeTag={this.onChangeTag.bind(this)}
        />}
        onClose={() => this.closeDrawer}
        onPress={() => this.closeDrawer}
        openDrawerOffset={0.3}
        panCloseMask={0.3}>
      <View>
      <NavbarComp button1={this.openDrawer} button2={() => this.onChangeTag('addPantry')} titleTxt={'Pantry'}/>
      </View>
      <Text>{}</Text>
        <PantryList titleTxt={'Frosted Flakes'} descripTxt={'They are great!!!'} imgUri={'https://target.scene7.com/is/image/Target/GUEST_b9491cf3-7323-43b3-ae9a-8edfa5dcae0d?wid=488&hei=488&fmt=pjpeg'}/>
        <PantryList titleTxt={'BootyO\'s'} descripTxt={'Feel the power of the booty!!!'} imgUri={'https://cdn11.bigcommerce.com/s-0kvv9/images/stencil/1280x1280/products/142346/198390/api0yadvp__30948.1474917330.jpg?c=2&imbypass=on'}/>
        <PantryList titleTxt={'Lucky Charms'} descripTxt={'Don\'t Take my charms'} imgUri={'https://target.scene7.com/is/image/Target/GUEST_cafaa775-b2de-40f4-b24d-210b5ae54379?wid=488&hei=488&fmt=pjpeg'}/>
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  barcontainer: {
    backgroundColor: '#000',
  },

});

const mapStateToProps = state => ({
  url: state.pics.picURL,
  tag: state.tags.activeTag
});

export default connect(mapStateToProps, { picFound, navAction })(PantryScreen);

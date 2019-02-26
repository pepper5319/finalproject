import React from 'react';
import { StyleSheet, View } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Drawer } from 'native-base';
import DrawerStyle from '../navigation/drawerStyle';
import { picFound } from '../actions/picActions.js';
import { navAction } from '../actions/navigationAction.js';
import { connect } from 'react-redux';
import PantryList from '../componets/pantryList.js';
import NavbarComp from '../componets/navbarComp.js';

class PantryScreen extends React.Component {

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
    this.props.changeTag3(tag)
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
      content={<DrawerStyle 
        navigator={this.navigator}
        changeTag={this.onChangeTag.bind(this)}
        />}
        onClose={() => this.closeDrawer} 
        onPress={() => this.closeDrawer}
        openDrawerOffset={0.3}
        panCloseMask={0.3}>
      <View>
      <NavbarComp  button1={this.openDrawer} button2={this.PhotoPic} titleTxt={'Pantry'}/>
      </View>
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
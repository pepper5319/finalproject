import React from 'react';
import { View,Text } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Drawer } from 'native-base';
import DrawerStyle from '../navigation/drawerStyle';
import { picFound } from '../actions/picActions.js';
import { navAction } from '../actions/navigationAction.js';
import { connect } from 'react-redux';
import PantryList from '../componets/pantryList.js';
import NavbarComp from '../componets/navbarComp.js';
import { ADMIN_KEY, PANTRY_URL } from '../apiUrls.js';
import { getPItems, setPItems } from '../actions/recipeAction';

class PantryScreen extends React.Component {
  state = {
      userToken:"39f3fa646bf550befee5852f088676282356e32c",
      pantry: []
  };

  getPItems = _ => {
    var xhr = new XMLHttpRequest();
    var url = PANTRY_URL;
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader('Authorization', 'Token ' + ADMIN_KEY)
    xhr.onreadystatechange = function () {
      console.log(xhr.status);
      if (xhr.readyState === 4 && xhr.status === 200) {
          var json = JSON.parse(xhr.responseText);
          this.setState({ pantry: json })
          console.log(json);
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

  onChangeTag = (tag,data) => {
    this.setState({ active: tag })
    this.props.changeTag3(tag)
  }
  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open()
  };
  componentDidMount(){
    console.log("MOUNTED");
    this.getPItems()
  }

  postReceipt = _ => {
    fetch('http://pantryplatter.herokuapp.com/api/pItems')
      .then(console.log('button pressed!'))
      .then(response => response.json())
      .then(response => this.setState({ students: response.data }))
      .catch(err => console.error(err))
  };

  render() {
    const Pitems = this.state.pantry.map((pitem) => (
        <PantryList titleTxt={pitem.name} descripTxt={pitem.qty} expDate={pitem.exp_date}/>
    ));

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
        {Pitems}
      </Drawer>
    );
  }
}

const mapStateToProps = state => ({
  url: state.pics.picURL,
  tag: state.tags.activeTag,
});

export default connect(mapStateToProps, { picFound, navAction})(PantryScreen);

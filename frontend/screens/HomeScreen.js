import React from 'react';
import { View, ScrollView } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Drawer } from 'native-base';
import DrawerStyle from '../navigation/drawerStyle.js';
import { picFound } from '../actions/picActions.js';
import { navAction } from '../actions/navigationAction.js';
import { getRecipes, setRecipe } from '../actions/recipeAction.js';
import { connect } from 'react-redux';
import NavbarComp from '../componets/navbarComp.js'
import CardCompRecepie from '../componets/cardCompRecepie.js';
import { ADMIN_KEY } from '../apiUrls.js';
import { backtohomeAction } from '../actions/backtohomeAction.js';
import { userToken } from '../actions/tokenAction.js';

class HomeScreen extends React.Component {

  PhotoPic = () => {
    const options = {
      noData: true
    };
    ImagePicker.showImagePicker(options, response => {
      console.log(process.env.API_URL)
      if (response.uri) {
        let photo = { uri: response.uri}
        let formdata = new FormData();
        formdata.append("file", {uri: photo.uri, name: 'image.jpg', type: 'multipart/form-data'})
        var xhr = new XMLHttpRequest();
        var url = "https://pantryplatter.herokuapp.com/api/receipts/";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "multipart/form-data");
        xhr.setRequestHeader('Authorization', 'Token ' + 	this.props.token)
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
              var json = JSON.parse(xhr.responseText);
              console.log(json);
            }
          };
        xhr.send(formdata);
        this.props.picFound(response.uri);
      }
    });
  };

  postReceipt = _ => {
    fetch('http://localhost:8000/api/Recipes')
      .then(console.log('button pressed!'))
      .then(response => response.json())
      .then(response => this.setState({ students: response.data }))
      .catch(err => console.error(err))
  };
  componentDidMount(){
    this.props.getRecipes(this.props.token);
    this.props.backtohomeAction('home');
  }

  componentDidUpdate(){
    console.log(this.props.recipes);
  }

  onChangeTag = (tag) => {
    this.setState({ active: tag })
    this.props.changeTag(tag);
  }


  toRecipe = (tag, data) => {
    this.props.setRecipe(data);
    this.setState({ active: tag })
    this.props.changeTag(tag);
  }

  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open()
  };

  render() {
  console.log(this.props.recipes[0]);
    const recipes = this.props.recipes.map((recipe) => (
      <CardCompRecepie imgUri={recipe.image_url} titleTxt={recipe.name} viewClick={(tag) => this.toRecipe(tag, recipe)}/>
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
          <NavbarComp button1={this.openDrawer} button2={this.PhotoPic} titleTxt={'Home'}/>
      </View>
      <ScrollView style={{backgroundColor: '#f2f2f2', padding: 10}}>

        {recipes}

      </ScrollView>

      </Drawer>

    );
  }
}


const mapStateToProps = state => ({
  url: state.pics.picURL,
  tag: state.tags.activeTag,
  recipes: state.recipes.recipes,
  tagHome: state.tohome.homeTag,
  token: state.token.token
});

export default connect(mapStateToProps, { picFound, navAction, getRecipes, setRecipe, backtohomeAction })(HomeScreen);

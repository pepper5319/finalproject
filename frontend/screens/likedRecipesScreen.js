import React from 'react';
import { View,Text,ScrollView,ImageBackground } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Drawer } from 'native-base';
import DrawerStyle from '../navigation/drawerStyle';
import { picFound } from '../actions/picActions.js';
import { navAction } from '../actions/navigationAction.js';
import { connect } from 'react-redux';
import PantryList from '../componets/pantryList.js';
import CardCompRecepie from '../componets/cardCompRecepie.js';
import { backtohomeAction } from '../actions/backtohomeAction.js';

import NavbarComp from '../componets/navbarComp.js'
import { ADMIN_KEY, PANTRY_URL, RECIPES_URL } from '../apiUrls.js';
import { getPItems, setPItems, setRecipe } from '../actions/recipeAction';
class LikedRecipeScreen extends React.Component {
  state = {
      userToken:"39f3fa646bf550befee5852f088676282356e32c",
      user: {},
      recipes: []
  };

  getLikedRecipes = () => {
    var xhr = new XMLHttpRequest();
    var url = "https://pantryplatter.herokuapp.com/api/pUser/";
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader('Authorization', 'Token ' + this.props.token)
    xhr.onreadystatechange = () => {
      console.log(xhr.status);
      if (xhr.readyState === 4 && xhr.status === 200) {
          var json = JSON.parse(xhr.responseText);
          this.setState({ user: json });
          this.getRecipes();
        }
      }
    var data = JSON.stringify({
    });
    xhr.send();
  }
  getRecipes = () => {

    this.state.user.liked_recipes.forEach((r) => {
      fetch(RECIPES_URL + r, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'Authorization': 'Token ' + this.props.token
          },
        })
        .then(res => {
          if(res.status === 200){
            return res.json()
          }else{
            alert(res.status);
          }
        }).then(data => {
          var joined = this.state.recipes.concat(data);
          this.setState({ recipes: joined })
        })
    });
  }

  componentDidUpdate(){
    // console.log(this.state.recipes);
  }

  onChangeTag = (tag) => {
    this.setState({ active: tag })
    this.props.changeTag11(tag)
  }
  toRecipe = (tag, data) => {
      this.props.setRecipe(data);
      this.setState({ active: tag })
      this.props.changeTag11(tag)
  }
  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open()
  };
  componentDidMount(){
    console.log("MOUNTED");
    this.getLikedRecipes()
    this.props.backtohomeAction('likedRecipe');
  }
  componentWillMount(){
    console.log("MOUNTING");
  }

  render() {
    var renderRecipes;
    if(this.state.recipes !== null){
      console.log(this.state.recipes)
      renderRecipes = this.state.recipes.map((r) => (
        <CardCompRecepie imgUri={r.recipe.image_url} titleTxt={r.recipe.name} viewClick={(tag) => this.toRecipe(tag, r.recipe)}/>
      ));
    }
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
        <NavbarComp button1={this.openDrawer} titleTxt={'Liked Recipes'} />
      </View>
      <ScrollView style={{backgroundColor: '#f2f2f2', padding: 10}}>
        {renderRecipes}
      </ScrollView>
      </Drawer>
    );
  }
}

const mapStateToProps = state => ({
  url: state.pics.picURL,
  tag: state.tags.activeTag,
  token: state.token.token
});

export default connect(mapStateToProps, { picFound, navAction, setRecipe, backtohomeAction})(LikedRecipeScreen);

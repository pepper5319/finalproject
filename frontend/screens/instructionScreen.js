import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, Animated} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Drawer } from 'native-base';
import { Snackbar, Button } from 'react-native-paper';
import SideBar from '../navigation/drawerStyle';
import { picFound } from '../actions/picActions.js';
import { navAction } from '../actions/navigationAction.js';
import { setRecipe, getSingleRecipe, nullRecipe } from '../actions/recipeAction.js';
import { userDataFound } from '../actions/userAction.js';
import { connect } from 'react-redux';
import BasicBackNav from '../componets/basicBackNav.js';
import InstructionComp from '../componets/instructionComp.js'
import { backtohomeAction } from '../actions/backtohomeAction.js';
import { ADMIN_KEY, USER_URL } from '../apiUrls.js';

class InstructionScreen extends React.Component {
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

    constructor(){
        super();
        this.state = {
            ingredients: null,
            snackBarVisible: false,
            snackBarText: 'Liked This Recipe'
        }
        this._visibility = new Animated.Value(0);
    }

    onChangeTag = (tag) => {
        this.props.changeTag6(tag)
    }
    closeDrawer = () => {
        this.drawer._root.close()
    };
    openDrawer = () => {
        this.drawer._root.open()
    };

    componentWillMount(){

    }
    componentWillReceiveProps(props){
      console.log("UPDATING");
    }
    componentDidMount(){
      console.log(this.props.recipe);
      fetch(USER_URL, {
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
          this.props.userDataFound(data);
          this.props.getSingleRecipe(this.props.token, this.props.recipe_id);
        })
    }
    componentDidUpdate(){
      console.log(this.props.recipe);
      if(this.state.ingredients === null && this.props.recipe !== null && this.props.recipe !== undefined){
        var ing = this.props.recipe.recipe.ingredients.replace(/[\[\]&]+/g, '');
        ing = ing.replace(/[\']+/g, '');
        ing = ing.replace(/[\']+/g, '');
        this.setState({ingredients: ing.split(', ')});
        Animated.timing(
         this._visibility,
         {
           toValue: 1,
           duration: 300,
         }
       ).start();
      }
    }
    componentWillUnmount(){
      console.log("Unmount");
    }

    likeRecipe = () => {
      console.log("Liked Recipe: " + this.props.recipe_id);
      if(this.props.userData.liked_recipes.indexOf(this.props.recipe_id) !== -1){
        this.setState({snackBarText: 'Unliked This Recipe'});
      }
      recipeData = {liked_recipes: this.props.recipe_id}
      fetch(USER_URL, {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
            'Authorization': 'Token ' + this.props.token
          },
          body: JSON.stringify(recipeData)
        })
        .then(res => {
          if(res.status === 200){
            this.setState({snackBarVisible: true});
            return res.json()
          }else{
            alert(res.status);
          }
        })
    }


    render() {

        const viewOpacity = {
          opacity: this._visibility.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
          })
        }

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
                    <BasicBackNav button1={this.props.changeTag6} button2={this.likeRecipe} backTo={this.props.tagHome} titleTxt={'Instruction'} />
                </View>
                <Animated.View style={[viewOpacity]}>
                  {this.props.recipe !== null && this.props.recipe !== undefined && this.state.ingredients !== null &&
                    <InstructionComp ingredients={this.state.ingredients} recipeName={this.props.recipe.recipe.name} matches={this.props.recipe.matches} webUrl={this.props.recipe.recipe.image_url}/>
                  }
                  <Button color="#cc0000" style={{maxWidth: 150, alignSelf: 'center'}} onPress={() => {this.props.changeTag6('web')}} mode="contained">
                    View Recipe
                  </Button>

              </Animated.View>
            <Snackbar
              visible={this.state.snackBarVisible}
              onDismiss={() => this.setState({ snackBarVisible: false })}
            >
              {this.state.snackBarText}
            </Snackbar>
            </Drawer>
        );
    }
}


const styles = StyleSheet.create({
    webButton:{
        marginRight:40,
        marginLeft:40,
       marginTop:30,
       marginBottom: 10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#cc0000',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#cc0000',
        position: 'absolute',
        bottom:10,
        left: '16%',
      },
      webBtnText:{
          color:'#fff',
          textAlign:'center',
          paddingLeft : 10,
          paddingRight : 10,
          fontSize: 22,
      }
});

const mapStateToProps = state => ({
    url: state.pics.picURL,
    tag: state.tags.activeTag,
    recipe: state.recipes.recipe,
    recipe_id: state.recipes.recipe_id,
    tagHome: state.tohome.homeTag,
    token: state.token.token,
    userData: state.users.userData
});

const windowHeight = Dimensions.get("window").height

export default connect(mapStateToProps, { picFound, navAction, setRecipe, backtohomeAction, getSingleRecipe, userDataFound, nullRecipe })(InstructionScreen);

import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Drawer } from 'native-base';
import { Snackbar } from 'react-native-paper';
import SideBar from '../navigation/drawerStyle';
import { picFound } from '../actions/picActions.js';
import { navAction } from '../actions/navigationAction.js';
import { setRecipe, getSingleRecipe } from '../actions/recipeAction.js';
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
            snackBarVisible: false
        }
    }

    onChangeTag = (tag) => {
        this.setState({ active: tag })
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
      this.props.getSingleRecipe(this.props.token, this.props.recipe_id);
    }
    componentDidUpdate(){
      console.log(this.props.recipe);
      if(this.state.ingredients === null && this.props.recipe !== null && this.props.recipe !== undefined){
        var ing = this.props.recipe.recipe.ingredients.replace(/[\[\]&]+/g, '');
        ing = ing.replace(/[\']+/g, '');
        ing = ing.replace(/[\']+/g, '');
        this.setState({ingredients: ing.split(', ')});
      }
    }
    componentWillUnmount(){
      console.log("Unmount");
    }

    likeRecipe = () => {
      console.log("Liked Recipe: " + this.props.recipe_id);
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
              {this.props.recipe !== null && this.props.recipe !== undefined && this.state.ingredients !== null &&<InstructionComp ingredients={this.state.ingredients} matches={this.props.recipe.matches} webUrl={this.props.recipe.recipe.image_url}/>
              }

              <TouchableOpacity
                style={styles.webButton}
                onPress={() => {this.props.changeTag6('web')}}
                underlayColor='#000000'>
                <Text style={styles.webBtnText}>Instruction URL</Text>
              </TouchableOpacity>
            <Snackbar
              visible={this.state.snackBarVisible}
              onDismiss={() => this.setState({ snackBarVisible: false })}
            >
              Liked This Recipe
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
});

const windowHeight = Dimensions.get("window").height

export default connect(mapStateToProps, { picFound, navAction, setRecipe, backtohomeAction, getSingleRecipe })(InstructionScreen);

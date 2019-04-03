import React, { Component } from 'react';
import { Drawer } from 'native-base';
import { AsyncStorage } from 'react-native';
import SignUpScreen from './screens/signUpScreen.js';
import HomeScreen from './screens/HomeScreen.js';
import PantryScreen from './screens/pantryScreen.js';
import RecipeScreen from './screens/recipeScreen.js';
import InstructionScreen from './screens/instructionScreen.js'
import LoginScreen from './screens/loginScreen.js';
import WebScreen from './screens/webScreen.js';
import AddPantryScreen from './screens/addPantryScreen.js';
import LogoutScreen from './screens/logoutScreen.js';
import LikedRecipeScreen from './screens/likedRecipesScreen.js';
import { connect } from 'react-redux';
import { setUserToken }  from './actions/tokenAction.js';

class MainNavigation extends Component {
    state = {
        active: 'loging'
    };
    constructor() {
        super();
    };

    onChangeTag = (tag) => {
        this.setState({ active: tag })
      }

    componentWillMount(){
      this._retrieveData()
    }

    _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('token');
        if (value !== null && value !== undefined && value !== '') {
          console.log(value);
          this.props.setUserToken(value);
          this.onChangeTag('likedRecipe');
        }
      } catch (error) {
        // Error retrieving data
      }
    };

    render() {
        return (
            <Drawer>
                {this.state.active == 'home' &&
                    <HomeScreen changeTag={this.onChangeTag.bind(this)}/>
                     || this.state.active == 'signup' &&
                    <SignUpScreen changeTag2={this.onChangeTag.bind(this)}/>
                     || this.state.active == 'pantry' &&
                     <PantryScreen changeTag3={this.onChangeTag.bind(this)}/>
                     || this.state.active == 'recipe' &&
                     <RecipeScreen changeTag4={this.onChangeTag.bind(this)} changeTag5={this.onChangeTag.bind(this)}/>
                     || this.state.active == 'instruction' &&
                     <InstructionScreen changeTag6={this.onChangeTag.bind(this)}/>
                     || this.state.active == 'addPantry' &&
                     <AddPantryScreen changeTag5={this.onChangeTag.bind(this)}/>
                     || this.state.active == 'login' &&
                    <LoginScreen changeTag7={this.onChangeTag.bind(this)}/>
                     || this.state.active == 'web' &&
                    <WebScreen changeTag8={this.onChangeTag.bind(this)}/>
                     || this.state.active == 'logout' &&
                    <LogoutScreen changeTag9={this.onChangeTag.bind(this)}/>
                    || this.state.active == 'likedRecipe' &&
                   <LikedRecipeScreen changeTag11={this.onChangeTag.bind(this)}/>
                }
            </Drawer>

        );
    }
}
const mapStateToProps = state => ({

});

export default connect(mapStateToProps, { setUserToken })(MainNavigation);

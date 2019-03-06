import React, { Component } from 'react';
import { Drawer } from 'native-base';
import SignUpScreen from './screens/signUpScreen.js';
import HomeScreen from './screens/HomeScreen.js';
import PantryScreen from './screens/pantryScreen.js';
import RecipeScreen from './screens/recipeScreen.js';
import InstructionScreen from './screens/instructionScreen.js'
import LoginScreen from './screens/loginScreen.js';
import WebScreen from './screens/webScreen.js';
export default class MainNavigation extends Component {
    state = {
        active: 'home'
    };
    constructor() {
        super();
    };
   
    onChangeTag = (tag) => {
        this.setState({ active: tag })
        console.log('tag change')
      }
   
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
                     || this.state.active == 'login' &&
                    <LoginScreen changeTag7={this.onChangeTag.bind(this)}/>
                    || this.state.active == 'web' &&
                    <WebScreen changeTag8={this.onChangeTag.bind(this)}/>
                }
            </Drawer>

        );
    }
}



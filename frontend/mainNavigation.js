import React, { Component } from 'react';
import { Drawer } from 'native-base';
import SignUpScreen from './screens/signUpScreen.js';
import HomeScreen from './screens/HomeScreen.js';
import PantryScreen from './screens/pantryScreen.js'

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
                }
                
            </Drawer>

        );
    }
}




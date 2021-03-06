import React from 'react';
import { Dimensions } from 'react-native'

import { Drawer } from 'react-native-paper';


export default class DrawerStyle extends React.Component {
    state = {
      active: '',
    };


    render() {
      const windowHeight = Dimensions.get("window").height
      const { active } = this.state;

      return (
        <Drawer.Section title="MENU"
        style={{backgroundColor:'white', height: windowHeight, paddingTop: 15}}>

          <Drawer.Item
            label="Home"
            active={active === 'home'}
            onPress={() => { this.setState({ active: 'home' });
            this.props.changeTag('home')
          }}
          />
          <Drawer.Item
            label="Pantry"
            active={active === 'pantry'}
            onPress={() => { this.setState({ active: 'pantry' });
            this.props.changeTag('pantry')
          }}
          />
          <Drawer.Item
            label="Recipe"
            active={active === 'recipe'}
            onPress={() => { this.setState({ active: 'recipe' });
            this.props.changeTag('recipe')
          }}
          />
          <Drawer.Item
            label="Liked Recipes"
            active={active === 'likedRecipe'}
            onPress={() => { this.setState({ active: 'likedRecipe' });
            this.props.changeTag('likedRecipe')
          }}
          />
          <Drawer.Item
            label="Register"
            active={active === 'signup'}
            onPress={() => { this.setState({ active: 'signup' });
            this.props.changeTag('signup')
          }}
          />
          <Drawer.Item
            label="Logout"
            active={active === 'logout'}
            onPress={() => { this.setState({ active: 'logout' });
            this.props.changeTag('logout')
          }}
          />


       </Drawer.Section>
      );
    }
}

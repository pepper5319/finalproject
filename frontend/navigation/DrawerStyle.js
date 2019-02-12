import React from 'react';
import { Plataform, Dimensions } from 'react-native'

import { Drawer } from 'react-native-paper';
import PantryScreen from '../screens/pantryScreen'
import SettingScreen from '../screens/settingScreen'
import { navAction } from '../actions/navigationAction.js';


export default class DrawerStyle extends React.Component {
    state = {
      active: '',
    };

    
    render() {
      const windowHeight = Dimensions.get("window").height
      const { active } = this.state;
  
      return (
        <Drawer.Section title="MENU"
        style={{backgroundColor:'white', height: windowHeight}}>

          <Drawer.Item
            label="Menu"
            active={active === 'first'}
            onPress={() => { this.setState({ active: 'first' });
            this.props.changeTag('first')
          }}
          />
          <Drawer.Item
            label="Pantry"
            active={active === 'second'}
            onPress={() => { this.setState({ active: 'second' });
            this.props.changeTag('second')
          }}
          />
          <Drawer.Item
            label="Settings"
            active={active === 'third'}
            onPress={() => { this.setState({ active: 'third' });
            this.props.changeTag('third')
          }}
          />

       </Drawer.Section>
      );
    }
}


import React from 'react';
import { Plataform, Dimensions } from 'react-native'

import { Drawer } from 'react-native-paper';
import PantryScreen from '../screens/pantryScreen'
import SettingScreen from '../screens/settingScreen'


export default class DrawerStyle extends React.Component {
    state = {
      active: 'first',
    };
  
    render() {
      const { active } = this.state;
  
      return (
        <Drawer.Section title="MENU" 
        style={{backgroundColor:'white'}}>
          <Drawer.Item
            label="Menu"
            active={active === 'first'}
            onPress={() => { this.setState({ active: 'first' }); }}
          />
          <Drawer.Item
            label="Pantry"
            active={active === 'second'}
            onPress={() => { this.setState({ active: 'second' }); }}
          />
          <Drawer.Item
            label="Settings"
            active={active === 'third'}
            onPress={() => { this.setState({ active: 'third' }); }}
          />
       </Drawer.Section>
      );
    }
}
//const WIDTH = Dimensions.get("window").width;


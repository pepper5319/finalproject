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
        style={{backgroundColor:'white', height: windowHeight}}>

          <Drawer.Item
            label="Menu"
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

            label="Login"
            active={active === 'login'}
            onPress={() => { this.setState({ active: 'login' });
            this.props.changeTag('login')
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
          <Drawer.Item
            label="Loding"
            active={active === 'loding'}
            onPress={() => { this.setState({ active: 'loding' });
            this.props.changeTag('loding')
          }}
          />

       </Drawer.Section>
      );
    }
}

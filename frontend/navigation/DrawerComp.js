import React, { Component } from 'react';
import { Drawer } from 'native-base';
import SideBar from './DrawerStyle';
import { Button } from '../componets/buttons';
export default class DrawerComp extends Component {
  render() {
    closeDrawer = () => {
      this.drawer._root.close()
    };
    openDrawer = () => {
      this.drawer._root.open()
    };
    return (
      <Drawer

        ref={(ref) => { this.drawer = ref; }}
        content={<SideBar navigator={this.navigator} />}
        onClose={() => this.closeDrawer()} >



      </Drawer>
    );
  }
}
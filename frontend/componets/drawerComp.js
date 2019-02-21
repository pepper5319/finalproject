import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Drawer } from 'native-base';
import SideBar from '../navigation/drawerStyle';

export default class DrawerComp extends React.Component {
    render() {
        return(
        <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<SideBar 
        navigator={this.navigator}
        changeTag={this.props.TagChange}
        />}
        onClose={() => this.props.CloseDraw} 
        onPress={() => this.props.CloseDraw}
        openDrawerOffset={0.3}
        panCloseMask={0.3}/>
        )
    }
}

const styles = StyleSheet.create({
    barcontainer: {
      backgroundColor: '#000',
    },
  
  });
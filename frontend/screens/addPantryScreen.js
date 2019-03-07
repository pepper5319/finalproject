import React from 'react';
import { View, ScrollView, Image, StyleSheet, Text, ListView } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Drawer } from 'native-base';
import { TextInput, Card, IconButton, Title, Paragraph, Button } from 'react-native-paper';
import SideBar from '../navigation/drawerStyle';
import { navAction } from '../actions/navigationAction.js';
import { connect } from 'react-redux';
import NavbarComp from '../componets/navbarComp';
import WebViewComp from '../componets/webViewComp'

class AddPantryScreen extends React.Component {

    onChangeTag = (tag) => {
        this.setState({ active: tag })
        console.log('tag change')
        this.props.changeTag5(tag)
    }
    closeDrawer = () => {
        this.drawer._root.close()
    };
    openDrawer = () => {
        this.drawer._root.open()
    };

    state = {
      itemName: '',
      itemQty: '',
      itemExp: '',
      newItems: []
    }

    addItem = () => {
      if(this.state.itemName !== ''){
        var itemData = {};
        itemData['itemID'] = this.state.newItems.length;
        if(this.state.itemName !== ''){itemData['itemName'] = this.state.itemName}
        if(this.state.itemQty !== ''){itemData['itemQty'] = this.state.itemQty}
        if(this.state.itemExp !== ''){itemData['itemExp'] = this.state.itemExp}
        var newData = this.state.newItems.concat([itemData]);
        this.setState({
          newItems: newData,
          itemName: '',
          itemQty: '',
          itemExp: ''
        });
      }
      console.log(this.state.newItems);
    }

    removeItem = (id) => {
      
    }

    render() {

        const items = this.state.newItems.map((item) => (
          <Card style={{marginBottom: 10}}>
              <Card.Content>
                <Title>{item.itemName}</Title>
                {item.itemQty !== undefined && <Paragraph>{item.itemQty} - Exp: {item.itemExp}</Paragraph> }
              </Card.Content>
              <Card.Actions style={{justifyContent:'flex-end'}}>
                <IconButton icon='remove-circle' onPress={() => {}}/>
              </Card.Actions>
            </Card>
        ));

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
                  <NavbarComp button1={this.openDrawer} button2={this.openDrawer} titleTxt={'Add To Pantry'}/>
                </View>
                <View style={{padding: 16}}>
                  <TextInput
                    style={{marginBottom: 10}}
                    label='Item Name'
                    value={this.state.itemName}
                    mode='outlined'
                    onChangeText={itemName => this.setState({ itemName })}
                  />
                  <View style={{flexDirection: 'row'}}>
                    <TextInput
                      keyboardType='numeric'
                      style={{flex: 1, marginRight: 5}}
                      label='Item Quantity'
                      value={this.state.itemQty}
                      mode='outlined'
                      onChangeText={itemQty => this.setState({ itemQty })}
                    />
                    <TextInput
                      keyboardType='numeric'
                      placeholder='MM.DD.YYYY'
                      style={{flex: 1, marginLeft: 5}}
                      label='Experation Date'
                      value={this.state.itemExp}
                      mode='outlined'
                      onChangeText={itemExp => this.setState({ itemExp })}
                    />
                  </View>
                  <Button onPress={() => this.addItem()}>Add Item</Button>
                </View>
                <ScrollView style={{padding: 16}}>
                  {items}
                </ScrollView>
            </Drawer>
        );
    }
}
const ingredients = ['chicken breast', 'salt', 'egg', 'bread crumb', 'parmesan cheese', 'flour', 'olive oil', 'tomato', 'mozzarella', 'basil', 'provolone cheese'];


const styles = StyleSheet.create({
    stretch: {
        width: 350,
        height: 200,
        borderRadius: 1,
        borderWidth: 0.8,
        borderColor: 'black',
    },
    contain: {
        alignItems: 'center',
        top: 12
    },
    ingredientView: {
        top:10
    },
    webView: {
        width: 350,
        height: 300,
    },
});

const mapStateToProps = state => ({
    url: state.pics.picURL,
    tag: state.tags.activeTag
});

export default connect(mapStateToProps, { navAction })(AddPantryScreen);

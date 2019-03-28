import React from 'react';
import { StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {List, ListItem, Text, Left, Body, Right } from 'native-base';




export default class PantryList extends React.Component {
  buttonAlert = () => {
  
    Alert.alert(
      'Delete Item',
      'You sure you want to remove this item?',
      [
        {text: 'NO', onPress: () => console.warn('NO Pressed'), style: 'cancel'},
        {text: 'YES', onPress: () => this.props.deleteButton()}
      ]
    );
  
  }
  

    render() {
        return(
          <List>
            <ListItem thumbnail>
              <Left>
                <TouchableOpacity style={styles.removeBTN}
                 onPress={() =>  this.buttonAlert()}>
          <Text style={{color: '#cc0000', fontWeight: 'bold', fontSize: 20}}>X</Text>
           </TouchableOpacity>
           
              </Left>

              <Body style={{position: "relative", right: 20}}>
<<<<<<< HEAD
              <Text>{this.props.titleTxt + '\n' + this.props.descripTxt}</Text>

=======
                <Text style={{textTransform: 'capitalize'}}>{this.props.titleTxt}</Text>
                <Text note numberOfLines={1}>{this.props.descripTxt}</Text>
>>>>>>> d0e5d76e5da1753cd3fb2f15bf5fecfb395d2fee
              </Body>
              <Right>
                <Text  style={{fontSize: 10,fontWeight: '400'}}>EXP. Date</Text>

                  <Text style={{alignContent: 'center'}}>{this.props.expDate}</Text>
              </Right>
            </ListItem>
          </List>
        )
    }
}

const styles = StyleSheet.create({
  removeBTN:{
      position: 'relative',
      right: 10,
      height: 23,
      width: 23,

    },
});

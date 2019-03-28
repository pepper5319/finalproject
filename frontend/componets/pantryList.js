import React from 'react';
import {List, ListItem, Text, Body, Right } from 'native-base';

export default class PantryList extends React.Component {
    render() {
        return(
          <List>
            <ListItem thumbnail>
              <Body style={{position: "relative", right: 20}}>
                <Text style={{textTransform: 'capitalize'}}>{this.props.titleTxt}</Text>
                <Text note numberOfLines={1}>{this.props.descripTxt}</Text>
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

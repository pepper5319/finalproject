import React from 'react';
import { Container, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';

export default class PantryList extends React.Component {
    render() {
        return(
          <List>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={{ uri: this.props.imgUri }} />
              </Left>
              <Body>
                <Text>{this.props.titleTxt}</Text>
                <Text note numberOfLines={1}>{this.props.descripTxt}</Text>
              </Body>
              <Right>
                <Button transparent>
                  <Text>View</Text>
                </Button>
              </Right>
            </ListItem>
          </List>
        )
    }
}

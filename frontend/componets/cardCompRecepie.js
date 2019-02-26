import React from 'react';
import { Card, Title } from 'react-native-paper';
import { Text } from 'native-base';
import { Button } from 'react-native';

export default class CardCompRecepie extends React.Component {
    render() {
        return(
            <Card elevation={6}>
            <Card.Content>
              <Title>{this.props.titleTxt}</Title>
            </Card.Content>
            <Card.Cover source={{ uri: this.props.imgUri }} />
            <Card.Actions>
              <Button onPress={() => {this.props.viewClick('instruction')}} title="View" color="black" transparent>
               </Button>
            </Card.Actions>
          </Card>
        )
    }
}
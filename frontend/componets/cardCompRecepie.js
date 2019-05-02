import React from 'react';
import { Card, Title,Button } from 'react-native-paper';


export default class CardCompRecepie extends React.Component {
    render() {
        return(
            <Card style={{marginBottom: 10, borderRadius:8}}>
            <Card.Content>
              <Title>{this.props.titleTxt}</Title>
            </Card.Content>
            <Card.Cover source={{ uri: this.props.imgUri }} />
            <Card.Actions>
              <Button onPress={() => {this.props.viewClick('instruction')}} color="black">
                View
              </Button>
            </Card.Actions>
          </Card>
        )
    }
}

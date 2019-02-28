import React from 'react';
import { Button, Card, Title } from 'react-native-paper';

export default class CardComp extends React.Component {
    render() {
        return(
            <Card elevation={6}>
            <Card.Content>
              <Title>{this.props.titleTxt}</Title>
            </Card.Content>
            <Card.Cover source={{ uri: this.props.imgUri }} />
            <Card.Actions>
              <Button onPress={() => console.log('pressed')} color='#000'>
                ok
               </Button>
            </Card.Actions>
          </Card>
        )
    }
}
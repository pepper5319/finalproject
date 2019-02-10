import React from 'react';
import {StyleSheet, View} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import SideBar from '../navigation/drawerStyle';
import { Drawer } from 'native-base';
import { Button, Card, Title, Appbar } from 'react-native-paper';

export default class HomeScreen extends React.Component {

    PhotoPic = () =>{
        const options = {
          noData: true
        };
        ImagePicker.showImagePicker(options, response => {
          if (response.uri) {
            this.props.picFound(response.uri);
            console.log("response", this.props.url);
          }
        });
      };
    
      getStudents = _ => {
          fetch('http://localhost:8000/api/Recipes')
          .then(console.log('button pressed!'))
          .then(response => response.json())
        //  .then(response => this.setState({students: response.data}))
          .catch(err => console.error(err))
      }

    render(){
        return(
            <Drawer
                ref={(ref) => { this.drawer = ref; }}
                content={<SideBar navigator={this.navigator} />}
                onClose={() => this.closeDrawer} 
                openDrawerOffset={0.3}
                panCloseMask={0.3}>
            <View>
                <Appbar style={styles.barcontainer}>
                    <Appbar.Action icon="menu" onPress={() => console.log('Pressed archive')} />
                    <Appbar.Content title="Home"/>
                    <Appbar.Action icon="add-a-photo" onPress={() => console.log('Pressed archive')} />
                </Appbar>
                <Card elevation={6}>
                    <Card.Content>
                        <Title>Fuck Me</Title>
                    </Card.Content>
                    <Card.Cover source={{uri: 'http://placehold.it/480x270'}}/>
                    <Card.Actions>
                        <Button onPress={()=>console.log('pressed')} color='#000'>
                            ok
                        </Button>
                    </Card.Actions>
                </Card>
            </View>
            </Drawer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    barcontainer:{
      backgroundColor: '#000',
    },
    
  });
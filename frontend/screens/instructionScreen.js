import React from 'react';
import { View, ScrollView, Image, StyleSheet, Text, ListView, Button, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Drawer } from 'native-base';
import SideBar from '../navigation/drawerStyle';
import { picFound } from '../actions/picActions.js';
import { navAction } from '../actions/navigationAction.js';
import { connect } from 'react-redux';
import BasicBackNav from '../componets/basicBackNav.js';
import InstructionComp from '../componets/instructionComp.js'
class InstructionScreen extends React.Component {



    PhotoPic = () => {
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

    onChangeTag = (tag) => {
        this.setState({ active: tag })
        console.log('tag change')
        this.props.changeTag6(tag)
    }
    closeDrawer = () => {
        this.drawer._root.close()
    };
    openDrawer = () => {
        this.drawer._root.open()
    };

    render() {

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
                    <BasicBackNav button1={this.props.changeTag6} backTo={'recipe'} titleTxt={'Instruction'} />
                </View>

              <InstructionComp ingredients={ingredient} webUrl={'https://images.media-allrecipes.com/userphotos/300x300/4572704.jpg'}/>

              <TouchableOpacity
          style={styles.webButton}
          onPress={() => {this.props.changeTag6('web')}}
          underlayColor='#000000'>
          <Text style={styles.webBtnText}>Instruction URL</Text>
        </TouchableOpacity>
            </Drawer>
        );
    }
}
const ingredient = ['chicken breast', 'salt', 'egg', 'bread crumb', 'parmesan cheese', 'flour', 'olive oil', 'tomato', 'mozzarella', 'basil', 'provolone cheese', 'chicken breast', 'salt', 'egg', 'bread crumb', 'parmesan cheese', 'flour', 'olive oil', 'tomato', 'mozzarella', 'basil', 'provolone cheese'];
const ingredient2 = ['pneumonoultramicroscopicsilicovolcanoconiosis','pneumonoultramicroscopicsilicovolcanoconiosis','pneumonoultramicroscopicsilicovolcanoconiosis','pneumonoultramicroscopicsilicovolcanoconiosis','pneumonoultramicroscopicsilicovolcanoconiosis','pneumonoultramicroscopicsilicovolcanoconiosis','pneumonoultramicroscopicsilicovolcanoconiosis','pneumonoultramicroscopicsilicovolcanoconiosis','pneumonoultramicroscopicsilicovolcanoconiosis','pneumonoultramicroscopicsilicovolcanoconiosis','pneumonoultramicroscopicsilicovolcanoconiosis','pneumonoultramicroscopicsilicovolcanoconiosis','pneumonoultramicroscopicsilicovolcanoconiosis',];
const ingredient3 = ['Rosted White Chicken Things','Soft Baked Chiken Help','Man we are testing this','Dont have any new ideas','What is this thing','I have no idea what im doing','I cant believe you are doing this','The man the myth the legend'];


const styles = StyleSheet.create({
    webButton:{
        marginRight:40,
        marginLeft:40,
       marginTop:30,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#000000',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff'
      },
      webBtnText:{
          color:'#fff',
          textAlign:'center',
          paddingLeft : 10,
          paddingRight : 10,
          fontSize: 22,
      }
});

const mapStateToProps = state => ({
    url: state.pics.picURL,
    tag: state.tags.activeTag
});

export default connect(mapStateToProps, { picFound, navAction })(InstructionScreen);
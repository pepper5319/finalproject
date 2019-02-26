import React from 'react';
import { View, ScrollView, Image, StyleSheet, Text, ListView, Button } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Drawer } from 'native-base';
import SideBar from '../navigation/drawerStyle';
import { picFound } from '../actions/picActions.js';
import { navAction } from '../actions/navigationAction.js';
import { connect } from 'react-redux';
import BasicBackNav from '../componets/basicBackNav';
import WebViewComp from '../componets/webViewComp'

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

                <View style={styles.contain}>
                    <Image
                        style={styles.stretch}
                        source={{ uri: 'https://images.media-allrecipes.com/userphotos/300x300/4572704.jpg' }} />
                <Text style={{fontWeight:'bold', fontSize: 22}}>Ingredients</Text>

                {ingredients.map((ingredients) =>
                    <Text>{ingredients}</Text>
                )}
                <Button onPress={() => {this.props.changeTag6('web')}} title="Instruction URL" color="black" />
                </View>
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

export default connect(mapStateToProps, { picFound, navAction })(InstructionScreen);
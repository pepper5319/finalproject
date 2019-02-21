import React from 'react';
import { View, ScrollView, Image, StyleSheet, Text, ListView, WebView } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Drawer } from 'native-base';
import SideBar from '../navigation/drawerStyle';
import { picFound } from '../actions/picActions.js';
import { navAction } from '../actions/navigationAction.js';
import { connect } from 'react-redux';
import BasicBackNav from '../componets/basicBackNav';

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
                    <BasicBackNav button1={this.props.changeTag6} titleTxt={'Instruction'} />
                </View>
                <View style={styles.contain}>
                    <Image
                        style={styles.stretch}
                        source={{ uri: 'https://images-gmi-pmc.edge-generalmills.com/95d68a7f-2ff6-4f4c-af2a-5e3c7d0e0d35.jpg' }} />
                <Text style={{fontWeight:'bold', fontSize: 22}}>Ingredients</Text>

                {ingredients.map((ingredients) =>
                    <Text>{ingredients}</Text>
                )}
                <Text style={{fontWeight:'bold', fontSize: 22}}>Instructions</Text>
                <View style={styles.webView}>
                <WebView
        source={{uri: 'https://github.com/facebook/react-native'}}
        style={{marginTop: 20}}
      />
                </View>

                </View>
            </Drawer>
        );
    }
}
const ingredients = ['16 ounces penne pasta', '3-4 large chicken breast',
    '1/tsp of salt, pepper and garlic powder', '2 tbsp butter', '2 tbsp olive oil', '1/4 cup presto',
    '1 and 1/4 cup heavy cream', '1/4 cup grated parmesan cheese'];


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
        height: 200,
    }
});

const mapStateToProps = state => ({
    url: state.pics.picURL,
    tag: state.tags.activeTag
});

export default connect(mapStateToProps, { picFound, navAction })(InstructionScreen);
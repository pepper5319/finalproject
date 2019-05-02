import React from 'react';
import { View } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Drawer } from 'native-base';
import SideBar from '../navigation/drawerStyle';
import { picFound } from '../actions/picActions.js';
import { navAction } from '../actions/navigationAction.js';
import { connect } from 'react-redux';
import BasicBackNav from '../componets/basicBackNav';
import WebViewComp from '../componets/webViewComp'

class WebScreen extends React.Component {



    PhotoPic = () => {
        const options = {
            noData: true
        };
        ImagePicker.showImagePicker(options, response => {
            if (response.uri) {
                this.props.picFound(response.uri);
            }
        });
    };

    onChangeTag = (tag) => {
        this.setState({ active: tag })
        this.props.changeTag8(tag)
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
                    <BasicBackNav button1={this.props.changeTag8} backTo={'instruction'} titleTxt={'Web'} />
                </View>
                <WebViewComp recipeUrl={this.props.recipe.recipe.recipe_url}/>


            </Drawer>
        );
    }
}


const mapStateToProps = state => ({
    url: state.pics.picURL,
    tag: state.tags.activeTag,
    recipe: state.recipes.recipe
});

export default connect(mapStateToProps, { picFound, navAction })(WebScreen);

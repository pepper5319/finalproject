import React from 'react';
import { View, ScrollView } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Drawer } from 'native-base';
import SideBar from '../navigation/drawerStyle';
import { picFound } from '../actions/picActions.js';
import { navAction } from '../actions/navigationAction.js';
import { connect } from 'react-redux';
import PantryList from '../componets/pantryList.js';
import NavbarComp from '../componets/navbarComp.js';
import CardCompRecepie from '../componets/cardCompRecepie.js';

class RecipeScreen extends React.Component {

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
        this.props.changeTag4(tag)
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
                    <NavbarComp button1={this.openDrawer} button2={this.PhotoPic} titleTxt={'Recipe'} />
                </View>
                <ScrollView>
                <CardCompRecepie imgUri={'https://images.media-allrecipes.com/userphotos/300x300/4572704.jpg'} titleTxt={'Quick Shrimp Scampi Pasta'} viewClick={this.props.changeTag5}/>
                <CardCompRecepie imgUri={'https://images.media-allrecipes.com/userphotos/560x315/1035686.jpg'} titleTxt={'Surf and Turf for Two'} viewClick={this.props.changeTag5}/>
                <CardCompRecepie imgUri={'https://images.media-allrecipes.com/userphotos/560x315/1001596.jpg'} titleTxt={'Best Buttermilk Biscuits'} viewClick={this.props.changeTag5}/>
                <CardCompRecepie imgUri={'https://images.media-allrecipes.com/userphotos/600x600/397070.jpg'} titleTxt={'Meatball Nirvana'} viewClick={this.props.changeTag5}/>
                </ScrollView>
            </Drawer>
        );
    }
}

const mapStateToProps = state => ({
    url: state.pics.picURL,
    tag: state.tags.activeTag
});

export default connect(mapStateToProps, { picFound, navAction })(RecipeScreen);
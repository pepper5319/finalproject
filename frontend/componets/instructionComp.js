import React from 'react';
import { View, ScrollView, Image, StyleSheet, Text, ListView, Button } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Drawer } from 'native-base';
import SideBar from '../navigation/drawerStyle';
import { picFound } from '../actions/picActions.js';
import { navAction } from '../actions/navigationAction.js';
import { connect } from 'react-redux';
import BasicBackNav from '../componets/basicBackNav';

export default class InstructionComp extends React.Component {
    render() {
        return(
            <View style={styles.contain}>
            <Image
                style={styles.stretch}
                source={{ uri: 'https://images.media-allrecipes.com/userphotos/300x300/4572704.jpg' }} />
        <Text style={{fontWeight:'bold', fontSize: 22}}>Ingredients</Text>

         {ingredients.map((ingredients) =>
                    <Text>{ingredients}</Text>
                )}
        </View>

        )
    }
}

const styles = StyleSheet.create({
    contain: {
        alignItems: 'center',
        top: 12
    },
    stretch: {
        width: 350,
        height: 200,
        borderRadius: 1,
        borderWidth: 0.8,
        borderColor: 'black',
    },
});

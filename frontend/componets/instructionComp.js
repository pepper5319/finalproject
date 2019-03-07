import React from 'react';
import { View, ScrollView, Image, StyleSheet, Text, ListView, Button, FlatList, Dimensions } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Drawer, Row } from 'native-base';
import SideBar from '../navigation/drawerStyle';
import { picFound } from '../actions/picActions.js';
import { navAction } from '../actions/navigationAction.js';
import { connect } from 'react-redux';
import BasicBackNav from '../componets/basicBackNav';


export default class InstructionComp extends React.Component {
    render() {

        let array = [];
        let array2 = [];
        for (let i = 0; i < this.props.ingredients.length; i++) {
            if (i < this.props.ingredients.length * 0.5)
                array.push(this.props.ingredients[i])
            else
                array2.push(this.props.ingredients[i])

        }

        return (
            <View style={styles.contain}>
                <Image
                    style={styles.stretch}
                    source={{ uri: this.props.webUrl }} />
                <Text style={{ fontWeight: 'bold', fontSize: 22 }}>Ingredients</Text>
                <View style={styles.constainer}>
                    <View style={{marginRight: 30}}>
                        {array.map((ingredients) =>
                            <Text style={styles.textStyle}>{ingredients}</Text>
                        )}
                    </View>
                    <View >
                    

                        {array2.map((ingredients) =>
                            <Text style={styles.textStyle}>{ingredients}</Text>
                        )}
                    </View>
                </View>
            </View>



        )
    }
}
const win = Dimensions.get('window').width;



let i = 0;
const styles = StyleSheet.create({
    contain: {
        alignItems: 'center',
        top: 12
    },
    textStyle: {
        fontSize: 18,
        fontWeight: '200',
        flex: 1, 

    },
    stretch: {
        width: 350,
        height: 200,
        borderRadius: 1,
        borderWidth: 0.8,
        borderColor: 'black',
    },
    constainer: {
        flexDirection: 'row',
        height: 350,
        width: 300,
        
    }
});

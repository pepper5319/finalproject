import React from 'react';
import { View, ScrollView, Image, StyleSheet, Text} from 'react-native';


export default class InstructionComp extends React.Component {
    render() {
        const ingredients = this.props.ingredients.map((ingredients) => <Text style={styles.textStyle}>{ingredients}</Text>)
        return (
            <View style={styles.contain}>
                <Image
                    style={styles.stretch}
                    source={{ uri: this.props.webUrl }} />
                <Text style={{ fontWeight: 'bold', fontSize: 28 }}>Ingredients</Text>
                <View style={styles.constainer }>
                    <ScrollView>
                    <View style={{marginRight: 30}}>
                        {ingredients}
                    </View>
                </ScrollView>
                </View>


            </View>



        )
    }
}
const styles = StyleSheet.create({
    contain: {
        alignItems: 'center',
        top: 12
    },
    textStyle: {
        fontSize: 18,
        fontWeight: '400',
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
        width: 350,
        paddingHorizontal: 10,
        backgroundColor: '#f6f6f6',

    }
});

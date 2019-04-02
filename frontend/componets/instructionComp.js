import React from 'react';
import { View, ScrollView, Image, StyleSheet, Text, Dimensions } from 'react-native';


export default class InstructionComp extends React.Component {
    constructor(){
        super();
        this.state = {
            UpperIngredients: []
        }
      }

    componentDidMount(){
    let uperCaseIng = [];

    for (let i = 0; i < this.props.ingredients.length; ++i)
    uperCaseIng.push(this.props.ingredients[i].charAt(0).toUpperCase() + this.props.ingredients[i].slice(1))


    this.setState({
        UpperIngredients: uperCaseIng
      });


 }
    render() {
        const ingredients = this.state.UpperIngredients.map((ingredients) => {
          if(this.props.matches.indexOf(ingredients.toLowerCase()) !== -1){
            return <Text style={[styles.textStyle, {color: 'green'}]}>{ingredients}</Text>
          }else{
            return <Text style={styles.textStyle}>{ingredients}</Text>
          }
        })
        return (
            <View style={styles.contain}>
                <Image
                    style={styles.stretch}
                    source={{ uri: this.props.webUrl }} />
                <Text style={{ fontWeight: 'bold', fontSize: 28 }}>Ingredients</Text>
                <View style={styles.constainer}>
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
        height: '39%',
        width: windowWidth,
        paddingHorizontal: 10,
        backgroundColor: '#f6f6f6',
    },
    green: {
        color: '#25ba3b',
        fontSize: 18,
        fontWeight: '400',
        flex: 1,
    },
    black: {
        color: '#000000',
        fontSize: 18,
        fontWeight: '400',
        flex: 1,
    },
});
const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height

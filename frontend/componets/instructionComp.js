import React from 'react';
import { View, ScrollView, Image, StyleSheet, Text, Dimensions, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import { Left, Right } from 'native-base';


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
        let temp = [];
        const ingredients = this.state.UpperIngredients.map((ingredients) => {         
          if(this.props.matches.indexOf(ingredients.toLowerCase()) !== -1){
            temp.unshift(<Text style={[styles.textStyle, {color: 'green'}]}>{<Icon
                name='check'
                color='green'
                size={14}
              />}{ingredients}</Text>)
          }else{
             temp.push(<Text style={styles.textStyle}>{<Icon
                name='close'
                color='#000'
                size={14}
              />}{ingredients}</Text>)
          }
        })

        console.log(temp)
        return (
            <View style={styles.contain}>
                <Image
                    style={styles.stretch}
                    source={{ uri: this.props.webUrl }} />
                <Text style={{ fontWeight: '500', fontSize: 20,  paddingRight: 10, paddingLeft: 10, marginVertical: 5, textAlign: 'center'}}>{this.props.recipeName}</Text>
                <View>
                    <ScrollView>
                    <View style={{marginTop: 10}}>
                        <FlatList
                        data={temp}
                        renderItem={({item}) => (
                            <View style={{flexBasis: '44%', paddingBottom: 10, marginLeft: 20}}>
                            <Text style={{flexWrap: 'nowrap'}}>{item}</Text>
                            </View>
                        )}
                        numColumns={2}/>

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
        top: 12,
        
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
        borderRadius: 8
    },
    constainer: {
        flexDirection: 'row',
        height: '39%',
        width: windowWidth,
        paddingHorizontal: 10,
        backgroundColor: '#f6f6f6',
    },
    listTest: {
        flex: 1,
        marginVertical: 20,
    },
    contain2: {
        flexDirection: 'row',
        flex: 1,
    }
});
const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height

import React from 'react';
import { View, ScrollView, Image, StyleSheet, Text, Dimensions, FlatList, TouchableOpacity} from 'react-native';
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
            temp.unshift('     '+ingredients)
          }else{
             temp.push('x   '+ingredients)
          }
        })

        console.log(temp)
        return (
            <View style={styles.contain}>
                <Image
                    style={styles.stretch}
                    source={{ uri: this.props.webUrl }} />
                <Text style={{ fontWeight: '500', fontSize: 20,  paddingRight: 10, paddingLeft: 10, marginVertical: 5, textAlign: 'center'}}>{this.props.recipeName}</Text>
                    <ScrollView>

                        <FlatList
                        data={temp}
                        renderItem={({item}) => (
                            <View style={{flexBasis: '44%', paddingBottom: 10, marginLeft: 20}}>
                            <Text style={{flexWrap: 'nowrap'}}>{item}</Text>
                            </View>
                        )}
                        numColumns={2}/>
                        <TouchableOpacity
          style={styles.webButton}
          onPress={() => {this.props.webButton('web')}}
          underlayColor='#000000'>
          <Text style={styles.webBtnText}>Instruction URL</Text>
        </TouchableOpacity>
          </ScrollView>

            </View>



        )
    }
}
const styles = StyleSheet.create({
    contain: {
        alignItems: 'center',
        flex: 1,
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
    },
    webButton:{
        marginRight:40,
        marginLeft:40,
       marginTop:30,
       marginBottom: 10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#cc0000',
        borderRadius:10,
        borderWidth: 1,
        marginBottom: 20,
        borderColor: '#cc0000',

      },
      webBtnText:{
          color:'#fff',
          textAlign:'center',
          paddingLeft : 10,
          paddingRight : 10,
          fontSize: 22,
      }

});
const windowWidth = Dimensions.get("window").width

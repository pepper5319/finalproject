import React from 'react';
import { connect } from 'react-redux';
import { View,AppRegistry, StyleSheet, Text, Animated,Image,Easing } from 'react-native';
import { picFound } from '../actions/picActions.js';
import { navAction } from '../actions/navigationAction.js';

class LodingScreen extends React.Component {
    onChangeTag = (tag) => {
        this.setState({ active: tag })
        console.log('tag change')
        this.props.changeTag(tag)
    }
    closeDrawer = () => {
        this.drawer._root.close()
    };
    openDrawer = () => {
        this.drawer._root.open()
    };
    constructor(){
        super()
        this.spinValue = new Animated.Value(0)
    }
   componentDidMount() {
       this.spin()
   }
   spin(){
       this.spinValue.setValue(0)
       Animated.timing(
           this.spinValue,
           {
               toValue: 1,
               duration: 4000,
               easing: Easing.linear
           }
       ).start(() => this.spin())
   }
    render(){
        const spin = this.spinValue.interpolate({
            inputRange: [0,1],
            outputRange: ['0deg', '360deg']
        })
        return(
            <View style={styles.Contain}>
                <Animated.Image
                    style={{
                        width: 277,
                        height: 200,
                        transform: [{rotate: spin}] 
                    }}
                    source={require('../backgroundImages/logo.png')}
                />
            </View>
        );
    }    
}
const styles = StyleSheet.create({
    Contain: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

const mapStateToProps = state => ({
    url: state.pics.picURL,
    tag: state.tags.activeTag,
    token: state.token.token
  });
  
  export default connect(mapStateToProps, {picFound, navAction})(LodingScreen);
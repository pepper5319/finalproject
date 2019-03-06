import React from 'react';
import { StyleSheet, WebView, View, Dimensions } from 'react-native';

export default class WebViewComp extends React.Component {
    render() {
        return(
            <View style={styles.webView}>
            <WebView
    source={{uri: 'https://www.allrecipes.com/recipe/223042/chicken-parmesan/'}}
    style={{marginTop: 20}} />
            </View>
        )
    }
}
const windowHeight = Dimensions.get("window").height

const windowWidth = Dimensions.get("window").width

const styles = StyleSheet.create({
    webView: {
        width: windowWidth,
        height: windowHeight,
    }
});
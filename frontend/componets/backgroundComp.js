import React from 'react';
import {Image,} from 'react-native'

const remote = 'https://s15.postimg.org/tw2qkvmcb/400px.png';

export default class BackgroundImage extends React.Component{
    render(){
        const resizeMode = 'center';

        return(
            <Image
                style={{
                    flex: 1,
                    resizeMode,
                }}
                source={{uri: remote}}
            />
        );
    }
}
import React , {Component} from 'react'
import {View,Text , Image ,StyleSheet } from 'react-native';


const AppLogo= props => {

    return(
        <View style={{
            marginTop: 1,
            marginBottom: 90,
            marginLeft: 0,
            height: 5,
            flexDirection: 'column',
            justifyContent: 'space-around',
        }}>
            <Image style={{width: '100%', resizeMode: 'stretch', height: 240, alignSelf: 'center'}}
                   source={require('../assets/Images/logoscreen.png')}/>
            <Image style={{marginTop: 0, marginBottom: 0, width: 150, height: 47, marginLeft: 15}}
                   source={require('../assets/Images/largeLogo.png')}/>
        </View>
    )

}

export default AppLogo

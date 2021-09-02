import React, { Component } from 'react';
import {
    Text,
    TouchableHighlight, View, StyleSheet
} from 'react-native';
import { themes } from '../utils'
import  Fonts  from '../utils/Const'

function Button(props) {

    return (
        <TouchableHighlight
            {...props}
            onPress={props.onPress}
            style={styles.ButtonTouch}>
            <Text style={styles.ButtonText}>{props.title}</Text>
        </TouchableHighlight>

    )
}



const styles = StyleSheet.create({
    ButtonText: {
        color: "white",
        fontFamily: themes.fontFamily.Bold,
        fontWeight: "900",
        fontSize: themes.size.h2,
        // paddingTop: 10,
        // paddingBottom: 10

    },
    ButtonTouch: {
        backgroundColor: "#F87300",
        borderRadius: 5,
        alignItems: 'center',
        justifyContent:'center',
        margin: 20,
         height:40
    }

})


export default Button;

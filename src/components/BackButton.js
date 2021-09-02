import React, { Component } from 'react';
import {
    View, StyleSheet, TouchableOpacity
} from 'react-native';
import { themes } from '../utils'
import Ionicons from 'react-native-vector-icons/Ionicons';

function BackButton(props) {
    return (
        <TouchableOpacity
            {...props}
            onPress={props.onPress}
            style={styles.ButtonTouch}>
            <Ionicons style={styles.Icon} name={'chevron-back'} />
        </TouchableOpacity>
    )
}



const styles = StyleSheet.create({
    ButtonTouch: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,

    },
    Icon: {
        color: themes.color.Black,
        fontSize: 32,
        backgroundColor:themes.color.White,
        borderRadius:10
        

    },

})


export default BackButton;
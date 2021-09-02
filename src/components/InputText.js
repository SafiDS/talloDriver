import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    Animated,
    Text
} from 'react-native';
import { themes } from '../utils'
import PropTypes from 'prop-types';

Input.propTypes = {

    margin: PropTypes.string,
    onPress: PropTypes.func,
    children: PropTypes.node.isRequired,

};

Input.defaultProps = {
    onPress: () => { },
    margin: 5
};

function Input(props) {

    return (
        <TextInput
            {...props}
            style={[styles.TextInput, { margin: props.margin }]}
            placeholder="Mobile No."
            placeholderTextColor={themes.color.placeholder}
            // keyboardType="numeric"
            onChangeText={(value) => props.onchange(value)}
        />

    )
}

const styles = StyleSheet.create({
    TextInput: {
        backgroundColor: '#fff',
        fontSize: 16,
        paddingLeft: 10,
        height: 44,
        borderRadius: 10,
        elevation: 4,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: "grey",
        shadowOpacity: 0.5,
        shadowRadius: 20,
    }

})

export default Input;
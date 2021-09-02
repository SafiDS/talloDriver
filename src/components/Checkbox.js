import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    Animated,
    Text
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { loadFont, selectIcon } from '../Tools/LoadLibrary'
import { themes } from '../utils';









function Checkbox(props) {
    loadFont()
    const IconTypeList = selectIcon(props.IconType)
    return (
        <TouchableOpacity style={styles.textContainer} onPress={props.ClickCheckbox}>
            <IconTypeList style={styles.Icon} name={props.Icon} />
        </TouchableOpacity>

    )
}


const styles = StyleSheet.create({
    textContainer: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 15,
    },
    Icon: {
        color: 'white',
        fontSize: themes.icons.small,
        fontWeight: 'bold',
    }

})

export default Checkbox;
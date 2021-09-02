import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    Animated,
    Text
} from 'react-native';
import { loadFont, selectIcon } from '../Tools/LoadLibrary'
import { themes } from '../utils'







function Header(props) {
    const IconTypeList = selectIcon(props.leftIconType)
    const IconRightTypeList = selectIcon(props.RightIconType)
    return (
        <View style={styles.textContainer}>
            <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor: '#EE4223', borderRadius: 40 }}>
                    {props.LeftIcon && <IconTypeList style={styles.Icon} name={props.LeftIcon} />}
                </View>
            </View>
            <View style={{ flex: 0.8 }}></View>
            <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor: '#fec750', borderRadius: 40 }}>
                    {props.RightIcon && <IconRightTypeList style={styles.Icon} name={props.RightIcon} />}
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    textContainer: {
        flexDirection: 'row',
        // marginTop: 20,
        // marginBottom: 15,
        // backgroundColor: '#fff',
        height: 60
    },
    textView: {
        borderBottomWidth: 2,
        marginLeft: 10,
        borderBottomColor: themes.color.White,
        flex: 1,
        color: themes.color.White,
        fontSize: themes.size.input,
        paddingBottom: 5
    },
    Icon: {
        color: themes.color.White,
        fontSize: 20,
        fontWeight: '800',
        padding: 5
    },
    labelStyle: {
        position: 'absolute',
        marginLeft: 25,
        top: -20,
        color: themes.color.White

    }

})

export default Header;
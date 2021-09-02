import React, { Children, useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    Image,
    Text
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getWidth } from '../Tools/ScreenSize'
import { themes, Images } from '../utils'


const Box = (props) => {

    return (
        <TouchableOpacity style={{ height: 90, width: getWidth() / 4 - 20 }} onPress={props.onPress}>
            <View style={styles.Container} {...props}>
                {
                    // <View style={styles.OfferText}>
                    //     <Text style={{ fontSize: 6, fontWeight: '600', paddingTop: 20, paddingLeft: 3 }}>10%</Text>
                    //     <Text style={{ fontSize: 6, fontWeight: '600', paddingLeft: 8 }}>off</Text>
                    // </View>
                }
                {props.Icon &&
                    <Image style={{ flex:1,margin:10  }}  resizeMode="contain" source={Images[props.Icon]} />
                }
            </View>
            <Text style={styles.Textvalue}>{props.value}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    Container: {
        borderWidth: 2,
        borderColor: 2,
        borderColor:'#F87300',
        borderTopLeftRadius: 15,
        borderBottomRightRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: themes.color.button,
        height: 70,
        overflow: 'hidden'


    },
    OfferText: {
        position: 'absolute',
        right: -20,
        top: -20,
        width: 40,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 25,
    },
    Textvalue: { textAlign: 'center', paddingTop: 5, fontSize: 13 , fontWeight:'bold'},
    Icon: {
        fontSize: 40,
        fontWeight: '800',
        paddingTop: 5
    },


})

export default Box;
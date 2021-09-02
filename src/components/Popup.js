import React, { memo, useState } from "react";
import {
    StyleSheet,
    View,
} from "react-native";




const Popup = (props) => {
    return (
        <View style={styles.inputView}>
            {props.children}
        </View>


    );
}

export default Popup;

const styles = StyleSheet.create({
    inputView: {
        backgroundColor: "#fbfbfb",
        borderRadius: 20,
        marginTop: 0,
        margin: 15,
        elevation: 4,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: "grey",
        shadowOpacity: 0.5,
        paddingBottom:20
    }
});
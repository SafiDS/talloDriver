import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const GenderComponent = props => {
    return (
        <View>
            <View style={styles.mainContainer}>
                <View style={styles.checkContainer}>
                    <Image source={props.check} style={styles.checkbox} />
                </View>
                <View style={styles.iconContainer}>
                    <Image source={props.icon} style={styles.icon} />
                </View>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text}>{props.gender}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        width: 100,
        height: 100,
        // backgroundColor: 'red',
        borderColor: "#000",
        borderWidth: 2,
        borderRadius: 10,
    },
    checkContainer: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'flex-end',
    },
    checkbox: {
        height: 15,
        width: 15,
        alignSelf: 'flex-end',
        marginRight: 5,
    },
    iconContainer: {
        flex: 3,
        justifyContent: 'center',
        alignContent: 'center',

    },
    icon: {
        width: 75,
        height: 75,
        alignSelf: 'center',
        marginBottom: 5,
    },
    text: {
        marginTop: 5,
        alignSelf: "center",
    }

})


export default GenderComponent;
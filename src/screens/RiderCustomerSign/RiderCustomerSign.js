import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View, Dimensions,
    Image, Modal,
    TextInput,
    TouchableOpacity,
    Switch
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import { Card, IconButton, Colors, Button } from 'react-native-paper';

export default function RiderCustomerSign({ navigation }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [defaultRating, setDefaultRating] = useState(0);
    const [defaultRatingride, setDefaultRatingride] = useState(0);
    const [message, setMessage] = useState("")
    const [ridemessage, setrideMessage] = useState("")
    // To set the max number of Stars
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const starImageFilled =
        'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
    // Empty Star. You can also give the path from local
    const starImageCorner =
        'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';

    const CustomRatingBar = () => {
        return (
            <View style={styles.customRatingBarStyle}>
                {maxRating.map((item, key) => {
                    return (
                        <TouchableOpacity
                            activeOpacity={0.7}
                            key={item}
                            onPress={() => setDefaultRating(item)}>
                            <Image
                                style={styles.starImageStyle}
                                source={
                                    item <= defaultRating
                                        ? { uri: starImageFilled }
                                        : { uri: starImageCorner }
                                }
                            />
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };


    const CustomRatingBarRide = () => {
        return (
            <View style={styles.customRatingBarStyle}>
                {maxRating.map((item, key) => {
                    return (
                        <TouchableOpacity
                            activeOpacity={0.7}
                            key={item}
                            onPress={() => setDefaultRatingride(item)}>
                            <Image
                                style={styles.starImageStyle}
                                source={
                                    item <= defaultRatingride
                                        ? { uri: starImageFilled }
                                        : { uri: starImageCorner }
                                }
                            />
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };


    return (
        <ScrollView>
        <View style={styles.container}>
            <View style={{ flex: 1, textAlign: 'center', margin: 3, justifyContent: 'space-between', marginBottom: 2 }}>
           
            <View style={{ borderColor: 'grey',borderWidth: 0.5, marginBottom: 470, }}>
            <Text style={{ fontSize: 20, alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', marginBottom: 25,marginLeft: 50 }}>Delivery Acknowledgement</Text>

<Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 13, marginBottom: 10, alignItems: 'center', justifyContent: 'center',marginLeft: 130 }}> Please Sign Below</Text>



                </View>


            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center',borderColor: 'grey',borderWidth: 0.5 }}>
                    <TouchableOpacity style={styles.loginBtnn}
                    >
                        <Text style={styles.buttontextt}>Re-take</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.loginBtn}
                    >
                        <Text style={styles.buttontext}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View >
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3',
        justifyContent: 'center',
        // alignItems: 'center'
    },
    buttongender: {
        color: '#000', marginTop: 10,
        fontSize: 14, textAlign: 'center', fontWeight: 'bold'
    },
    buttontext: {
        color: '#fff',
        fontSize: 14, fontWeight: 'bold'
    },
    buttontextt: {
        color: '#000000',
        fontSize: 14,
        fontWeight: 'bold'
    },
    loginBtn: {
        flex: 1,
        borderRadius: 5,
        height: 35,
        width: 110,
        marginLeft: 10,
        marginRight: 1,
        alignItems: "center",
        justifyContent: "center",
        textAlign: 'center',
        backgroundColor: "#F87300",
        marginTop: 1,
        marginBottom: 30

    },
    loginBtnn: {
        width: 180,
        borderRadius: 5,
        borderColor: "#ff8000",
        borderWidth: 2,
        height: 35,
        marginLeft: 10,
        marginRight: 1,
        alignItems: "center",
        justifyContent: "center",
        textAlign: 'center',
        marginTop: 10,
        backgroundColor: "#fff",
        color: "#000000",
        marginBottom: "10%"
    },
    cancel: {
        flex: 1,
        borderRadius: 5,
        height: 35,
        marginLeft: 15,
        marginRight: 10,
        alignItems: "center",
        justifyContent: "center",
        textAlign: 'center',
        backgroundColor: "#8f8f8f",
    },
    centeredView: {
        marginTop: 150
    },
    modalView: {
        margin: 20,
        height: 200,
        backgroundColor: "white",
        borderRadius: 20,
        // padding: 35,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    customRatingBarStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        // marginTop: 30,
    },
    starImageStyle: {
        width: 25,
        height: 25,
        resizeMode: 'cover',
    },
    input: {
        backgroundColor: '#fbfbfb',
        textAlignVertical: 'top',
        marginTop: 10,
        height: 80,
        marginLeft: 20, marginRight: 20,
        borderColor: '#f3f3f3',
        borderWidth: 1,
    },
})
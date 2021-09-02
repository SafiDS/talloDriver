import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View, Dimensions,
    Image, Modal,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { Card, IconButton, Colors, Button } from 'react-native-paper';

export default function Payment({ navigation }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [defaultRating, setDefaultRating] = useState(0);
    const [defaultRatingride, setDefaultRatingride] = useState(0);
    const [message, setMessage] = useState("")
    const [ridemessage, setrideMessage] = useState("")
    // To set the max number of Stars
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
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
        <View style={styles.container}>
            <View style={{ textAlign: 'center', margin: 20, }}>

                <Card style={{ borderRadius: 35, backgroundColor: 'white', marginTop: 150 }}>
                    <Card.Content style={{}}>

                        {/* <Image style={{ width: 80, height: 80, alignSelf: 'center' }} source={require('./online.png')} /> */}
                        <Text style={{ fontSize: 30, color: '#007bfe', marginTop: 10, fontWeight: '400', marginLeft: 10, textAlign: 'center' }}>Paid</Text>
                        {/* <Paragraph>Card content</Paragraph> */}
                        <Text style={{ fontSize: 36, color: '#000000', marginTop: 10, fontWeight: 'bold', textAlign: 'center' }}>₹ 85.00</Text>
                        <Text style={{ fontSize: 14, color: '#000000', marginTop: 10, textAlign: 'center' }}>Order I'd: Haye141412</Text>
                        <Button color="#03c22c" dark={true} compact={true} style={{ alignSelf: 'center', color: "red", marginTop: 10, width: 100, height: 30, borderRadius: 30 }} mode="contained" onPress={() => console.log('Pressed')}>
                            <Text style={{ color: "#fff", fontSize: 10 }}>Send mail</Text>
                        </Button>
                    </Card.Content>
                </Card>


            </View>
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 50, zIndex: 50 }}>
                <TouchableOpacity style={styles.loginBtn} onPress={() => {
                    setModalVisible(!modalVisible);
                }}>
                    <Text style={styles.buttontext}>Continue</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancel}>
                    <Text style={styles.buttontext}>Rate us</Text>
                </TouchableOpacity>
            </View>
            <Modal
                animationType="fade"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }} >
                <TouchableOpacity onPress={() => { setModalVisible(!modalVisible) }} >
                    {/* <Image style={{ width: 20, height: 20, alignSelf: 'flex-end', margin: 15 }} source={require('./icon-close.png')} /> */}
                </TouchableOpacity>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <Text style={{ fontSize: 16, color: '#000000', marginTop: 10, marginLeft: 20, fontWeight: 'bold' }}>Haye</Text>

                        <CustomRatingBar />
                        {/* <Text style={styles.textStyle}>
                        {defaultRating} / {Math.max.apply(null, maxRating)}
                    </Text> */}
                        <TextInput
                            style={styles.input}
                            value={message}
                            placeholder="Message"
                            onChangeText={(text) => setMessage(text)}
                            multiline={true}
                            underlineColorAndroid='transparent'
                        />
                        <Button color="#03c22c" uppercase={false}
                            dark={true} compact={true}
                            style={{ alignSelf: 'center', color: "red", marginTop: 10, width: 100, height: 30, borderRadius: 5 }}
                            mode="contained"
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={{ color: "#fff", fontSize: 10 }}>Confirm</Text>
                        </Button>
                    </View>

                    <View style={styles.modalView}>

                        <Text style={{ fontSize: 16, color: '#000000', marginTop: 10, marginLeft: 20, fontWeight: 'bold' }}>Rider</Text>

                        <CustomRatingBarRide />
                      
                        <TextInput
                            style={styles.input}
                            value={ridemessage}
                            placeholder="Message"
                            onChangeText={(text) => setrideMessage(text)}
                            multiline={true}
                            underlineColorAndroid='transparent'
                            numberOfLines={4}
                        />
                        <Button color="#03c22c"
                            uppercase={false}
                            dark={true}
                            compact={true}
                            style={{ alignSelf: 'center', color: "red", marginTop: 10, width: 100, height: 30, borderRadius: 5 }}
                            mode="contained"
                            onPress={() => navigation.goBack()}>
                            <Text style={{ color: "#fff", fontSize: 10 }}>Confirm</Text>
                        </Button>
                    </View>
                </View>
            </Modal>

        </View >
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
        fontSize: 16, fontWeight: 'bold'
    },
    loginBtn: {
        flex: 1,
        borderRadius: 5,
        height: 35,
        marginLeft: 15,
        marginRight: 10,
        alignItems: "center",
        justifyContent: "center",
        textAlign: 'center',
        backgroundColor: "#fec750",
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
});
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
import { Card, IconButton, Colors, Button } from 'react-native-paper';

export default function RiderAssistiveTouch({ navigation }) {

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
            <View style={{ flex: 1, textAlign: 'center', margin: 20, justifyContent: 'space-between', marginBottom: 20 }}>

            <View style={{ backgroundColor: '#000000', height: 60 }}>
            <Text style={{ color: '#ffffff', fontSize: 11, alignItems: 'center', justifyContent: 'center', fontWeight: 'bold',marginLeft: 10, marginTop: 10}}>Drop Off</Text>
            <Text style={{ color: 'grey', fontWeight: 'bold', fontSize: 10, marginBottom: 1, alignItems: 'center', justifyContent: 'center',marginLeft: 10 , marginTop: 4}}> 34 , Norman road , Oppo to Economics building, LA ,USA</Text>
</View>
           
            {/* <View style={{ marginBottom: 0, borderRadius: 10, backgroundColor: '#000000', height: '100px', width: '600px', height: '270', marginBottom: 130 }}>


</View> */}



                <View style={{ backgroundColor: '#ffe6e6',width: 90, height: 50, borderWidth: 0, marginBottom: 30, borderRadius: 15, padding: 10 ,justifyContent: 'center', alignItems: 'center',marginLeft: 130, marginTop: 10}}>
                    <Text style={{ fontSize: 16, color: '#000000', fontWeight: 'bold',marginLeft: 5 }}>10 min</Text>
                  
                </View>
                <Card style={{ borderRadius: 20, backgroundColor: 'white', marginTop: 420 }}>
                    <Card.Content style={{  }}>
      

<TouchableOpacity style={styles.loginBtn} >
                <Text style={styles.buttontext}>End Trip</Text>
            </TouchableOpacity>



                    </Card.Content>
                </Card>


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
        fontSize: 16,
         fontWeight: 'bold'
    },
    loginBtn: {
        borderRadius: 5,
        height: "53%",
        width:"100%",
        marginLeft: 3,
        marginRight: 0,
        alignItems: "center",
        justifyContent: "center",
        textAlign: 'center',
        marginTop: 20,
        backgroundColor: "#F87300",
        marginBottom:"1%"
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
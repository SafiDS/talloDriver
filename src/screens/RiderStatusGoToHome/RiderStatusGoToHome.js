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
import { useDispatch } from 'react-redux'
import { navigate, navigateScreen } from '../../Tools/NavigationServices'

export default function RiderStatusGoToHome({ navigation }) {
    const dispatch = useDispatch();
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

        function _signUp() {
           
            var request = {
             
              "phone": "1234567890",
              "navigation": navigation
            }
            dispatch({ type: 'RIDER_STATUS_GOTO_HOME', payload: request })
          }

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


            <Card style={{ backgroundColor: 'white', marginTop: 0 }}>
            <View style={{ backgroundColor: '#fff', height: 35,width: 150, borderWidth: 0.1, marginBottom: 8,marginLeft: 100, borderRadius: 15, flexDirection: 'row', justifyContent: 'space-around', padding: 10,marginTop: 5  }}>        
                    <Image style={{ width: 20, height: 20 }} source={require('../../assets/Images/MaskGroup21.png')} />
                    <Text style={{ fontSize: 13, color: 'red', fontWeight: 'bold' }}>MADE IN INDIA</Text>
                </View>

                <View style={{ backgroundColor: '#ffe6e6', height: 50, borderWidth: 0, marginBottom: 3, borderRadius: 15, flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                    {/* <Switch
                        trackColor={{ false: "red", true: "green" }}
                        thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    /> */}
                    <Image style={{ width: 30, height: 25 }} source={require('../../assets/Images/Online2.png')} />
                    <Image style={{ width: 30, height: 25 }} source={require('../../assets/Images/Online.png')} />
                    <TouchableOpacity onPress={()=>navigate('RiderGoingHome')}> 
                    <Image style={{ width: 40, height:30 }} source={require('../../assets/Images/Offline.png')} />
                    </TouchableOpacity>
                </View>

                <View style={{  marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between', padding: 1 }}>
                <Text style={{ fontSize: 13, color: '#000000', fontWeight: 'bold' }}>Offline</Text>
                    <Text style={{ fontSize: 13, color: '#000000', fontWeight: 'bold' }}>Online</Text>
                    <Text style={{ fontSize: 13, color: 'red', fontWeight: 'bold' }}>Go to Home</Text>
    </View>

    <TouchableOpacity onPress={() => _signUp()}>
<View style={{   marginBottom: 0, flexDirection: 'row', padding: 0,marginLeft: 160,marginBottom: 10  }}>
<Image style={{ width: 15, height: 15,marginRight: 1 ,marginLeft: 1 }} source={require('../../assets/Images/Swipe2.png')} />
<Text style={{ fontSize: 10, color: '#000000', fontWeight: 'bold' }}>SWIPE</Text>
<Image style={{ width: 15, height: 15 }} source={require('../../assets/Images/Swipe1.png')} />
</View>
</TouchableOpacity>



</Card>


                <Card style={{ borderRadius: 20, backgroundColor: 'white', marginTop: 430 }}>

                <View style={{ flexDirection: 'row',justifyContent: 'space-between',marginRight: 10 , marginTop: 10 }}>
<View>
                <View style={{   marginBottom: 5, flexDirection: 'row', padding: 1,marginLeft: 10  }}>
<Image style={{ width: 20, height: 25,marginLeft: 10,marginRight: 1,marginTop: 1,marginBottom: 1 }} source={require('../../assets/Images/Rating.png')} />
<Text style={{ fontSize: 13, color: '#000000', fontWeight: 'bold',marginLeft: 10,marginTop: 5 }}>4.5</Text>
</View>

<Card.Content style={{ flexDirection: 'row',marginLeft: 1,marginBottom: 20 }}>
<Image style={{ width: 40, height: 45 }} source={require('../../assets/Images/photo.png')} />
    <View style={{ flexDirection: 'column' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16, marginStart: 10 }}>Johnatham</Text>
        <Text style={{ fontWeight: 'normal',color: 'grey', fontSize: 11, marginStart: 10, marginTop: 1 }}>Basic Level</Text>
    </View>
</Card.Content>
</View>



                <View style={{   marginBottom: 5, flexDirection: 'column', justifyContent: 'space-between', padding: 1 }}>
<Image style={{ width: 10, height: 10,marginRight: 1,marginTop: 20,marginBottom: 1,marginLeft: 45}} source={require('../../assets/Images/Path.png')} />

<View style={{ flexDirection: 'column', padding: 1 }}>    
<Text style={{ fontWeight: 'normal',color: 'grey',  fontSize: 11,marginLeft: 15 }}>Earnings</Text>
             <Text style={{ fontWeight: 'bold', fontSize: 15, }}>₹5,470.00</Text>
             </View>

</View>   
</View>
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
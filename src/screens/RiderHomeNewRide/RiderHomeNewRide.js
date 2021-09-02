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
import { navigate, navigateScreen } from '../../Tools/NavigationServices'

export default function RiderHomeNewRide({ navigation }) {

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
         
                <View style={{ backgroundColor: '#ffe6e6', height: 50, borderWidth: 0, marginBottom: 3, borderRadius: 15, flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                  
                    <Image style={{ width: 30, height: 25 }} source={require('../../assets/Images/Online2.png')} />
                    <Image style={{ width: 30, height: 25 }} source={require('../../assets/Images/StatusOnline.png')} />
                    <Image style={{ width: 40, height:30 }} source={require('../../assets/Images/GoTo1.png')} />
                </View>

                <View style={{  marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between', padding: 1 }}>
                <Text style={{ fontSize: 13, color: '#000000', fontWeight: 'bold' }}>Offline</Text>
                    <Text style={{ fontSize: 13, color: '#006600', fontWeight: 'bold' }}>Online</Text>
                    <Text style={{ fontSize: 13, color: '#000000', fontWeight: 'bold' }}>Go to Home</Text>
    </View>

                <Card style={{ borderRadius: 20, backgroundColor: 'white', marginTop: 300 }}>

                <View style={{   marginBottom: 5, flexDirection: 'row',justifyContent: 'space-between', padding: 1,marginLeft: 10  }}>
                <Text style={{ fontSize: 16, color: '#FF9900', fontWeight: 'bold',marginLeft: 10,marginTop: 5 }}>Hey! Mike wants to ride with you</Text>
                <Image style={{ width: 20, height: 20,marginRight: 1,marginTop: 5,marginBottom: 1,marginLeft: 1}} source={require('../../assets/Images/dropdown.png')} />
</View>

                <View style={{ flexDirection: 'row',justifyContent: 'space-between',marginRight: 10 , marginTop: 1 }}>
<View>
             
<Card.Content style={{ flexDirection: 'row',marginLeft: 1,marginBottom: 20 , marginTop: 5}}>
<Image style={{ width: 40, height: 45 }} source={require('../../assets/Images/photo.png')} />
        <Text style={{ fontWeight: 'bold', fontSize: 13, marginStart: 10 }}>Mike Daniel</Text>
</Card.Content>
</View>

</View>


<View style={{  marginBottom: 0, flexDirection: 'row',  padding: 1 }}>
              

<View style={{ flexDirection: 'column', marginStart: 8 }}>
<Image style={{ width: 13, height: 15,marginTop: 0, marginStart: 8 }} source={require('../../assets/Images/Path2.png')} />
<Image style={{ width: 5, height: 30,marginTop: 0, marginStart: 8 }} source={require('../../assets/Images/Path3.png')} />
<Image style={{ width: 15, height: 20,marginTop: 0, marginStart: 7 }} source={require('../../assets/Images/Path1.png')} />
</View>  

<View style={{ flexDirection: 'column', padding: 1, marginStart: 10 }}>    

<View style={{ flexDirection: 'column', padding: 1, marginStart: 1 }}>    
<Text style={{ fontWeight: 'normal',color: 'grey', fontSize: 9, marginStart: 1, marginTop: 1 }}>Pickup Location</Text>
<Text style={{ fontWeight: 'bold', fontSize: 14, marginStart: 1 }}>123S 6th Crossman street , LA USA</Text>
</View>
             
<View style={{ flexDirection: 'column', padding: 1, marginStart: 1,marginTop: 7 }}>    
<Text style={{ fontWeight: 'normal',color: 'grey', fontSize: 9, marginStart: 1, marginTop: 1 }}>Drop Location</Text>
<Text style={{ fontWeight: 'bold', fontSize: 14, marginStart: 1 }}>34 , Norman road , Opp to Economics</Text>
<Text style={{ fontWeight: 'bold', fontSize: 14, marginStart: 1 }}>building, LA ,USA</Text>
             </View>

             </View>
  
    </View>


<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                    <TouchableOpacity style={styles.loginBtnn}
                    >
                        <Text style={styles.buttontextt}>Decline</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.loginBtn} onPress={() => navigate('RiderMultipleDestination')}
                    >
                        <Text style={styles.buttontext}>Accept</Text>
                    </TouchableOpacity>
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
});
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

export default function RiderMultipleDestinationDetails({ navigation }) {

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
         
                {/* <View style={{ backgroundColor: '#ffe6e6', height: 50, borderWidth: 0, marginBottom: 3, borderRadius: 15, flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                  
                    <Image style={{ width: 30, height: 25 }} source={require('../../assets/Images/Online2.png')} />
                    <Image style={{ width: 30, height: 25 }} source={require('../../assets/Images/StatusOnline.png')} />
                    <Image style={{ width: 40, height:30 }} source={require('../../assets/Images/GoTo1.png')} />
                </View> */}

                {/* <View style={{  marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between', padding: 1 }}>
                <Text style={{ fontSize: 13, color: '#000000', fontWeight: 'bold' }}>Offline</Text>
                    <Text style={{ fontSize: 13, color: '#006600', fontWeight: 'bold' }}>Online</Text>
                    <Text style={{ fontSize: 13, color: '#000000', fontWeight: 'bold' }}>Go To</Text>
    </View> */}

                <Card style={{ borderRadius: 40, backgroundColor: 'white', marginTop: 340 }}>

                {/* <View style={{   marginBottom: 5, flexDirection: 'row',justifyContent: 'space-between', padding: 1,marginLeft: 10  }}>
                <Text style={{ fontSize: 16, color: '#FF9900', fontWeight: 'bold',marginLeft: 10,marginTop: 5 }}>Hey! Mike wants to ride with you</Text>
                <Image style={{ width: 20, height: 20,marginRight: 1,marginTop: 5,marginBottom: 1,marginLeft: 1}} source={require('../../assets/Images/dropdown.png')} />
</View> */}

                <View style={{ flexDirection: 'row',marginRight: 10 , marginTop: 1 }}>
<View>
<Image style={{ width: 40, height: 8, marginStart: 170,marginTop: 2}} source={require('../../assets/Images/DragDown.png')} />  

<Card.Content style={{marginLeft: 1,marginBottom: 20 , marginTop: 25 ,alignItems: 'center',justifyContent: 'center',}}>

<Text style={{ fontWeight: 'bold', fontSize: 17, marginStart: 70 }}>Upcoming Drop Details</Text>
</Card.Content>
</View>

</View>
<View style={{  marginBottom: 0,  padding: 1 }}>
              
<View style={{ flexDirection: 'row' }}>

<Image style={{ width: 25, height: 25,marginLeft: 5 }} source={require('../../assets/Images/Group2443.png')} />  
<View style={{   flexDirection: 'column' ,marginTop: 1,marginLeft: 5 }}>
<Text style={{ fontWeight: 'bold', fontSize: 14, marginTop: 1,marginLeft: 10}}>34 Norman road Opp to Economics</Text>
<Text style={{ fontWeight: 'bold', fontSize: 14, marginTop: 1,marginLeft: 10}}>building, LA, USA</Text>
<Text style={{ fontWeight: 'bold', fontSize: 10, marginTop: 5 ,marginLeft: 10,color:'#330099'}}>YOU ARE HERE</Text>

</View>

</View>


<View style={{ flexDirection: 'row',justifyContent: 'space-around', marginTop: 10,marginLeft: 15 }}>

<View style={{ borderColor: 'black',borderWidth: 0.5,borderRadius: 15,width: 80 }}>
<View style={{ flexDirection: 'row', marginTop: 3,marginBottom: 3 }}>
<Image style={{ width: 25, height: 25,marginLeft: 5 }} source={require('../../assets/Images/Group.png')} />
<Text style={{ fontWeight: 'bold', fontSize: 14, marginTop: 1,marginLeft: 10}}>Data</Text>
</View>
</View>


<View style={{ borderColor: 'black',borderWidth: 0.5,borderRadius: 15,width: 100 }}>
<View style={{ flexDirection: 'row', marginTop: 3,marginBottom: 3 }}>
<Image style={{ width: 25, height: 25,marginLeft: 5 }} source={require('../../assets/Images/Cellular.png')} />
<Text style={{ fontWeight: 'bold', fontSize: 14, marginTop: 1,marginLeft: 10}}>Cellular</Text>
</View>
</View>



<View style={{ borderColor: 'black',borderWidth: 0.5,borderRadius: 15,width: 110 }}>
<View style={{ flexDirection: 'row', marginTop: 3,marginBottom: 3 }}>
<Image style={{ width: 25, height: 25,marginLeft: 5 }} source={require('../../assets/Images/Message.png')} />
<Text style={{ fontWeight: 'bold', fontSize: 14, marginTop: 1,marginLeft: 10}}>Message</Text>
</View>
</View>


</View>

    </View>


    {/* <LinearGradient></LinearGradient> */}
    {/* <Line5></Line5>
    <line></line> */}
    <View style={{flexDirection: 'row', marginTop: 34,marginLeft: 15}}>
    <Image style={{ width: 25, height: 25,marginLeft: 5 }} source={require('../../assets/Images/Group2441.png')} />
<Text style={{ color: 'grey',fontWeight: 'normal', fontSize: 13,marginLeft: 14}}>12 st Rockwood round, LA, USA</Text>
</View>

<View style={{flexDirection: 'row', marginTop: 14,marginLeft: 15}}>
    <Image style={{ width: 25, height: 25,marginLeft: 5 }} source={require('../../assets/Images/Group2440.png')} />
    <View style={{flexDirection: 'column'}}>
<Text style={{ color: 'grey',fontWeight: 'normal', fontSize: 13,marginLeft: 14}}>4549,  Trails End Road ,Pampano Beach, FL, </Text>
<Text style={{ color: 'grey',fontWeight: 'normal', fontSize: 13,marginLeft: 14}}> USA</Text>
</View>
</View>


<View style={{flexDirection: 'row', marginTop: 14,marginBottom: 40,marginLeft: 15}}>
    <Image style={{ width: 25, height: 25,marginLeft: 5 }} source={require('../../assets/Images/Group2442.png')} />
    <Text style={{ color: 'grey',fontWeight: 'normal', fontSize: 13,marginLeft: 14}}>958 Seth street  RESERVE, LA, USA</Text>
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
})
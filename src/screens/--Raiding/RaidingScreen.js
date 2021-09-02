import React, { useState } from "react";
import { Platform, StyleSheet, Image, Text, FlatList, View, Dimensions, TouchableOpacity,ScrollView } from 'react-native';
import MapView from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import { BotomReanimated } from "../../components";
import { Searchbar, FAB } from "react-native-paper";

import { selectIcon } from '../../Tools/LoadLibrary'

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const origin = { latitude: 13.082680, longitude: 80.270721 };
const destination = { latitude: 12.932063, longitude: 79.333466 };
const GOOGLE_MAPS_APIKEY = 'AIzaSyBaulU4DBeU0dhMSr5kCpkRp2YjbCzSWNM';



const Raiding = ({ navigation }) => {
    const [region, setRegion] = useState({
        latitude: 13.082680,
        longitude: 80.270721,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
    });
    const [mark, setMark] = useState([
        {
            latitude: 13.082680,
            longitude: 80.270721,
        },
        {
            latitude: 12.932063,
            longitude: 79.333466,
        },
    ]);

    // const [toTop,setToTop] = 
    const IconTypeList = selectIcon('Ionicons')
    const IconTypeFeather = selectIcon('Feather')


    const data = [
        {
            "name": "Miyah Myles",
            "email": "miyah.myles@gmail.com",
            "position": "Rental",
            'amount': '₹55.30',
            "photo": "https:\/\/images.unsplash.com\/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6"
        },
        {
            "name": "June Cha",
            "email": "june.cha@gmail.com",
            "position": "Car",
            'amount': '₹155.30',
            "photo": "https:\/\/randomuser.me\/api\/portraits\/women\/44.jpg"
        },
        {
            "name": "Iida Niskanen",
            "email": "iida.niskanen@gmail.com",
            "position": "Bike",
            'amount': '₹65.30',
            "photo": "https:\/\/randomuser.me\/api\/portraits\/women\/68.jpg"
        },
        {
            "name": "Renee Sims",
            "email": "renee.sims@gmail.com",
            "position": "Auto",
            'amount': '₹75.30',
            "photo": "https:\/\/randomuser.me\/api\/portraits\/women\/65.jpg"
        },
        {
            "name": "Jonathan Nu\u00f1ez",
            "email": "jonathan.nu\u00f1ez@gmail.com",
            "position": "Delivery",
            'amount': '₹115.30',
            "photo": "https:\/\/randomuser.me\/api\/portraits\/men\/43.jpg"
        },
        {
            "name": "Sasha Ho",
            "email": "sasha.ho@gmail.com",
            "position": "Administrative Assistant", 'amount': '₹155.30',
            "photo": "https:\/\/images.pexels.com\/photos\/415829\/pexels-photo-415829.jpeg?h=350&auto=compress&cs=tinysrgb"
        },
        {
            "name": "Abdullah Hadley",
            "email": "abdullah.hadley@gmail.com",
            "position": "Marketing",
            "photo": "https:\/\/images.unsplash.com\/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=a72ca28288878f8404a795f39642a46f"
        },
        {
            "name": "Thomas Stock",
            "email": "thomas.stock@gmail.com",
            "position": "Product Designer",
            "photo": "https:\/\/tinyfac.es\/data\/avatars\/B0298C36-9751-48EF-BE15-80FB9CD11143-500w.jpeg"
        },
        {
            "name": "Veeti Seppanen",
            "email": "veeti.seppanen@gmail.com",
            "position": "Product Designer",
            "photo": "https:\/\/randomuser.me\/api\/portraits\/men\/97.jpg"
        },
        {
            "name": "Bonnie Riley",
            "email": "bonnie.riley@gmail.com",
            "position": "Marketing",
            "photo": "https:\/\/randomuser.me\/api\/portraits\/women\/26.jpg"
        }
    ]




 

    return (
        <>
            <MapView
                style={{ flex: 1 }}
                region={region}
                onRegionChangeComplete={region => setRegion(region)}
            >
                {mark.map((coordinate, index) =>
                    <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate} />
                )}
                <MapViewDirections
                    origin={origin}
                    destination={destination}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                    strokeColor="hotpink"
                />
            </MapView>

            <View style={{ position: 'absolute', width: '100%', marginTop: 20 }}>

                <IconTypeList size={30}
                    style={{ marginLeft: 20 }}
                    onPress={() => navigation.goBack()}
                    name={'caret-back-circle-sharp'} />
                <Searchbar
                    placeholder="Enter Pickup location"
                    style={styles.searchBar}
                    inputStyle={{ fontSize: 12 }}
                    icon="arrow-down-bold-circle"
                    onIconPress={() => { }}
                />
                <Searchbar
                    placeholder="Enter Drop location"
                    style={styles.searchBar}
                    inputStyle={{ fontSize: 12 }}
                    icon="arrow-down-bold-circle"
                    onIconPress={() => { }}
                />
                <IconTypeFeather style={{ position: 'absolute', right: 10, bottom: 10 }} size={25} name={'plus'} />
            </View>

            <BotomReanimated
                bottomSheerColor="#f7f5eee8"
                initialPosition={"20%"}  //200, 300
                snapPoints={["20%", "100%"]}
                isBackDropDismisByPress={true}
                isRoundBorderWithTipHeader={true}
                headerStyle={{
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                }}
                containerStyle={{
                    backgroundColor: '#f7f5eee8', borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                }}
                bodyStyle={{ backgroundColor: '#fff' }}
                header={
                    // <View style={styles.imageViewStyle} />
                    <Text>Choose Raide Mode</Text>
                }
                body={

                    <View style={{ height: SCREEN_HEIGHT - 70 }}>
                        <ScrollView>
                            {data.map((item, index) => {
                                return (
                                    <>
                                        <View style={styles.listItem}>
                                            <Image source={{ uri: item.photo }}
                                                style={{ width: 40, height: 40, borderRadius: 30 }} />
                                            <View style={{ alignItems: "center", flex: 1 }}>
                                                <Text style={{ fontSize: 14, }}>{item.position}</Text>
                                            </View>
                                            <TouchableOpacity style={{ height: 50, width: 130, justifyContent: "center", alignItems: "center" }} onPress={() => { navigation.navigate('PaymentScreen') }}>
                                                <Text style={{ color: "black", fontWeight: "bold", fontSize: 18 }}>{item.amount}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </>
                                )
                            })}
                        </ScrollView>
                    </View>
                }
            />

        </>
    );
};

export default Raiding;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    searchBar: {
        height: 40,
        margin: 5,
        // marginTop:20,
        fontSize: 15
        // marginTop:5
    },

    draggable: {
        position: 'absolute',
        // right: 0,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        borderTopLeftRadius: 45,
        borderTopRightRadius: 45,
        overflow: "hidden"
    },
    scroll: {
        paddingLeft: 10,
        paddingRight: 10
    },
    imageViewStyle: {
        backgroundColor: '#fec750',
        width: Dimensions.get('window').width,
        height: 70,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        // overflow: "hidden"
    },
    listItem: {
        // elevation: 1,
        // borderRadius: 2,
        // backgroundColor: "#fcfcfc",
        // flex: 1, 
        // width: "100%",
        flexDirection: "row", // main axis
        // justifyContent: "flex-start", // main axis
        // alignItems: "center", // cross axis
        paddingTop: 10,
        // paddingBottom: 10,
        // paddingLeft: 18,
        // paddingRight: 16,
        // marginRight: 14,






    }
});
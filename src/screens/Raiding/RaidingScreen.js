import React, { useState } from "react";
import { Platform, StyleSheet, Image, Text, FlatList, View, Dimensions, TouchableOpacity, PanResponder, Animated, ScrollView } from 'react-native';
import MapView from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import { BotomReanimated,Button } from "../../components";
import { selectIcon } from '../../Tools/LoadLibrary'
import MapInput from './MapInput';
import { Images } from '../../utils'

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

// const origin = { latitude: 13.082680, longitude: 80.270721 };
// let destination = { latitude: 12.932063, longitude: 79.333466 };
const GOOGLE_MAPS_APIKEY = 'AIzaSyBaulU4DBeU0dhMSr5kCpkRp2YjbCzSWNM';


const Raiding = ({ navigation }) => {

    const [mark, setMark] = useState(
        [{ latitude: 0, longitude: 0 },
            // {
            //     latitude: 12.932063,
            //     longitude: 79.333466,
            // },
        ]);
    const [origin, setorigin] = useState({ latitude: 13.082680, longitude: 80.270721 });
    const [destination, setdestination] = useState({ latitude: 0, longitude: 0 })
    const [region, setRegion] = useState({
        latitude: 13.082680,
        longitude: 80.270721,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
    });
    const [snapPoints, setsnapPoints] = useState(false);
    const [RaidDetails, setRaidDetails] = useState(false);
    const snap_Points = snapPoints ? ["30%", "30%"] : ["30%", "50%"]

    // const [toTop,setToTop] = 
    const IconTypeList = selectIcon('Ionicons')
    const IconTypeFeather = selectIcon('Feather')


    const data = [
        {
            "vehicle": 'bike',
            "name": "Miyah Myles",
            "email": "miyah.myles@gmail.com",
            "position": "Rental",
            "Time": "10 mins",
            "Distance": "1.2km",
            "Price": "55.00",
            'amount': '₹55.30',
            "photo": "https:\/\/images.unsplash.com\/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6"
        },
        {
            "vehicle": 'car',
            "name": "June Cha",
            "email": "june.cha@gmail.com",
            "position": "Car",
            "Time": "10 mins",
            "Distance": "1.2km",
            "Price": "55.00",
            'amount': '₹155.30',
            "photo": "https:\/\/randomuser.me\/api\/portraits\/women\/44.jpg"
        },
        {
            "vehicle": 'bike',
            "name": "Iida Niskanen",
            "email": "iida.niskanen@gmail.com",
            "position": "Bike",
            'amount': '₹65.30',
            "Time": "10 mins",
            "Distance": "1.2km",
            "Price": "55.00",
            "photo": "https:\/\/randomuser.me\/api\/portraits\/women\/68.jpg"
        },
        {
            "vehicle": 'delivery',
            "name": "Renee Sims",
            "email": "renee.sims@gmail.com",
            "position": "delivery",
            'amount': '₹75.30',
            "Time": "10 mins",
            "Distance": "1.2km",
            "Price": "55.00",
            "photo": "https:\/\/randomuser.me\/api\/portraits\/women\/65.jpg"
        },
        {
            "vehicle": 'auto',
            "name": "Jonathan Nu\u00f1ez",
            "email": "jonathan.nu\u00f1ez@gmail.com",
            "position": "auto",
            'amount': '₹115.30',
            "Time": "10 mins",
            "Distance": "1.2km",
            "Price": "55.00",
            "photo": "https:\/\/randomuser.me\/api\/portraits\/men\/43.jpg"
        }
    ]

    const getCoordsFromName = (waypoints) => {
        setorigin({
            latitude: waypoints.lat,
            longitude: waypoints.lng
        })

        setMark([{
            latitude: waypoints.lat,
            longitude: waypoints.lng
        }]);
        setRegion({
            latitude: waypoints.lat,
            longitude: waypoints.lng, latitudeDelta: 0.01,
            longitudeDelta: 0.01
        })

    };

    const getCoordsToName = (waypoints) => {
        setdestination({
            latitude: waypoints.lat,
            longitude: waypoints.lng
        })

    };

    function SelectRaidDetails(item) {
        sheetRef.current.snapTo(0)
        setRaidDetails(item)
        setsnapPoints(true)
    }

    function chooseRaid() {
        return (<ScrollView>
            {data.map((item, index) => {
                return (
                    <>
                        <TouchableOpacity key={index} onPress={SelectRaidDetails.bind(this, item)}
                            style={styles.listItem}>
                            <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ padding: 5 }}>
                                    <Image source={Images[item.vehicle]}
                                        resizeMode="contain" />
                                </View>
                            </View>
                            <View style={{ justifyContent: 'center', flex: 0.5 }}>
                                <Text style={{ fontSize: 14, }}>{item.position}</Text>
                            </View>
                            <View style={{ justifyContent: "center", alignItems: "center", flex: 0.3 }}>
                                <Text style={{ color: "black", fontWeight: "bold", fontSize: 18 }}>{item.amount}</Text>
                            </View>
                        </TouchableOpacity>
                    </>
                )
            })}
        </ScrollView>)
    }


    function Raid_Details() {
        const item = RaidDetails;
        return (<View style={{ flex: 1, paddingTop: '10%' }}>
            <View
                style={{ flexDirection: 'row' }}>
                <View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ padding: 5 }}>
                        <Image source={Images[item.vehicle]}
                            resizeMode="contain" />
                    </View>
                </View>
                <View style={{ justifyContent: 'center', flex: 0.2 }}>
                    <Text style={{ fontSize: 14, }}>{'Time'}</Text>
                    <Text style={{ fontSize: 14, }}>{item.Time}</Text>
                </View>
                <View style={{ justifyContent: 'center', flex: 0.2 }}>
                    <Text style={{ fontSize: 14, }}>{'Distance'}</Text>
                    <Text style={{ fontSize: 14, }}>{item.Distance}</Text>
                </View>
                <View style={{ justifyContent: "center", alignItems: "center", flex: 0.3 }}>
                    <Text style={{ color: "black", fontSize: 18 }}>{'Price'}</Text>
                    <Text style={{ fontSize: 14, }}>{item.Price}</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', height: 120,flex: 0.2 }}>
                <View style={{ flex: 0.5 }}>
                <Button title="Confirm" onPress={() => console.log("456789")}/>
                </View>
                <View style={{ flex: 0.5 }}>
                <Button title="Cancel" onPress={() => console.log("456789")}/>
                </View>
            </View>
        </View>)
    }


    const sheetRef = React.useRef(null);
    return (
        <View style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'stretch',
        }}>

            <MapView
                style={{ flex: 1 }}
                region={region}
                onRegionChangeComplete={region => setRegion(region)}
            >
                {console.log(destination)}
                {mark.map((coordinate, index) => {
                    coordinate != null && coordinate != 0 ?
                        <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate} />
                        :
                        null
                }
                )}
                <MapView.Marker key={`coordinate_1`} coordinate={origin} />
                <MapView.Marker key={`coordinate_2`} coordinate={destination} />
                <MapViewDirections
                    origin={origin}
                    destination={destination}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                    strokeColor="hotpink"
                />
            </MapView>

            <View style={{ position: 'absolute', width: '100%', marginTop: 20 }}>
                <MapInput notifyFromChange={(loc) => getCoordsFromName(loc)}
                    notifyToChange={(loc) => getCoordsToName(loc)} />
            </View>

            <BotomReanimated
                ref={sheetRef}
                bottomSheerColor="#f7f5eee8"
                initialPosition={"30%"}  //200, 300
                snapPoints={snap_Points}
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
                    <Text style={{ textAlign: 'center' }}>{snapPoints ? "Riding Details" : "Choose Raid Mode"}</Text>
                }
                body={
                    <View style={{ height: "55%" }}>
                        {snapPoints ? Raid_Details() : chooseRaid()}

                    </View>
                }
            />

        </View>
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
        flexDirection: "row", // main axis
        paddingTop: 10,
        height: 80,
        flex: 1,
        borderBottomWidth: 2, borderBottomColor: '#ccc',
    }
});
import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View, Dimensions,
    Image, Modal,
    TextInput,
    TouchableOpacity,
    Switch,
    PermissionsAndroid, Platform,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Card, IconButton, Colors, Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import StaticText from '../../utils/StaticText';
import {navigate, navigateScreen} from '../../Tools/NavigationServices';
import {getItemFromStorage, saveToStorage} from '../../utils/AccessStorage';
import MapView from 'react-native-maps';
import lang from '../../language/lang_values';


import Geolocation from '@react-native-community/geolocation';
import {getDefaultLocale} from 'react-datepicker';
import {themes} from '../../utils';
import axios from "axios";

const origin = {latitude: 13.082680, longitude: 80.270721};


export default function Dashboard({navigation}) {
    const dispatch = useDispatch();
    let filter = useSelector(state => {
        //console.log('State: ', state);
        return state.SignIn.data;
    });

    let user_info1 = useSelector((state) => {
        console.log(state, "state")
        return state.SignIn.User_info;
    });
    // console.log("Info++",filter)

    const [region, setRegion] = useState({
        latitude: 13.082680,
        longitude: 80.270721,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
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
    const [name, setname] = useState('');
    const [image, setimage] = useState('');
    const [currentLongitude, setCurrentLongitude] = useState('...');
    const [currentLatitude, setCurrentLatitude] = useState('...');
    const [locationStatus, setLocationStatus] = useState('');
    const [rider_id, setRiderId] = useState('');
    const [base_url, setBaseUrl] = useState('https://www.tallo.in/dev/uploads/riders/');
    const [LangId, setLangId] = useState('');


    React.useEffect(() => {
        const requestLocationPermission = async () => {

            if (Platform.OS === 'ios') {
                getOneTimeLocation();
                subscribeLocationLocation();
            } else {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                        {
                            title: 'Location Access Required',
                            message: 'This App needs to Access your location',
                        },
                    );
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        //To Check, If Permission is granted
                        getOneTimeLocation();
                        // subscribeLocationLocation();
                    } else {
                        setLocationStatus('Permission Denied');
                    }
                } catch (err) {
                    console.warn(err);
                }
            }
        };
        getdata();
        getToken();
        requestLocationPermission();


        const unsubscribe = navigation.addListener('focus', () =>
            refreshPage(),
        );
        return () => {
            // clean up event listener
            unsubscribe;
        };


        // Execute the created function directly
        // anyNameFunction();
    }, []);

    async function getdata() {

        var id = await getItemFromStorage('RiderId');
        var name = await getItemFromStorage('Name');
        var img = await getItemFromStorage('Image');
        var lanid = await getItemFromStorage('LangId');
        //alert("useeffect"+lanid)
        if (lanid != '') {
            setLangId(lanid);
        } else {
        }
        setname(name);
        setimage(img);
        if (id != '') {
            var request = {
                'rider_id': id,
            };
            dispatch({type: 'RIDER_BOOKINGS', payload: request});
            dispatch({type: 'GET_RIDER_DETAILS', payload: request});

        }
        //alert("getdata"+id)


        setRiderId(id);

        if (filter.rider_info != null) {
            setname(filter.rider_info.full_name);
            setimage(filter.rider_info.profile_image);
        }


    }

    const getToken = async () => {
        let Token = await getItemFromStorage('Token');
        if (user_info1 != "") {
            const riderData = {
                rider_id: user_info1.rider_info.rider_id,
                devicetoken: Token
            }

            const config = {
                method: 'post',
                url: 'https://www.tallo.in/dev/was/rider_devicetoken_update',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: JSON.stringify(riderData)
            };

            axios(config)
                .then((response) => {
                    console.log("Token Updated")
                    alert("Token Updated")
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }


    async function refreshPage() {
        const lanid = await getItemFromStorage('LangId');
        // alert("refreshPage"+lanid)
        if (!lanid) {
        } else {
            setLangId(0);
        }
        getdata();
        getOneTimeLocation();


    }

    const getOneTimeLocation = () => {
        setLocationStatus('Getting Location ...');
        Geolocation.getCurrentPosition(
            //Will give you the current location
            (position) => {
                setLocationStatus('You are Here');
                console.log('Position...........', position);
                //getting the Longitude from the location json
                const currentLongitude =
                    JSON.stringify(position.coords.longitude);

                //getting the Latitude from the location json
                const currentLatitude = JSON.stringify(position.coords.latitude);
                saveToStorage('CurrentLat', position.coords.latitude.toString());
                saveToStorage('CurrentLon', position.coords.longitude.toString());
                //Setting Longitude state
                setCurrentLongitude(currentLongitude);

                //Setting Longitude state
                setCurrentLatitude(currentLatitude);


                // riderUpdateLocation()


            },


            (error) => {
                setLocationStatus(error.message);
            },
            {
                enableHighAccuracy: false,
                timeout: 30000,
                maximumAge: 60000,
            },
        );
    };

    // async function riderUpdateLocation(){
    //   const interval = setInterval(() => {
    //     riderUpdateLocation1()
    //     console.log('Logs every minute');
    //   }, 30000);

    //   return () => clearInterval(interval);


    //   }

    //   async function riderUpdateLocation1(){

    //       console.log("in the function")
    //       var id = await getItemFromStorage("RiderId")
    //       console.log(id)
    //       var lat = await getItemFromStorage("CurrentLat")
    //       var lon = await getItemFromStorage("CurrentLon")
    //          var request = {
    //             "rider_id":id,
    //             "lat": parseFloat(lat),
    //             "lon":parseFloat(lon),
    //             "online_status":"1",
    //             "goto_home_status":"0"
    //         }
    //           dispatch({type:'RIDER_UPDATE_LOCATION',payload:request})
    //          // alert("Location is updating..")

    //     }


    const subscribeLocationLocation = () => {
        watchID = Geolocation.watchPosition(
            (position) => {
                //Will give you the location on location change

                setLocationStatus('You are Here');
                // console.log("Position...........",position);

                //getting the Longitude from the location json
                const currentLongitude =
                    JSON.stringify(position.coords.longitude);

                //getting the Latitude from the location json
                const currentLatitude =
                    JSON.stringify(position.coords.latitude);

                //Setting Longitude state
                setCurrentLongitude(currentLongitude);
                saveToStorage('CurrenLat', currentLatitude);
                //Setting Latitude state
                setCurrentLatitude(currentLatitude);
                saveToStorage('CurrentLon', currentLongitude);
            },
            (error) => {
                setLocationStatus(error.message);
            },
            {
                enableHighAccuracy: false,
                maximumAge: 60000,
            },
        );
    };


    async function navigaterider() {
        var img = await getItemFromStorage('loginImage');
        saveToStorage('isRNCameraMessage', '');
        if (img == 'true') {
            saveToStorage('riderScreenStatus', 'Online');
            navigate('RiderStatusOnline1');
        } else {

            if (currentLatitude != '' && currentLongitude != '') {
                saveToStorage('riderScreenStatus', 'Online');
                saveToStorage('isRNCameraMessage', '');
                navigation.navigate('RiderStatusOnline', {
                    lat: currentLatitude,
                    lon: currentLongitude,
                });
            }
        }

    }


    function _signUp() {
        navigate('RiderOngoingRide');

    }


    return (
        <ScrollView>
            <View style={styles.container}>
                {/* <MapView
              style={{ flex: 1 }}
              region={region}
              onRegionChangeComplete={region => setRegion(region)}
          >
              {mark.map((coordinate, index) =>
                  <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate} />
              )}

          </MapView> */}
                {/* <MapView.Marker key={`coordinate_1`} coordinate={origin} /> */}

                <View
                    style={{flex: 1, textAlign: 'center', margin: 3, justifyContent: 'space-between', marginBottom: 2}}>

                    <Card style={{backgroundColor: 'white', marginTop: 0}}>
                        <View style={{marginTop: 5, justifyContent: 'center', alignItems: 'center'}}>
                            <Image style={{width: 127, height: 27}}
                                   source={require('../../assets/Images/MadeInIndia.png')}/>
                        </View>


                        <View style={{
                            backgroundColor: '#ffe6e6',
                            height: 50,
                            borderWidth: 0,
                            marginBottom: 3,
                            borderRadius: 15,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            padding: 10,
                            marginTop: 20,
                        }}>


                            <View style={{
                                borderWidth: 1,
                                borderRadius: 1,
                                borderColor: 'white',
                                backgroundColor: '#F67321',
                            }}>
                                <Image style={{width: 30, height: 30}}
                                       source={require('../../assets/Images/Online2.png')}/>
                            </View>


                            <TouchableOpacity onPress={() =>
                                navigaterider()}>

                                <Image style={{width: 30, height: 25}}
                                       source={require('../../assets/Images/Online.png')}/>
                            </TouchableOpacity>


                            <Image style={{width: 40, height: 30}} source={require('../../assets/Images/GoTo1.png')}/>

                        </View>

                        <View style={{
                            marginBottom: 15,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            padding: 1,
                        }}>
                            <Text style={{
                                fontSize: 13,
                                color: '#F67321',
                                fontFamily: themes.fontFamily.Bold,
                                marginLeft: 8,
                            }}>{lang.offline[LangId]}</Text>
                            <Text style={{
                                fontSize: 13,
                                color: '#000000',
                                fontFamily: themes.fontFamily.Bold,
                                marginLeft: 1,
                            }}>{lang.online[LangId]}</Text>

                            <View style={{marginBottom: 0, flexDirection: 'column', padding: 1, marginRight: 10}}>
                                <Text style={{
                                    fontSize: 13,
                                    color: '#000000',
                                    fontFamily: themes.fontFamily.Bold,
                                    marginRight: 0,
                                }}>{lang.go_to[LangId]}</Text>
                                <Text style={{
                                    fontSize: 13,
                                    color: '#000000',
                                    fontFamily: themes.fontFamily.Bold,
                                    marginLeft: 0,
                                }}>{lang.home[LangId]}</Text>
                            </View>
                        </View>


                    </Card>


                    <Card style={{borderRadius: 20, backgroundColor: 'white', marginTop: 380}}>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginRight: 10,
                            marginTop: 10,
                        }}>
                            <View>
                                <View style={{marginBottom: 5, flexDirection: 'row', padding: 1, marginLeft: 10}}>
                                    <Image style={{
                                        width: 20,
                                        height: 25,
                                        marginLeft: 10,
                                        marginRight: 1,
                                        marginTop: 1,
                                        marginBottom: 1,
                                    }} source={require('../../assets/Images/Rating.png')}/>
                                    <Text style={{
                                        fontSize: 13,
                                        color: '#000000',
                                        fontFamily: themes.fontFamily.Bold,
                                        marginLeft: 10,
                                        marginTop: 5,
                                    }}>4.5</Text>
                                </View>

                                <Card.Content style={{flexDirection: 'row', marginLeft: 1, marginBottom: 20}}>
                                    {
                                        image != '' ?
                                            <Image style={{width: 40, height: 45}} source={{uri: image}}/> :

                                            <Image style={{width: 40, height: 45}}
                                                   source={require('../../assets/Images/photo.png')}/>
                                    }

                                    <View style={{flexDirection: 'column'}}>
                                        <Text style={{
                                            fontFamily: themes.fontFamily.Bold,
                                            fontSize: 16,
                                            marginStart: 10
                                        }}>{name}</Text>
                                        <Text style={{
                                            fontFamily: themes.fontFamily.Normal,
                                            color: 'grey',
                                            fontSize: 11,
                                            marginStart: 10,
                                            marginTop: 1,
                                        }}>{lang.basic_level[LangId]}</Text>
                                    </View>
                                </Card.Content>
                            </View>


                            <View style={{
                                marginBottom: 5,
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                padding: 1,
                            }}>
                                <Image style={{
                                    width: 10,
                                    height: 10,
                                    marginRight: 1,
                                    marginTop: 20,
                                    marginBottom: 1,
                                    marginLeft: 45,
                                }} source={require('../../assets/Images/Path.png')}/>

                                <View style={{flexDirection: 'column', padding: 1}}>
                                    <Text style={{
                                        color: 'grey',
                                        fontSize: 11,
                                        marginLeft: 15,
                                        fontFamily: themes.fontFamily.Normal,
                                    }}>{lang.earnings[LangId]}</Text>
                                    <Text style={{fontFamily: themes.fontFamily.Bold, fontSize: 15}}>₹5,470.00</Text>
                                </View>

                            </View>
                        </View>
                    </Card>
                </View>
            </View>
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
        fontSize: 14, textAlign: 'center', fontWeight: 'bold',
    },
    buttontext: {
        color: '#fff',
        fontSize: 16, fontWeight: 'bold',
    },
    loginBtn: {
        flex: 1,
        borderRadius: 5,
        height: 35,
        marginLeft: 15,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: '#fec750',
    },
    cancel: {
        flex: 1,
        borderRadius: 5,
        height: 35,
        marginLeft: 15,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: '#8f8f8f',
    },
    centeredView: {
        marginTop: 150,
    },
    modalView: {
        margin: 20,
        height: 200,
        backgroundColor: 'white',
        borderRadius: 20,
        // padding: 35,
        // alignItems: "center",
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
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

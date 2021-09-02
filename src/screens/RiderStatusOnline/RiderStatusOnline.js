import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Modal,
    TouchableOpacity,
    PermissionsAndroid
} from 'react-native';
import {getItemFromStorage, saveToStorage} from '../../utils/AccessStorage';
import {Card} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {navigate} from '../../Tools/NavigationServices';
import MapView from 'react-native-maps';
import lang from '../../language/lang_values';
import Geolocation from '@react-native-community/geolocation';
import ImgToBase64 from 'react-native-image-base64';
import {themes} from '../../utils';


export default function RiderStatusOnline({route, navigation}) {
    let user_info = useSelector(state => {
        console.log('State: ', state);
        return state.SignIn.User_info;
    });

    let filter = useSelector(state => {
        console.log('State: ', state);
        return state.SignIn.data;
    });
    let camera;
    const dispatch = useDispatch();
    const [mark, setMark] = useState(
        {latitude: 0, longitude: 0});
    const [origin, setorigin] = useState({latitude: 13.082680, longitude: 80.270721});
    const [destination, setdestination] = useState({latitude: 0, longitude: 0});
    const [region, setRegion] = useState({
        latitude: 13.082680,
        longitude: 80.270721,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });
    const [LangId, setLangId] = useState('');

    const [rider_id, setRiderId] = useState('');
    const [snapPoints, setsnapPoints] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [lat, setlat] = useState('');
    const [long, setlong] = useState('');
    const [name, setname] = useState('');
    const [image, setimage] = useState('');
    const [locationStatus, setLocationStatus] = useState('');
    const [Profile, setProfile] = useState('');

    const [base_url, setBaseUrl] = useState('https://www.tallo.in/dev/uploads/riders/');


    const GOOGLE_MAPS_APIKEY = 'AIzaSyB79IrJjGiy5oFOtgfTltYJk5rUVdp63vA';

    React.useEffect(() => {

        async function permissionCheck() {
            var id = await getItemFromStorage('RiderId');
            setRiderId(id);
            if (Platform.OS === 'android') {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.CAMERA,
                        {
                            title: 'Camera Permission',
                            message: 'App needs camera permission',
                        },
                    );
                    // If CAMERA Permission is granted
                    return granted === PermissionsAndroid.RESULTS.GRANTED;
                } catch (err) {
                    console.warn(err);
                    return false;
                }
            } else {
                return true;
            }
        };

        if (Platform.OS === 'ios') {
            getOneTimeLocation();
            subscribeLocationLocation();
        } else {
            getOneTimeLocation();
        }

        getdata();
        permissionCheck();
        const unsubscribe = navigation.addListener('focus', () =>
            refreshPage(),
        );
        return () => {
            // clean up event listener
            unsubscribe;
        };

    }, []);


    async function refreshPage() {
        const lanid = await getItemFromStorage('LangId');
        if (!lanid) {
        } else {
            setLangId(lanid);
        }
        try {
            var uri_from_RNCamera = await getItemFromStorage('uri_from_RNCamera');
            var isRNCamera = await getItemFromStorage('isRNCamera');
            if (uri_from_RNCamera != '' && isRNCamera == 'true') {
                // alert(isRNCamera)
                saveToStorage('isRNCamera', 'false');
                saveToStorage('isRNCameraMessage', 'true');
                setModalVisible(true);
                setProfile(uri_from_RNCamera);
            }

        } catch (e) {

        }
        getdata();
        if (Platform.OS === 'ios') {
            getOneTimeLocation();
            subscribeLocationLocation();
        } else {
            getOneTimeLocation();
        }
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
                setlong(currentLongitude);

                //Setting Longitude state
                setlat(currentLatitude);

                setMark({
                    latitude: parseFloat(position.coords.latitude),
                    longitude: parseFloat(position.coords.longitude),
                });
                setorigin({
                    latitude: parseFloat(position.coords.latitude),
                    longitude: parseFloat(position.coords.longitude),
                });

                setRegion({
                    latitude: parseFloat(position.coords.latitude),
                    longitude: parseFloat(position.coords.longitude),
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                });
                riderUpdateLocation();
            },


            (error) => {
                console.log(error.message);
                setLocationStatus(error.message);
            },
            {
                enableHighAccuracy: false,
                timeout: 30000,
                maximumAge: 60000,
            },
        );
    };

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
                setlong(currentLongitude);
                saveToStorage('CurrenLat', currentLatitude);
                //Setting Latitude state
                setlat(currentLatitude);
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


    async function getdata() {
        var id = await getItemFromStorage('RiderId');
        var name = await getItemFromStorage('Name');
        var img = await getItemFromStorage('Image');
        const lanid = await getItemFromStorage('LangId');
        if (!lanid) {
        } else {
            setLangId(lanid);
        }
        setname(name);
        setimage(img);
        if (id != '') {
            var request = {
                'rider_id': id,
            };
            dispatch({type: 'GET_RIDER_DETAILS', payload: request});
            dispatch({type: 'RIDER_BOOKINGS', payload: request});
        }
        setRiderId(id);

        if (filter.rider_info != null) {
            setname(filter.rider_info.full_name);
            setimage(filter.rider_info.profile_image);
        }

    }

    async function riderUpdateLocation() {
        // const interval = setInterval(() => {
        //riderUpdateLocation1()
        //   console.log('Logs every minute');
        // }, 30000);

        // return () => clearInterval(interval);


    }

    async function offlineClicked() {
        var id = await getItemFromStorage('RiderId');

        //   var request = {
        //     "rider_id":id,
        //     "lat": lat,
        //     "lon": long,
        //     "online_status":"0",
        //     "goto_home_status":"0"
        // }
        //   dispatch({type:'RIDER_UPDATE_LOCATION',payload:request})
        //   saveToStorage("riderScreenStatus","Offline");
        //   navigate('Dashboard');
        fetch(
            'https://www.tallo.in/was/rider_location_update',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'rider_id': id,
                    'lat': lat,
                    'lon': long,
                    'online_status': '0',
                    'goto_home_status': '0',
                }),
            },
        )
            .then(function (response) {
                return response.json();
            })
            .then(data => {
                console.log('Address++++++++++', data);
                if (data['statusCode'] == 'SUCCESS') {
                    saveToStorage('riderScreenStatus', 'Offline');
                    if (data.rider_info.login_image != '') {
                        saveToStorage('loginImage', 'false');
                    } else {
                        saveToStorage('loginImage', 'false');
                        navigate('Dashboard');
                    }
                    //saveToStorage("loginImage","false")
                    //navigate('Dashboard');

                }
            });

    }


    async function Ridergoinghome() {
        var img = await getItemFromStorage('loginImage');
        saveToStorage('isRNCameraMessage', '');
        if (img == 'true' && lat != '' && long != '') {
            navigation.navigate('RiderGoingHome', {lat: lat, lon: long});
        }

    }


    async function captureImage() {
        navigate('CameraScreen');
        setModalVisible(!modalVisible);

    }


    function uploadPhoto() {
        if (Profile != '') {


            ImgToBase64.getBase64String(Profile) // Image URL
                .then(
                    (base64String) => {
                        // console.log(base64String);

                        setProfile(base64String);
                        selectGender(base64String);


                    },
                )
                .catch(
                    (error) => {
                        console.log(error); // Logs an error if there was one
                    },
                );
        }

        //    alert('Model was clos')
        // if(lat!="" && long!=""){
        //     navigation.navigate('RiderStatusOnline1', { lat: lat,
        //       lon:long })
        //  }

        //    setModalVisible(!modalVisible);
    }

    async function selectGender(image) {

        // var lat = await getItemFromStorage("CurrentLat")
        // var lon = await getItemFromStorage("CurrentLon")
        //  var id = await getItemFromStorage("RiderId")

        console.log('in the function');
        var id = await getItemFromStorage('RiderId');
        console.log(id);
        var lat = await getItemFromStorage('CurrentLat');
        var lon = await getItemFromStorage('CurrentLon');
        var request = {
            'rider_id': id,
            'lat': parseFloat(lat),
            'lon': parseFloat(lon),
            'online_status': '1',
            'goto_home_status': '0',
        };
        dispatch({type: 'RIDER_UPDATE_LOCATION', payload: request});
// alert(id)
        //   if(image!=""){
        //       var request = {
        //    "rider_id": id,
        //     "image":image,
        //     "navigation": navigation,
        //     "lat":parseFloat(lat),
        //     "long":parseFloat(lon)
        //   }
        //   dispatch({ type:'RIDER_LOGIN_IMAGE_UPDATE', payload: request })
        //   setModalVisible(!modalVisible)
        // }
        setModalVisible(!modalVisible);
        fetch(
            'https://www.tallo.in/was/rider_login_image_update',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'rider_id': id,
                    'image': image,
                }),
            },
        )
            .then(function (response) {
                return response.json();
            })
            .then(data => {
                console.log('In fetch++++++++++', data);
                if (data['statusCode'] == 'SUCCESS') {
                    //   yield put({
                    //    type: 'USER_INFORMATION',
                    //    payload: response.data
                    //  })
                    //alert("lat"+lat)
                    if (lat != '' && lon != '') {
                        var date = new Date();
                        var day = date.getDate();
                        var month = date.getMonth();
                        var year = date.getFullYear();
                        var todat_date_takeselfie = day + '-' + month + '-' + year;
                        // saveToStorage("riderloginImageDate",todat_date_takeselfie)
                        if (data.rider_info.login_image != '') {
                            saveToStorage('loginImage', 'true');
                        } else {
                            saveToStorage('loginImage', 'false');
                        }


                        //alert(new Date().toString())
                        navigation.navigate('RiderStatusOnline1', {
                            lat: lat,
                            lon: lon,
                        });
                    }


                }


            });

    }

    function _signUp() {

        setModalVisible(!modalVisible);
    }

    return (
        <View style={styles.container}>
            <MapView
                style={{flex: 1}}
                zoomEnabled={true}
                region={region}
                onRegionChangeComplete={region => setRegion(region)}
            >
                {console.log(destination)}

                <MapView.Marker key={`coordinate_1`} coordinate={origin}/>

            </MapView>

            <Card style={{backgroundColor: 'white', top: 0, position: 'absolute', width: '100%'}}>


                <View style={{marginTop: 5, justifyContent: 'center', alignItems: 'center'}}>
                    <Image style={{width: 127, height: 27}} source={require('../../assets/Images/MadeInIndia.png')}/>
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

                    <TouchableOpacity onPress={() => offlineClicked()}>
                        <Image style={{width: 30, height: 25}} source={require('../../assets/Images/Online2.png')}/>
                    </TouchableOpacity>

                    <View style={{borderWidth: 1, borderRadius: 1, borderColor: 'green', backgroundColor: 'green'}}>
                        <Image style={{width: 30, height: 25}} source={require('../../assets/Images/Online.png')}/>
                    </View>

                    <TouchableOpacity onPress={Ridergoinghome}>
                        <Image style={{width: 40, height: 30}}
                               source={require('../../assets/Images/GoTo1.png')}/></TouchableOpacity>
                </View>

                <View style={{marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between', padding: 1}}>
                    <Text style={{
                        fontSize: 13,
                        color: '#000000',
                        fontFamily: themes.fontFamily.Bold,
                        marginLeft: 9,
                    }}>{lang.offline[LangId]}</Text>
                    <Text style={{
                        fontSize: 13,
                        color: 'green',
                        fontFamily: themes.fontFamily.Bold,
                        marginLeft: 0,
                        marginRight: 15,
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


                <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 10}}>
                    <Text style={{
                        fontSize: 13,
                        color: 'green',
                        fontFamily: themes.fontFamily.Bold,
                    }}>{lang.you_are_now_online[LangId]}</Text>

                    <Text style={{
                        fontSize: 13,
                        color: 'grey',
                        fontFamily: themes.fontFamily.Bold,
                    }}>{lang.You_need_to_take_photo_and_upload_to[LangId]}</Text>
                    <Text style={{
                        fontSize: 13,
                        color: 'grey',
                        fontFamily: themes.fontFamily.Bold,
                    }}>{lang.our_tallo_team_for_the_verification[LangId]}</Text>


                    <TouchableOpacity style={styles.takePhoto}
                                      onPress={() => setModalVisible(true)}

                    >
                        <Text style={styles.buttontext}>{lang.take_photo[LangId]}</Text>
                    </TouchableOpacity>
                </View>


            </Card>

            <Card style={{
                borderRadius: 20,
                backgroundColor: 'white',
                position: 'absolute',
                bottom: 10,
                width: '95%',
                marginLeft: 10,
            }}>

                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginRight: 10, marginTop: 10}}>
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
                                <Text style={{fontFamily: themes.fontFamily.Bold, fontSize: 16, marginStart: 10}}>{name}</Text>
                                <Text style={{
                                    color: 'grey',
                                    fontSize: 11,
                                    marginStart: 10,
                                    marginTop: 1,
                                    fontFamily: themes.fontFamily.Normal,
                                }}>{lang.basic_level[LangId]}</Text>
                            </View>
                        </Card.Content>
                    </View>


                    <View
                        style={{marginBottom: 5, flexDirection: 'column', justifyContent: 'space-between', padding: 1}}>
                        <Image style={{
                            width: 10,
                            height: 9,
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

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>


                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 6}}>
                            <Text style={{
                                fontSize: 19,
                                color: '#000000',
                                marginRight: 0,
                                marginLeft: 10,
                                fontFamily: themes.fontFamily.Bold,
                            }}>{lang.upload_photo[LangId]}</Text>
                            <View>
                                <TouchableOpacity onPress={() => _signUp()}>
                                    <Image style={{
                                        marginRight: 0,
                                        marginTop: 0,
                                        marginBottom: 0,
                                        width: 15,
                                        height: 15,
                                        marginLeft: 90,
                                    }} source={require('../../assets/Images/Cancel2.png')}/>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.imageAvater}>
                            {
                                Profile != '' ?

                                    <TouchableOpacity style={styles.uploadImageBtn}>
                                        <Image style={styles.imageAvater}
                                               source={{uri: Profile}}></Image>
                                    </TouchableOpacity> :

                                    <TouchableOpacity style={styles.uploadImageBtn}>
                                    </TouchableOpacity>}


                        </View>
                        <TouchableOpacity style={styles.changeImage} onPress={captureImage}>
                            <Text style={[styles.buttontext, {
                                color: 'red',
                                fontWeight: '100',
                                marginTop: 10,
                                marginBottom: 10,
                                fontFamily: themes.fontFamily.Normal,
                            }]}>{lang.take_selfie[LangId]}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.uploadPhoto]}

                                          onPress={() => uploadPhoto()}
                        >
                            <Text style={styles.buttontext}>{lang.upload_photo[LangId]}</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>

        </View>

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
        fontSize: 14, textAlign: 'center',
        fontFamily: themes.fontFamily.Bold,
    },
    buttontext: {
        color: '#fff',
        fontSize: 16,
        fontFamily: themes.fontFamily.Bold,
        textAlign: 'center',
        justifyContent: 'center',
        marginBottom: 200,
    },
    loginBtn: {
        // flex: 1,
        borderRadius: 5,
        height: 35,
        width: 610,
        marginLeft: 15,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: '#F87300',
        marginTop: 15,
        marginBottom: 30,

    },
    takePhoto: {
        // flex: 1,
        borderRadius: 5,
        height: 35,
        width: 170,
        marginLeft: 15,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: '#F87300',
        marginTop: 15,
        marginBottom: 30,

    },

    loginBtn1: {
        //flex: 1,
        borderRadius: 5,
        //height: 45,
        width: 210,
        marginLeft: 15,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: 'white', borderColor: 'red', borderWidth: 1,
        marginTop: 15,
        marginBottom: 30,

    },
    changeImage: {
        //flex: 1,
        borderRadius: 5,
        //height: 45,
        width: 210,
        marginLeft: 15,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: 'white', borderColor: 'red', borderWidth: 1,
        marginTop: 5,
        marginBottom: 39,

    },

    uploadPhoto: {
        // flex: 1,
        borderRadius: 5,
        height: 35,
        width: 170,
        marginLeft: 1,
        marginRight: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: '#F87300',
        marginTop: 15,
        marginBottom: 3,
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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
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
    modalView: {
        margin: 4,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontFamily: themes.fontFamily.Bold,
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    imageAvater: {
        paddingVertical: 30,
        padding: 10,
        width: 150,
        height: 150,
        // borderRadius: 150/2,
        // marginLeft:40,
        backgroundColor: '#fff',
        borderWidth: 1,
        // borderStyle: 'dashed',
        margin: 30,
    },
    loginBtn: {
        borderRadius: 5,
        height: 35,
        marginLeft: 50,
        marginRight: 60,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 50,
        backgroundColor: '#F87300',
        marginBottom: 30,
    },
    buttontext: {
        color: '#fff',
        fontSize: 16, fontFamily: themes.fontFamily.Bold,
    },
    uploadImageBtn: {
        borderRadius: 5,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 30,
    },
    uploadtext: {
        color: '#808080',
        fontSize: 16,
        marginTop: 5
    },
});

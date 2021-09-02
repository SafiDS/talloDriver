import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View, Dimensions,
    Image, Modal,BackHandler,
    TextInput,
    TouchableOpacity,PermissionsAndroid,
    Switch,Linking
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card, IconButton, Colors, Button } from 'react-native-paper';
import { getItemFromStorage,saveToStorage } from "../../utils/AccessStorage";
import { useDispatch,useSelector} from "react-redux";
import MapView, { Marker, Callout } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { StaticText } from "../../utils";
import lang from '../../language/lang_values'


import Geolocation from '@react-native-community/geolocation';

import { navigate, navigateScreen } from '../../Tools/NavigationServices';
export default function RiderMultipleDestination({route, navigation }) {
    const dispatch = useDispatch();
    let users1 = useSelector(state => {
       console.log('State: booking_info', users1);
       return state.SignIn.bookingInfo;
     });

    const [mark, setMark] = useState(
        { latitude: 0, longitude: 0 } );
    const [origin, setorigin] = useState({ latitude: 13.082680, longitude: 80.270721 });
    const [destination, setdestination] = useState({ latitude: 0, longitude: 0 })
    const [vehicle_name, setvehicle_name] = useState("")

    const [region, setRegion] = useState({
        latitude: 13.082680,
        longitude: 80.270721,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
    });
    const [booking_id, setBookingid] = useState("")
    const [rider_id, setriderid] = useState("")
    const [name, setname] = useState("")
    const [phone, setphone] = useState("")
    const [profile, setprofile] = useState("");
    const [LangId, setLangId] = useState("")


    const [currentLongitude,setCurrentLongitude ] = useState('...');
    const [currentLatitude,setCurrentLatitude] = useState('...');
    const [locationStatus,setLocationStatus ] = useState('');
    const GOOGLE_MAPS_APIKEY = 'AIzaSyB79IrJjGiy5oFOtgfTltYJk5rUVdp63vA';


    // To set the max number of Stars
   
   const url = `sms:${phone}${Platform.OS === "ios" ? "&" : "?"}body=${""}`

   
    React.useEffect(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
     requestLocationPermission();
     if(users1.user_data!=null ){
              setname(users1.user_data.full_name)
              setprofile(users1.user_data.profile_image)
            }
if(users1.booking_data!=null){
  setorigin({latitude:parseFloat(users1.booking_data.source_lat),longitude:parseFloat(users1.booking_data.source_lon)})
  console.log("_____origin_____",origin)
  setdestination({latitude:parseFloat(users1.booking_data.destination_lat),longitude:parseFloat(users1.booking_data.destination_lon)})
  setRegion({latitude:parseFloat(users1.booking_data.source_lat),longitude:parseFloat(users1.booking_data.source_lon),latitudeDelta:0.01,longitudeDelta:0.01})
}
if(users1.vehicle_name!=""){
  setvehicle_name(users1.vehicle_name)
}
            
           
        // Create an scoped async function in the hook
        async function anyNameFunction() {
          const booking_id = await getItemFromStorage('Booking_Id')
          const rider_id = await getItemFromStorage('RiderId')
          const phone = await getItemFromStorage('user_phone')
          const lanid = await getItemFromStorage('LangId')
          if (!lanid) { }
          else { setLangId(lanid) }
          if(phone!=""){ 
            //alert(phone)
            setphone(phone)}
            if(booking_id!=null){
              setBookingid(booking_id)
              setriderid(rider_id)
            }   
         }
        anyNameFunction();
       
        const unsubscribe  = navigation.addListener("focus", () =>
        refreshPage()
      );
     // BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
      return () => {
        // clean up event listener
        unsubscribe
        BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
      }
      
     
        // Execute the created function directly
       }, []);

       function handleBackButtonClick() {
        return true;
      }

      async function refreshPage() {
        const lanid = await getItemFromStorage('LangId')
        if (!lanid) { }
        else { setLangId(lanid) }
           requestLocationPermission();
       }

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



       const getOneTimeLocation = () => {
        setLocationStatus('Getting Location ...');
        Geolocation.getCurrentPosition(
          //Will give you the current location
          (position) => {
            setLocationStatus('You are Here');
            console.log("Position...........",position);
            //getting the Longitude from the location json
            const currentLongitude = 
              JSON.stringify(position.coords.longitude);
    
            //getting the Latitude from the location json
            const currentLatitude = JSON.stringify(position.coords.latitude);
               saveToStorage("CurrentLat",position.coords.latitude.toString())
               saveToStorage("CurrentLon",position.coords.longitude.toString())
            //Setting Longitude state
            setCurrentLongitude(currentLongitude);
            
            //Setting Longitude state
            setCurrentLatitude(currentLatitude);
                     
            setMark({latitude:parseFloat(position.coords.latitude),longitude:parseFloat(position.coords.longitude)})
            setorigin({latitude:parseFloat(position.coords.latitude),longitude:parseFloat(position.coords.longitude)})
            
            setRegion({latitude:parseFloat(position.coords.latitude),longitude:parseFloat(position.coords.longitude),latitudeDelta:0.01,longitudeDelta:0.01})
                },
  
          
          (error) => {
              console.log(error.message)
            setLocationStatus(error.message);
          },
          {
            enableHighAccuracy: false,
            timeout: 30000,
           maximumAge: 60000
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
            setCurrentLongitude(currentLongitude);
            saveToStorage("CurrenLat",currentLatitude)
            //Setting Latitude state
            setCurrentLatitude(currentLatitude);
            saveToStorage("CurrentLon",currentLongitude)
          },
          (error) => {
            setLocationStatus(error.message);
          },
          {
            enableHighAccuracy: false,
           maximumAge: 60000
          },
        );
      };


       function reachLocation() {
         if(booking_id!="" && rider_id!=""){
          var request = {
            "booking_id": booking_id,
            "rider_id": rider_id,
            "navigation":navigation
            }
            dispatch({type:'BOOKING_SOURCE_LOCATION_REACH',payload:request})
         }
       
       }

       function cancelRide(){
        // alert("hi")
        var request = {
         "booking_id": booking_id,
          "rider_id": rider_id,
          "navigation":navigation
        }
        dispatch({type:'RIDER_CANCEL',payload:request})
       }

    return (
       
        <View style={styles.container}>

<MapView
          style={{flex:1}}
          region={region}
          onRegionChangeComplete={region => setRegion(region)}
          zoomEnabled={true}
          zoomControlEnabled={true}
        >
           <Marker.Animated
  key={`coordinate_3`}
  coordinate={origin} 					     
// title={marker.title}
  >
   {
 vehicle_name==="BIKE/SCOOTER" ? 
<Image source={require('../../assets/Images/Bikesss.png')}/> : null

}

{  vehicle_name==="AUTO" ?  
<Image source={require('../../assets/Images/icon-auto.png')}/> : null}

{ vehicle_name==="CABS" ?
<Image source={require('../../assets/Images/sedan.png')}
style={{height:20,width:60}}/> : null}

{  vehicle_name==="COMMERCIALS" ? 
<Image source={require('../../assets/Images/commercials2.png')}/> : null}
    
  </Marker.Animated>
          {
            origin &&
            <Marker coordinate={origin}>
              <Callout>
                <Text>You are here</Text>
              </Callout>
            </Marker>
          }
          {
            destination &&
            <Marker
              pinColor="#4196ea"
              coordinate={destination}
              draggable={true}
             // onDragEnd={this.tweakDestination}
            />
          }
          
          {
            origin && destination &&
            <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            optimizeWaypoints={true}
              strokeWidth={5}
              strokeColor={"#2d8cea"}
            />
          }
          
        </MapView>
           
                {/* <View style={{ flex: 1,flexDirection:'row',position:'absolute',backgroundColor: '#dcdcdc',width: 90, height: 40, borderWidth: 0, marginBottom: 30, borderRadius: 15, padding: 10 ,justifyContent: 'center',alignContent:'center'}}>
                    <Text style={{ textAlign:'center', fontSize: 16, color: '#000000', fontWeight: 'bold',marginLeft: 5 }}>10 min</Text>
                  
                </View> */}
                <Card style={{ borderRadius: 10, backgroundColor: 'white',position:'absolute',bottom:10,width:'95%',margin:10}}>
                    <Card.Content style={{  }}>

                                           <View style={{ justifyContent: 'center', alignItems: 'center' ,marginBottom: 10 }}>
                      
                                                <Image style={{ width: 60, height: 60 }} source={require('../../assets/Images/photo.png')} />

                            <Text style={{ fontWeight: 'bold', fontSize: 18 , marginTop: 5}}>{name}</Text>
                            </View>
                      
                                               <View style={{ flexDirection: 'row',justifyContent: 'space-between',marginTop: 20 }}>

                        <View style={{ flexDirection: 'column' }}>

                        <Image style={{ width: 40, height: 40 }} source={require('../../assets/Images/Group.png')} />
                        <Text style={{ fontWeight: 'bold', fontSize: 14, marginTop: 10,marginLeft: 10 }}>{lang.data[LangId]}</Text>
                      </View>
                      <View style={{ flexDirection: 'column' }}>
<TouchableOpacity onPress={() => { Linking.openURL(`tel:${phone}`) }}>
<Image style={{ width: 40, height: 40 }} source={require('../../assets/Images/Cellular.png')} />
<Text style={{ fontWeight: 'bold', fontSize: 14, marginTop: 10,marginLeft: 2 }}>{lang.cellular[LangId]}</Text>
</TouchableOpacity>
</View>
<View style={{ flexDirection: 'column' }}>
<TouchableOpacity onPress={() => { Linking.openURL(url) }}>
<Image style={{ width: 40, height: 40 }} source={require('../../assets/Images/Message.png')} />
<Text style={{ fontWeight: 'bold', fontSize: 14, marginTop: 10,marginRight: 1 }}>{lang.message[LangId]}</Text>
</TouchableOpacity>
</View>
<View style={{ flexDirection: 'column' }}>
<TouchableOpacity onPress={cancelRide}>

<Image style={{ width: 40, height: 40 }} source={require('../../assets/Images/Cancel.png')} />
<Text style={{ fontWeight: 'bold', fontSize: 14, marginTop: 10}}>{lang.cancel[LangId]}</Text>
</TouchableOpacity>
</View>



</View>

<TouchableOpacity style={styles.loginBtn} 
//onPress={() => navigate('RiderHomeOtp')}
onPress={reachLocation}
>
                <Text style={styles.buttontext}>{lang.arrived[LangId]}</Text>
            </TouchableOpacity>

<View>
    

</View>

                    </Card.Content>
                </Card>


           

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
        fontSize: 16,
         fontWeight: 'bold'
    },
    loginBtn: {
        borderRadius: 5,
        height: "13%",
        width:"100%",
        marginLeft: 3,
        marginRight: 0,
        alignItems: "center",
        justifyContent: "center",
        textAlign: 'center',
        marginTop: 40,
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
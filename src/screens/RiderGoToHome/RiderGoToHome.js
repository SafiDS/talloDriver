import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View, Dimensions,
    Image, Modal,
    TextInput,
    TouchableOpacity,BackHandler,
    Switch,ActivityIndicator,PermissionsAndroid
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card, IconButton, Colors, Button } from 'react-native-paper';
import { navigate, navigateScreen } from '../../Tools/NavigationServices'
import { getItemFromStorage,saveToStorage,removeFromStorage} from "../../utils/AccessStorage";
import { useDispatch,useSelector} from "react-redux";
import { StaticText } from "../../utils";
import MapView, { Marker, Callout } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';
import lang from '../../language/lang_values'



export default function RiderGoToHome({ route,navigation }) {
   
    let users1 = useSelector(state => {
     // console.log('State: booking_info', users1);
      return state.SignIn.bookingInfo;
    });
    
    const dispatch = useDispatch();
   
    const [pickupLocation, setpickupLocation] = useState("");
    const [dropLocation, setdropLocation] = useState("");
   
    const [booking_id, setBookingid] = useState("")
    const [rider_id, setriderid] = useState("")
    const [vehicle_name, setvehicle_name] = useState("")
    const [mark, setMark] = useState(
        { latitude: 0, longitude: 0 } );
    const [origin, setorigin] = useState({ latitude: 13.082680, longitude: 80.270721 });
    const [destination, setdestination] = useState({ latitude: 0, longitude: 0 })
   
    const [region, setRegion] = useState({
        latitude: 13.082680,
        longitude: 80.270721,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
    });
   
    const [name, setname] = useState("");
    const [profile, setprofile] = useState("");
    const [LangId, setLangId] = useState("")


    const GOOGLE_MAPS_APIKEY = 'AIzaSyB79IrJjGiy5oFOtgfTltYJk5rUVdp63vA';

    const [locationStatus,setLocationStatus ] = useState('');



   

    React.useEffect(() => {
    
     
        // Create an scoped async function in the hook
        async function anyNameFunction() {
         const book = await getItemFromStorage("Booking_info") 
         console.log("book+++++++++++++",book)
         let b1 = JSON.parse(book)
         const lanid = await getItemFromStorage('LangId')
         if (!lanid) { }
         else { setLangId(lanid) }
        // alert(b1.booking_data.source)
         setpickupLocation(b1.booking_data.source)
              setdropLocation(b1.booking_data.destination)
              setname(b1.user_data.full_name)
              setprofile(b1.user_data.profile_image)
              setvehicle_name(b1.vehicle_name)
              saveToStorage("user_phone",b1.user_data.phone)
              setorigin({latitude:parseFloat(b1.booking_data.source_lat),longitude:parseFloat(b1.booking_data.source_lon)})
              console.log("_____origin_____",origin)
              setdestination({latitude:parseFloat(b1.booking_data.destination_lat),longitude:parseFloat(b1.booking_data.destination_lon)})
              setRegion({latitude:parseFloat(b1.booking_data.source_lat),longitude:parseFloat(b1.booking_data.source_lon),latitudeDelta:0.01,longitudeDelta:0.01})
          const booking_id = await getItemFromStorage('Booking_Id')
          const rider_id = await getItemFromStorage('RiderId')
          if(booking_id!=null){
          setBookingid(booking_id)
          setriderid(rider_id)    
            // var request = {"booking_id": booking_id }
            // dispatch({type:'BOOKING_INFO',payload:request})
          }
         
         
        
         }
        anyNameFunction();
        
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
       // requestLocationPermission();
        
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
      }

       }, []);

       function handleBackButtonClick() {
        //BackHandler.exitApp();
        return true;
      }
       
    //  async  function refreshPage() {
    //   const booking_id = await getItemFromStorage('Booking_Id')
    //     var request = {
    //       "booking_id": booking_id
    //       }
    //       //dispatch({type:'BOOKING_INFO',payload:request})
    //       if(users1!=""){
    //         // setpickupLocation(users1.booking_data.source)
    //         // setdropLocation(users1.booking_data.destination)
    //         // setname(users1.user_data.full_name)
    //       }else{
    //         // setpickupLocation(users1.booking_data.source)
    //         //   setdropLocation(users1.booking_data.destination)
    //         //   setname(users1.user_data.full_name)
    //       }
          
    //      // requestLocationPermission();
    //    }

       

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
         setlong(currentLongitude);
         
         //Setting Longitude state
         setlat(currentLatitude);
                  
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

      async function bookAccept(){
        const booking_id = await getItemFromStorage('Booking_Id')
        const rider_id = await getItemFromStorage('RiderId')
           var request = {
            "booking_id":booking_id,
            "rider_id":rider_id,
            "navigation": navigation
            }

        dispatch({type:'RIDER_BOOKING_ACCEPT',payload:request})
        removeFromStorage("Booking_info")

        // removeFromStorage('source')
        // removeFromStorage('destination')
       }
    
     async  function cancelRide(){
      const booking_id = await getItemFromStorage('Booking_Id')
      const rider_id = await getItemFromStorage('RiderId')        
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
    
      <View style={{ flex: 1, width:'95%', margin: 10, justifyContent: 'space-between', marginBottom: 2 ,position:'absolute',top:10}}>


   

          <View style={{ marginTop: 20,backgroundColor: '#ffe6e6', height: 50, borderWidth: 0, marginBottom: 3, borderRadius: 15, flexDirection: 'row', justifyContent: 'space-between', padding: 10,}}>
            

          <TouchableOpacity onPress={()=>navigate('Dashboard')}> 
          <Image style={{ width: 30, height: 25 }} source={require('../../assets/Images/Online2.png')} />
              </TouchableOpacity>

             
              <View style={{borderWidth:1,borderRadius:1,borderColor:'white',backgroundColor:'green'}}>
              <Image style={{ width: 30, height: 25 }} source={require('../../assets/Images/Online.png')} />
              </View>
            
              <View >
              <Image style={{ width: 40, height:30 }} source={require('../../assets/Images/GoTo1.png')} />
              </View>
          </View>

          <View style={{  marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between', padding: 1 }}>
          <Text style={{ fontSize: 13, color: '#000000', fontWeight: 'bold' ,marginLeft: 9,}}>{lang.offline[LangId]}</Text>
          <Text style={{ fontSize: 13, color: 'green', fontWeight: 'bold',marginLeft: 0 ,marginRight: 8 }}>{lang.online[LangId]}</Text>
          <View style={{  marginBottom: 0, flexDirection: 'column', padding: 1,marginLeft: 0 }}>
<Text style={{ fontSize: 13, color: '#000000', fontWeight: 'bold' ,marginRight: 10 }}>{lang.go_to[LangId]}</Text>
<Text style={{ fontSize: 13, color: '#000000', fontWeight: 'bold' ,marginLeft: 0}}>{lang.home[LangId]}</Text>
</View>
</View>


<Image style={{ width: 30, height:30,marginLeft: 310 ,marginTop: 200 }} source={require('../../assets/Images/droplocations.png')} />


</View>

          <Card style={{ borderRadius: 20,width:'95%', backgroundColor: 'white',position:'absolute',bottom:10,margin:10 }}>


          <View style={{   marginBottom: 5, flexDirection: 'row',justifyContent: 'space-between', padding: 1,marginLeft: 10  }}>
          <Text style={{ fontSize: 16, color: '#FF9900', fontWeight: 'bold',marginLeft: 5,marginTop: 5 }}>{lang.Hey_you_have_new_ride[LangId]} </Text>
          <Image style={{ width: 20, height: 20,marginRight: 1,marginTop: 5,marginBottom: 1,marginLeft: 1,marginRight: 10 }} source={require('../../assets/Images/dropdown.png')} />
</View>


          <View style={{ flexDirection: 'row',justifyContent: 'space-between',marginRight: 10 , marginTop: 1 }}>
<View>
       

<Card.Content style={{ flexDirection: 'row',marginLeft: 1,marginBottom: 20 , marginTop: 5}}>
{
profile!="" ?
<Image style={{ width: 40, height: 45 }} source={{uri:profile}} />
:
<Image style={{ width: 40, height: 45 }} source={require('../../assets/Images/photo.png')} />

}
<View>
<Text style={{ fontWeight: 'bold', fontSize: 16, marginStart: 10 }}>{name}</Text>
</View>

</Card.Content>
</View>

</View>



<View style={{  marginBottom: 0, flexDirection: 'row',  padding: 1 }}>
        

<View style={{ flexDirection: 'column', marginStart: 8, }}>
<Image style={{ width: 16, height: 16,marginTop: 10, marginStart: 0 }} source={require('../../assets/Images/Path2.png')} />
<Image style={{ width: 5, height: 38,marginTop: 0, marginStart: 5 }} source={require('../../assets/Images/Path3.png')} />
<Image style={{ width: 18, height: 22,marginTop: 0, marginStart: 0 }} source={require('../../assets/Images/Path1.png')} />
</View>  

<View style={{ flexDirection: 'column', padding: 0, marginStart: 10,marginTop: 10, }}>    

<View style={{ flexDirection: 'column', padding: 1, marginStart: 1 }}>    
<Text style={{ fontWeight: 'normal',color: 'grey', fontSize: 9, marginStart: 1, marginTop: 1 }}>{lang.pickup_location[LangId]}</Text>
<Text style={{ fontWeight: 'bold', fontSize: 13, marginStart: 1 }}>{pickupLocation}</Text>
</View>
       
<View style={{ flexDirection: 'column', padding: 1, marginStart: 1,marginTop: 17 }}>    
<Text style={{ fontWeight: 'normal',color: 'grey', fontSize: 9, marginStart: 1, marginTop: 1 }}>{lang.drop_location[LangId]}</Text>
<Text style={{ fontWeight: 'bold', fontSize: 13, marginStart: 1 }}>{dropLocation}</Text>
       </View>

       </View>

</View>



<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
              <TouchableOpacity style={styles.loginBtnn} onPress={cancelRide}
              >
                  <Text style={styles.buttontextt}>{lang.decline[LangId]}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.loginBtn} 
            onPress={bookAccept}
              >
                  <Text style={styles.buttontext}>{lang.accept[LangId]}</Text>
              </TouchableOpacity>
          </View>
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
        marginRight: 5,
        alignItems: "center",
        justifyContent: "center",
        textAlign: 'center',
        backgroundColor: "#F87300",
        marginTop: 5,
        marginBottom: 30

    },
    loginBtnn: {
        width: 180,
        borderRadius: 5,
        borderColor: "#ff8000",
        borderWidth: 1,
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
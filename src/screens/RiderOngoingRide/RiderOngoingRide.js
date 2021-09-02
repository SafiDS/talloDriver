import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View, 
    Image, Modal,
    TouchableOpacity,
    BackHandler,PermissionsAndroid,Platform
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card, IconButton, Colors, Button } from 'react-native-paper';
import { navigate, navigateScreen } from '../../Tools/NavigationServices';
import { useDispatch,useSelector } from "react-redux";
import { getItemFromStorage,removeFromStorage,saveToStorage } from "../../utils/AccessStorage";

import MapView, { Marker, Callout } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Geolocation from '@react-native-community/geolocation';
import { StaticText } from "../../utils";
import lang from '../../language/lang_values'



export default function RiderOngoingRide({ navigation }) {
    const dispatch = useDispatch();
    const users1 = useSelector((state) => state.SignIn.bookingInfo);
    console.log("booking_info+++",users1)


    const [coupon, setCoupon] = useState("")
    const [mode, setMode] = useState("")
    const [SourceLat,setSourceLat] = useState("")
    const [SourceLong,setSourceLong] = useState("")
    const [DesLat,setDesLat] = useState("")
    const [DesLong,setDesLong] = useState("")
    const [Source,setSource] = useState("")
    const [Destination,setDestination] = useState("")
    const [user_id,setUserId] = useState("")
    const [vehicle_id,setVehicleId] = useState("")
    const [booking_otp,setBookingOtp] = useState("")
    const [distance,setDistance] = useState("")
    const [total_price,setTotalPrice] = useState("")
    const [time,setTime] = useState("")
    const [BookingId,setBookingId] = useState("")
    const [booking_id, setBookingid] = useState("")
    const [locationStatus,setLocationStatus ] = useState('');
    const [LangId, setLangId] = useState("")
    const [vehicle_name, setvehicle_name] = useState("")




    const [Status,setStatus] = useState("")
    const [rider_id, setriderid] = useState("")
    const [modalVisible, setModalVisible] = useState(false);
    const [riderLocation, setriderLocation] = useState({ latitude: 13.082680, longitude: 80.270721 });
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
    const [snapPoints, setsnapPoints] = useState(false);
    const [RaidDetails, setRaidDetails] = useState(false);
    const snap_Points = snapPoints ? ["30%", "30%"] : ["30%", "50%"]
    const GOOGLE_MAPS_APIKEY = 'AIzaSyB79IrJjGiy5oFOtgfTltYJk5rUVdp63vA';
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
        
          requestLocationPermission();
         
        var lat = users1.booking_data.source_lat
        var lon = users1.booking_data.source_lon
    
        var latd = users1.booking_data.destination_lat
        var lond = users1.booking_data.destination_lon
    
        setMark({latitude:parseFloat(lat),longitude:parseFloat(lon)})
        setorigin({latitude:parseFloat(lat),longitude:parseFloat(lon)})
        console.log("_____origin_____",origin)
        setdestination({latitude:parseFloat(latd),longitude:parseFloat(lond)})
        setRegion({latitude:parseFloat(lat),longitude:parseFloat(lon),latitudeDelta:0.01,longitudeDelta:0.01})
         setUserId(users1.booking_data.user_id)
         setVehicleId(users1.booking_data.vehicle_id)
         setBookingId(users1.booking_data.booking_id)
         setSource(users1.booking_data.source)
        
         setDestination(users1.booking_data.destination)
         setvehicle_name(users1.vehicle_name)
         setSourceLat(parseFloat(users1.booking_data.source_lat))
         setSourceLong(parseFloat(users1.booking_data.source_lon))
         setDesLat(parseFloat(users1.booking_data.destination_lat))
         setDesLong(parseFloat(users1.booking_data.destination_lon))
         setMode(users1.booking_data.payment_mode)
         setCoupon(users1.booking_data.coupon_code)
         setBookingOtp(users1.booking_data.booking_otp)
         setDistance(users1.booking_data.distance)
         setStatus(users1.booking_data.status)
        
         setTotalPrice(users1.booking_data.total_price)
         console.log(origin)

         async function anyNameFunction() {
         const rider_id = await getItemFromStorage('RiderId')
         const booking_id = await getItemFromStorage('Booking_Id')
         const lanid = await getItemFromStorage('LangId')
         if (!lanid) { }
         else { setLangId(lanid) }

              if(rider_id!=null){
                setriderid(rider_id)
                setBookingid(booking_id)

              } 
           }
           anyNameFunction();

           if(users1.booking_data.payment_mode=="Online"){
            let interval = setInterval(() => {
              if(StaticText.BOOKING_STATUS=="106"){
                clearInterval(interval)
                navigate("SuccessScreen")
              }else{
                //alert(StaticText.BookingId)
                var request = {
                       "booking_id":StaticText.BookingId,
                       "navigation":navigation
                      }
                       dispatch({ type: 'BOOKING_STATUS_INFO', payload: request })
              }
            }, 5000)
          }
       
        
        }, []);
     
       


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
                setriderLocation({latitude:parseFloat(currentLatitude),longitude:parseFloat(currentLongitude)})

                 },
     
              (error) => {
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
        
                  setriderLocation({latitude:parseFloat(currentLatitude),longitude:parseFloat(currentLongitude)})
                  riderUpdateLocation()
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

          async function riderUpdateLocation(){
            const interval = setInterval(() => {
                getOneTimeLocation();
                subscribeLocationLocation();
              console.log('Logs every minute');
            }, 60000);
          
            return () => clearInterval(interval);
      
             
            }
     
    function collectCash() {
       var request = {
        "booking_id":booking_id,
        "rider_id":rider_id,
        "navigation": navigation
      }
      dispatch({ type:'CASH_PAYMENT', payload: request })
         //  navigate('SuccessScreen');
           setModalVisible(!modalVisible);
          }

          function collectCash1() {
            // var request = {
            //   "booking_id":booking_id,
            //   "navigation": navigation
            // }
            // dispatch({ type:'BOOKING_STATUS_INFO', payload: request })
                //navigate('RiderPayment');
                setModalVisible(!modalVisible);
               }

    function _signUp() {
       
        var request = {
            
                "booking_id":booking_id,
                "rider_id":rider_id,
                "destination":Destination,
                "destination_lat":DesLat,
                "destination_lon":DesLong,
                "navigation": navigation
                }
         
        console.log(Destination)
        console.log(DesLat)

        console.log(DesLong)

        dispatch({ type:'RIDER_BOOKING_COMPLETE', payload: request })
        // removeFromStorage('source')
        // removeFromStorage('destination')
        setModalVisible(true)
      }

   
    return (
        <View style={styles.container}>
               <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
         
          <TouchableOpacity onPress={() => setModalVisible(false)}>
           <Image style={{ marginRight:20 ,marginTop:20 , marginBottom:0, width: 15, height: 15,marginLeft:270 }} source={require('../../assets/Images/Cancel2.png')} />
           </TouchableOpacity>
            
           <View style={{ marginBottom: 0, padding: 20, margin: 1 }}>
         <View style={{  justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ width: 50, height: 50 }} source={require('../../assets/Images/Scooty.png')} />
                <Text style={{ fontSize: 20, alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', marginBottom: 25,marginTop: 50 }}>{lang.Destination_Arrived[LangId]}</Text>
                <View style={{  borderRadius: 15, borderWidth: 2.5, borderColor: '#ff8000',  marginBottom: 6, width: 150, height: 100 }}>
                <Text style={{ fontSize: 25, fontWeight: 'bold',marginTop: 20,textAlign:'center' }}>₹ {total_price}</Text>
                <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 13 ,textAlign:'center'}}> {mode} Mode</Text>
</View>



  {
    mode != "Cash" ?
    <TouchableOpacity style={styles.loginBtn2} 

            onPress={() => collectCash1() }
               >
                    <Text style={styles.buttontext}>{lang.collect_online[LangId]}</Text>
                </TouchableOpacity> :
  
<TouchableOpacity style={styles.loginBtn2} 

            onPress={() => collectCash() }
               >
                    <Text style={styles.buttontext}>{lang.collect_cash[LangId]}</Text>
                </TouchableOpacity>}




         </View>

     </View> 

          </View>
        </View>
      </Modal>
      
           




<MapView
          style={{flex:1}}
          region={region}
          onRegionChangeComplete={region => setRegion(region)}
          zoomEnabled={true}
          zoomControlEnabled={true}
        >
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
            riderLocation &&
           <Marker.Animated
  key={`coordinate_3`}
  coordinate={riderLocation}					     
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
    
  </Marker.Animated>}
          {/* {
            riderLocation &&
            <Marker.Animated
            // ref={marker => {
            //   this.marker = marker;
            // }}
            coordinate={riderLocation}
          >
            <Image
              source={require("../../../src/assets/Images/car.png")}
              //style={{ height: 35,width:120 ,resizeMode:"contain"}}
            />
             <Callout>
                 <Text>Rider is here</Text>
              </Callout>
          </Marker.Animated>
           
          } */}
          
          
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
  <View>
 

      </View>

  <Card style={{ borderRadius: 14, backgroundColor: 'white',position:'absolute',bottom:10,width:'95%',margin:10 }}>
                    <Card.Content style={{  }}>
      

<TouchableOpacity style={styles.loginBtn}
onPress={_signUp}
 >
                <Text style={styles.buttontext}>{lang.End_Trip[LangId]}</Text>
            </TouchableOpacity>



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
    centeredView: {
        marginTop: 10
    },
    loginBtn2: {
        borderRadius: 5,
        height: "13%",
        width:"100%",
        marginLeft: 10,
        marginRight: 0,
        alignItems: "center",
        justifyContent: "center",
        textAlign: 'center',
        marginTop: 20,
        backgroundColor: "#F87300",
        marginBottom:"10%"
      },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 2
    },
    modalView: {
        margin: 4,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 3,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        //height:370,
        width:300
      },
    loginBtn: {
        borderRadius: 9,
        height: "50%",
        width:"100%",
        marginLeft: 3,
        marginRight: 0,
        alignItems: "center",
        justifyContent: "center",
        textAlign: 'center',
        marginTop: 5,
        backgroundColor: "#F87300",
        marginBottom:"10%"
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
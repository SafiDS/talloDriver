import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View, Dimensions,
    Image, Platform,
    TextInput,
    TouchableOpacity,
    Switch
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card, IconButton, Colors, Button } from 'react-native-paper';
import { useDispatch } from 'react-redux'
import { navigate, navigateScreen } from '../../Tools/NavigationServices'
import MapView from "react-native-maps";
import Geolocation from '@react-native-community/geolocation';
import lang from '../../language/lang_values'



import MapViewDirections from 'react-native-maps-directions'
import { getItemFromStorage,saveToStorage } from "../../utils/AccessStorage";
import { GetRiderDetails } from "../../Saga/LoginSaga";

export default function RiderStatusOnline1({route, navigation }) {

    const dispatch = useDispatch();
    const [mark, setMark] = useState(
        { latitude: 0, longitude: 0 } );
    const [origin, setorigin] = useState({ latitude: 13.082680, longitude: 80.270721 });
   
    const [region, setRegion] = useState({
        latitude: 13.082680,
        longitude: 80.270721,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
    });
    const [snapPoints, setsnapPoints] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [lat, setlat] = useState("");
    const [long, setlong] = useState("");
    const [IsShown, setIsShown] = useState(false)
    const [ridemessage, setrideMessage] = useState("")
    const [locationStatus,setLocationStatus ] = useState('');
    const [LangId, setLangId] = useState("")


    const GOOGLE_MAPS_APIKEY = 'AIzaSyB79IrJjGiy5oFOtgfTltYJk5rUVdp63vA';

    React.useEffect(() => {
      // setTimeout(() => {
      //   setIsShown(true);
      // }, 3000);

      getdata()
        if (Platform.OS === 'ios') {
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            getOneTimeLocation();
          }
    
          const unsubscribe  = navigation.addListener("focus", () =>
          refreshPage()
        );
        return () => {
          // clean up event listener
          unsubscribe
        }
        }, []);

        async function getdata(){
          var img = await getItemFromStorage("loginImage")
          var msg = await getItemFromStorage("isRNCameraMessage")
          const lanid = await getItemFromStorage('LangId')
      if (!lanid) { }
      else { setLangId(lanid) }
         // alert(msg)
          if(img=="true" && msg=="true"){
            setIsShown(true);
            setTimeout(() => {
              setIsShown(false);
            }, 3000);
        }else{
          setIsShown(false)
        }
        }

      async function refreshPage(){
        const lanid = await getItemFromStorage('LangId')
      if (!lanid) { }
      else { setLangId(lanid) }
           if (Platform.OS != 'ios') {
              getOneTimeLocation();
            
            } else {
              subscribeLocationLocation();
              getOneTimeLocation();
            }
          }

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
               
                setlat(currentLatitude);
                setMark({latitude:parseFloat(position.coords.latitude),longitude:parseFloat(position.coords.longitude)})
                setorigin({latitude:parseFloat(position.coords.latitude),longitude:parseFloat(position.coords.longitude)})
                
                setRegion({latitude:parseFloat(position.coords.latitude),longitude:parseFloat(position.coords.longitude),latitudeDelta:0.01,longitudeDelta:0.01})
                   
                riderUpdateLocation()
              
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
                setlong(currentLongitude);
                saveToStorage("CurrenLat",currentLatitude)
                //Setting Latitude state
                setlat(currentLatitude);
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
          async function riderUpdateLocation(){
            // const interval = setInterval(() => {
              riderUpdateLocation1()
            //   console.log('Logs every minute');
            // }, 30000);
          
            // return () => clearInterval(interval);
      
             
            }
      
            async function riderUpdateLocation1(){
             
                console.log("in the function")
                var id = await getItemFromStorage("RiderId")
                console.log(id)
                var lat = await getItemFromStorage("CurrentLat")
                var lon = await getItemFromStorage("CurrentLon")
                   var request = {
                      "rider_id":id,
                      "lat": parseFloat(lat),
                      "lon":parseFloat(lon),
                      "online_status":"1",
                      "goto_home_status":"0"
                  }
                    dispatch({type:'RIDER_UPDATE_LOCATION',payload:request})
                   // alert("Location is updating..")
                    
              }


      async function Ridergoinghome() {
        //navigate("RiderGoToHome")
          var img = await getItemFromStorage("loginImage")
          saveToStorage("isRNCameraMessage","");
          if(img=="true" && lat!="" && long!=""){
           // navigate("RiderGoToHome")
            navigation.navigate('RiderGoingHome', { lat: lat, lon:long })
        }
            
             
              }


              async function riderinfo(id){
                alert(id)
                var request={
                  "rider_id":id
                }
                dispatch({ type:'GET_RIDER_DETAILS', payload: request })
                    
            

               
              //   fetch(
              //     "https://www.tallo.in/was/rider_info",
              //     {
              //       method: "POST",
              //       headers: {
              //         Accept: "application/json",
              //         "Content-Type": "application/json",
              //       },
              //       body: JSON.stringify({
              //         "rider_id":id
              //         // "lat": lat,
              //         // "lon": long,
              //         // "online_status":"0",
              //         // "goto_home_status":"0"
              //     })
              //     }
              //   )
              //     .then(function(response) {
              //       return response.json();
              //     })
              //     .then(data => {
              //        console.log("data++++++++++",data);
              //     //    if (data["statusCode"] == "SUCCESS") {
              //     //     saveToStorage("riderScreenStatus","Offline");
              //     //     riderinfo(id)
            
                           
              //     //  }
              //  });    
              }
        
             async function offlineClicked(){
                var id = await getItemFromStorage("RiderId")

                fetch(
                  "https://www.tallo.in/was/rider_location_update",
                  {
                    method: "POST",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      "rider_id":id,
                      "lat": lat,
                      "lon": long,
                      "online_status":"0",
                      "goto_home_status":"0"
                  })
                  }
                )
                  .then(function(response) {
                    return response.json();
                  })
                  .then(data => {
                     console.log("Address++++++++++",data);
                     if (data["statusCode"] == "SUCCESS") {
                      saveToStorage("riderScreenStatus","Offline");
                      if( data.rider_info.login_image!=""){
                        saveToStorage("loginImage","false")
                       }else{
                        saveToStorage("loginImage","false")
                        navigate('Dashboard')
                       }
                           
                   }
               });    

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
      
              }

    return (
       
        <View style={styles.container}>
             <MapView
            style={{ flex: 1 }}
            zoomEnabled={true}
                region={region}
      onRegionChangeComplete={region => setRegion(region)}
  >
      
     
     <MapView.Marker key={`coordinate_1`} coordinate={origin} />
      
  </MapView>

  <Card style={{ backgroundColor: 'white', top: 0 ,position:'absolute',width:'100%'}}>
           


           <View style={{marginTop:5,justifyContent:'center',alignItems:'center', marginBottom: 10}}>
                           <Image style={{ width: 127, height: 27 }} source={require('../../assets/Images/MadeInIndia.png')} />
                               </View>
           
                           <View style={{ backgroundColor: '#ffe6e6', height: 50, borderWidth: 0, marginBottom: 3, borderRadius: 15, flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                               
                               
                           <TouchableOpacity onPress={()=>offlineClicked()}> 
                           <Image style={{ width: 30, height: 25 }} source={require('../../assets/Images/Online2.png')} />
                               </TouchableOpacity>
           
                              
                               <View style={{borderWidth:1,borderRadius:1,borderColor:'white',backgroundColor:'green'}}>
                               <Image style={{ width: 30, height: 25 }} source={require('../../assets/Images/Online.png')} />
                               </View>
           
                               <TouchableOpacity onPress={Ridergoinghome}> 
                               <Image style={{ width: 40, height:30 }} source={require('../../assets/Images/GoTo1.png')} />
                               </TouchableOpacity>
                           </View>
           
                           <View style={{  marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between', padding: 1 }}>
                           <Text style={{ fontSize: 13, color: '#000000', fontWeight: 'bold' ,marginLeft: 9,}}>{lang.offline[LangId]}</Text>
                           <Text style={{ fontSize: 13, color: 'green', fontWeight: 'bold',marginLeft: 0 ,marginRight: 8 }}>{lang.online[LangId]}</Text>
                         
                           <View style={{  marginBottom: 0, flexDirection: 'column', padding: 1 ,marginRight: 10}}>
               <Text style={{ fontSize: 13, color: '#000000', fontWeight: 'bold' ,marginRight: 0 }}>{lang.go_to[LangId]}</Text>
               <Text style={{ fontSize: 13, color: '#000000', fontWeight: 'bold' ,marginLeft: 0}}>{lang.home[LangId]}</Text>
           </View>
               </View>
           
               {
               IsShown==true ?
           <View style={{alignItems: 'center',justifyContent: 'center'}}>
             
              
             <Text style={{ fontSize: 13, color: 'green', fontWeight: 'bold' }}>{lang.you_are_now_online[LangId]}</Text>
               
               <Text style={{ fontSize: 13, color: 'grey', fontWeight: 'bold' }}>{lang.your_photo_uploaded_successfully_please[LangId]}</Text>
               <Text style={{ fontSize: 13, color: 'grey', fontWeight: 'bold' }}>{lang.wait_sometime_for_until_responses_from[LangId]}</Text>
               <Text style={{ fontSize: 13, color: 'grey', fontWeight: 'bold',marginBottom: 11 }}>{lang.our_team[LangId]}</Text> 
              
              
           
                       </View>: null
                      }
           
           
           
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
        fontSize: 16, fontWeight: 'bold'
    },
    loginBtn: {
        flex: 1,
        borderRadius: 5,
        height: 35,
        width: 1,
        marginLeft: 15,
        marginRight: 10,
        alignItems: "center",
        justifyContent: "center",
        textAlign: 'center',
        backgroundColor: "#F87300",
        marginTop: 0,
        marginBottom: 30,
        width: 10,
    },
    loginBtnn: {
        width: 150,
        borderRadius: 5,
        borderColor: "#ff8000",
        borderWidth: 2,
        height: 35,
        marginLeft: 10,
        marginRight: 1,
        alignItems: "center",
        justifyContent: "center",
        textAlign: 'center',
        marginTop: 2,
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
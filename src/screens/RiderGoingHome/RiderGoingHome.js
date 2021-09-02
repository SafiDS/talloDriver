import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View, ToastAndroid,
    Image, Modal,
    TextInput,
    TouchableOpacity,
    Switch
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card, IconButton, Colors, Button } from 'react-native-paper';
import { navigate, navigateScreen } from '../../Tools/NavigationServices'
import MapView from "react-native-maps";
import { getItemFromStorage,saveToStorage} from "../../utils/AccessStorage";
import { useDispatch } from "react-redux";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import DropDownPicker from 'react-native-dropdown-picker';
import lang from '../../language/lang_values'




export default function RiderGoingHome({ route,navigation }) {

    const dispatch = useDispatch();
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
    const [loading, setloading] = useState(false);
    const [lat, setlat] = useState("");
    const [long, setlong] = useState("");
    const [message, setMessage] = useState("")
    const [Address, setAddress] = useState([])
    const [rideAddress, setrideAddress] = useState("")
    const [refreshPage1, setRefreshPage1] = useState("");
    const [LangId, setLangId] = useState("")
    // const [isPlusPressed, setisPlusPressed] = useState(false)
    var isPlusPressed = false

    const GOOGLE_MAPS_APIKEY = 'AIzaSyB79IrJjGiy5oFOtgfTltYJk5rUVdp63vA';

    React.useEffect(() => {
   
        var lat = route.params.lat
        var lon = route.params.lon

        console.log(lat , lon)
    
       setlat(parseFloat(lat))
       setlong(parseFloat(lon))
    
        setMark({latitude:parseFloat(lat),longitude:parseFloat(lon)})
        setorigin({latitude:parseFloat(lat),longitude:parseFloat(lon)})
        
        setRegion({latitude:parseFloat(lat),longitude:parseFloat(lon),latitudeDelta:0.01,longitudeDelta:0.01})
       
        //alert("Useeffect")
       Addresses()
       setloading(true)
       const unsubscribe  = navigation.addListener("focus", () =>
       refreshPage()
     );
     return () => {
       // clean up event listener
       unsubscribe
     }
        
        }, []);


      async function refreshPage(){
        const lanid = await getItemFromStorage('LangId')
        if (!lanid) { }
        else { setLangId(lanid) }
            //alert("refresh")
             Addresses()
             setloading(true)
            //setRefreshPage1("refresh");
        }


        async function Addresses(){
           // refreshPage()
           const lanid = await getItemFromStorage('LangId')
           if (!lanid) { }
           else { setLangId(lanid) }
           setloading(true)
            var id = await getItemFromStorage("RiderId")
            //alert(id) 
            var request = {"rider_id":id}

            fetch(
                "https://www.tallo.in/was/rider_addresses",
                {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    "rider_id":id
                  })
                }
              )
                .then(function(response) {
                  return response.json();
                })
                .then(data => {
                   console.log("Address++++++++++",data);
                   if (data["statusCode"] == "SUCCESS") {
                    var count = data.rider_addresses.length;
                    // //alert(count);
                    let drop_down_data = []
                    for (var i = 0; i < count; i++) {
                        console.log("In loopp",data.rider_addresses[i].address) // I need to add
                        drop_down_data.push({
                        label: data.rider_addresses[i].address,
                        value: data.rider_addresses[i].lat+'+'+data.rider_addresses[i].lon
                      }); // Create your array of data
                     }
                    
                        setAddress(Address=>[...Address,drop_down_data])
                        setloading(false) 
                        if(isPlusPressed){
                          //setisPlusPressed(false)
                          isPlusPressed = false;
                          
                          navigate('RiderGoingHome', { lat: route.params.lat, lon:route.params.lon })
                          // alert(route.params.lat)
                      }    
                      //Addresses()       
                 }
             });    
            


            // dispatch({ type:'RIDER_ADDRESSES',payload:request})

            // const address = await getItemFromStorage("RiderAddress")
            // let b1 = JSON.parse(address)
            // console.log("B1++++",b1.rider_addresses)

            //  var count = b1.rider_addresses.length;
            // //alert(count);
            // let drop_down_data = []
            // for (var i = 0; i < count; i++) {
            //     console.log("In loopp",b1.rider_addresses[i].address) // I need to add
            //     drop_down_data.push({
            //     label: b1.rider_addresses[i].address,
            //     value: b1.rider_addresses[i].lat+'+'+b1.rider_addresses[i].lon
            //   }); // Create your array of data
            //  }
            
            //     setAddress(Address=>[...Address,drop_down_data])
            //     setloading(false)

            
        
        }


    async function addAddress(){
        var id = await getItemFromStorage("RiderId")
        //alert(id) 
        if(message==""){
            ToastAndroid.showWithGravity("Please enter the home address",ToastAndroid.LONG, ToastAndroid.CENTER);
        }else{

          fetch(
            "https://www.tallo.in/was/rider_address_add",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                "rider_id":id,
                "address_name":"Office Address",
                "lat": lat,
                "lon": long,
                "address":rideAddress,
              })
            }
          )
            .then(function(response) {
              return response.json();
            })
            .then(data => {
               console.log("In fetch++++++++++",data);
               if (data["statusCode"] == "SUCCESS") {
                 //setisPlusPressed(true)
                isPlusPressed = true
                  Addresses()       
             }
               });    
        }
    }

    function getAddress(item,value){
        console.log("dropdown address-------------",item)
        setMessage(item)
        var selectedItems11 = value.toString();
        var res = selectedItems11.split("+");
        console.log("dropdown address-------------",res[0])        
        console.log("dropdown address-------------",res[1])
        setlat(parseFloat(res[0]))
        setlong(parseFloat(res[1]))
        Addresses()
        setloading(true)
    }

   
      


      async function gotoHome(){
        var id = await getItemFromStorage("RiderId")
        //alert(id)
       // console.log(id)
            if(message==""){
                ToastAndroid.showWithGravity("Please enter the home address",ToastAndroid.LONG, ToastAndroid.CENTER);
            }else{
                var request = {
                    "rider_id":id,
                    "lat": lat,
                    "lon": long,
                    "online_status":"0",
                    "goto_home_status":"1"
                }
                  dispatch({type:'RIDER_UPDATE_LOCATION',payload:request})
                saveToStorage("isRNCameraMessage","");
                navigate('RiderStatusOnline1')
            }

           
        }

    return (
       
        <View style={styles.container}>
             <MapView
style={{ flex: 1 }}
 zoomEnabled={true}
    region={region}
      onRegionChangeComplete={region => setRegion(region)}
  >
      {console.log(destination)}
     
     <MapView.Marker key={`coordinate_1`} coordinate={origin} />
      
  </MapView>
            {/* <View style={{ flex: 1, textAlign: 'center', margin: 20, justifyContent: 'space-between', marginBottom: 20 }}> */}

         
            <View style={styles.SectionStyle}>
<GooglePlacesAutocomplete
  // ref={ref}
      placeholder={lang.Enter_Home_Address[LangId]}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data.description);
       setrideAddress(data.description)
       setMessage(data.description)
       setlat(details.geometry.location.lat)
       setlong(details.geometry.location.lng)
       setorigin({latitude:details.geometry.location.lat,longitude:details.geometry.location.lng})
        
       setRegion({latitude:details.geometry.location.lat,longitude:details.geometry.location.lng,latitudeDelta:0.01,longitudeDelta:0.01})
      // setSource(data.description)
        //console.log(JSON.stringify(details.geometry.location));
      }}
      fetchDetails={true}
      query={{
        key: 'AIzaSyB79IrJjGiy5oFOtgfTltYJk5rUVdp63vA',
        language: 'en',
      }}
     renderLeftButton={()  => <Image style={{marginLeft:15, width: 17, height: 15,  marginTop:15, marginBottom:0 }} source={require('../../assets/Images/locations.png')} />}
     renderRightButton={() =>   <TouchableOpacity onPress={addAddress} >
<Image style={{marginLeft:0, width: 15, height: 15,  marginTop:15, marginBottom:0,marginRight:20  }} source={require('../../assets/Images/plus.png')} />
</TouchableOpacity>}
    />
    </View>

        {Address.length > 0 ?
        //   {console.log("In View++++++", Address[0])}
           Address[0].length > 0 ?
           <View style={{position:'absolute',top:100,minHeight: 50,width:"97%"}}>
            <DropDownPicker
               items={Address[0]}
              // defaultValue={Vehicle}
               containerStyle={{height: 41}}
               placeholder="Select Address*"
               style={{backgroundColor: '#fff',marginLeft:15,marginRight:9,borderColor:'#d9d9d9'}}
               placeholderStyle={{color: '#d9d9d9',fontSize:16}}
               itemStyle={{
                 justifyContent: 'flex-start',
               }}
               dropDownStyle={{backgroundColor: '#fff'}}
               onChangeItem={item=>getAddress( item.label,item.value) }
              />
              </View>
          :
         null
         : 
         null}
        
             
        
        


               
                    <Card.Content style={{ marginLeft:10,position:'absolute',bottom:30,height:50,width:'95%',backgroundColor:'#ffff' }}>
      

<TouchableOpacity style={styles.loginBtn}  onPress={gotoHome} >
                {/* <Text style={styles.buttontext}>Confirm to Home</Text> */}
                {/* {console.log("************************"+JSON.stringify(lang))} */}
                {/* var lannn ='hindi'; */}
                {/* {var lann = 1;} */}
                <Text style={styles.buttontext}>{lang.confirm_to_home[LangId]}</Text>
            </TouchableOpacity>

                    </Card.Content>
              

            {/* </View> */}

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
        borderRadius: 10,
        height: "55%",
        marginLeft: 3,
        marginRight: 0,
        alignItems: "center",
        justifyContent: "center",
        textAlign: 'center',
        marginTop: 10,
        backgroundColor: "#F87300",
        marginBottom:10,
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
    SectionStyle: {
        position:'absolute',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: 'white',
      
        borderRadius: 5,
        top:10,
        //marginTop:55,
        margin: 1,
        marginLeft: 20,
        marginRight: 20,
        shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
              },
});
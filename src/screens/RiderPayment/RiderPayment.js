import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
    Image,
    KeyboardAvoidingView,
     ScrollView,
     StatusBar
} from "react-native";
import { themes } from '../../utils'
import { useDispatch,useSelector } from 'react-redux'
import { Button, Popup, Input } from '../../components'
// import Gender from "../../components/Gender";
import Appicon from "../../components/Appicon";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { navigate, navigateScreen } from '../../Tools/NavigationServices'

export default function RiderPayment({ navigation }) {
    const users1 = useSelector((state) => state.SignIn.bookingInfo);
    console.log("booking_info+++",users1)    
    const [total_price,setTotalPrice] = useState("")
    const [ride_price,setRidePrice] = useState("")
    const [tax,settax] = useState("")

    const [pickupLocation, setpickupLocation] = useState("");
    const [dropLocation, setdropLocation] = useState("");

    React.useEffect(() => {
        setTotalPrice(users1.total_price)
        setRidePrice(users1.ride_price)
        settax(users1.tax)
        setpickupLocation(users1.source)
        setdropLocation(users1.destination)
          // console.log(origin)
    
         
          }, []);

    const refer  = "Refer your friend and earn rs 1000 for each"

    StatusBar.setHidden(true);

    function Signin() {
        

        dispatch({ type: 'LOGIN_REQUEST', payload: mobile })
    }

    return (
        <ScrollView>
        <View style={styles.container}>
        <View style={{ marginBottom: 0, padding: 7, margin: 1 }}>
         <View style={{ marginLeft: 1, flexDirection: 'column', }}>

       

     <View style ={{flexDirection:'column' , backgroundColor:"#F87300",marginBottom:20 }}>

        <View style = {{ margin:1 , marginRight:0,flexDirection: 'row',justifyContent: 'space-around', marginTop: 10}}>

        <View style = {{ margin:1 , marginRight:0,flexDirection: 'row',justifyContent: 'space-around', marginTop: 10}}>
        {/* <Image style={{ width: 10, height: 10, alignSelf: 'center' }} source={require('../../assets/Images/Block.png')} /> */}
        <Text style = {{marginRight:0 , fontSize:16, color:'white',marginLeft:0}}>Payment</Text>
        </View>

        <Image style={{ width: 100, height: 40}} source={require('../../assets/icons/tallo-logo-main.png')} />
      </View>



        <View style = {{ margin:1 , marginRight:0,flexDirection: 'row', marginTop: 30,marginLeft:10,marginBottom: 20}}>
        <Image style={{ width: 45, height: 45, alignSelf: 'center',marginRight:10 }} source={require('../../assets/Images/Scooty.png')} />
            <View style = {{ margin:1 , marginRight:0,flexDirection: 'column',justifyContent: 'space-around',marginLeft:30}}>
            <Text style = {{ fontSize:14 , color:'white'}}>DRP3462375FGH</Text>
            <Text style = {{ fontSize:16, color:'white',fontWeight:'bold',marginLeft:0}}>Dropped</Text>
            </View>
       </View>

 </View>




<View style={{ flexDirection: 'column', padding: 1, marginStart: 1 }}>    
<Text style={{ fontWeight: 'normal',color: 'grey', fontSize: 11, marginStart: 1, marginTop: 10 }}>Picked at 23 Feb 2021 at 4:45 PM</Text>
<Text style={{ fontWeight: 'bold', fontSize: 14, marginStart: 1,marginTop: 7 }}>{pickupLocation}</Text>             
<Text style={{ fontWeight: 'normal',color: 'grey', fontSize: 11, marginStart: 1, marginTop: 10 }}>Droped at  23 Feb 2021 at 5:30 PM</Text>
<Text style={{ fontWeight: 'bold', fontSize: 14, marginStart: 1 ,marginTop: 7}}>{dropLocation}</Text>
</View>
  

<View style={{flexDirection: 'row', justifyContent: 'space-between',marginTop: 10}}>
<Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 14 , marginTop:6}}>Your trip</Text>
<Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 14 , marginTop:6}}>{ride_price}</Text>
</View>

<View style={{flexDirection: 'row', justifyContent: 'space-between',marginTop: 10}}>
<Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 14 , marginTop:6}}>Rounded off</Text>
<Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 14 , marginTop:6}}>0.38</Text>
</View>




<View style={{flexDirection: 'row',justifyContent: 'space-between',marginTop: 20}}>
<View style={{flexDirection: 'column'}}>
<Text style = {{ fontSize:15  , color:'black' ,fontWeight: 'bold', marginTop:6}}>Total Bill</Text>
<Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 14 , marginTop:6}}>Includes {tax} Taxes</Text>
</View>
<Text style = {{ fontSize:15  , color:'black' ,fontWeight: 'bold', marginTop:6}}>{total_price}</Text>
</View>






<View style={{alignItems: 'center',marginTop: 40,flexDirection: 'row'}}>
<TouchableOpacity style={[styles.loginBtnnn]} >
    
    <View style={{flexDirection: 'row'}}>
    <Image style={{ width: 25, height: 25, }} source={require('../../assets/Images/whatsapp.png')} />
    <Text style={{color:'#ff8000',marginLeft: 10,marginTop: 4,fontWeight: 'bold'}}> Share to Whatsapp</Text>
</View>
            </TouchableOpacity>
            </View>





     <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 250 }}>
                    <TouchableOpacity style={styles.loginBtn} onPress={() => navigate('Earning')}> 
                        <Text style={styles.buttontext}>Email Invoice</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.loginBtnn}>
                        <Text style={styles.buttontextt}>Help</Text>
                    </TouchableOpacity>
                </View>
         </View>
     </View> 
     </View>

        </ScrollView>     
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        
        // justifyContent: "center",
    },
    logintext: {
        marginTop:0,
        // padding: 3,
        marginLeft: 0,
        color: '#000000',
        // fontSize: 18,
        // alignItems:'stretch',
        // alignContent:'stretch',
        justifyContent:'space-between'
      },
      imageAvater:{
        paddingVertical: 30,
        padding:30,
        width: 100,
       
        height: 100,
        // flexDirection:'row',
        borderRadius: 150/2,
        // marginLeft:40,
        backgroundColor:'#fff',
        borderWidth:1,
        // borderStyle: 'dashed',
   
       },
       uploadImageBtn: {
        borderRadius: 5,
        height: 35,
        alignItems: "center",
        justifyContent: "center",
        textAlign: 'center',
        marginTop:30
      },
    loginBtnn: {
        width: 180,
        borderRadius: 5,
        borderColor: "#ff8000",
        borderWidth: 2,
        height: 35,
        marginLeft: 15,
        marginRight: 1,
        alignItems: "center",
        justifyContent: "center",
        textAlign: 'center',
        marginTop: 10,
        backgroundColor: "#fff",
        color: "#000000",
        marginBottom: "10%"
    },
    loginBtnnn: {
        width: 360,
        borderRadius: 5,
        borderColor: "#ff8000",
        borderWidth: 2,
        height: 35,
        marginLeft: 1,
        marginRight: 1,
        alignItems: "center",
        justifyContent: "center",
        textAlign: 'center',
        marginTop: 10,
        backgroundColor: "#fff",
        color: "#000000",
        marginBottom: "10%"
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
      buttontext: {
        color: '#fff',
        fontSize: 16, fontWeight: 'bold'
      },
      buttontextt: {
        color: '#000000',
        fontSize: 16, fontWeight: 'bold'
    },

});
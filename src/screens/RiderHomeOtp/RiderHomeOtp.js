import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View, Dimensions,
    Modal,
    TextInput,
    Button,
    TouchableOpacity,
    Alert,
    StatusBar,BackHandler,
    Image
} from "react-native";
import { getStoreValue } from '../../Tools/StoreHandler'
import { useDispatch } from 'react-redux'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { getItemFromStorage } from "../../utils/AccessStorage";
import { ScrollView } from "react-native-gesture-handler";
import { navigate, navigateScreen } from '../../Tools/NavigationServices'
import { set } from "react-native-reanimated";
import Appicon from "../../components/Appicon";
import lang from '../../language/lang_values'



export default function RiderHomeOtp({ navigation }) {
    const dispatch = useDispatch();
   
    const [rider_id, setRiderId] = useState("");
    const [booking_id, setBookingId] = useState("");
    const [otp, setOtp] = useState("");
    const [LangId, setLangId] = useState("")

    StatusBar.setHidden(true);
    
    React.useEffect(() => {
    
    
        // Create an scoped async function in the hook
        async function anyNameFunction() {
            const lanid = await getItemFromStorage('LangId')
            if (!lanid) { }
            else { setLangId(lanid) }
          const booking_id = await getItemFromStorage('Booking_Id')
          const rider_id = await getItemFromStorage('RiderId')
            if(booking_id!=null){
              setBookingId(booking_id)
              setRiderId(rider_id)
            }

           
         }
        anyNameFunction();
       
       
    //   BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    //   return () => {
    //     // clean up event listener
    //       BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    //   }
    
        // Execute the created function directly
       }, []);

    //    function handleBackButtonClick() {
    //     return true;
    //   }
    
    function confirmOtp() {
  // debugger
        var request = {
            "booking_id":booking_id,
            "rider_id":rider_id,
            "navigation": navigation,
            "booking_otp": otp["otp"]
        }

        dispatch({ type: 'BOOKING_OTP_VERIFY', payload: request })
    }

    return (
          
        <View style={styles.container}>
                      <Image style={{ marginTop:18 , marginBottom:1, width: 32, height: 30,marginLeft:7 }} source={require('../../assets/Images/BackButton.png')} />

                      <View style={ styles.otpcontainer}>

      <Text style = {{alignSelf:'center' , marginTop:0 ,fontWeight: 'bold', marginBottom:30,marginLeft:17,fontSize:20 }}>{lang.enter_6_digit_verification_code[LangId]} </Text>
            <View style={styles.SectionStyle}>
                <OTPInputView
                    codeInputFieldStyle={styles.OTPInputView}
                    codeInputHighlightStyle={styles.underlineStyleHighLighted}
                    style={styles.TextInput}
                    pinCount={6}
                    onCodeChanged={otp => { setOtp({ otp }) }}
                    onCodeFilled={(otp => {
                        { setOtp({ otp }) }
                    })
                    }
                   
                />
            </View>

            </View>
            <TouchableOpacity style={styles.loginBtn} 
            //onPress={() => navigate('RiderOngoingRide')} 
            onPress={confirmOtp}
            >
                <Text style={styles.buttontext}>{lang.verify[LangId]}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        // alignItems: "center",
        // justifyContent: "center",
        marginBottom:0,
        marginTop:0
    },
    logintext: {
        fontSize: 20,
        fontWeight: 'bold',
        // fontWeight:'800',
        color:"white",
        marginTop:30,
      alignSelf:'center'
    
    },
    buttontext: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold'
    },
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        
        // backgroundColor: '#fff',

        marginTop: 5,
        // marginLeft: 25,
        marginRight: 60,
        height: 50,
        marginLeft:60
    },
    underlineStyleHighLighted: {
        borderColor: "blue",
        // color:'red',
        fontWeight: "800",
        backgroundColor: "white"

    },
    TextInput: {
        flex: 1,
        paddingLeft: 10,
        // borderWidth: 20,
        // borderBottomWidth: 1,
    },
    loginBtn: {
        width: "65%",
        borderRadius: 5,
        height: 35,
        marginLeft: 60,
        marginRight: 10,
        alignItems: "center",
        justifyContent: "center",
        textAlign: 'center',
        marginTop: 260,
        backgroundColor: "#F67321",
        color:"#000000",
        marginBottom:"10%"
    },
    OTPInputView: {
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderColor: "#D3D3D3",
        color: "#0D0A36",
        backgroundColor: "white",
        fontWeight: "bold",
        height:40,
        marginLeft:0,
        width:40
    },

    bottombuttonView: {
        color: '#0D0A36',
        fontSize: 16,
        marginBottom:12
        // fontWeight: 'bold'
    },
     otpcontainer:{
      width: "90%",
    //   backgroundColor: '#fff',
      flexDirection: 'column' , 
      height:"45%"  ,
      borderRadius:15, 
      justifyContent:'center', 
      alignContent:"center" ,
      marginBottom:"2%" , 
      marginTop:"1%" , 
    //   marginLeft:"5%" ,
    //   marginRight:"5%"
     }

});
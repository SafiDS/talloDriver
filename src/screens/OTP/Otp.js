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
    Image
} from "react-native";
import { getStoreValue } from '../../Tools/StoreHandler'
import { useDispatch } from 'react-redux'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { ScrollView } from "react-native-gesture-handler";
import { navigate, navigateScreen } from '../../Tools/NavigationServices'
import { set } from "react-native-reanimated";
import Appicon from "../../components/Appicon";
import {themes} from '../../utils';


export default function OtpNew({ navigation }) {
    const dispatch = useDispatch();
    const getLogin = getStoreValue('SignIn');
    const [modalVisible, setModalVisible] = useState(false);
    const getPhoneNumber = getLogin["Login"]["phone"];
    // const getOtp = getLogin["Login"]["login_otp"];
    const [mobile, setMobile] = useState(getPhoneNumber);
    const [otp, setOtp] = useState("");
    const [timerCount, setTimer] = useState(30)


   React.useEffect(() => {
        let interval = setInterval(() => {
          setTimer(lastTimerCount => {
              lastTimerCount <= 1 && clearInterval(interval)
              return lastTimerCount - 1
          })
        }, 1000) //each count lasts for a second
        //cleanup the interval on complete
        return () => clearInterval(interval)
      }, []);


    const resendOtp = () => {
        dispatch({ type: 'LOGIN_REQUEST', payload: mobile })
        navigateScreen(navigation, 'LoginScreen')
    }

    function changePhoneNumer() {
        //  mobile = "",
        // setMobile(mobile = "")

        navigateScreen(navigation, 'LoginScreen')

    }
    function confirmOtp() {




        // debugger
        var request = {
            "phone": mobile,
            "navigation": navigation,
            "otp": otp["otp"]
        }

        // navigateScreen(navigation, 'SignUpScreen')
        dispatch({ type: 'USER_LOGIN_OTP_VERIFY', payload: request })
    }

    return (

        <View style={styles.container}>



            <View style={{ marginTop: 0 , marginBottom:0 }}>

            <View style = {{ marginTop:5 ,marginBottom:0, alignContent:'center' , alignItems:'center' , justifyContent:'center' }}>
            <Appicon icon={require("../../assets/icons/tallologo.png")}/>
            </View>
                <Text style={[styles.logintext, { color: 'white' }]}> One Time Password </Text>


            </View>
            <View style={ styles.otpcontainer}>
      <Text style = {{alignSelf:'center' , marginTop:50,fontFamily: themes.fontFamily.Normal}}>Enter OTP Sent to +{mobile}({timerCount}secs)</Text>
            <View style={styles.SectionStyle}>
                <OTPInputView

                    // autoFocusOnLoad={true}
                    codeInputFieldStyle={styles.OTPInputView}
                    codeInputHighlightStyle={styles.underlineStyleHighLighted}
                    style={styles.TextInput}
                    pinCount={6}
                    // code={getOtp} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                    onCodeChanged={otp => { setOtp({ otp }) }}
                    onCodeFilled={(otp => {
                        { setOtp({ otp }) }
                    })
                    }


                />



            </View>
            <Text style = {{fontFamily: themes.fontFamily.Normal,alignSelf:'center' ,fontWeight:'bold', marginTop:30 ,marginBottom:30}} onPress={resendOtp.bind(this)}>Resend OTP</Text>
            {/* <TouchableOpacity style={{ ...styles.loginBtn, backgroundColor: 'white', marginLeft: 50, marginTop: 40 }} onPress={resendOtp.bind(this)} >
                    <Text style={styles.bottombuttonView}>Resend code</Text>
                </TouchableOpacity> */}
            </View>
            <TouchableOpacity style={styles.loginBtn}
              onPress={confirmOtp.bind(this)}
            // onPress={()=>navigate('CustomerSignUpScreen')}
             >
                <Text style={styles.buttontext}>Confirm</Text>
            </TouchableOpacity>
            <View style={{position: 'absolute', bottom: 2,left:10}}>
            <Image style={{ width: 162, height: 35,marginLeft:2 }} source={require('../../assets/Images/MadeInIndia.png')} />
</View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F87300",
        // alignItems: "center",
        // justifyContent: "center",
        marginBottom:0,
        marginTop:0
    },
    logintext: {
        fontSize: 20,
        // fontWeight:'800',
        color:"white",
        marginTop:30,
      alignSelf:'center',
        fontFamily: themes.fontFamily.Bold,

    },
    buttontext: {
        color: '#F67321',
        fontSize: 17,
        fontFamily: themes.fontFamily.Bold,
    },
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#fff',

        marginTop: 50,
        // marginLeft: 25,
        marginRight: 8,
        height: 50,
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
        fontFamily: themes.fontFamily.Bold,
        // borderWidth: 20,
        // borderBottomWidth: 1,
    },
    loginBtn: {
        width: "70%",
        borderRadius: 5,
        height: 40,
        marginLeft: 60,
        marginRight: 10,
        alignItems: "center",
        justifyContent: "center",
        textAlign: 'center',
        marginTop: 30,
        backgroundColor: "white",
        color:"#000000",
    },
    OTPInputView: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderColor: "gray",
        color: "#0D0A36",
        backgroundColor: "#F67321",
        fontWeight: "bold",
        height:75
    },

    bottombuttonView: {
        color: '#0D0A36',
        fontSize: 16,
        marginBottom:12
        // fontWeight: 'bold'
    },
     otpcontainer:{
      width: "90%",
      backgroundColor: '#fff',
      flexDirection: 'column' ,
      height:"40%"  ,
      borderRadius:15,
      justifyContent:'center',
      alignContent:"center" ,
      marginBottom:"2%" ,
      marginTop:"5%" ,
      marginLeft:"5%" ,
      marginRight:"5%"
     }

});

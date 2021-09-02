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
import { useDispatch } from 'react-redux'
import { Button, Popup, Input } from '../../components'
// import Gender from "../../components/Gender";
import Appicon from "../../components/Appicon";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { navigate, navigateScreen } from '../../Tools/NavigationServices';


export default function RiderRideComplete({ navigation }) {
    const dispatch = useDispatch()
    const [mobile, setMobile] = useState("");
    const [check, setCheck] = useState(false);

    const refer  = "Refer your friend and earn rs 1000 for each"

    StatusBar.setHidden(true);

    function Signin() {
        

        dispatch({ type: 'LOGIN_REQUEST', payload: mobile })
    }

    return (
        <ScrollView>
        <View style={styles.container}>
        <View style={{ marginBottom: 0, padding: 70, margin: 1 }}>
         <View style={{  justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ width: 60, height: 60 }} source={require('../../assets/Images/Scooty.png')} />

<Text style={{ fontSize: 20, alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', marginBottom: 25,marginTop: 30 }}>Destination Arrived</Text>
<View style={{  borderRadius: 15, borderWidth: 2.5, borderColor: '#ff8000',  marginBottom: 60, width: 150, height: 100 }}>

<Text style={{ fontSize: 25, fontWeight: 'bold',marginTop: 20,marginLeft: 25 }}>$152.00</Text>

<Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 13 ,marginLeft: 25}}> Cash Mode</Text>

</View>


<TouchableOpacity style={styles.loginBtn} 
// onPress={() => navigate('SuccessScreen')}
            onPress={() => navigate('RiderPayment')}    >
                    <Text style={styles.buttontext}>Collect Cash</Text>
                </TouchableOpacity>
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
    loginBtn: {
        borderRadius: 5,
        height: "7%",
        width:"100%",
        marginLeft: 30,
        marginRight: 0,
        alignItems: "center",
        justifyContent: "center",
        textAlign: 'center',
        marginTop: 40,
        backgroundColor: "#F87300",
        marginBottom:"100%"
      },
      buttontext: {
        color: '#fff',
        fontSize: 16, fontWeight: 'bold'
      },

});
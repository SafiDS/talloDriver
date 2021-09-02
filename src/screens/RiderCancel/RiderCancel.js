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

export default function RiderCancel({ navigation }) {
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
         <View style={{ marginLeft: 15, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ width: 60, height: 60, alignSelf: 'center' }} source={require('../../assets/Images/Block.png')} />

             <Text style={{ fontSize: 20, alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', marginBottom: 25,marginTop: 30,color: '#ff1a1a' }}>You are Blocked</Text>

             {/* <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 13 }}>Congratulation you have earned</Text> */}
             <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 13, marginBottom: 0, alignItems: 'center', justifyContent: 'center', }}>Your account has been blocked</Text>

             <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 13, marginBottom: 0, alignItems: 'center', justifyContent: 'center', }}>for next 3 days. You have reached</Text>

             <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 13, marginBottom: 0, alignItems: 'center', justifyContent: 'center', }}>the ride cancellation limit</Text>


             <Text style={{ fontSize: 14.5, alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', marginBottom: 25,marginTop: 30 }}>You can cancel only 3 rides per day</Text>


             <TouchableOpacity style={styles.loginBtn}
             >
                 <Text style={styles.buttontext}>Continue</Text>
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
        borderRadius: 8,
        height: "8%",
        width:"100%",
        marginLeft: 30,
        marginRight: 0,
        alignItems: "center",
        justifyContent: "center",
        textAlign: 'center',
        marginTop: 20,
        backgroundColor: "#F87300",
        marginBottom:"90%"
      },
      buttontext: {
        color: '#fff',
        fontSize: 16, fontWeight: 'bold'
      },

});
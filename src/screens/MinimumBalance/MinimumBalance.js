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

export default function MinimumBalance({ navigation }) {
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
                        <Image style={{ width: 60, height: 60, alignSelf: 'center' }} source={require('../../assets/Images/MinimumBalance.png')} />

             <Text style={{ fontSize: 17, alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', marginBottom: 25,marginTop: 20,color: '#ffbf00' }}>Reached Minimum Balance</Text>

             {/* <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 13 }}>Congratulation you have earned</Text> */}
             <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 15, marginBottom: 0, alignItems: 'center', justifyContent: 'center', }}>You have reached minimum</Text>

             <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 14, marginBottom: 0, alignItems: 'center', justifyContent: 'center', }}>balance of 100 rupees. Your account</Text>

             <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 15, marginBottom: 0, alignItems: 'center', justifyContent: 'center', }}>will blocked</Text>

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
        borderRadius: 5,
        height: "8%",
        width:"100%",
        marginLeft: 30,
        marginRight: 0,
        alignItems: "center",
        justifyContent: "center",
        textAlign: 'center',
        marginTop: 40,
        backgroundColor: "#F87300",
        marginBottom:"90%"
      },
      buttontext: {
        color: '#fff',
        fontSize: 16, fontWeight: 'bold'
      },

});
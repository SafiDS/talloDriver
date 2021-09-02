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

export default function RiderRideRating({ navigation }) {
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
        <View style={{ marginBottom: 0, padding: 7, margin: 1 }}>
         <View style={{ marginLeft: 1, flexDirection: 'column',  }}>

         <View style={{ flexDirection: 'row', marginStart: 1 , justifyContent:'space-between',marginTop: 5 }}>
         <Text style={{ fontSize: 21,  fontWeight: 'bold', marginBottom: 0,marginTop: 0, marginStart: 0 }}>Rate Customer</Text>
         <Image style={{ width: 15, height: 15, marginLeft: 0,marginTop: 0  }} source={require('../../assets/Images/Cancel2.png')} />
</View>  

<View style={{  marginBottom: 0, flexDirection: 'row',  padding: 1, marginTop: 10  }}>
              

<View style={{ flexDirection: 'column', marginStart: 1 }}>
<Image style={{ width: 13, height: 15,marginTop: 0, marginStart: 2 }} source={require('../../assets/Images/Path2.png')} />
<Image style={{ width: 5, height: 50,marginTop: 0, marginStart: 2 }} source={require('../../assets/Images/Path3.png')} />
<Image style={{ width: 15, height: 20,marginTop: 0, marginStart: 3 }} source={require('../../assets/Images/Path1.png')} />
</View>  

<View style={{ flexDirection: 'column', padding: 1, marginStart: 1 }}>    

<View style={{ flexDirection: 'column', padding: 1, marginStart: 1 }}>    
<Text style={{ fontWeight: 'normal',color: 'grey', fontSize: 9, marginStart: 1, marginTop: 1 }}>Pickup Location</Text>
<Text style={{ fontWeight: 'bold', fontSize: 14, marginStart: 1,color: 'grey' }}>123S 6th Crossman street , LA USA</Text>
</View>
             
<View style={{ flexDirection: 'column', padding: 1, marginStart: 1,marginTop: 25 }}>    
<Text style={{ fontWeight: 'normal',color: 'grey', fontSize: 9, marginStart: 1, marginTop: 1 }}>Drop Location</Text>
<Text style={{ fontWeight: 'bold', fontSize: 14, marginStart: 1,color: 'grey' }}>34 , Norman road , Opp to Economics</Text>
<Text style={{ fontWeight: 'bold', fontSize: 14, marginStart: 1,color: 'grey' }}>building, LA ,USA</Text>
             </View>

             </View>
  
    </View> 

<View  style={{ flexDirection: 'row', padding: 1, marginStart: 50,marginTop: 80 }} >
<Image style={{ width: 40, height: 40,marginTop: 0, marginStart: 6 }} source={require('../../assets/Images/Star.png')} />
    <Image style={{ width: 40, height: 40,marginTop: 0, marginStart: 6 }} source={require('../../assets/Images/Star.png')} />
    <Image style={{ width: 40, height: 40,marginTop: 0, marginStart: 6 }} source={require('../../assets/Images/Star.png')} />
    <Image style={{ width: 40, height: 40,marginTop: 0, marginStart: 6 }} source={require('../../assets/Images/Star.png')} />
    <Image style={{ width: 40, height: 40,marginTop: 0, marginStart: 6 }} source={require('../../assets/Images/Star.png')} />
</View>


<View  style={{  padding: 1, marginStart: 50,marginTop: 20 }} >

<TextInput
                style={styles.input}
                placeholder='Feedback'
                autoCapitalize="none"
                placeholderTextColor="#808080"
                onChangeText={(mobile) => setName(mobile)}
              />
</View>

   
             <TouchableOpacity style={styles.loginBtn}
             >
                 <Text style={styles.buttontext}>Submit Feedback</Text>
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
        width:"70%",
        marginLeft: 50,
        marginRight: 0,
        alignItems: "center",
        justifyContent: "center",
        textAlign: 'center',
        marginTop: 80,
        backgroundColor: "#F87300",
        marginBottom:"90%"
      },
      buttontext: {
        color: '#fff',
        fontSize: 16, fontWeight: 'bold'
      },

});
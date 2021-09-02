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

export default function EarningsMonthView({ navigation }) {
  

    StatusBar.setHidden(true);

  
    function Signin() {
        

        // dispatch({ type: 'LOGIN_REQUEST', payload: mobile })
    }

    return (
       
       
   
     
        <View style = {styles.container}>
            {/* <View style = {{ marginTop:0 , marginBottom:10 ,marginLeft:0, backgroundColor:'#F87300',height:"20%"}}>
            <Appicon icon={require("../../assets/icons/tallo-logo-main.png")}/>

            </View>    */}

        <Text style = {{alignSelf:'flex-end', fontSize:13 , fontWeight:'bold' , color:'black' , marginTop:10}}>Rider Id : TA6543  </Text>
            <View style ={{flexDirection:'row' , marginTop:20}}>
            <TouchableOpacity style={styles.loginBtnn}>
                        <Text style={styles.buttontextt}>Withdraw</Text>
                    </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn} onPress={Signin} >
                <Text style={styles.buttontext}>Due Amount Rs470.00</Text>
            </TouchableOpacity>
            </View>

            <View style = {{marginLeft:2,flexDirection:'row',justifyContent:'space-around'  ,  marginTop:1 ,}}>
            <Text style = {{fontWeight:'bold',marginLeft:1, fontSize:15  , color:'grey' , marginTop:2}}>Yesterday</Text>
            <Text style = {{fontWeight:'bold',marginLeft:1, fontSize:15  , color:'grey' , marginTop:2}}>Today</Text>
            <Text style = {{fontWeight:'bold',marginLeft:1, fontSize:15  , color:'grey' , marginTop:2}}>Month</Text>
            <Text style = {{fontWeight:'bold',marginLeft:1, fontSize:15  , color:'grey' , marginTop:2}}>Year</Text>
            </View>

          
            <Text style = {{fontWeight:'bold',marginLeft:15, fontSize:19  , color:'black' , marginTop:20}}>Earnings</Text>


            <View style = {{marginLeft:20,flexDirection:'row',justifyContent:'space-between' ,width:"80%" , backgroundColor:'#FFD7D7' , marginTop:10 , height:"5%"}}>
            <Text style = {{marginLeft:20,fontWeight:'bold', fontSize:15  , color:'black' ,marginTop:3}}>Bike</Text>
            <Text style = {{ fontSize:22  , color:'#F67321' }}>542 </Text>

            </View>

         

           

        </View>
     

   
   
       
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        // justifyContent: "center",
    },
    loginBtn: {
        width: "45%",
        height: 45,
        marginLeft: 20,
        marginRight: 10,
        alignItems: "center",
        justifyContent: "center",
        textAlign: 'center',
        marginTop: 1,
        backgroundColor: "#F67321",
        color:"#000000",
        marginBottom:"10%",
        borderRadius:5
    },
    loginBtnn: {
        width: "40%",
        borderRadius: 5,
        borderColor: "#ff8000",
        borderWidth: 2,
        height: 45,
        marginLeft: 10,
        marginRight: 1,
        alignItems: "center",
        justifyContent: "center",
        textAlign: 'center',
        marginTop: 1,
        backgroundColor: "#fff",
        color: "#000000",
        marginBottom: "10%"
    },
    buttontext: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold'
    },
    buttontextt: {
        color: '#F67321',
        fontSize: 14,
        fontWeight: 'bold'
    },

});
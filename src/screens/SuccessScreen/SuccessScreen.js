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
     StatusBar,
     Modal
} from "react-native";
import { themes } from '../../utils'
import { useDispatch,useSelector } from 'react-redux'
import { getItemFromStorage,removeFromStorage } from "../../utils/AccessStorage";
import lang from '../../language/lang_values'


export default function SuccessScreen({ navigation }) {

 const dispatch = useDispatch();
    const users1 = useSelector((state) => state.SignIn.bookingInfo);
    console.log("booking_info+++",users1)   
    const [LangId, setLangId] = useState("")

    const [rider_id, setRiderId] = useState("");
    const [booking_id, setBookingId] = useState(""); 
    const [total_price,setTotalPrice] = useState("")
    const [pickupLocation, setpickupLocation] = useState("");
    const [dropLocation, setdropLocation] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [defaultRating, setDefaultRating] = useState(0);
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
    const [review, setReview] = useState("");



    React.useEffect(() => {
      async function anyNameFunction() {
         
        const booking_id = await getItemFromStorage('Booking_Id')
        const rider_id = await getItemFromStorage('RiderId')
        const lanid = await getItemFromStorage('LangId')
        if (!lanid) { }
        else { setLangId(lanid) }
          if(booking_id!=null){
            setBookingId(booking_id)
            setRiderId(rider_id)
          }

         
       }
      anyNameFunction();
    setTotalPrice(users1.booking_data.total_price)
    setpickupLocation(users1.booking_data.source)
    setdropLocation(users1.booking_data.destination)
      // console.log(origin)

     
      }, []);

      const starImageFilled =
      'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
    // Empty Star. You can also give the path from local
    const starImageCorner =
      'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';
  
    const CustomRatingBar = () => {
      return (
        <View style={styles.customRatingBarStyle}>
          {maxRating.map((item, key) => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                key={item}
                onPress={() => setDefaultRating(item)}>
                <Image
                  style={styles.starImageStyle}
                  source={
                    item <= defaultRating
                      ? {uri: starImageFilled}
                      : {uri: starImageCorner}
                  }
                />
              </TouchableOpacity>
            );
          })}
        </View>
      );
    };
   

    function _signUp() {
       
        setModalVisible(!modalVisible);
      }


    const refer  = "Refer your friend and earn rs 1000 for each"

    StatusBar.setHidden(true);

    function Signin() {
        

        dispatch({ type: 'LOGIN_REQUEST', payload: mobile })
    }
    function submitFeedback() {
    
         //navigate('RiderPayment');
         var request={
          "booking_id":booking_id,
          "rider_id":rider_id,
          "user_rating":defaultRating,
          "user_review":review
         }

         dispatch({ type: 'RIDER_REVIEW', payload: request })
       //  navigate('RiderStatusOnline');

         setModalVisible(!modalVisible);
         removeFromStorage("source")
         removeFromStorage("destination")
         removeFromStorage("Username")


        }


    return (
        <View style={styles.container}>
            <TouchableOpacity >
        <Image style={{ width: 40, height: 35, marginLeft: 300,marginTop: 20  }} source={require('../../assets/Images/Cancel.png')}  />
        </TouchableOpacity>
        <View style={{ marginBottom: 0, padding: 70, margin: 1 }}>
         <View style={{ marginLeft: 15, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ width: 190, height: 190, alignSelf: 'center' }} source={require('../../assets/Images/success.png')} />

             <Text style={{ fontSize: 25, alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', marginBottom: 25,marginTop: 30 }}>{lang.Payment_Recieved[LangId]}</Text>

             <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 13 }}>{lang.congratulation_you_have_earned[LangId]}</Text>
             <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 13, marginBottom: 130, alignItems: 'center', justifyContent: 'center', }}> {total_price} {lang.rupees[LangId]}</Text>
         


             <TouchableOpacity style={styles.loginBtn} 
            //  onPress={() => navigate('RiderPayment')}
            onPress={() => setModalVisible(true)}
             
             >
                 <Text  style={styles.buttontext}>{lang.Continue[LangId]}</Text>
             </TouchableOpacity>
         </View>
        
          
             
     </View> 

     <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
         
          
          <TouchableOpacity onPress={() => _signUp()}>
           <Image style={{ marginRight:20 ,marginTop:20 , marginBottom:0, width: 15, height: 15,marginLeft:270 }} source={require('../../assets/Images/Cancel2.png')} />
           </TouchableOpacity>
            
         
            
           <View style={{ marginBottom: 0, padding: 7, margin: 1 }}>
         <View style={{ marginLeft: 1, flexDirection: 'column',  }}>

         <View style={{ flexDirection: 'row', marginStart: 1 , justifyContent:'space-between',marginTop: 0 }}>
         <Text style={{ fontSize: 21,  fontWeight: 'bold', marginBottom: 0,marginTop: 0, marginStart: 0 }}>{lang.Rate_Customer[LangId]}</Text>
         <TouchableOpacity onPress={() => _signUp()}>
           <Image style={{ marginRight:20 ,marginTop:0 , marginBottom:0, width: 15, height: 15,marginLeft:270 }} source={require('../../assets/Images/Cancel2.png')} />
           </TouchableOpacity>


</View>  

<View style={{  marginBottom: 0, flexDirection: 'row',  padding: 1, marginTop: 10  }}>
<View style={{ flexDirection: 'column', marginStart: 1 }}>
<Image style={{ width: 15, height: 15,marginTop: 0, marginStart: 0 }} source={require('../../assets/Images/Path2.png')} />
<Image style={{ width: 5, height: 50,marginTop: 0, marginStart: 5 }} source={require('../../assets/Images/Path3.png')} />
<Image style={{ width: 15, height: 17,marginTop: 0, marginStart: 0 }} source={require('../../assets/Images/Path1.png')} />
</View>  
<View style={{ flexDirection: 'column', padding: 1, marginStart: 4 }}>    
<View style={{ flexDirection: 'column', padding: 1, marginStart: 1 }}>    
<Text style={{ fontWeight: 'normal',color: 'grey', fontSize: 9, marginStart: 1, marginTop: 1 }}>{lang.pickup_location[LangId]}</Text>
<Text style={{ fontWeight: 'bold', fontSize: 14, marginStart: 1,color: 'grey' }}>{pickupLocation}</Text>
</View>
<View style={{ flexDirection: 'column', padding: 1, marginStart: 1,marginTop: 25 }}>    
<Text style={{ fontWeight: 'normal',color: 'grey', fontSize: 9, marginStart: 1, marginTop: 1 }}>{lang.drop_location[LangId]}</Text>
<Text style={{ fontWeight: 'bold', fontSize: 14, marginStart: 1,color: 'grey' }}>{dropLocation}</Text>
{/* <Text style={{ fontWeight: 'bold', fontSize: 14, marginStart: 1,color: 'grey' }}>building, LA ,USA</Text> */}
             </View>
             </View>
  
    </View> 

    <CustomRatingBar />




<View  style={{  padding: 1, marginStart: 10,marginTop: 20 }} >

<TextInput
                style={styles.input}
                placeholder='Feedback'
                autoCapitalize="none"
                placeholderTextColor="#808080"
                onChangeText={(review) => setReview(review)}
              />
</View>

   
             <TouchableOpacity style={styles.loginBtn}
                        //  onPress={() => navigate('RiderStatusOnline1')} 
                        onPress={() => submitFeedback()}
                            >
             
                 <Text style={styles.buttontext}>{lang.Submit_Feedback[LangId]}</Text>
             </TouchableOpacity>
         </View>

     </View> 
          </View>
        </View>
      </Modal>

</View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        height: '100%'
        
        // justifyContent: "center",
    },
    input: {
        width: 260,
        height: 90,
        marginLeft: 0,
        marginRight: 5,
        marginBottom: 20,
        padding: 5,
        color: '#000',
        fontSize: 16,
        borderColor: "black",
        borderWidth: 0.1,
        borderRadius:1,
      },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 2
      },
      modalView: {
        margin: 2,
        height: 510,
        backgroundColor: "white",
        borderRadius: 10,
        // padding: 35,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: 300
       
    },

    loginBtn: {
        borderRadius: 5,
        height: "10%",
        width:"100%",
        marginLeft: 0,
        marginRight: 0,
        alignItems: "center",
        justifyContent: "center",
        textAlign: 'center',
        marginTop: 10,
        backgroundColor: "#F87300",
        marginBottom:"0%"
      },
      buttontext: {
        color: '#fff',
        fontSize: 16, fontWeight: 'bold'
      },
      customRatingBarStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 30,
      },
      starImageStyle: {
        margin:5,
        width: 25,
        height: 25,
        resizeMode: 'cover',
      },

});
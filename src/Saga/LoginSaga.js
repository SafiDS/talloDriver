import { takeLatest, call, put, delay } from 'redux-saga/effects'
import { saveToStorage, getItemFromStorage ,removeFromStorage} from '../utils/AccessStorage'
import API from '../Api'
import { saveUserInfo } from '../utils/User'
import { Alert, Platform,ToastAndroid} from "react-native";
import { navigate, navigateScreen } from '../Tools/NavigationServices'
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch,useSelector } from 'react-redux'
import StaticText from '../utils/StaticText'


const api = API.create()


export function* SignInSaga(action) {
  //alert("hi")
  
  let params = {}


  
   api.setHeader("content-type", "application/json",)
    params["phone"] = action.payload;
    

      if(params["phone"].length != 10){
       
       alert("Please Enter Valid Mobile Number")
       return
      }
  
  const response = yield call(api.rider_login_otp_request, params)

       // console.log("response is " , response.data)
        //console.log(params)
  if (response.status == 200) {
    if (response.data["statusCode"] == "SUCCESS") {
      response.data["phone"] = action.payload;
      saveToStorage("PhoneNumber", response.data.phone)
      yield put({
        type: 'LOGIN_DETAILS',
        payload: response.data
      })
   navigate('Otp')
 //navigate("RiderOnline")
//navigate('UploadImage')
    }
    else {
      alert(response.data.statusMessage)
    }
  }
}





export function* OTPSaga(action) {
  let params = {}
  const { phone, navigation, otp } = action.payload
  console.log("Token",StaticText.Token)
  params["phone"] = phone;
  params["otp"] = otp;
  params["devicetoken"] = StaticText.Token;
  console.log(params)
  
  if(typeof (params["otp"]) == 'undefined' || params["otp"] == null || params["otp"] == ''){
       
    Alert.alert("Please Enter Otp")
    return
   }
  const response = yield call(api.rider_login_otp_verify, params)
 
console.log("otp++",response.data)
//saveToStorage("LangId", 0)
  if (response.data["rider_info"] == ""){
    if (response.data["statusCode"] == "SUCCESS") {
      StaticText.RiderId = response.data.rider_info.rider_id
      saveToStorage("RiderId",response.data.rider_info.rider_id)
      //saveToStorage("LangId", response.data.rider_info.language)
      saveToStorage("PhoneNumber", phone)
     
      navigateScreen(navigation, 'SignUpScreen')
       //navigate('Language')

    }

  }


  if (response.data["rider_info"] != ""){
    if (response.data["statusCode"] == "SUCCESS") {
     // alert("saga"+response.data.rider_info.rider_id)
      //saveToStorage("LangId", response.data.rider_info.language)
      
      yield put({
        type: 'USER_INFORMATION',
        payload: response.data
      })
      if( response.data.rider_info.login_image!=""){
        saveToStorage("loginImage","true")
       }else{
        saveToStorage("loginImage","false")
       }
      saveToStorage("RiderId", response.data.rider_info.rider_id)

      StaticText.RiderId = response.data.rider_info.rider_id
      saveToStorage("Name",response.data.rider_info.full_name)
      saveToStorage("Image",response.data.rider_info.profile_image)
     
      saveToStorage("PhoneNumber", phone)
      saveToStorage("User_info", JSON.stringify(response.data))
      
      //saveToStorage("LangId", 0)
      if(response.data.rider_info.language!=""){
        //alert(response.data.rider_info.language)
        saveToStorage("LangId", response.data.rider_info.language)
      }else{
       // alert(response.data.rider_info.language)
        saveToStorage("LangId", "0")
      }
 navigate("Dashboard")

    }
    }else{
     console.log(response.data.statusMessage)
      // Alert.alert(response.data.statusMessage)
    }

  


  
}



export function* Registration(action) {
  let params = {}
  const { Name, Date, Email, City,Vehicle, gender, navigation, phone } = action.payload
  console.log("Token",StaticText.Token)
//alert("Hi")
  //navigateScreen(navigation, 'Language')
  //api.setContentType(api.applicationJson)
  params["phone"] = phone;
  params["full_name"] = Name;
  params["email"] = Email;
  params["dob"] = Date;
  params["city_id"] = City;
  params["vehicle_id"] = Vehicle;
  params["gender"] = gender;
  params["devicetoken"] = StaticText.Token;
  console.log(params)
  //navigateScreen(navigation, 'Language')
  if(params["full_name"] == ""){
    ToastAndroid.showWithGravity("Please enter the details",ToastAndroid.LONG, ToastAndroid.CENTER);
   }else if(params["dob"] == ""){
    ToastAndroid.showWithGravity("Please enter the details",ToastAndroid.LONG, ToastAndroid.CENTER);
   
   } else if(params["city"]==""){
    ToastAndroid.showWithGravity("Please enter the details",ToastAndroid.LONG, ToastAndroid.CENTER);
   }else if(params["gender"]==""){
    ToastAndroid.showWithGravity("Please enter the details",ToastAndroid.LONG, ToastAndroid.CENTER);
   }else{
  const response = yield call(api.rider_profile_update, params)
 console.log("RESponse ===",response.data)
  if (response.status == 200) {
    if (response.data["statusCode"] == "SUCCESS") {
     saveToStorage("RiderId",response.data.rider_info.rider_id)
     
      navigateScreen(navigation, 'Language')
      //navigateScreen(navigation, 'Dashboard')
     // saveToStorage("User_info", JSON.stringify(response.data))
      saveToStorage('rider_data',JSON.stringify(response.data.rider_info))

      yield put({
        type: 'USER_INFORMATION',
        payload: response.data
      })
    }
    else {
      console.log(response.data.statusCode)
     
    }
 }

   }
  
}


export function* Language(action) {
  let params = {}
  const { Name, Date, Email, City, gender, navigation, phone } = action.payload

  navigateScreen(navigation, 'License')
  
}



export function* License(action) {
  let params = {}
  const { LisenceNo,FrontImage,BackImage, navigation, } = action.payload
  console.log("params",params)
  // api.setContentType(api.applicationJson)
  params["LisenceNo"] = LisenceNo;
  params["FrontImage"] = FrontImage;
  params["BackImage"] = BackImage;
  
    yield put({
      type: 'LICENSEDATA',
      payload: params
    })
    
navigateScreen(navigation, 'RCDocument')
  
  
}

export function* Rcdocoment(action) {
  let params = {}
  const {  RCNo, RCFrontImage, RCBackImage, navigation } = action.payload

  params["RCNo"] = RCNo;
  params["RCFrontImage"] = RCFrontImage;
  params["RCBackImage"] = RCBackImage;
 
  yield put({
    type: 'RCDATA',
    payload: params
  })
  navigateScreen(navigation, 'Insurance')

}

export function* Insurance(action) {
  let params = {}
  const {InsuranceNo,InBackImage, navigation, InFrontImage, } = action.payload
  params["InFrontImage"] = InFrontImage;
  params["InBackImage"] = InBackImage;
  params["InsuranceNo"] = InsuranceNo;
 
  yield put({
    type: 'INSURANCEDATA',
    payload: params
  })
  navigateScreen(navigation, 'Pancard')
 
  
}


export function* Pancard(action) {
  let params = {}
  const {PCNo,PCFrontImage, navigation } = action.payload
params["PCNo"] = PCNo;
  params["PCFrontImage"] = PCFrontImage;
  
  yield put({
    type: 'PCDATA',
    payload: params
  })
  navigateScreen(navigation, 'Aadharcard')
 

}


export function* Adarcard(action) {
  let params = {}
  const { AadharNo, ACFrontImage, ACBackImage, navigation } = action.payload
  params["AadharNo"] = AadharNo;
  params["ACFrontImage"] = ACFrontImage;
  params["ACBackImage"] = ACBackImage;
 
  yield put({
    type: 'ACDATA',
    payload: params
  })
  navigateScreen(navigation, 'Bankdetails')

}

export function* BankDetails(action) {
  let params = {}
  const { AccountName,AccountNo,BankName,IFSC, navigation} = action.payload
 params["AccountName"] = AccountName;
  params["AccountNo"] = AccountNo;
  params["BankName"] = BankName;
  params["IFSC"] = IFSC;
 
  yield put({
    type: 'BANKDATA',
    payload: params
  })
  navigateScreen(navigation, 'UploadImage')

}

export function* UploadImage(action) {
  let params = {}
  const { rider_id,profile_image,navigation} = action.payload
//   let id, full_name,email,gender;

 
  // api.setContentType(api.applicationJson)
   params["rider_id"] = rider_id;
  params["full_name"] = "";
  params["email"] = "";
  params["dob"] ="";
  params["city"] = "";
  params["gender"] = "";
  params["devicetoken"] = StaticText.Token;
  params["driving_license_number"] = "";
  params["driving_license_front_image"] = "";
  params["driving_license_back_image"] = "";
  params["rc_number"] = "";
  params["rc_front_image"] = "";
  params["rc_back_image"] = "";
  params["insurance_number"] = "";
  params["insurance_front_image"] = "";
  params["insurance_back_image"] = "";
  params["pancard_number"] = "";
  params["pancard_image"] ="";
  params["aadharcard_number"] = "";
  params["aadharcard_front_image"] = "";
  params["aadharcard_back_image"] = "";
  params["bank_account_holder_name"] = "";
  params["bank_account_number"] = "";
  params["bank_name"] = "";
  params["bank_ifsc"] ="";
  params["profile_image"] = profile_image;
 
  //console.log("PRAMS+++++++++++++++++++",params)
 //navigateScreen(navigation, 'ChangeImage')
   const response = yield call(api.rider_full_profile_update, params)
    console.log("REsponse=========",response.data.rider_info)
  //navigateScreen(navigation, 'ChangeImage')
  if (response.status == 200) {
    if (response.data["statusCode"] == "SUCCESS") {

      saveToStorage("RiderId",response.data.rider_info.rider_id)
      saveToStorage("Name",response.data.rider_info.full_name)
      //saveToStorage("LangId", response.data.rider_info.language)
      //saveToStorage("Image",response.data.rider_info.profile_image)
      saveToStorage('rider_data',JSON.stringify(response.data.rider_info))

     yield put({
        type: 'USER_INFORMATION',
        payload: response.data
      })
      if( response.data.rider_info.login_image!=""){
        saveToStorage("loginImage","true")
       }else{
        saveToStorage("loginImage","false")
       }
      navigateScreen(navigation, 'ChangeImage')
    }
    else {
      alert(response.data.statusMessage)
    }
  }
}

export function* RiderChangeImage(action) {
  let params = {}
  const { rider_id, navigation, profile_image } = action.payload
  // api.setContentType(api.applicationJson)
  params["rider_id"] = rider_id;
  params["profile_image"] = profile_image;
  console.log("params+++++++++++",params)

 
 
   const response = yield call(api.rider_profile_image_update, params)
 
  if (response.status == 200) {
    if (response.data["statusCode"] == "SUCCESS") {
      yield put({
        type: 'USER_INFORMATION',
        payload: response.data
      })
      if( response.data.rider_info.login_image!=""){
        saveToStorage("loginImage","true")
       }else{
        saveToStorage("loginImage","false")
       }
      saveToStorage('rider_data',JSON.stringify(response.data.rider_info))
      saveToStorage("Name",response.data.rider_info.full_name)
      saveToStorage("LangId", response.data.rider_info.language)

      
      navigateScreen(navigation, 'RiderDetails')
    }
    else {
      alert(response.data.statusMessage)
    }
  }
}

export function* RiderDetails(action) {
  let params = {}
  const { Name, Date, Email, City, gender, navigation, phone } = action.payload

  navigateScreen(navigation, 'Dashboard')
}

export function* Dashboard(action) {
  let params = {}
  const {  navigation, phone } = action.payload

  navigateScreen(navigation, 'RiderStatusGoToHome')
}


export function* RiderStatusGotoHome(action) {
  let params = {}
  const {  navigation, phone } = action.payload

  navigateScreen(navigation, 'RiderStatusOnline')
}


export function* RiderStatusOnline(action) {
  let params = {}
  const {  navigation, phone } = action.payload

  navigateScreen(navigation, 'RiderStatusOnline1')
}

export function* RiderStatusOnline1(action) {
  let params = {}
  const {  navigation, phone } = action.payload

  navigateScreen(navigation, 'RiderGoToHome')
}





export function* cityList(action) {
  debugger
  const response = yield call(api.City_name) 
  api.setContentType(api.applicationJson)

  if (response.data.message == "success") {
    if (response.data.message == "success") {
   
      saveToStorage("User_info", JSON.stringify(response.data.data))
      yield put({
        type: 'USER_INFORMATION',
        payload: response.data.data
      })
    }
    else {
      alert(response.data.statusMessage)
    }
  }
}

export function* GetRiderDetails(action) {
  //alert("info")
  let params = {}
  const {  rider_id } = action.payload
params["rider_id"] = rider_id;
console.log('++++++++++++++++++++++++HI+++++++++++',params)
const users = yield call(api.rider_info,params)
if (users.data["statusCode"] == "SUCCESS") {
  //alert("info1")
  if( users.data.rider_info.login_image!=""){
    saveToStorage("loginImage","true")
   }else{
    saveToStorage("loginImage","false")
   }
  yield put({
    type: 'USER_INFORMATION',
    payload: users.data
  })
//yield put({ type: "SAVE", payload: users.data });

//console.log("user++",users)
AsyncStorage.setItem('user_data',JSON.stringify(users))
  }
 

}

export function* RiderLocationUpdate(action) {
  let params = {}
  const {  rider_id, lat, lon, online_status ,goto_home_status} = action.payload

  
  params["rider_id"] = rider_id;
  params["lat"] = lat;
  params["lon"] = lon;
  params["online_status"] = online_status;
  params["goto_home_status"] = goto_home_status;
 //console.log(params)
 
   const response = yield call(api.rider_location_update, params)
   if (response.data["statusCode"] == "SUCCESS") {

   console.log("Location Update",response.data)
   }
   else{
    console.log("Location Update",response.data.statusMessage)
   }
}

export function* RiderAddAddress(action) {
  let params = {}
  const {  rider_id, lat, lon, address,navigation} = action.payload

  
  params["rider_id"] = rider_id;
  params["lat"] = lat;
  params["lon"] = lon;
  params["address"] = address;
 
 //console.log(params)
 
   const response = yield call(api.rider_address_add, params)
   if (response.data["statusCode"] == "SUCCESS") {
   console.log("Rider Address",response.data)
   navigation.navigate('RiderGoingHome', { lat: lat, lon:lon })
   //navigate("RiderGoingHome")
   }
   else{
    console.log("Rider Address",response.data.statusMessage)
   }
}

export function* RiderAddresses(action) {
  let params = {}
  const { rider_id} = action.payload
  params["rider_id"] = rider_id;
  
   const response = yield call(api.rider_addresses, params)
   if (response.data["statusCode"] == "SUCCESS") {
    saveToStorage("RiderAddress",JSON.stringify(response.data))
   console.log("Address",response.data)
  
   }
   else{
    console.log(" Address",response.data.statusMessage)
   }
}

export function* BookingInfo(action) {
  let params = {}
  const {booking_id} = action.payload

  
  params["booking_id"] = booking_id;
 
console.log("params",params)
 
   const response = yield call(api.booking_info,params)
   
   if (response.data["statusCode"] == "SUCCESS") {
     if(response.data["booking_data"]!=" " && response.data["user_data"]!= "" ){
      yield put({ type:"BOOKINGINFO", payload: response.data});
      saveToStorage("Booking_info",JSON.stringify(response.data))
     // console.log("Booking Info",response.data)
      navigate('RiderGoToHome')
     }
   

//console.log("Booking Info",response)
    // saveToStorage("source",response.data.booking_data.source)
    // saveToStorage("destination",response.data.booking_data.destination)
    // saveToStorage("Username",response.data.user_data.full_name)
    // yield put({ type: "BOOKINGINFO", payload: response.data });
  

  //  StaticText.Source = response.data.booking_data.source
  //  StaticText.Destination = response.data.booking_data.destination
  //  StaticText.Username = response.data.user_data.full_name
   
  // yield put({ type: "BOOKINGINFO", payload: response.data.booking_data });
  
   }
}

export function* RiderBookingAccept(action) {
  let params = {}
  const {booking_id,rider_id,navigation} = action.payload

  
  params["booking_id"] = booking_id;
  params["rider_id"] = rider_id;
 console.log(params)
  
 const response = yield call(api.booking_accept,params) 
  
 console.log("Booking accept",response.data)

 if (response.data["statusCode"] == "SUCCESS") {
  navigateScreen(navigation, 'RiderMultipleDestination')
  //removeFromStorage("Booking_info")
  removeFromStorage("destination")
  removeFromStorage("Username")
  // StaticText.Source = ""
  // StaticText.Destination = ""
  // StaticText.Username = ""
    }
    else {

      removeFromStorage("source")
  removeFromStorage("destination")
  removeFromStorage("Username")
      alert(response.data.statusMessage)
    }
  }



  export function* RiderReachLocation(action) {
    let params = {}
    const {booking_id,rider_id,navigation} = action.payload
  
    
    params["booking_id"] = booking_id;
    params["rider_id"] = rider_id;
   console.log(params)
  const response = yield call(api.booking_source_location_reach,params) 
   console.log("Reach Locationt",response.data)
  
   if (response.data["statusCode"] == "SUCCESS") {
    navigateScreen(navigation, 'RiderHomeOtp')
     
      }
      else {
        alert(response.data.statusMessage)
      }
    }

  export function* BookingOtpVerify(action) {
      let params = {}
      const {booking_id,rider_id,booking_otp,navigation} = action.payload
    
      
      params["booking_id"] = booking_id;
      params["rider_id"] = rider_id;
      params["booking_otp"] = booking_otp;
     console.log(params)
    const response = yield call(api.booking_otp_verify,params) 
     console.log("booking otp",response.data)
    
     if (response.data["statusCode"] == "SUCCESS") {
      navigateScreen(navigation, 'RiderOngoingRide')
       
        }
        else {
          //alert(response.data.statusMessage)
          alert("Please enter correct otp number")
          //navigateScreen(navigation, 'RiderOngoingRide')
        }
      }



      export function* BookingComplete(action) {
        let params = {}
        const {booking_id,rider_id,destination,destination_lat,destination_lon,navigation} = action.payload
      
        
        params["booking_id"] = booking_id;
        params["rider_id"] = rider_id;
        params["destination"] = destination;
        params["destination_lat"] = destination_lat;
        params["destination_lon"] = destination_lon;
       console.log(params)
      const response = yield call(api.booking_complete,params) 
       console.log("booking otp",response.data)
      
      
        }


        export function* CashPayment(action) {
          let params = {}
           const { booking_id,rider_id,navigation } = action.payload
     
           params["booking_id"] = booking_id
           params["rider_id"] = rider_id
           
            console.log('++++++++++++++++++++++++HI+++++++++++',params)
           const users = yield call(api.booking_cash_pay,params)
           console.log("cash payment++",users.data)
           //navigateScreen(navigation, 'RatingScreen')
           if (users.data["statusCode"] == "SUCCESS") {
            navigateScreen(navigation, 'SuccessScreen')
           
          }
       }  


       export function* RiderCancel(action) {
        let params = {}
         const { booking_id,rider_id,navigation} = action.payload
   
         params["booking_id"] = booking_id
         params["rider_id"] = rider_id
         
          console.log('++++++++++++++++++++++++HI+++++++++++',params)
         const users = yield call(api.booking_rider_cancel,params)
         console.log("Rider cancel++",users.data)
         if (users.data["statusCode"] == "SUCCESS") {
          navigateScreen(navigation, 'RiderStatusOnline1')
         
        }
        
     }  


        export function* RiderBooking(action) {
          let params = {}
          const {rider_id} = action.payload
          params["rider_id"] = rider_id;
         
         console.log(params)
        const response = yield call(api.rider_bookings,params) 
         console.log("booking riders",response.data)
        
         if (response.data["statusCode"] == "SUCCESS") {
           saveToStorage("StatusHistory",response.data["statusCode"])
          yield put({ type:'RIDER_BOOKINGS',
            payload: response.data.bookings
          })
            }
            else {
              saveToStorage("StatusHistory",response.data["statusCode"])
              console.log(response.data.statusMessage)
            }
          }


          export function* RiderReview(action) {
            let params = {}
            const {rider_id,booking_id,user_rating,user_review} = action.payload
            params["rider_id"] = rider_id;
            params["booking_id"] = booking_id;
            params["user_rating"] = user_rating;
            params["user_review"] = user_review;
           
           console.log(params)
          const response = yield call(api.booking_rider_send_review,params) 
           console.log("review",response)
          
           if (response.data["statusCode"] == "SUCCESS") {
            saveToStorage("isRNCameraMessage","");

            navigate('RiderStatusOnline1');
            // yield put({ type: 'RIDER_BOOKINGS',
            //   payload: response.data.bookings
            // })
              }
              else {
                alert(response.data.statusMessage)
              }
            }



            export function* RiderLoginImage(action) {
              let params = {}
              const { rider_id, navigation, profile_image,lat,long } = action.payload
              // api.setContentType(api.applicationJson)
              params["rider_id"] = rider_id;
              params["image"] = profile_image;
              console.log("params+++++++++++",params)
            
             
             
               const response = yield call(api.rider_login_image_update, params)
               console.log("parresponseams+++++++++++",response.data)
              //alert()
                if (response.data["statusCode"] == "SUCCESS") {
                   yield put({
                    type: 'USER_INFORMATION',
                    payload: response.data
                  })
                  //alert("lat"+lat)
                  if(lat!="" && long!=""){
                    var date = new Date();
                    var day = date.getDate();
                    var month = date.getMonth();
                    var year = date.getFullYear();
                    var todat_date_takeselfie = day + '-' + month + '-' + year;
                    // saveToStorage("riderloginImageDate",todat_date_takeselfie)
                    // saveToStorage("loginImage","true")

                    //alert(new Date().toString())
                        navigation.navigate('RiderStatusOnline1', { lat: lat, 
                          lon:long })
                     }

                     
                }

                
                else {
                  alert(response.data.statusMessage)
                }
              }
            

     export function* BookingStatusInfo(action) {
              let params = {}
               const { booking_id,navigation } = action.payload
         
               params["booking_id"] = booking_id
               
               
                console.log('++++++++++++++++++++++++HI+++++++++++',params)
               const users = yield call(api.booking_status_info,params)
               console.log("Booking Status++",users.data)
               
               StaticText.BOOKING_STATUS = users.data["booking_status"]
           }        
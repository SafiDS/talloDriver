import React, { useState } from "react";
import {
  View,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getItemFromStorage, saveToStorage } from "../../utils/AccessStorage";
import { navigate, navigateScreen } from "../../Tools/NavigationServices";
import { ScrollView } from "react-native-gesture-handler";
import DropDownPicker from "react-native-dropdown-picker";
import StaticText from "../../utils/StaticText";
import lang from "../../language/lang_values";
import { themes } from "../../utils";

export default function RiderDetails({ navigation, route }) {
  const dispatch = useDispatch();
  let user_info1 = useSelector((state) => {
    console.log("State: user_info1", state);
    return state.SignIn.User_info;
  });

  // let user_info = useSelector(state => {
  //   console.log('State: ', state);
  //   return state.SignIn.data;
  // });

  // console.log("++++++++++++++HI+++++++++++",user_info)
  const [RiderId, setRiderId] = useState("");
  const [Name, setName] = useState("");
  const [Date, setDate] = useState("");
  const [Email, setEmail] = useState("");
  const [City, setCity] = useState("");
  const [CityArray, setCityData] = useState([]);
  const [Gender, setGender] = useState("");
  const [Aadhar, setAadhar] = useState("");
  const [VehicleNo, setVehicleNo] = useState("");
  const [License, setLicense] = useState("");
  const [PanNO, setPanNO] = useState("");
  const [InNO, setInNO] = useState("");
  const [Phone, setPhone] = useState("");
  const [city_id, setcity_id] = useState("");
  const [baseUrl, setbaseUrl] = useState(
    "https://www.tallo.in/dev/uploads/riders/"
  );
  const [Profile, setProfile] = useState("");
  const [LangId, setLangId] = useState("");

  StatusBar.setHidden(true);
  React.useEffect(() => {
    var request = {
      rider_id: StaticText.RiderId,
    };
    dispatch({ type: "GET_RIDER_DETAILS", payload: request });
    // dispatch({type:'GET_RIDER_DETAILS',params:StaticText.RiderId})
    getdata();
    getcity();
    const unsubscribe = navigation.addListener("focus", () => refreshPage());
    return () => {
      // clean up event listener
      unsubscribe;
    };
  }, []);

  function refreshPage() {
    getdata();
  }

  function getcity() {
    fetch("https://www.tallo.in/was/cities", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        console.log("In fetch++++++++++", data);
        if (data["statusCode"] == "SUCCESS") {
          //setisPlusPressed(true)
          // isPlusPressed = true;
          var count = data.cities.length;
          //alert(count);
          let drop_down_data = [];
          for (var i = 0; i < count; i++) {
            console.log("In loopp", data.cities[i].city_name); // I need to add
            drop_down_data.push({
              label: data.cities[i].city_name,
              value: data.cities[i].city_id,
            }); // Create your array of data
          }
          setCityData((City) => [...City, drop_down_data]);
        }
      });
  }

  async function getdata() {
    const lanid = await getItemFromStorage("LangId");
    if (!lanid) {
    } else {
      setLangId(lanid);
    }
    if (user_info1 != "") {
      console.log("user_info1", user_info1);
      setRiderId(user_info1.rider_info.rider_id);
      setPhone(user_info1.rider_info.phone);
      setCity(user_info1.rider_info.city);
      setName(user_info1.rider_info.full_name);
      setDate(user_info1.rider_info.dob);
      setEmail(user_info1.rider_info.email);
      setAadhar(user_info1.rider_info.aadharcard_number);
      setVehicleNo(user_info1.rider_info.rc_number);
      setGender(user_info1.rider_info.gender);
      setLicense(user_info1.rider_info.driving_license_number);
      setPanNO(user_info1.rider_info.pancard_number);
      setInNO(user_info1.rider_info.insurance_number);
      setProfile(user_info1.rider_info.profile_image);
    }
  }

  async function _signUp() {
    var img = await getItemFromStorage("loginImage");
    saveToStorage("isRNCameraMessage", "");
    if (route.params.isEdit) {
      var request = {
        phone: Phone,
        Name: Name,
        Email: Email,
        Date: Date,
        City: city_id,
        Vehicle: "1",
        gender: Gender,
        navigation: navigation,
        isUpdateProfile: true,
      };
      dispatch({ type: "NEW_REGISTRATION", payload: request });
    } else {
      if (img == "true") {
        navigate("MoreDetails");
      } else {
        navigateScreen(navigation, "Dashboard");
      }
    }

    // var request = {
    //   "Name": Name,
    //   "Date": Date,
    //   "Email": Email,
    //   "City": City,
    //   "gender": Gender,

    //   "navigation": navigation
    // }
    // dispatch({ type: 'RIDER_DETAILS', payload: request })
  }

  const isEdit = route && route.params && route.params.isEdit;

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", marginBottom: "1%" }}>
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              alignSelf: "flex-start",
              marginHorizontal: 30,
            }}
          >
            <View>
              {Profile != "" ? (
                <Image
                  style={{
                    marginTop: 0,
                    marginBottom: 0,
                    width: 92,
                    height: 92,
                    marginLeft: 15,
                  }}
                  source={{ uri: Profile }}
                />
              ) : (
                <Image
                  style={{
                    marginTop: 0,
                    marginBottom: 0,
                    width: 92,
                    height: 92,
                    marginLeft: 15,
                  }}
                  source={require("../../assets/Images/photo.png")}
                />
              )}
            </View>

            <View style={{ flexDirection: "column", marginTop: 20 }}>
              <Text
                style={{
                  marginRight: 8,
                  fontSize: 23,
                  marginLeft: 15,
                  marginTop: 0,
                  fontFamily: themes.fontFamily.Bold,
                }}
              >
                {lang.rider_id[LangId]} :{RiderId}
              </Text>
              <Text
                style={{
                  marginRight: 8,
                  fontSize: 23,
                  marginLeft: 15,
                  marginTop: 0,
                  fontFamily: themes.fontFamily.Bold,
                }}
              >
                {Name}
              </Text>
            </View>
          </View>

          <View
            style={{
              marginTop: 27,
              marginBottom: 1,
              marginLeft: 10,
              borderColor: "grey",
              borderWidth: 0.3,
              // height: 350,
              width: 340,
              borderRadius: 5,
              paddingVertical: 10,
            }}
          >
            <Text
              style={{
                marginRight: 8,
                fontSize: 20,
                marginLeft: 15,
                marginTop: 0,
                fontFamily: themes.fontFamily.Bold,
              }}
            >
              {lang.primary_details[LangId]}
            </Text>
            <View style={{ flexDirection: "column", marginTop: 20 }}>
              <Text
                style={{
                  marginRight: 8,
                  fontSize: 13,
                  marginLeft: 15,
                  marginTop: 0,
                  fontFamily: themes.fontFamily.Normal,
                }}
              >
                {lang.full_name[LangId]}
              </Text>
              <TextInput
                value={Name}
                onChangeText={(text) => setName(text)}
                editable={isEdit}
                style={{
                  marginRight: 8,
                  fontSize: 13,
                  marginLeft: 15,
                  marginTop: 0,
                  fontFamily: themes.fontFamily.Bold,
                  color: "#000",
                  borderBottomWidth: 0.5,
                  marginRight: 30,
                  paddingBottom: 5,
                  paddingLeft: 0,
                  paddingTop: 0,
                }}
              />
              {/* <Text
                style={{
                  marginRight: 8,
                  fontSize: 14,
                  marginLeft: 15,
                  marginTop: 0,
                  fontFamily: themes.fontFamily.Bold,
                }}
              >
                {Name}
              </Text> */}
            </View>

            {/* <View
              style={{
                marginTop: 7,
                marginBottom: 1,
                marginLeft: 10,
                borderColor: "grey",
                borderWidth: 0.3,
                height: 0.2,
                width: 300,
                borderRadius: 5,
              }}
            ></View> */}
            <View style={{ flexDirection: "column", marginTop: 20 }}>
              <Text
                style={{
                  marginRight: 8,
                  fontSize: 13,
                  marginLeft: 15,
                  marginTop: 0,
                  fontFamily: themes.fontFamily.Normal,
                }}
              >
                {lang.date_of_birth[LangId]}
              </Text>

              <TextInput
                value={Date}
                onChangeText={(text) => setDate(text)}
                editable={isEdit}
                style={{
                  marginRight: 8,
                  fontSize: 13,
                  marginLeft: 15,
                  marginTop: 0,
                  fontFamily: themes.fontFamily.Bold,
                  color: "#000",
                  borderBottomWidth: 0.5,
                  marginRight: 30,
                  paddingBottom: 5,
                  paddingLeft: 0,
                  paddingTop: 0,
                }}
              />
              {/* <Text
                style={{
                  marginRight: 8,
                  fontSize: 14,
                  marginLeft: 15,
                  marginTop: 0,
                  fontFamily: themes.fontFamily.Bold,
                }}
              >
                {Date}
              </Text> */}
            </View>

            {/* <View
              style={{
                marginTop: 7,
                marginBottom: 1,
                marginLeft: 10,
                borderColor: "grey",
                borderWidth: 0.3,
                height: 0.2,
                width: 300,
                borderRadius: 5,
              }}
            ></View> */}

            <View style={{ flexDirection: "column", marginTop: 20 }}>
              <Text
                style={{
                  marginRight: 8,
                  fontSize: 13,
                  marginLeft: 15,
                  marginTop: 0,
                  fontFamily: themes.fontFamily.Normal,
                }}
              >
                {lang.mail_id[LangId]}
              </Text>
              <TextInput
                value={Email}
                onChangeText={(text) => setEmail(text)}
                editable={isEdit}
                style={{
                  marginRight: 8,
                  fontSize: 13,
                  marginLeft: 15,
                  marginTop: 0,
                  fontFamily: themes.fontFamily.Bold,
                  color: "#000",
                  borderBottomWidth: 0.5,
                  marginRight: 30,
                  paddingBottom: 5,
                  paddingLeft: 0,
                  paddingTop: 0,
                }}
              />
              {/* <Text
                style={{
                  marginRight: 8,
                  fontSize: 14,
                  marginLeft: 15,
                  marginTop: 0,
                  fontFamily: themes.fontFamily.Bold,
                }}
              >
                {Email}
              </Text> */}
            </View>

            {/* <View
              style={{
                marginTop: 7,
                marginBottom: 1,
                marginLeft: 10,
                borderColor: "grey",
                borderWidth: 0.3,
                height: 0.2,
                width: 300,
                borderRadius: 5,
              }}
            ></View> */}

            <View style={{ flexDirection: "column", marginTop: 20 }}>
              <Text
                style={{
                  marginRight: 8,
                  fontSize: 13,
                  marginLeft: 15,
                  marginTop: 0,
                  fontFamily: themes.fontFamily.Normal,
                }}
              >
                {lang.city[LangId]}
              </Text>
              <DropDownPicker
                items={CityArray[0]}
                // defaultValue={City}
                containerStyle={{ height: 31, width: "95%" }}
                style={{
                  backgroundColor: "#fff",
                  marginLeft: 10,
                  marginRight: 9,
                  borderColor: "transparent",
                }}
                itemStyle={{
                  justifyContent: "flex-start",
                }}
                dropDownStyle={{
                  backgroundColor: "#fff",
                  fontFamily: themes.fontFamily.Normal,
                  marginHorizontal: 10,
                  width: "94.5%",
                }}
                onChangeItem={(item) => setcity_id(item.value)}
              />
              {/* <TextInput
                value={City}
                onChangeText={(text) => setCity(text)}
                editable={isEdit}
                style={{
                  marginRight: 8,
                  fontSize: 13,
                  marginLeft: 15,
                  marginTop: 0,
                  fontFamily: themes.fontFamily.Bold,
                  color: "#000",
                  borderBottomWidth: 0.5,
                  marginRight: 30,
                  paddingBottom: 5,
                  paddingLeft: 0,
                  paddingTop: 0,
                }}
              /> */}
              {/* <Text
                style={{
                  marginRight: 8,
                  fontSize: 14,
                  marginLeft: 15,
                  marginTop: 0,
                  fontFamily: themes.fontFamily.Bold,
                }}
              >
                {City}
              </Text> */}
            </View>

            {/* <View
              style={{
                marginTop: 7,
                marginBottom: 1,
                marginLeft: 10,
                borderColor: "grey",
                borderWidth: 0.3,
                height: 0.2,
                width: 300,
                borderRadius: 5,
              }}
            ></View> */}

            <View style={{ flexDirection: "column", marginTop: 20 }}>
              <Text
                style={{
                  marginRight: 8,
                  fontSize: 13,
                  marginLeft: 15,
                  marginTop: 0,
                  fontFamily: themes.fontFamily.Normal,
                }}
              >
                {lang.gender[LangId]}
              </Text>
              <Text
                style={{
                  marginRight: 8,
                  fontSize: 14,
                  marginLeft: 15,
                  marginTop: 0,
                  fontFamily: themes.fontFamily.Bold,
                }}
              >
                {Gender}
              </Text>
            </View>
          </View>
          <Text
            style={{
              marginRight: 8,
              fontSize: 20,
              marginLeft: 15,
              marginTop: 20,
              fontFamily: themes.fontFamily.Bold,
            }}
          >
            {lang.required_documents[LangId]}
          </Text>

          <View
            style={{
              marginTop: 7,
              marginBottom: 1,
              marginLeft: 10,
              borderColor: "grey",
              borderWidth: 0.3,
              height: 75,
              width: 340,
              borderRadius: 5,
            }}
          >
            <View style={{ flexDirection: "column", marginTop: 20 }}>
              <Text
                style={{
                  marginRight: 8,
                  fontSize: 14,
                  marginLeft: 15,
                  marginTop: 0,
                  fontFamily: themes.fontFamily.Bold,
                }}
              >
                {lang.adhar[LangId]}
              </Text>
              <Text
                style={{
                  marginRight: 8,
                  fontSize: 13,
                  marginLeft: 15,
                  marginTop: 0,
                  fontFamily: themes.fontFamily.Normal,
                }}
              >
                {Aadhar}{" "}
              </Text>
            </View>
          </View>

          <View
            style={{
              marginTop: 7,
              marginBottom: 1,
              marginLeft: 10,
              borderColor: "grey",
              borderWidth: 0.3,
              height: 75,
              width: 340,
              borderRadius: 5,
            }}
          >
            <View style={{ flexDirection: "column", marginTop: 20 }}>
              <Text
                style={{
                  marginRight: 8,
                  fontSize: 14,
                  marginLeft: 15,
                  marginTop: 0,
                  fontFamily: themes.fontFamily.Bold,
                }}
              >
                {lang.vehicle_number[LangId]}
              </Text>
              <Text
                style={{
                  marginRight: 8,
                  fontSize: 13,
                  marginLeft: 15,
                  marginTop: 0,
                  fontFamily: themes.fontFamily.Normal,
                }}
              >
                {VehicleNo}
              </Text>
            </View>
          </View>

          <View
            style={{
              marginTop: 7,
              marginBottom: 1,
              marginLeft: 10,
              borderColor: "grey",
              borderWidth: 0.3,
              height: 75,
              width: 340,
              borderRadius: 5,
            }}
          >
            <View style={{ flexDirection: "column", marginTop: 20 }}>
              <Text
                style={{
                  marginRight: 8,
                  fontSize: 14,
                  marginLeft: 15,
                  marginTop: 0,
                  fontFamily: themes.fontFamily.Bold,
                }}
              >
                {lang.driving_licence[LangId]}
              </Text>
              <Text
                style={{
                  marginRight: 8,
                  fontSize: 13,
                  marginLeft: 15,
                  marginTop: 0,
                  fontFamily: themes.fontFamily.Normal,
                }}
              >
                {License}
              </Text>
            </View>
          </View>

          <View
            style={{
              marginTop: 7,
              marginBottom: 1,
              marginLeft: 10,
              borderColor: "grey",
              borderWidth: 0.3,
              height: 75,
              width: 340,
              borderRadius: 5,
            }}
          >
            <View style={{ flexDirection: "column", marginTop: 20 }}>
              <Text
                style={{
                  marginRight: 8,
                  fontSize: 14,
                  marginLeft: 15,
                  marginTop: 0,
                  fontFamily: themes.fontFamily.Bold,
                }}
              >
                {lang.pan_number[LangId]}
              </Text>
              <Text
                style={{
                  marginRight: 8,
                  fontSize: 13,
                  marginLeft: 15,
                  marginTop: 0,
                  fontFamily: themes.fontFamily.Normal,
                }}
              >
                {PanNO}
              </Text>
            </View>
          </View>

          <View
            style={{
              marginTop: 7,
              marginBottom: 1,
              marginLeft: 10,
              borderColor: "grey",
              borderWidth: 0.3,
              height: 75,
              width: 340,
              borderRadius: 5,
            }}
          >
            <View style={{ flexDirection: "column", marginTop: 20 }}>
              <Text
                style={{
                  marginRight: 8,
                  fontSize: 14,
                  marginLeft: 15,
                  marginTop: 0,
                  fontFamily: themes.fontFamily.Bold,
                }}
              >
                {lang.insurance_details[LangId]}
              </Text>
              <Text
                style={{
                  marginRight: 8,
                  fontSize: 13,
                  marginLeft: 15,
                  marginTop: 0,
                  fontFamily: themes.fontFamily.Normal,
                }}
              >
                {InNO}
              </Text>
            </View>
          </View>

          <View
            style={{
              marginTop: 7,
              marginLeft: 5,
              width: 340,
              borderRadius: 5,
            }}
          >
            <TouchableOpacity style={styles.loginBtn} onPress={() => _signUp()}>
              <Text style={styles.buttontext}>{lang.done[LangId]}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: "1%",
    alignItems: "center",
  },
  input: {
    width: 300,
    height: 40,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 20,
    padding: 5,
    color: "#000",
    fontSize: 16,
    borderColor: "#d9d9d9",
    borderWidth: 0.5,
    fontFamily: themes.fontFamily.Bold,
  },
  logintext: {
    padding: 5,
    marginLeft: 10,
    color: "#000000",
    fontSize: 22,
  },
  period: {
    borderRadius: 5,
    borderColor: "#fff",
    borderWidth: 1,

    marginHorizontal: 5,
  },
  periodActive: {
    backgroundColor: "#333",
  },

  loginBtn: {
    borderRadius: 5,
    height: 39,
    width: 320,
    marginLeft: 19,
    marginRight: 60,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop: 30,
    backgroundColor: "#F87300",
    marginBottom: "5%",
  },
  buttontext: {
    color: "#fff",
    fontSize: 16,
    fontFamily: themes.fontFamily.Bold,
  },
  buttongender: {
    color: "#fff",
    // padding:20,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 12,
    textAlign: "center",
  },
});

import React, {useState} from 'react';
import {
    View,
    Button, Text,
    TextInput, TouchableOpacity,
    StyleSheet, Image, StatusBar,
} from 'react-native';
import {getStoreValue} from '../../Tools/StoreHandler';
import {useDispatch} from 'react-redux';
import {getItemFromStorage, saveToStorage} from '../../utils/AccessStorage';
import {Images, themes} from '../../utils';
import Appicon from '../../components/Appicon';
import {ScrollView} from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-datepicker';


export default function signUp({navigation}) {
    const dispatch = useDispatch();

    const [Name, setName] = useState('');
    const [Date, setDate] = useState('');
    const [Email, setEmail] = useState('');
    const [city_id, setcity_id] = useState('');
    const [Vehicle, setVehicle] = useState([]);
    const [Vehicle_id, setVehicle_id] = useState([]);
    const [Gender, setGender] = useState(null);
    const [Phone, SetPhone] = useState('');
    const [City, setCity] = useState([]);

    const [radioSelected, SetradioSelected] = useState('1');

    const [pressed, setpressed] = useState(false);
    const [pressedon, setpressedon] = useState(false);

    StatusBar.setHidden(true);
    React.useEffect(() => {
        // Create an scoped async function in the hook
        async function anyNameFunction() {
            const GetDetails = await getItemFromStorage('PhoneNumber');
            // const name = await getItemFromStorage('SUName')
            // const date = await getItemFromStorage('SUDate')
            // const email = await getItemFromStorage('SUEmail')
            // const city = await getItemFromStorage('SUCity')
            // const vehicle = await getItemFromStorage('SUVehicle')
            // const gender = await getItemFromStorage('SUGender')
            if (!GetDetails) {
            } else {
                SetPhone(GetDetails);
            }
            //alert("Hi"+name)
            // if (!name) { }else { setName(name) }
            // if (!date) { }else { setDate(date) }
            // if (!email) { }else { setEmail(email) }
            // if (!city) { }else { setCity(city) }
            // if (!vehicle) { }else { setVehicle(vehicle) }
            // if (!gender) { }else { setGender(gender) }
            getcity();

            getvehicle();


        }

        //   const unsubscribe  = navigation.addListener("focus", () =>
        //   refreshPage()
        // );
        // return () => {
        //   // clean up event listener
        //   unsubscribe
        // }
        // Execute the created function directly
        anyNameFunction();
    }, []);

    function getcity() {
        fetch(
            'https://www.tallo.in/was/cities',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            },
        )
            .then(function (response) {
                return response.json();
            })
            .then(data => {
                console.log('In fetch++++++++++', data);
                if (data['statusCode'] == 'SUCCESS') {
                    //setisPlusPressed(true)
                    isPlusPressed = true;
                    var count = data.cities.length;
                    //alert(count);
                    let drop_down_data = [];
                    for (var i = 0; i < count; i++) {
                        console.log('In loopp', data.cities[i].city_name); // I need to add
                        drop_down_data.push({
                            label: data.cities[i].city_name,
                            value: data.cities[i].city_id,
                        }); // Create your array of data
                    }
                    setCity(City => [...City, drop_down_data]);
                }
            });
    }


    function getvehicle() {
        fetch(
            'https://www.tallo.in/was/vehicles',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            },
        )
            .then(function (response) {
                return response.json();
            })
            .then(data => {
                console.log('In fetch++++++++++', data);
                if (data['statusCode'] == 'SUCCESS') {
                    //setisPlusPressed(true)
                    isPlusPressed = true;
                    var count = data.vehicles.length;
                    //alert(count);
                    let drop_down_data = [];
                    for (var i = 0; i < count; i++) {
                        console.log('In loopp', data.vehicles[i].city_name); // I need to add
                        drop_down_data.push({
                            label: data.vehicles[i].vehicle_name,
                            value: data.vehicles[i].id,
                        }); // Create your array of data
                    }
                    setVehicle(Vehicle => [...Vehicle, drop_down_data]);
                }
            });
    }


//  async function refreshPage(){
//   const name = await getItemFromStorage('SUName')
//       const date = await getItemFromStorage('SUDate')
//       const email = await getItemFromStorage('SUEmail')
//       const city = await getItemFromStorage('SUCity')
//       const vehicle = await getItemFromStorage('SUVehicle')
//       const gender = await getItemFromStorage('SUGender')
//      // if (!GetDetails) { }else { SetPhone(GetDetails) }
//       alert(name)
//       if(name!=""){
//         setName(name)
//       }
//       //if (!name) { }else { setName(name) }
//       // if (!date) { }else { setDate(date) }
//       // if (!email) { }else { setEmail(email) }
//       // if (!city) { }else { setCity(city) }
//       // if (!vehicle) { }else { setVehicle(vehicle) }
//       // if (!gender) { }else { setGender(gender) }

//   }


    function _signUp() {

        // saveToStorage("SUName",Name)
        // saveToStorage("SUDate",Date)
        // saveToStorage("SUEmail",Email)
        // saveToStorage("SUCity",City)
        // saveToStorage("SUVehicle",Vehicle)
        // saveToStorage("SUGender",Gender)


        var request = {
            'Name': Name,
            'Date': Date,
            'Email': Email,
            'City': city_id,
            'Vehicle': Vehicle_id,
            'gender': Gender,
            'phone': Phone,
            'navigation': navigation,
        };
        //alert(Vehicle)
        dispatch({type: 'NEW_REGISTRATION', payload: request});


    }


    function selectGender(Status) {
        // alert(Status)
        setGender(Status);
    }


    return (
        <View style={{flex: 1, backgroundColor: '#fff', marginBottom: '1%'}}>
            {/* <ScrollView> */}


            <View style={styles.container}>


                <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    marginBottom: 100,
                    height: 5,
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                }}>
                    <Image style={{width: 302, height: 280, alignSelf: 'center'}}
                           source={require('../../assets/Images/loginshape.png')}/>
                    <Image style={{marginTop: 0, marginBottom: 0,  width: 150, height: 47, marginLeft: 5}}
                           source={require('../../assets/Images/largeLogo.png')}/>
                </View>


                <View style={{textAlign: 'left', marginTop: '55%'}}>
                    <Text style={[styles.logintext, {color: '#000000', fontFamily: 'Baloo2-Bold'}]}>Rider
                        Registration</Text>
                    <View style={{marginTop: 20}}>
                        <TextInput
                            style={styles.input}
                            placeholder='Full Name*'
                            autoCapitalize="none"
                            placeholderTextColor="#d9d9d9"
                            onChangeText={(mobile) => setName(mobile)}
                        />

                        <DatePicker
                            // style={{flexDirection: 'row'}}
                            date={Date}
                            mode="date"
                            placeholder="DD-MM-YYYY*"
                            format="DD-MM-YYYY"
                            // minDate="2016-05-01"
                            // maxDate="2016-06-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            showIcon="false"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 180,
                                    // right: 10,
                                    padding: 5,
                                    marginLeft: 0,
                                    bottom: 20,
                                    top: -6,
                                },
                                dateInput: {
                                    flexGrow: 1,
                                    // marginLeft: 36,
                                    width: '100%',
                                    height: 30,
                                    marginLeft: 15,
                                    //marginRight: 15,
                                    marginBottom: 20,
                                    padding: 5,
                                    color: '#000',
                                    fontSize: 16,
                                    borderColor: '#d9d9d9',
                                    borderWidth: 0.5,
                                    fontFamily: themes.fontFamily.Normal,
                                },

                            }}
                            onDateChange={(Date) => setDate(Date)}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder='Mail id (optional)'
                            autoCapitalize="none"
                            placeholderTextColor="#d9d9d9"
                            onChangeText={(mobile) => setEmail(mobile)}
                        />
                        {/* <TextInput
                style={styles.input}
                placeholder='City*'
                autoCapitalize="none"
                placeholderTextColor="#d9d9d9"
                onChangeText={(mobile) => setCity(mobile)}
              /> */}

                        <View style={{minHeight: 50}}>

                            <DropDownPicker
                                items={City[0]}
                                // defaultValue={Vehicle}
                                containerStyle={{height: 31}}
                                placeholder="City*"
                                style={{
                                    backgroundColor: '#fff',
                                    marginLeft: 10,
                                    marginRight: 9,
                                    borderColor: '#d9d9d9',
                                }}
                                placeholderStyle={{
                                    color: '#d9d9d9',
                                    fontSize: 16,
                                    fontFamily: themes.fontFamily.Normal,
                                }}
                                itemStyle={{
                                    justifyContent: 'flex-start',
                                }}
                                dropDownStyle={{backgroundColor: '#fff', fontFamily: themes.fontFamily.Normal}}
                                onChangeItem={item => setcity_id(item.value)}
                            />
                        </View>

                        <View style={{minHeight: 50}}>

                            <DropDownPicker
                                items={Vehicle[0]}
                                // defaultValue={Vehicle}
                                containerStyle={{height: 31}}
                                placeholder="Vehicle*"
                                style={{
                                    backgroundColor: '#fff',
                                    marginLeft: 10,
                                    marginRight: 9,
                                    borderColor: '#d9d9d9',
                                }}
                                placeholderStyle={{
                                    color: '#d9d9d9',
                                    fontSize: 16,
                                    fontFamily: themes.fontFamily.Normal,
                                }}
                                itemStyle={{
                                    justifyContent: 'flex-start',
                                }}
                                dropDownStyle={{backgroundColor: '#fff', fontFamily: themes.fontFamily.Normal}}
                                onChangeItem={item => setVehicle_id(item.value)}
                            />

                        </View>
                        <View style={{
                            flexDirection: 'row', marginTop: 15, padding: 5,
                            marginLeft: 15,
                        }}>
                            <Text style={{
                                textAlign: 'center',
                                paddingTop: 5,
                                fontFamily: themes.fontFamily.Normal,
                            }}>Gender*</Text>
                            <TouchableOpacity style={{
                                backgroundColor: Gender != 'Male' ? '#d9d9d9' : '#F87300',
                                width: 70,
                                marginLeft: 20,
                                borderRadius: 3,
                            }}
                                              onPress={selectGender.bind(this, 'Male')}
                            >
                                <Text style={styles.buttongender}>Male</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                backgroundColor: Gender != 'Female' ? '#d9d9d9' : '#F87300',
                                marginLeft: 10,
                                width: 70,
                                borderRadius: 3,
                            }}
                                              onPress={selectGender.bind(this, 'Female')}
                            >
                                <Text style={styles.buttongender}>Female</Text>
                            </TouchableOpacity>

                        </View>
                        <TouchableOpacity style={styles.loginBtn} onPress={() => _signUp()}>
                            <Text style={styles.buttontext}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>


            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Image style={{marginTop: 120, width: 162, height: 35, marginRight: 60, marginBottom: 10}}
                       source={require('../../assets/Images/MadeInIndia.png')}/>

                <Image style={{height: '100%'}} source={require('../../assets/Images/FootImage.png')}/>

            </View>

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    input: {
        width: 300,
        height: 30,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 20,
        padding: 5,
        color: '#000',
        fontSize: 16,
        borderColor: '#d9d9d9',
        borderWidth: 0.5,
        fontFamily: themes.fontFamily.Normal,
    },
    input1: {
        width: 300,
        height: 30,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 90,
        padding: 5,
        //color: '#000',
        fontSize: 16,
        // borderColor: "#d9d9d9",
        // borderWidth: 0.5,
        fontFamily: themes.fontFamily.Normal,
    },
    logintext: {
        padding: 5,
        marginLeft: 10,
        color: '#000000',
        fontSize: 22,
    },
    period: {
        borderRadius: 5,
        borderColor: '#fff',
        borderWidth: 1,

        marginHorizontal: 5,
    },
    periodActive: {
        backgroundColor: '#333',
    },

    loginBtn: {
        borderRadius: 5,
        height: 35,
        marginLeft: 50,
        marginRight: 60,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 20,
        backgroundColor: '#F87300',
        //marginBottom:"10%"
    },
    buttontext: {
        color: '#fff',
        fontSize: 16, fontWeight: 'bold',
    },
    buttongender: {
        // color: '#fff',
        // padding:20,
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: 12, textAlign: 'center',
        fontFamily: themes.fontFamily.Normal,
    },
});

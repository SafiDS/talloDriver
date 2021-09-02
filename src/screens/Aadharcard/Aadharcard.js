import React, {useState} from 'react';
import {
    View,
    Button, Text,
    TextInput, TouchableOpacity,
    StyleSheet, Image, StatusBar, ToastAndroid,
} from 'react-native';
import {getStoreValue} from '../../Tools/StoreHandler';
import {useDispatch} from 'react-redux';
import {getItemFromStorage, saveToStorage} from '../../utils/AccessStorage';
import {Images, themes} from '../../utils';
import Appicon from '../../components/Appicon';
import {ScrollView} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import {navigate, navigateScreen} from '../../Tools/NavigationServices';
import ImgToBase64 from 'react-native-image-base64';
import lang from '../../language/lang_values';


export default function Aadharcard({navigation}) {
    const dispatch = useDispatch();

    const [Name, setName] = useState('');
    const [Date, setDate] = useState('');
    const [Email, setEmail] = useState('');
    const [City, setCity] = useState('');
    const [Gender, setGender] = useState('');
    const [Phone, SetPhone] = useState('');
    const [AadharNo, setAadharNo] = useState('');
    const [Imagefront, setImagefront] = useState('');
    const [Imageback, setImageback] = useState('');
    const [LangId, setLangId] = useState('');
    const [filePathFront, setFilePathFront] = useState({});
    const [filePathBack, setFilePathBack] = useState({});

    StatusBar.setHidden(true);
    React.useEffect(() => {

        // Create an scoped async function in the hook
        async function anyNameFunction() {
            const GetDetails = await getItemFromStorage('adhar');
            const img1 = await getItemFromStorage('adharimg1');
            const img2 = await getItemFromStorage('adharimg2');
            const lanid = await getItemFromStorage('LangId');
            if (!GetDetails) {
            } else {
                setAadharNo(GetDetails);
            }
            if (!img1) {
            } else {
                setImagefront(img1);
            }
            if (!img2) {
            } else {
                setImageback(img2);
            }
            if (!lanid) {
            } else {
                setLangId(lanid);
            }

        }

        anyNameFunction();
        const unsubscribe = navigation.addListener('focus', () =>
            refreshPage(),
        );
        return () => {
            // clean up event listener
            unsubscribe;
        };
        //
        // Execute the created function directly

    }, []);


    async function refreshPage() {
        const GetDetails = await getItemFromStorage('adhar');
        const img1 = await getItemFromStorage('adharimg1');
        const img2 = await getItemFromStorage('adharimg2');
        const lanid = await getItemFromStorage('LangId');
        if (!GetDetails) {
        } else {
            setAadharNo(GetDetails);
        }
        if (!img1) {
        } else {
            setImagefront(img1);
        }
        if (!img2) {
        } else {
            setImageback(img2);
        }
        if (!lanid) {
        } else {
            setLangId(lanid);
        }


    }

    const chooseFile1 = (type, str) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
        };
        launchImageLibrary(options, (response) => {
            console.log('Response = ', response);

            if (str == 'front') {
                setFilePathFront(response.uri);
                setImagefront(response.uri);

            } else {
                setFilePathBack(response.uri);
                setImageback(response.uri);
            }
            //setFilePath(response);
        });
    };

    function _signUp(str) {
        // Alert.alert('hi')
        chooseFile1('Image', str);

    }

    function _signUp1() {

        var licno = AadharNo;
        var img1 = Imagefront;
        var img2 = Imageback;


        saveToStorage('adhar', licno);
        saveToStorage('adharimg1', img1);
        saveToStorage('adharimg2', img2);

        if (AadharNo == '') {
            ToastAndroid.showWithGravity('Please enter the details', ToastAndroid.LONG, ToastAndroid.CENTER);
        } else if (Imagefront == '') {
            ToastAndroid.showWithGravity('Please enter the details', ToastAndroid.LONG, ToastAndroid.CENTER);

        } else if (Imageback == '') {
            ToastAndroid.showWithGravity('Please enter the details', ToastAndroid.LONG, ToastAndroid.CENTER);
        } else {

            ImgToBase64.getBase64String(Imagefront) // Image URL
                .then(
                    (base64String) => {
                        //setProfile(base64String)
                        selectGender(base64String);
                    })
                .catch(
                    (error) => {
                        console.log(error);
                    });
            // var request = {
            //   "AadharNo": AadharNo,
            //   "ACFrontImage": filePathFront,
            //   "ACBackImage": filePathBack,

            //   "navigation": navigation
            // }
            // dispatch({ type: 'Adar_card', payload: request })
        }

    }

    function selectGender(image) {
        if (image != '') {
            ImgToBase64.getBase64String(Imageback) // Image URL
                .then(
                    (base64String) => {
                        //setProfile(base64String)
                        selectGender1(base64String, image);
                    })
                .catch(
                    (error) => {
                        console.log(error);
                    });
        }

    }

    async function selectGender1(img, img1) {
        var id = await getItemFromStorage('RiderId');
        console.log(img);
        console.log(img1);
        fetch(
            'https://www.tallo.in/was/rider_full_profile_update',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'rider_id': id,
                    'full_name': '',
                    'email': '',
                    'dob': '',
                    'city': '',
                    'gender': '',
                    'devicetoken': '',
                    'driving_license_number': '',
                    'driving_license_front_image': '',
                    'driving_license_back_image': '',
                    'rc_number': '',
                    'rc_front_image': '',
                    'rc_back_image': '',
                    'insurance_number': '',
                    'insurance_front_image': '',
                    'insurance_back_image': '',
                    'pancard_number': '',
                    'pancard_image': '',
                    'aadharcard_number': AadharNo,
                    'aadharcard_front_image': img,
                    'aadharcard_back_image': img1,
                    'bank_account_holder_name': '',
                    'bank_account_number': '',
                    'bank_name': '',
                    'bank_ifsc': '',
                    'profile_image': '',

                }),
            },
        )
            .then(function (response) {
                return response.json();
            })
            .then(data => {
                console.log('In fetch++++++++++', data);
                if (data['statusCode'] == 'SUCCESS') {
                    navigate('Bankdetails');
                }
            });

    }


    return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>


            <ScrollView>
                {/* <View style = {{height:130 , backgroundColor:'#F87300'  }}>
      <Appicon icon={require("../../assets/icons/tallo-logo-main.png")} />
      </View> */}


                <View style={{
                    marginTop: 1,
                    marginBottom: 190,
                    marginLeft: 0,
                    height: 5,
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                }}>
                    <Image style={{width: 392, height: 240, alignSelf: 'center'}}
                           source={require('../../assets/Images/logoscreen.png')}/>
                    {/* <Image style={{ marginTop:0 , marginBottom:0, width: 102, height: 40,marginLeft:15 }} source={require('../../assets/icons/tallo-logo-main.png')} /> */}

                    <View style={{marginTop: 1, marginBottom: 40, marginLeft: 0, height: 5, flexDirection: 'row'}}>
                        <Image style={{marginTop: -50, marginBottom: 0, width: 150, height: 47, marginLeft: 75}}
                               source={require('../../assets/Images/largeLogo.png')}/>
                    </View>
                    <TouchableOpacity onPress={() => navigate('Pancard')}>
                        <Image style={{marginTop: 10, marginBottom: 0, width: 42, height: 42, marginLeft: 15}}
                               source={require('../../assets/Images/BackButton.png')}/>
                    </TouchableOpacity>

                </View>

                <View style={styles.container}>


                    <View style={{textAlign: 'left'}}>
                        <Text style={[styles.logintext, {
                            color: '#000000',
                            fontFamily: themes.fontFamily.Bold,
                        }]}>{lang.adhar_details[LangId]}</Text>
                        <View style={{marginTop: 20}}>

                            <TextInput
                                style={styles.input}
                                placeholder={lang.adhar[LangId] + '*'}
                                autoCapitalize="none"
                                placeholderTextColor="#808080"
                                defaultValue={AadharNo}
                                onChangeText={(AadharNo) => setAadharNo(AadharNo)}
                                maxLength={20}

                            />

                            {
                                Imagefront ?
                                    <View style={styles.imageAvater}>

                                        <TouchableOpacity style={styles.uploadImageBtn1}
                                                          onPress={() => _signUp('front')}>
                                            <Image
                                                source={{uri: Imagefront}}
                                                style={{width: 270, height: 150}}
                                            />
                                        </TouchableOpacity>
                                    </View> :
                                    <View style={styles.imageAvater}>

                                        <TouchableOpacity style={styles.uploadImageBtn}
                                                          onPress={() => _signUp('front')}>
                                            <AntDesign name="upload" size={30} color="#808080"/>
                                            <Text style={styles.uploadtext}>{lang.upload_adhar_front[LangId]}</Text>
                                        </TouchableOpacity>
                                    </View>}


                            {
                                Imageback ?
                                    <View style={styles.imageAvater}>

                                        <TouchableOpacity style={styles.uploadImageBtn1}
                                                          onPress={() => _signUp('back')}>
                                            <Image
                                                source={{uri: Imageback}}
                                                style={{width: 270, height: 150}}
                                            />
                                        </TouchableOpacity>
                                    </View> :
                                    <View style={styles.imageAvater}>
                                        <TouchableOpacity style={styles.uploadImageBtn} onPress={() => _signUp('back')}>
                                            <AntDesign name="upload" size={30} color="#808080"/>
                                            <Text style={styles.uploadtext}>{lang.upload_adhar_back[LangId]}</Text>
                                        </TouchableOpacity>
                                    </View>}


                            <TouchableOpacity style={styles.loginBtn} onPress={() => _signUp1()}>
                                <Text style={styles.buttontext}>{lang.confirm[LangId]}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

            </ScrollView>
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
        width: 370,
        height: 40,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 20,
        padding: 5,
        color: '#000',
        fontSize: 16,
        borderColor: 'black',
        borderWidth: 0.5,
        borderRadius: 10,
        fontFamily: themes.fontFamily.Normal,


    },
    logintext: {
        padding: 5,
        marginLeft: 10,
        color: '#000000',
        fontSize: 20,
        marginTop: 5,
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
        borderRadius: 10,
        height: 40,
        marginLeft: 50,
        marginRight: 60,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 20,
        backgroundColor: '#F87300',
        marginBottom: 30,
    },

    uploadImageBtn: {
        borderRadius: 5,
        height: 35,
        // marginLeft: 50,
        // marginRight: 60,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        // marginTop: 40,
        // backgroundColor: "#F87300",
        marginTop: 50,
    },
    uploadImageBtn1: {
        borderRadius: 5,
        height: 35,
        // marginLeft: 50,
        // marginRight: 60,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        // marginTop: 40,
        // backgroundColor: "#F87300",
        marginTop: 40,
    },
    imageAvater: {
        paddingVertical: 30,
        padding: 50,
        width: 290,
        height: 170,
        borderRadius: 7,
        marginLeft: 40,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderStyle: 'dashed',
        margin: 10,
    },
    imageAvater1: {
        paddingVertical: 30,
        padding: 40,
        width: 300,
        height: 180,
        borderRadius: 7,
        marginLeft: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderStyle: 'dashed',
        margin: 5,
    },
    buttontext: {
        color: '#fff',
        fontSize: 16,
        fontFamily: themes.fontFamily.Bold,
    },
    uploadtext: {
        color: '#808080',
        fontSize: 16,
        marginTop: 5,
        fontFamily: themes.fontFamily.Bold,
    },
    buttongender: {
        // color: '#fff',
        // padding:20,
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: 12, textAlign: 'center',
    },
});

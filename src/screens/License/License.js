import React, {useState} from 'react';
import {
    View,
    Button, Text, Modal,
    TextInput, TouchableOpacity, ToastAndroid,
    StyleSheet, Image, StatusBar, Alert,
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
import lang from '../../language/lang_values';

import ImgToBase64 from 'react-native-image-base64';

//import * as ImagePicker from 'react-native-image-picker';

export default function License({navigation}) {
    const dispatch = useDispatch();

    const [LisenceNo, setLisenceNo] = useState('');
    const [Imagefront, setImagefront] = useState('');
    const [Imageback, setImageback] = useState('');
    const [LangId, setLangId] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const [filePathFront, setFilePathFront] = useState({});
    const [filePathBack, setFilePathBack] = useState({});

    StatusBar.setHidden(true);
    React.useEffect(() => {

        // Create an scoped async function in the hook
        async function anyNameFunction() {
            const GetDetails = await getItemFromStorage('lic');
            const img1 = await getItemFromStorage('img1');
            const img2 = await getItemFromStorage('img2');
            const lanid = await getItemFromStorage('LangId');

            if (!GetDetails) {
            } else {
                setLisenceNo(GetDetails);
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
        // Execute the created function directly

    }, []);

    async function refreshPage() {

        const GetDetails = await getItemFromStorage('lic');
        const img1 = await getItemFromStorage('img1');
        const img2 = await getItemFromStorage('img2');
        const lanid = await getItemFromStorage('LangId');

        if (!GetDetails) {
        } else {
            setLisenceNo(GetDetails);
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
            //alert(lanid)
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


            // console.log('fileName -> ', response.fileName);
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

        var licno = LisenceNo;
        var img1 = Imagefront;
        var img2 = Imageback;


        saveToStorage('lic', licno);
        saveToStorage('img1', img1);
        saveToStorage('img2', img2);


        if (LisenceNo == '') {
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
            //     "LisenceNo": LisenceNo,
            //     "FrontImage": filePathFront,
            //     "BackImage": filePathBack,
            //     "navigation": navigation
            //   }
            //   dispatch({ type: 'DRIVING_LICENSE', payload: request })
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
                    'driving_license_number': LisenceNo,
                    'driving_license_front_image': img,
                    'driving_license_back_image': img1,
                    'rc_number': '',
                    'rc_front_image': ' ',
                    'rc_back_image': ' ',
                    'insurance_number': '',
                    'insurance_front_image': ' ',
                    'insurance_back_image': ' ',
                    'pancard_number': '',
                    'pancard_image': '',
                    'aadharcard_number': '',
                    'aadharcard_front_image': '',
                    'aadharcard_back_image': '',
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
                // setModalVisible(!modalVisible);
                if (data['statusCode'] == 'SUCCESS') {
                    navigate('RCDocument');
                    //setModalVisible(!modalVisible);
                }
            });

    }

    function _signUp2() {


        setModalVisible(!modalVisible);

    }

    return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>

            <ScrollView>
                {/* <View style = {{height:130 , backgroundColor:'#F87300'  }}>
      <Appicon icon={require("../../assets/icons/tallo-logo-main.png")} />
      </View> */}


                <View style={{
                    marginTop: 1,
                    marginBottom: 140,
                    marginLeft: 0,
                    height: 5,
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                }}>
                    <Image style={{width: 470, height: 200, alignSelf: 'center'}}
                           source={require('../../assets/Images/Pathlogo.png')}/>
                    {/* <Image style={{ marginTop:0 , marginBottom:0, width: 102, height: 40,marginLeft:45 }} source={require('../../assets/icons/tallo-logo-main.png')} /> */}
                    {/* <Text style = {{fontSize:20 , fontWeight:'bold' ,color:'#ffffff', marginBottom:5 , marginTop:100}}>Choose Language</Text> */}

                    <View style={{marginTop: 1, marginBottom: 50, marginLeft: 0, height: 5, flexDirection: 'row'}}>
                        {/* <Image style={{ marginTop:0 , marginBottom:0, width: 32, height: 30,marginLeft:5 }} source={require('../../assets/Images/BackButton.png')} /> */}

                        <Image style={{marginTop: -30, marginBottom: 0, width: 150, height: 47, marginLeft: 80}}
                               source={require('../../assets/Images/largeLogo.png')}/>

                    </View>
                    <TouchableOpacity onPress={() => navigate('Language')}>
                        <Image style={{marginTop: 10, marginBottom: 0, width: 42, height: 42, marginLeft: 15}}
                               source={require('../../assets/Images/BackButton.png')}/>
                    </TouchableOpacity>

                </View>

                <View style={styles.container}>

                    <View style={{textAlign: 'left'}}>
                        <Text style={[styles.logintext, {
                            color: '#000000',
                            fontFamily: 'Baloo2-Bold',
                        }]}>{lang.driving_licence[LangId]}</Text>
                        <View style={{marginTop: 10}}>

                            <TextInput
                                style={styles.input}

                                defaultValue={LisenceNo}

                                placeholder={lang.licence_number[LangId] + '*'}
                                autoCapitalize="none"
                                placeholderTextColor="#808080"
                                onChangeText={LisenceNo => setLisenceNo(LisenceNo)}
                                maxLength={20}
                            />


                            {/* <View style = {styles.imageAvater}>

                     <TouchableOpacity style={styles.uploadImageBtn} onPress={() => _signUp("front")}>{
                     filePathFront !="" ?
                     <Image
                     source={{uri: filePathFront.uri}}
                     style={styles.imageAvater1}
                   />:<View> <AntDesign name="upload" size={30} color="#808080" />
                   <Text style={styles.uploadtext}>Upload Licence(Front)</Text></View>}
                       </TouchableOpacity>
                       </View> */}


                            {/* <View style = {styles.imageAvater}>

                 <TouchableOpacity style={styles.uploadImageBtn} onPress={() => _signUp("front")}>
                   {
                     filePathFront ?
                     <Image
                     source={{uri: filePathFront.uri}}
                     style={styles.imageAvater}
                   />:
                   <View>
                  <AntDesign name="upload" size={30} color="#808080" />
                <Text style={styles.uploadtext}>Upload Licence(Front)</Text></View>
                   }


              </TouchableOpacity>


               </View> */}
                            {
                                Imagefront != '' ?
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
                                            <Text style={styles.uploadtext}>{lang.upload_licence_front[LangId]}</Text>
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
                                            <Text style={styles.uploadtext}>{lang.upload_licence_back[LangId]}</Text>

                                        </TouchableOpacity>
                                    </View>}

                            <TouchableOpacity style={styles.loginBtn} onPress={() => _signUp1()}>
                                <Text style={styles.buttontext}>{lang.confirm[LangId]}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    // Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView3}>

                    <View style={styles.modalView3}>


                        <View style={{alignItems: 'center'}}>

                            {/* <TouchableOpacity
style={{}}
  onPress={() => _signUp()}>
<Image style={{marginRight:1, width: 1, height:1 ,  marginTop:1, marginBottom:1 }} source={require('../../assets/Images/Cancel2.png')} />
   </TouchableOpacity>

*/}

                            <Image style={{marginRight: 1, width: 70, height: 70, marginTop: 26, marginBottom: 1}}
                                   source={require('../../assets/Images/greenTick.png')}/>

                            <Text style={[styles.logintextt, {
                                color: '#000000',
                                fontWeight: 'bold',
                                marginTop: 1,
                                fontSize: 19,
                            }]}>Success</Text>
                            <Text style={[styles.logintextt, {
                                color: 'grey',
                                fontWeight: 'bold',
                                marginTop: 10,
                                fontSize: 15,
                            }]}>Documents attached successfully</Text>

                        </View>


                        <TouchableOpacity style={[styles.loginBtnn3]} onPress={() => _signUp2()}>
                            <Text style={styles.buttontext}>Ok</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>
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
        width: 330,
        height: 40,
        marginLeft: 20,
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
    modalView3: {
        margin: 0,
        marginTop: 0,
        height: 240,

        width: 300,
        backgroundColor: 'white',
        borderRadius: 1,
        // padding: 35,
        // alignItems: "center",
        shadowColor: '#000',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    centeredView3: {
        flex: 1, justifyContent: 'center', alignItems: 'center',
    },
    loginBtnn3: {
        borderRadius: 1,
        height: 25,
        width: 100,
        marginLeft: 1,
        marginRight: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 40,
        backgroundColor: '#F87300',
        marginBottom: 1,
        borderColor: 'white',
        borderWidth: 0.5,
    },
    logintext: {
        padding: 0,
        marginLeft: 25,
        color: '#000000',
        fontSize: 20,
        marginTop: 0,
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
        marginBottom: 0,
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
        // paddingVertical: 30,
        // padding:40,
        width: 300,
        height: 180,
        //borderRadius: 7,
        marginLeft: 10,
        //backgroundColor:'#fff',
        //borderWidth:1,
        //borderStyle: 'dashed',
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

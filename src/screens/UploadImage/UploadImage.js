import React, {useState} from 'react';
import {
    View,
    Button, Text,
    TextInput, TouchableOpacity,
    StyleSheet, Image, StatusBar, Modal,
} from 'react-native';
import {getStoreValue} from '../../Tools/StoreHandler';
import {useDispatch, useSelector} from 'react-redux';
import {getItemFromStorage, saveToStorage} from '../../utils/AccessStorage';
import {Images, themes} from '../../utils';
import Appicon from '../../components/Appicon';
import {ScrollView} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import StaticText from '../../utils/StaticText';
import ImgToBase64 from 'react-native-image-base64';
import lang from '../../language/lang_values';


import {navigate, navigateScreen} from '../../Tools/NavigationServices';

export default function UploadImage({navigation}) {
    const dispatch = useDispatch();
    // const users = useSelector((state) => state.SignIn.licensedata);
    // const users1 = useSelector((state) => state.SignIn.rcdata);
    // const users2 = useSelector((state) => state.SignIn.insurancedata);
    // const users3 = useSelector((state) => state.SignIn.pcdata);
    // const users4 = useSelector((state) => state.SignIn.acdata);
    // const users5 = useSelector((state) => state.SignIn.bankdata);
    // const user_info = useSelector((state) => state.SignIn.User_info.rider_info);
    //console.log("rc",user_info)

    const [modalVisible, setModalVisible] = useState(false);
    const [LangId, setLangId] = useState('');

    const [Rider_id, setRiderId] = useState('');

    const [Profile, setProfile] = useState('');


    StatusBar.setHidden(true);
    const uploadMsg = lang.make_sure_you_upload_your_latest_picture[LangId];

    React.useEffect(() => {

        async function anyNameFunction() {

            const lanid = await getItemFromStorage('LangId');
            if (!lanid) {
            } else {
                setLangId(lanid);
            }


        }

//console.log("license",users.LisenceNo)
        anyNameFunction();
        const unsubscribe = navigation.addListener('focus', () =>
            refreshPage(),
        );
        return () => {
// clean up event listener
            unsubscribe;
        };
        //Create an scoped async function in the hook

    }, []);

    async function refreshPage() {
        try {
            var uri_from_RNCamera = await getItemFromStorage('uri_from_RNCamera');
            var isRNCamera = await getItemFromStorage('isRNCamera');
            const lanid = await getItemFromStorage('LangId');
            if (!lanid) {
            } else {
                setLangId(lanid);
            }

            if (uri_from_RNCamera != '' && isRNCamera == 'true') {
                // alert(isRNCamera)
                saveToStorage('isRNCamera', 'false');
                //setModalVisible(true);
                setProfile(uri_from_RNCamera);
                //alert(uri_from_RNCamera)
                saveToStorage('Image', uri_from_RNCamera);

            }

        } catch (e) {

        }
    }


    function _signUp1(type) {

        if (type == 'camera') {
            camera();
        } else {
            launchgallery();
        }

    }

    function camera() {
//alert("hi")
        navigate('RNCamera1');
        setModalVisible(false);


    }


    function launchgallery() {
        let options = {
            mediaType: 'image',
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,

        };
        launchImageLibrary(options, (response) => {
            console.log('Response = ', response);

            saveToStorage('Image', response.uri);

            setProfile(response.uri);
            setModalVisible(false);
        });
    }


    async function _signUp() {
        ImgToBase64.getBase64String(Profile) // Image URL
            .then(
                (base64String) => {
                    // console.log(base64String);
                    saveToStorage('Profile', base64String.toString());
                    setProfile(base64String);
                    if (base64String != '') {
                        selectGender(base64String);
                    } else {
                        alert('Please select image');
                    }


                },
            )
            .catch(
                (error) => {
                    console.log(error); // Logs an error if there was one
                },
            );


    }


    async function selectGender(image) {
        var id = await getItemFromStorage('RiderId');

        // if(image!=""){

        // console.log("image",Profile)

        var request = {
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
            'aadharcard_number': '',
            'aadharcard_front_image': '',
            'aadharcard_back_image': '',
            'bank_account_holder_name': '',
            'bank_account_number': '',
            'bank_name': '',
            'bank_ifsc': '',
            'profile_image': image,
            'navigation': navigation,
        };
        //console.log("+++++Request+++++++",request)
        dispatch({type: 'Upload_Image', payload: request});
        // }
    }


    return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>


            {/* <View style = {{height:80 , backgroundColor:'#F87300' , borderBottomLeftRadius:0 , borderBottomRightRadius:0  }}>
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

                <TouchableOpacity onPress={() => navigate('Bankdetails')}>
                    <Image style={{marginTop: 10, marginBottom: 0, width: 42, height: 42, marginLeft: 15}}
                           source={require('../../assets/Images/BackButton.png')}/>
                </TouchableOpacity>

            </View>


            <View style={styles.container}>
                <View style={{marginBottom: 40, marginLeft: 0}}>
                </View>
                <View style={{textAlign: 'left'}}>
                    <Text style={[styles.logintext, {
                        color: '#000000',
                        fontFamily: themes.fontFamily.Bold,
                    }]}>{lang.upload_your_image[LangId]}</Text>
                    <View style={{marginTop: 10}}>

                    </View>
                    {
                        Profile ?
                            <View style={styles.imageAvater}>

                                <TouchableOpacity style={styles.uploadImageBtn}>
                                    <Image
                                        source={{uri: Profile}}
                                        style={styles.imageAvater}
                                    />

                                </TouchableOpacity>
                            </View> :
                            <View style={styles.imageAvater}>

                                <TouchableOpacity style={styles.uploadImageBtn}>
                                    <AntDesign name="upload" size={20} color="#808080"/>
                                    {/* <Text style={styles.uploadtext}>Upload your image</Text> */}
                                </TouchableOpacity>
                            </View>}
                </View>
                <Text style={[styles.logintext, {color: '#000000', marginTop: 10, fontSize: 14}]}>{uploadMsg}</Text>
                <Text
                    style={[styles.logintext, {color: '#000000', marginTop: 8, fontSize: 14}]}>{lang.or[LangId]}</Text>

            </View>
            <TouchableOpacity style={styles.loginBtn}
                              onPress={() => setModalVisible(true)}
            >
                <Text style={styles.buttontext}>{lang.take_selfie[LangId]}</Text>
            </TouchableOpacity>


            <TouchableOpacity style={[styles.loginBtn, {marginTop: 50, marginBottom: 10}]} onPress={() => _signUp()}>
                <Text style={styles.buttontext}>{lang.confirm[LangId]}</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <Text style={{
                            fontSize: 20,
                            marginBottom: 25,
                            marginTop: 10,
                            marginLeft: 15,
                            fontFamily: themes.fontFamily.Bold,
                        }}>{lang.choose[LangId]}</Text>
                        <View style={{
                            marginBottom: 0,
                            padding: 0,
                            margin: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                        }}>

                            <View style={{
                                marginBottom: 0,
                                padding: 0,
                                margin: 1,
                                flexDirection: 'column',
                                marginTop: -20,
                            }}>
                                <TouchableOpacity
                                    onPress={() => _signUp1('camera')}
                                >
                                    <Image style={{width: 100, height: 100}}
                                           source={require('../../assets/Images/camera.png')}/>
                                    <Text style={{
                                        fontSize: 20,
                                        marginBottom: 2,
                                        marginTop: -15,
                                        marginLeft: 20,
                                        fontFamily: themes.fontFamily.Normal,
                                    }}>{lang.camera[LangId]}</Text>
                                </TouchableOpacity>
                            </View>


                            <View style={{
                                marginBottom: 0,
                                padding: 0,
                                margin: 1,
                                flexDirection: 'column',
                                marginLeft: -20,
                            }}>
                                <TouchableOpacity
                                    onPress={() => _signUp1('gallery')}
                                >
                                    <Image style={{width: 50, height: 50}}
                                           source={require('../../assets/Images/gallery.png')}/>
                                    <Text style={{
                                        fontSize: 20,
                                        marginBottom: 2,
                                        marginTop: 15,
                                        marginLeft: 0,
                                        fontFamily: themes.fontFamily.Normal,
                                    }}>{lang.gallery[LangId]}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={{
                                fontSize: 20,
                                marginBottom: 2,
                                marginTop: 27,
                                marginLeft: 199,
                                color: 'orange',
                                fontFamily: themes.fontFamily.Normal,
                            }}>{lang.cancel[LangId]}</Text>
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
        width: 370,
        height: 40,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 15,
        borderRadius: 15,
        padding: 0,
        paddingLeft: 10,
        color: '#000',
        fontSize: 16,
        borderColor: '#d9d9d9',
        borderWidth: 1,
    },
    logintext: {
        padding: 3,
        // marginLeft: 10,
        color: '#000000',
        fontSize: 18,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        fontFamily: themes.fontFamily.Normal,
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
        marginBottom: 30,
    },
    buttontext: {
        color: '#fff',
        fontSize: 16,
        fontFamily: themes.fontFamily.Bold,
    },

    imageAvater: {
        paddingVertical: 30,
        padding: 50,
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
        // marginLeft:40,
        backgroundColor: '#fff',
        borderWidth: 1,
        // borderStyle: 'dashed',
        margin: 10,
    },
    uploadImageBtn: {
        borderRadius: 5,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 30,
    },
    uploadtext: {
        color: '#808080',
        fontSize: 16,
        marginTop: 5,
    },
    modalView: {
        margin: 4,
        backgroundColor: 'white',
        borderRadius: 2,
        padding: 3,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 5,
        height: 250,
        width: 300,
    },
    centeredView: {
        flex: 1, justifyContent: 'center', alignItems: 'center',
    },

});

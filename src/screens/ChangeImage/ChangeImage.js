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
import {navigate, navigateScreen} from '../../Tools/NavigationServices';

import Appicon from '../../components/Appicon';
import {ScrollView} from 'react-native-gesture-handler';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import StaticText from '../../utils/StaticText';
import ImgToBase64 from 'react-native-image-base64';
import lang from '../../language/lang_values';


export default function ChangeImage({navigation}) {
    const dispatch = useDispatch();
    const user_info = useSelector((state) => state.SignIn.User_info.rider_info);
    console.log('user_info', user_info);

    const [Rider_id, setRiderId] = useState('');
    const [image, setimage] = useState('');
    const [baseUrl, setbaseUrl] = useState('https://www.tallo.in/dev/uploads/riders/');
    const [Profile, setProfile] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [LangId, setLangId] = useState('');


    StatusBar.setHidden(true);
    const uploadMsg = 'Make sure you upload you latest picture';

    React.useEffect(() => {
        async function getdata() {
            const lanid = await getItemFromStorage('LangId');
            //alert(lanid)
            if (!lanid) {
            } else {
                setLangId(lanid);
            }
            var img = await getItemFromStorage('Image');
            if (img != '') {
                setimage(img);
            }

            if (user_info != null) {
                setRiderId(user_info.rider_id);
                //alert(user_info.rider_id)
            }
        }


        getdata();
        const unsubscribe = navigation.addListener('focus', () =>
            refreshPage(),
        );
        return () => {
// clean up event listener
            unsubscribe;
        };

    }, []);

    async function refreshPage() {
        const lanid = await getItemFromStorage('LangId');
        //alert("refresh"+lanid)
        if (!lanid) {
        } else {
            setLangId(lanid);
        }
        if (user_info != null) {
            setRiderId(user_info.rider_id);
            // alert(user_info.rider_id)
        }
        try {
            var uri_from_RNCamera = await getItemFromStorage('uri_from_RNCamera');
            var isRNCamera = await getItemFromStorage('isRNCamera');
            if (uri_from_RNCamera != '' && isRNCamera == 'true') {
                //alert(uri_from_RNCamera)
                setProfile(uri_from_RNCamera);
            }

        } catch (e) {

        }
    }


    function _signUp() {
        if (Profile != '') {


            ImgToBase64.getBase64String(Profile) // Image URL
                .then(
                    (base64String) => {
                        setProfile(base64String);
                        selectGender(base64String);
                    },
                )
                .catch(
                    (error) => {
                        console.log(error); // Logs an error if there was one
                    },
                );
        } else {
            navigate('RiderDetails');
        }

    }

    async function selectGender(image) {
        saveToStorage('isRNCamera', 'false');
        saveToStorage('uri_from_RNCamera', '');
        const id = await getItemFromStorage('RiderId');
        //alert(id)
        if (image != '' && id != '') {
            var request = {
                'rider_id': id,
                'profile_image': image,
                'navigation': navigation,
            };
            dispatch({type: 'RIDER_CHANGE_IMAGE', payload: request});


        }
    }


    function _signUp1(type) {

        if (type == 'camera') {
            launchcamera();
        } else {
            launchgallery();
        }

    }

    function launchcamera() {
        navigate('RNCamera1');
        // let options = {
        //   mediaType:"image",
        //   maxWidth: 300,
        //   maxHeight: 550,
        //   quality: 1,

        // };
        // launchCamera(options, (response) => {
        // console.log('Response = ', response);
        // setProfile(response.uri);
        setModalVisible(false);
        // });
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
            setProfile(response.uri);
            setModalVisible(false);
        });
    }


    return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>


            <ScrollView>
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

                    <TouchableOpacity onPress={() => navigate('UploadImage')}>
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

                        <View style={styles.imageAvater}>

                            <TouchableOpacity style={styles.uploadImageBtn}>
                                <Image style={styles.imageAvater}
                                       source={{uri: Profile ? Profile : image}}></Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <Text style={[styles.logintext, {
                    color: 'green',
                    alignSelf: 'center',
                    marginTop: 10,
                    fontSize: 16,
                }]}>{lang.profile_image_uploaded_successfully[LangId]}</Text>
                <TouchableOpacity
                    style={[styles.loginBtn, {backgroundColor: 'white', borderColor: 'red', borderWidth: 1}]}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={[styles.buttontext, {
                        color: 'red',
                        fontWeight: '100',
                    }]}>{lang.change_image[LangId]}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.loginBtn, {marginTop: 110, marginBottom: 20}]}
                                  onPress={() => _signUp()}
                >
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
                                fontWeight: 'bold',
                                marginBottom: 25,
                                marginTop: 10,
                                marginLeft: 15,
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
                                    <TouchableOpacity onPress={() => _signUp1('camera')}>
                                        <Image style={{width: 100, height: 100}}
                                               source={require('../../assets/Images/camera.png')}/>
                                        <Text style={{
                                            fontSize: 20,
                                            marginBottom: 2,
                                            marginTop: -15,
                                            marginLeft: 20,
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
                                    <TouchableOpacity onPress={() => _signUp1('gallery')}>
                                        <Image style={{width: 50, height: 50}}
                                               source={require('../../assets/Images/gallery.png')}/>
                                        <Text style={{
                                            fontSize: 20,
                                            marginBottom: 2,
                                            marginTop: 15,
                                            marginLeft: 0,
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
                                }}>{lang.cancel[LangId]}</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </Modal>
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
        fontFamily: themes.fontFamily.Bold,
    },

    loginBtn: {
        borderRadius: 5,
        height: 35,
        marginLeft: 50,
        marginRight: 60,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 50,
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
        // borderRadius: 150/2,
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

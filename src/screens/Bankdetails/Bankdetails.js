import React, {useState} from 'react';
import {
    View,
    Button, Text,
    TextInput, TouchableOpacity,
    StyleSheet, Image, StatusBar, ToastAndroid,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {getItemFromStorage, saveToStorage} from '../../utils/AccessStorage';
import {ScrollView} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {navigate} from '../../Tools/NavigationServices';
import {launchImageLibrary} from 'react-native-image-picker';
import lang from '../../language/lang_values';
import {themes} from '../../utils';


export default function Bankdetails({navigation}) {
    const dispatch = useDispatch();

    const [AccountName, setAccountName] = useState('');
    const [AccountNo, setAccountNo] = useState('');
    const [ConAccountNo, setConAccountNo] = useState('');
    const [BankName, setBankName] = useState('');
    const [IFSC, setIFSC] = useState('');
    const [Imagefront, setImagefront] = useState('');
    const [filePathFront, setFilePathFront] = useState({});
    const [LangId, setLangId] = useState('');

    StatusBar.setHidden(true);

    React.useEffect(() => {
        // Create an scoped async function in the hook
        async function anyNameFunction() {
            const GetDetails = await getItemFromStorage('bname');
            const img1 = await getItemFromStorage('accno');
            const img2 = await getItemFromStorage('conaccno');
            const img3 = await getItemFromStorage('bankname');
            const img4 = await getItemFromStorage('ifsc');
            const lanid = await getItemFromStorage('LangId');
            if (!GetDetails) {
            } else {
                setAccountName(GetDetails);
            }
            if (!img1) {
            } else {
                setAccountNo(img1);
            }
            if (!img2) {
            } else {
                setConAccountNo(img2);
            }
            if (!img1) {
            } else {
                setBankName(img3);
            }
            if (!img2) {
            } else {
                setIFSC(img4);
            }
            if (!lanid) {
            } else {
                setLangId(lanid);
            }

        }

        // Execute the created function directly
        anyNameFunction();
        const unsubscribe = navigation.addListener('focus', () =>
            refreshPage(),
        );
        return () => {
            // clean up event listener
            unsubscribe;
        };
    }, []);


    async function refreshPage() {
        const GetDetails = await getItemFromStorage('bname');
        const img1 = await getItemFromStorage('accno');
        const img2 = await getItemFromStorage('conaccno');
        const img3 = await getItemFromStorage('bankname');
        const img4 = await getItemFromStorage('ifsc');
        const lanid = await getItemFromStorage('LangId');
        if (!GetDetails) {
        } else {
            setAccountName(GetDetails);
        }
        if (!img1) {
        } else {
            setAccountNo(img1);
        }
        if (!img2) {
        } else {
            setConAccountNo(img2);
        }
        if (!img1) {
        } else {
            setBankName(img3);
        }
        if (!img2) {
        } else {
            setIFSC(img4);
        }
        if (!lanid) {
        } else {
            setLangId(lanid);
        }
    }

    function _signUp1() {

        let options = {
            mediaType: 'image',
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
        };
        launchImageLibrary(options, (response) => {
            console.log('Response = ', response);


            setFilePathFront(response.uri);
            setImagefront(response.uri);
        });

    }

    async function _signUp() {
        var id = await getItemFromStorage('RiderId');

        var name = AccountName;
        var img1 = AccountNo;
        var img2 = ConAccountNo;
        var bname = BankName;
        var ifsc = IFSC;
        var cheimg = Imagefront;

        saveToStorage('bname', name);
        saveToStorage('accno', img1);
        saveToStorage('conaccno', img2);
        saveToStorage('bankname', bname);
        saveToStorage('ifsc', ifsc);
        saveToStorage('cheimg', cheimg);


        if (AccountName == '') {
            ToastAndroid.showWithGravity('Please enter the details', ToastAndroid.LONG, ToastAndroid.CENTER);
        } else if (AccountNo == '') {
            ToastAndroid.showWithGravity('Please enter the details', ToastAndroid.LONG, ToastAndroid.CENTER);
        } else if (ConAccountNo == '') {
            ToastAndroid.showWithGravity('Please enter the details', ToastAndroid.LONG, ToastAndroid.CENTER);
        } else if (AccountNo != ConAccountNo) {
            ToastAndroid.showWithGravity('Account no. and confirm account no. should be same.', ToastAndroid.LONG, ToastAndroid.CENTER);
        } else if (BankName == '') {
            ToastAndroid.showWithGravity('Please enter the details', ToastAndroid.LONG, ToastAndroid.CENTER);
        } else if (IFSC == '') {
            ToastAndroid.showWithGravity('Please enter the details', ToastAndroid.LONG, ToastAndroid.CENTER);
        } else {
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
                        'aadharcard_number': '',
                        'aadharcard_front_image': '',
                        'aadharcard_back_image': '',
                        'bank_account_holder_name': AccountName,
                        'bank_account_number': AccountNo,
                        'bank_name': BankName,
                        'bank_ifsc': IFSC,
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
                        navigate('UploadImage');
                    }
                });
            // var request = {
            //   "AccountName": AccountName,
            //   "AccountNo": AccountNo,
            //   "BankName": BankName,
            //   "IFSC": IFSC,
            //   "navigation": navigation
            // }
            // dispatch({ type: 'Bank_Details', payload: request })
        }
    }


    return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>


            <ScrollView>
                {/* <View style = {{height:100 , backgroundColor:'#F87300' , borderBottomLeftRadius:0 , borderBottomRightRadius:0  }}>
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

                    <TouchableOpacity onPress={() => navigate('Aadharcard')}>
                        <Image style={{marginTop: 10, marginBottom: 0, width: 42, height: 42, marginLeft: 15}}
                               source={require('../../assets/Images/BackButton.png')}/>
                    </TouchableOpacity>

                </View>

                <View style={styles.container}>
                    <View style={{marginBottom: 10, marginLeft: 0}}>
                    </View>
                    <View style={{textAlign: 'left'}}>
                        <Text style={[styles.logintext, {
                            color: '#000000',
                            fontFamily: themes.fontFamily.Bold,
                        }]}>{lang.bank_details[LangId]}</Text>
                        <View style={{marginTop: 10}}>
                            <TextInput
                                style={styles.input}
                                placeholder={lang.account_name[LangId]}
                                autoCapitalize="none"
                                placeholderTextColor="#808080"
                                defaultValue={AccountName}
                                onChangeText={(AccountName) => setAccountName(AccountName)}
                                maxLength={30}

                            />
                            <TextInput
                                style={styles.input}
                                placeholder={lang.account_number[LangId]}
                                autoCapitalize="none"
                                placeholderTextColor="#808080"
                                defaultValue={AccountNo}
                                onChangeText={(AccountNo) => setAccountNo(AccountNo)}
                                maxLength={30}

                            />
                            <TextInput
                                style={styles.input}
                                placeholder={lang.confirm_account_number[LangId]}
                                autoCapitalize="none"
                                placeholderTextColor="#808080"
                                defaultValue={ConAccountNo}
                                onChangeText={(ConAccountNo) => setConAccountNo(ConAccountNo)}
                                maxLength={30}

                            />
                            <TextInput
                                style={styles.input}
                                placeholder={lang.bank_name[LangId]}
                                autoCapitalize="none"
                                placeholderTextColor="#808080"
                                defaultValue={BankName}
                                onChangeText={(BankName) => setBankName(BankName)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder={lang.ifsc[LangId]}
                                autoCapitalize="none"
                                placeholderTextColor="#808080"
                                defaultValue={IFSC}
                                onChangeText={(IFSC) => setIFSC(IFSC)}
                                maxLength={30}

                            />
                        </View>

                        {
                            Imagefront ?
                                <View style={styles.imageAvater}>

                                    <TouchableOpacity style={styles.uploadImageBtn} onPress={() => _signUp()}>
                                        <Image
                                            source={{uri: Imagefront}}
                                            style={{width: 270, height: 150}}
                                        />
                                    </TouchableOpacity>
                                </View>
                                :
                                <View style={styles.imageAvater}>

                                    <TouchableOpacity style={styles.uploadImageBtn} onPress={() => _signUp1()}>
                                        <AntDesign name="upload" size={30} color="#808080"/>
                                        <Text style={styles.uploadtext}>{lang.upload_cheque[LangId]}</Text>
                                    </TouchableOpacity>


                                </View>}
                        <TouchableOpacity style={styles.loginBtn} onPress={() => _signUp()}>
                            <Text style={styles.buttontext}>{lang.confirm[LangId]}</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: 370,
        height: 40,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 15,
        padding: 0,
        paddingLeft: 10,
        color: '#000',
        fontSize: 16,
        borderColor: '#d9d9d9',
        borderWidth: 1,
        elevation: 4,
        shadowOffset: {width: 10, height: 10},
        shadowColor: 'grey',
        shadowOpacity: 0.5,
        backgroundColor: '#fbfbfb',
        borderRadius: 20,
        fontFamily: themes.fontFamily.Normal,
    },
    logintext: {
        padding: 3,
        marginLeft: 10,
        color: '#000000',
        fontSize: 20,
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
        fontFamily: themes.fontFamily.Bold
    },

    imageAvater: {
        paddingVertical: 30,
        padding: 50,
        width: 300,
        height: 180,
        borderRadius: 7,
        marginLeft: 40,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderStyle: 'dashed',
        margin: 10,
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
    uploadtext: {
        color: '#808080',
        fontSize: 16,
        marginTop: 5,
        fontFamily: themes.fontFamily.Normal,
    },

});

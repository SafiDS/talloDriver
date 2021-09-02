import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
    Image,
    BackHandler,
    ScrollView,
    StatusBar,
    Modal,
} from 'react-native';
import {themes} from '../../utils';
import {useDispatch} from 'react-redux';
import {Button, Popup, Input} from '../../components';
// import Gender from "../../components/Gender";
import Appicon from '../../components/Appicon';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {navigate, navigateScreen} from '../../Tools/NavigationServices';
import {getItemFromStorage} from '../../utils/AccessStorage';
import lang from '../../language/lang_values';


export default function Earning({navigation}) {


    const [LangId, setLangId] = useState('');

    const [modalVisible, setModalVisible] = useState(false);

    React.useEffect(() => {
        getdata();
        const unsubscribe = navigation.addListener('focus', () =>
            refreshPage(),
        );
        return () => {
            // clean up event listener
            unsubscribe;
        };
    }, []);

    async function getdata() {
        var lanid = await getItemFromStorage('LangId');
        //alert("useeffect"+lanid)
        if (lanid != '') {
            setLangId(lanid);
        } else {
        }
    }

    function refreshPage() {
        getdata();
    }

    function _signUp() {

        var request = {
            //   "Name": Name,
            //   "Date": Date,
            //   "Email": Email,
            //   "City": City,
            //   "gender": Gender,
            'phone': '1234567890',
            'navigation': navigation,
        };
        // dispatch({ type: 'RIDER_STATUS_ONLINE1', payload: request })
        setModalVisible(!modalVisible);
    }


    StatusBar.setHidden(true);


    async function Goback() {
        var img = await getItemFromStorage('loginImage');
        if (img == 'true') {
            navigate('RiderStatusOnline1');
        } else {
            navigate('Dashboard');
        }

    }

    return (
        <View style={styles.container}>


            <View style={{flexDirection: 'row', marginTop: 20}}>
                <TouchableOpacity onPress={() => navigate('MoreDetails')}>
                    <Image
                        style={{marginRight: 20, marginTop: 5, marginBottom: 0, width: 30, height: 30, marginLeft: 10}}
                        source={require('../../assets/Images/BackButton.png')}/>
                </TouchableOpacity>

                <Text style={{
                    fontSize: 18,
                    fontFamily: themes.fontFamily.Bold,
                    color: 'black',
                    marginTop: 10,
                    marginLeft: 5,
                }}>{lang.earnings[LangId]}  </Text>
                <Text style={{
                    fontSize: 18,
                    fontFamily: themes.fontFamily.Bold,
                    color: 'black',
                    marginTop: 10,
                    marginLeft: 80,
                }}>{lang.riderId_TA6543[LangId]}  </Text>
            </View>


            <View style={{flexDirection: 'row', marginTop: 20}}>

                <TouchableOpacity style={[styles.loginBtnn, {width: '30%'}]}
                    // onPress={Signin}
                                  onPress={() => setModalVisible(true)}
                >
                    <Text style={styles.buttontextt}>{lang.Withdraw[LangId]}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.loginBtn}>
                    <Text style={styles.buttontext}>{lang.dueAmount_470[LangId]}</Text>
                </TouchableOpacity>
            </View>


            <View style={{flexDirection: 'row', marginTop: 0}}>
                <Text style={[styles.buttontext, {color: 'gray', marginLeft: 20}]}>{lang.Yesterday[LangId]}</Text>
                <Text style={[styles.buttontext, {color: 'gray', marginLeft: 39}]}>{lang.Today[LangId]}</Text>
                <Text style={[styles.buttontext, {color: 'gray', marginLeft: 39}]}>{lang.Month[LangId]}</Text>
                <Text style={[styles.buttontext, {color: 'gray', marginLeft: 39}]}>{lang.Year[LangId]}</Text>
            </View>


            <View style={{
                marginLeft: 15,
                flexDirection: 'row',
                width: '80%',
                backgroundColor: '#FFD7D7',
                marginTop: 30,
                height: '5%',
                borderRadius: 10,
            }}>
                <Text style={{
                    marginLeft: 12,
                    fontSize: 22,
                    color: 'black',
                    fontFamily: themes.fontFamily.Normal,
                }}>{lang.Bike[LangId]}</Text>
                <Text style={{
                    fontSize: 22,
                    color: 'blue',
                    marginLeft: 186,
                    fontFamily: themes.fontFamily.Normal,
                }}>542 </Text>

            </View>
            <Text style={{
                marginLeft: 20, fontSize: 19, color: 'black', marginTop: 20,
                fontFamily: themes.fontFamily.Normal,
            }}>{lang.Earning_Money[LangId]}</Text>
            <View style={{flexDirection: 'row', marginTop: 10}}>
                <View
                    style={[styles.loginBtn3, {height: '40%', backgroundColor: '#fff', borderWidth: 1, width: '40%'}]}>
                    <Text style={[styles.buttontext, {color: 'gray'}]}>{lang.From_Company[LangId]}</Text>
                    <Text style={[styles.buttontext, {color: 'black', marginTop: 10, fontSize: 28}]}>₹ 154.00</Text>
                </View>
                <View
                    style={[styles.loginBtn3, {height: '40%', backgroundColor: '#fff', borderWidth: 1, width: '40%'}]}>
                    <Text style={[styles.buttontext, {color: 'gray'}]}>{lang.To_Company[LangId]}</Text>
                    <Text style={[styles.buttontext, {color: 'black', marginTop: 10, fontSize: 28}]}>₹ 41.00</Text>
                </View>
            </View>


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

                        <TouchableOpacity onPress={() => _signUp()}>
                            <Image style={{
                                marginRight: 20,
                                marginTop: 20,
                                marginBottom: 0,
                                width: 15,
                                height: 15,
                                marginLeft: 270,
                            }} source={require('../../assets/Images/Cancel2.png')}/>
                        </TouchableOpacity>

                        <View style={{marginBottom: 0, padding: 10, margin: 1}}>
                            <View style={{
                                marginLeft: 15,
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Image style={{width: 60, height: 60, alignSelf: 'center'}}
                                       source={require('../../assets/Images/Withdraw.png')}/>
                                <Text style={{
                                    fontSize: 15,
                                    marginBottom: 25,
                                    marginTop: 20,
                                    color: '#0000CC',
                                    fontFamily: themes.fontFamily.Bold,
                                }}>Withdraw Requested</Text>
                                <Text style={{color: 'gray', fontFamily: themes.fontFamily.Bold, fontSize: 13}}>Your withdraw request
                                    has submitted</Text>
                                <Text style={{color: 'gray', fontFamily: themes.fontFamily.Bold, fontSize: 13, marginBottom: 0}}>to
                                    Tallo Team. You will notified once</Text>
                                <Text style={{color: 'gray', fontFamily: themes.fontFamily.Bold, fontSize: 13, marginBottom: 20}}>payment
                                    is proceed</Text>
                                <TouchableOpacity style={styles.loginBtn}
                                >
                                    <Text style={styles.buttontext}>Continue</Text>
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
        backgroundColor: '#fff',
        // justifyContent: "center",
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 2,
    },
    modalView: {
        margin: 20,
        height: 350,
        backgroundColor: 'white',
        borderRadius: 10,
        // padding: 35,
        // alignItems: "center",
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: 300,
    },
    loginBtn: {
        width: '50%',
        height: 45,
        marginLeft: 20,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 10,
        backgroundColor: '#F67321',
        color: '#000000',
        marginBottom: '10%',
        borderRadius: 10,
    },
    loginBtnn: {
        width: '50%',
        height: 45,
        marginLeft: 20,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 10,
        backgroundColor: 'white',
        color: '#000000',
        marginBottom: '10%',
        borderRadius: 15,
        borderColor: '#F67321',
        borderWidth: 1,
    },
    loginBtn3: {
        width: '50%',
        height: 45,
        marginLeft: 20,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 10,
        backgroundColor: 'white',
        color: '#000000',
        marginBottom: '10%',
        borderRadius: 15,
        borderColor: 'grey',
        borderWidth: 0.1,
    },
    buttontext: {
        color: 'white',
        fontSize: 17,
        fontFamily: themes.fontFamily.Bold,
    },

    buttontextt: {
        color: '#F67321',
        fontSize: 17,
        fontFamily: themes.fontFamily.Bold,
    },

});

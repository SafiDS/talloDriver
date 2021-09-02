import React, {useState} from 'react';
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


export default function Incentives({navigation}) {
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

    StatusBar.setHidden(true);


    function Signin() {


        // dispatch({ type: 'LOGIN_REQUEST', payload: mobile })
    }

    async function Goback() {
        var img = await getItemFromStorage('loginImage');
        if (img == 'true') {
            navigate('RiderStatusOnline1');
        } else {
            navigate('Dashboard');
        }

    }

    return (


   <ScrollView contentContainerStyle={{paddingBottom:30}}>

        <View style={styles.container}>
            <View style={{flexDirection: 'row', marginTop: 20}}>
                <TouchableOpacity onPress={Goback}>
                    <Image
                        style={{marginRight: 20, marginTop: 0, marginBottom: 0, width: 40, height: 40, marginLeft: 10}}
                        source={require('../../assets/Images/BackButton.png')}/></TouchableOpacity>
                <Text style={{
                    fontSize: 18,
                    fontFamily: themes.fontFamily.Bold,
                    color: 'black',
                    marginTop: 10,
                    marginLeft: 5,
                }}>{lang.Incentives[LangId]}</Text>
                <Text style={{
                    fontSize: 18,
                    fontFamily: themes.fontFamily.Bold,
                    color: 'black',
                    marginTop: 10,
                    marginLeft: 80,
                }}>{lang.riderId_TA6543[LangId]}  </Text>
            </View>

            {/* <Text style = {{alignSelf:'flex-end', fontSize:18 , fontWeight:'bold' , color:'black' , marginTop:10}}>Rider Id : TA6543 </Text> */}
            <Text style={{
                marginLeft: 15,
                fontSize: 20,
                fontFamily: themes.fontFamily.Bold,
                color: 'black',
                marginTop: 5,
            }}>{lang.Scheme_Details[LangId]} </Text>
            <Text style={{
                marginLeft: 15,
                fontSize: 15,
                fontFamily: themes.fontFamily.Bold,
                color: '#663399',
                marginTop: 15,
            }}>{lang.Daily_Booking_Incentive[LangId]} </Text>

            <View style={{flexDirection: 'row', marginTop: 2, marginLeft: 10}}>
                <View style={styles.loginBtn} onPress={Signin}>
                    <Text style={styles.buttontext}>{lang.Scheme_Validity[LangId]}</Text>
                    <Text style={[styles.buttontext, {color: 'gray', marginTop: 10}]}>Sat (03 Mar)</Text>
                </View>
                <View style={styles.loginBtn} onPress={Signin}>
                    <Text style={styles.buttontext}>Super Peak Hours</Text>
                    <Text style={[styles.buttontext, {color: 'gray', marginTop: 10}]}>05:00 AM - 08:59 PM</Text>
                </View>
            </View>


            <View style={styles.loginBtnn} onPress={Signin}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, marginBottom: 25}}>
                    <View
                        style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 0}}>
                        <Text style={[styles.buttontext, {
                            color: '#ff8000',
                            marginTop: 1,
                        }]}>{lang.Super_pack_incentive_Bookings[LangId]}</Text>
                        <Text style={{
                            marginLeft: 5,
                            fontSize: 15,
                            fontFamily: themes.fontFamily.Bold,
                            color: '#663399',
                            marginTop: 7,
                        }}>0-5 </Text>
                        <Text style={{
                            marginLeft: 5,
                            fontSize: 15,
                            fontFamily: themes.fontFamily.Bold,
                            color: '#663399',
                            marginTop: 7,
                        }}>6-7 </Text>
                        <Text style={{
                            marginLeft: 5,
                            fontSize: 15,
                            fontFamily: themes.fontFamily.Bold,
                            color: '#663399',
                            marginTop: 7,
                        }}>8-9 </Text>
                        <Text style={{
                            marginLeft: 5,
                            fontSize: 15,
                            fontFamily: themes.fontFamily.Bold,
                            color: '#663399',
                            marginTop: 7,
                        }}>10-11 </Text>
                        <Text style={{marginLeft: 5, fontSize: 15, fontFamily: themes.fontFamily.Bold, color: '#663399', marginTop: 7}}>12
                            and above </Text>
                    </View>
                    <View style={{
                        flexDirection: 'column',
                        marginTop: 2,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Text style={[styles.buttontext, {
                            color: '#ff8000',
                            marginTop: 1,
                            marginLeft: 20,
                        }]}>{lang.Incentives[LangId]}</Text>
                        <Text
                            style={{marginLeft: 20, fontSize: 15, fontFamily: themes.fontFamily.Bold, color: '#663399', marginTop: 7}}>₹0
                            Total </Text>
                        <Text
                            style={{marginLeft: 20, fontSize: 15, fontFamily: themes.fontFamily.Bold, color: '#663399', marginTop: 7}}>₹50
                            Total </Text>
                        <Text
                            style={{marginLeft: 20, fontSize: 15, fontFamily: themes.fontFamily.Bold, color: '#663399', marginTop: 7}}>₹90
                            Total </Text>
                        <Text
                            style={{marginLeft: 20, fontSize: 15, fontFamily: themes.fontFamily.Bold, color: '#663399', marginTop: 7}}>₹130
                            Total </Text>
                        <Text
                            style={{marginLeft: 20, fontSize: 15,fontFamily: themes.fontFamily.Bold, color: '#663399', marginTop: 7}}>₹200
                            Total </Text>
                    </View>
                </View>
            </View>


            <Text
                style={{marginLeft: 19, fontSize: 19,fontFamily: themes.fontFamily.Normal, color: 'black', marginTop: 12}}>{lang.Incentives[LangId]} </Text>
            <View style={{marginTop: 12, marginBottom: 10, marginLeft: 10}}>
                <View style={[styles.loginBtnnn, {color: '#ff8000', marginTop: 1, marginLeft: 10}]} onPress={Signin}>
                    <Text style={{
                        marginLeft: 15,
                        fontSize: 14,
                        fontFamily: themes.fontFamily.Bold,
                        color: 'black',
                        marginTop: 5,
                    }}>{lang.Weekly_Incentives[LangId]} </Text>
                    <Text style={{
                        marginLeft: 15,
                        fontSize: 25,
                        fontFamily: themes.fontFamily.Bold,
                        color: '#663399',
                        marginTop: 5,
                    }}>₹200 {lang.Total[LangId]} </Text>
                </View>


                <View style={[styles.loginBtnnn, {color: '#ff8000', marginTop: 10, marginLeft: 10, marginBottom: 10}]}
                      onPress={Signin}>
                    <Text style={{
                        fontSize: 14,
                        fontFamily: themes.fontFamily.Bold,
                        color: 'black',
                        marginTop: 5,
                        marginLeft: 15,
                    }}>{lang.Monthly_Incentives[LangId]} </Text>
                    <Text style={{
                        marginLeft: 15,
                        fontSize: 25,
                        fontFamily: themes.fontFamily.Bold,
                        color: '#663399',
                        marginTop: 5,
                    }}>₹1250 {lang.Total[LangId]} </Text>
                </View>
            </View>


        </View>


         </ScrollView>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 60,
        // justifyContent: "center",
    },
    loginBtn: {
        width: '45%',
        height: '40%',
        marginLeft: 10,
        marginRight: 5,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 10,
        backgroundColor: '#fff',
        color: '#000000',
        borderRadius: 10,
        borderWidth: 0.4,
    },
    loginBtnn: {
        width: '90%',
        height: '35%',
        marginLeft: 19,
        marginRight: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: -50,
        backgroundColor: '#fff',
        color: '#000000',
        marginBottom: 0,
        borderRadius: 10,
        borderWidth: 0.4,
    },
    loginBtnnn: {
        width: '90%',
        height: '25%',
        marginLeft: 20,
        marginRight: 5,

        marginTop: 10,
        backgroundColor: '#fff',
        color: '#000000',
        borderRadius: 10,
        borderWidth: 0.5,
        marginBottom: 0,
    },
    buttontext: {
        color: '#663399',
        fontSize: 15,
        fontFamily: themes.fontFamily.Bold,
    },

});

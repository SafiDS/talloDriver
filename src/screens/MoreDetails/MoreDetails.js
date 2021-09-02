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
    FlatList,
} from 'react-native';
import {getItemFromStorage} from '../../utils/AccessStorage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {navigate, navigateScreen} from '../../Tools/NavigationServices';
import {removeFromStorage} from '../../utils/AccessStorage';
import lang from '../../language/lang_values';
import {themes} from '../../utils';


export default function MoreDetails({navigation}) {

    const [image, setimage] = useState('');
    const [LangId, setLangId] = useState('');


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

    async function refreshPage() {
        const lanid = await getItemFromStorage('LangId');
        if (!lanid) {
        } else {
            setLangId(lanid);
        }

    }

    async function getdata() {

        var id = await getItemFromStorage('RiderId');
        const lanid = await getItemFromStorage('LangId');
        var img = await getItemFromStorage('Image');

        setimage(img);
        if (!lanid) {
        } else {
            setLangId(lanid);
        }

    }


    function _signUp() {
        var request = {
            'Name': Name,
            'Date': Date,
            'Email': Email,
            'City': City,
            'gender': Gender,
            'phone': Phone,
            'navigation': navigation,
        };
        dispatch({type: 'RIDER_DETAILS', payload: request});
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

    function logout() {
        //alert("hi")

        removeFromStorage('RiderId');
        removeFromStorage('CurrentLat');
        removeFromStorage('CurrentLon');
        removeFromStorage('source');
        removeFromStorage('destination');
        removeFromStorage('lic');
        removeFromStorage('img1');
        removeFromStorage('img2');
        removeFromStorage('rcnno');
        removeFromStorage('rcimg1');
        removeFromStorage('rcimg2');
        removeFromStorage('inno');
        removeFromStorage('inimg1');
        removeFromStorage('inimg2');
        removeFromStorage('panno');
        removeFromStorage('panimg1');
        removeFromStorage('adhar');
        removeFromStorage('adharimg1');
        removeFromStorage('adharimg2');
        removeFromStorage('bname');
        removeFromStorage('accno');
        removeFromStorage('conaccno');
        removeFromStorage('bankname');
        removeFromStorage('ifsc');
        removeFromStorage('cheimg');
        removeFromStorage('Image');
        removeFromStorage('Name');
        removeFromStorage('user_phone');
        removeFromStorage('riderScreenStatus');
        removeFromStorage('riderloginImageDate');
        removeFromStorage('loginImage');
        removeFromStorage('RiderAddress');
        removeFromStorage('LangId');

        navigation.goBack('Dashboard');
        navigate('LoginScreen');

    }

    return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>


            <ScrollView>

                <View style={{
                    flexDirection: 'row',
                    backgroundColor: '#F87300',
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                }}>
                    <TouchableOpacity onPress={Goback}>
                        <Image style={{
                            marginRight: 20,
                            marginTop: 5,
                            marginBottom: 0,
                            width: 30,
                            height: 30,
                            marginLeft: 10,
                        }} source={require('../../assets/Images/BackButton.png')}/>
                    </TouchableOpacity>
                    <Image style={{
                        marginRight: 20,
                        marginTop: 10,
                        marginBottom: 20,
                        width: 150,
                        height: 50,
                        marginLeft: 5,
                    }} source={require('../../assets/Images/largeLogo.png')}/>
                </View>


                <View style={styles.container}>


                    <View style={styles.imageAvater}>
                        {
                            image != '' ?
                                <TouchableOpacity style={styles.uploadImageBtn1}>
                                    <Image style={{height: 90, width: 90, borderRadius: 40}} source={{uri: image}}/>
                                </TouchableOpacity> :
                                <TouchableOpacity style={styles.uploadImageBtn}>
                                </TouchableOpacity>}
                    </View>


                    <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 10}}>

                        <Text style={[styles.logintext, {
                            fontSize: 16,
                            color: 'white',
                            justifyContent: 'space-between',
                            marginRight: 30,
                            fontFamily: themes.fontFamily.Bold,
                        }]}>{lang.Total_earnings[LangId]}</Text>
                        <Text
                            style={{color: 'white', fontFamily: themes.fontFamily.Bold, fontSize: 16, marginLeft: 160}}> 4578.00</Text>
                    </View>


                </View>

                <View style={{flexDirection: 'row', backgroundColor: '#F87300', marginBottom: 20}}>
                    <View style={{justifyContent: 'space-between', margin: 10, marginRight: 50}}>
                        <Text style={{
                            marginRight: 10,
                            fontSize: 16,
                            color: 'white',
                            marginLeft: 20,
                            fontFamily: themes.fontFamily.Bold,
                        }}>8452</Text>
                        <Text style={{
                            marginRight: 10,
                            fontSize: 16,
                            color: 'white',
                            marginLeft: 5,
                            fontFamily: themes.fontFamily.Normal,
                        }}>{lang.total_km[LangId]}</Text>
                    </View>
                    <View style={{justifyContent: 'space-between', margin: 10, marginRight: 50}}>
                        <Text style={{
                            marginRight: 10,
                            fontSize: 16,
                            color: 'white',
                            fontFamily: themes.fontFamily.Bold,
                            marginLeft: 20,
                        }}>234</Text>
                        <Text style={{marginRight: 10, fontSize: 16, color: 'white',
                            fontFamily: themes.fontFamily.Normal}}>{lang.total_rides[LangId]}</Text>
                    </View>
                    <View style={{justifyContent: 'space-between', margin: 10, marginRight: 25}}>
                        <Text style={{
                            marginRight: 10,
                            fontSize: 16,
                            color: 'white',
                            fontFamily: themes.fontFamily.Bold,
                            marginBottom: 5,
                            marginLeft: 20,
                        }}>4.5</Text>
                        <Text style={{marginRight: 10, fontSize: 16, color: 'white',
                            fontFamily: themes.fontFamily.Normal}}>{lang.total_rating[LangId]}</Text>
                    </View>

                </View>


                <View style={{flexDirection: 'column', marginTop: 10, margin: 10}}>


                    <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 0}}
                                      onPress={() => {
                                          navigateScreen(navigation, 'ReferEarn');
                                      }}>

                        <FontAwesome5 name="gift" size={22} color="black"/>
                        <Text style={{ fontSize: 16,
                            fontFamily: themes.fontFamily.Normal}}>{lang.refer_and_earn[LangId]}</Text>


                        <MaterialIcons name="keyboard-arrow-right" size={24} color="black"/>

                    </TouchableOpacity>
                    <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 30}}
                                      onPress={() => {
                                          navigateScreen(navigation, 'EarningMore');
                                      }}>

                        <MaterialCommunityIcons name="wallet-outline" size={22} color="black"/>
                        <Text style={{ fontSize: 16,
                            fontFamily: themes.fontFamily.Normal}}>{lang.earnings[LangId]}</Text>
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="black"/>

                    </TouchableOpacity>
                    <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 30}}
                                      onPress={() => {
                                          navigateScreen(navigation, 'HistoryMore');
                                      }}>

                        <Ionicons name="car-outline" size={22} color="black"/>
                        <Text style={{ fontSize: 16,fontFamily: themes.fontFamily.Normal}}>{lang.your_rides[LangId]}</Text>
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="black"/>

                    </TouchableOpacity>


                    <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 30}}
                                      onPress={() => {
                                          navigateScreen(navigation, 'HelpAndSupport');
                                      }}
                    >
                        <Ionicons name="help-circle" size={22} color="black"/>
                        <Text style={{ fontSize: 16,fontFamily: themes.fontFamily.Normal}}>{lang.help_support[LangId]}</Text>
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="black"/>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 30}}
                                      onPress={() => {
                                          navigateScreen(navigation, 'RiderDetails');
                                      }}>
                        <Ionicons name="help-circle" size={22} color="black"/>
                        <Text style={{fontSize: 16,fontFamily: themes.fontFamily.Normal}}>{lang.rider_details[LangId]}</Text>
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="black"/>
                    </TouchableOpacity>


                    <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 30}}
                                      onPress={logout}
                    >
                        <MaterialCommunityIcons name="logout" size={24} color="black"/>
                        <Text style={{fontSize: 16,fontFamily: themes.fontFamily.Normal}}>{lang.logout[LangId]}</Text>
                        <MaterialIcons name="keyboard-arrow-right" size={22} color="black"/>
                    </TouchableOpacity>

                </View>


            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F87300',
    },


    // justifyContent: "center",

    title: {
        fontSize: 16,
        color: 'gray',
        marginTop: 10,
    },
    title1: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
    },
    item: {
        backgroundColor: '#fff',
        padding: 5,
        // marginVertical: 8,
        // marginHorizontal: 16,
        marginBottom: 20,
    },
    imageAvater: {
        paddingVertical: 30,
        padding: 30,
        width: 100,

        height: 100,
        // flexDirection:'row',
        borderRadius: 150 / 2,
        // marginLeft:40,
        backgroundColor: '#fff',
        borderWidth: 1,
        // borderStyle: 'dashed',

    },
    uploadImageBtn: {
        borderRadius: 5,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 30,
    },
    uploadImageBtn1: {

        height: 35,
        alignItems: 'center',
        justifyContent: 'center',

        //marginTop:30
    },
    logintext: {
        marginTop: 0,
        // padding: 3,
        marginLeft: 0,
        color: '#000000',
        // fontSize: 18,
        // alignItems:'stretch',
        // alignContent:'stretch',
        justifyContent: 'space-between',
    },


});

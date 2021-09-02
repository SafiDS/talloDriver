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
import Ionicons from 'react-native-vector-icons/Ionicons';
import {navigate, navigateScreen} from '../../Tools/NavigationServices';
import lang from '../../language/lang_values';
import {getItemFromStorage} from '../../utils/AccessStorage';

export default function HelpAndSupport({navigation}) {
    const dispatch = useDispatch();
    const [mobile, setMobile] = useState('');
    const [check, setCheck] = useState(false);
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


    const refer = 'Refer your friend and earn rs 1000 for each';

    StatusBar.setHidden(true);

    function Signin() {


        dispatch({type: 'LOGIN_REQUEST', payload: mobile});
    }

    return (
        <ScrollView>
            <View style={styles.container}>


                <View style={{flexDirection: 'row', marginTop: 20}}>
                    <TouchableOpacity onPress={() => navigate('MoreDetails')}>
                        <Image style={{
                            marginRight: 20,
                            marginTop: 5,
                            marginBottom: 0,
                            width: 30,
                            height: 30,
                            marginLeft: 10,
                        }} source={require('../../assets/Images/BackButton.png')}/>
                    </TouchableOpacity>

                    {/* <Image style={{ marginRight:20 ,marginTop:1 , marginBottom:0, width: 40, height: 40,marginLeft:10 }} source={require('../../assets/Images/BackButton.png')} /> */}
                    <Text style={{
                        fontSize: 18,
                        color: 'black',
                        marginTop: 10,
                        marginLeft: 5,
                        fontFamily: themes.fontFamily.Bold,
                    }}>{lang.help_support[LangId]}</Text>
                </View>

                <View style={{padding: 60, margin: 1}}>


                    <View style={{
                        marginLeft: 15,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>


                        <Image style={{width: 90, height: 90}}
                               source={require('../../assets/Images/HelpAndSuport.png')}/>

                        <Text style={{
                            fontSize: 15,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 27,
                            marginBottom: 20,
                            fontFamily: themes.fontFamily.Bold,
                        }}>{lang.How_Can_we_Help_you[LangId]}</Text>


                        {/* <View style={{backgroundColor: '#ffe6e6', height: 37, width: 300, borderColor: '#ff4000',borderRadius: 10,borderWidth: 1 ,marginBottom: 100, flexDirection: 'row', justifyContent: 'space-around',}}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold',marginTop: 5,marginLeft: 5 }}>Contact Live Chatt</Text>
                        <Image style={{ width: 12, height: 12,marginTop: 4 }} source={require('../../assets/Images/RightArrow.png')} />
                    </View> */}


                        <Image style={{width: 240, height: 40}} source={require('../../assets/Images/Button.png')}/>

                        <View style={{
                            backgroundColor: '#ffe6e6',
                            height: 57,
                            width: 60,
                            borderColor: '#ff4000',
                            borderRadius: 100,
                            borderWidth: 0,
                            marginBottom: 1,
                            marginTop: 47,
                        }}>
                            <Image style={{width: 25, height: 25, marginTop: 17, marginLeft: 17}}
                                   source={require('../../assets/Images/mail.png')}/>
                        </View>


                        {/* <Image style={{ width: 0, height: 0 }} source={require('../../assets/Images/Button.png')} /> */}
                        <Text style={{
                            fontSize: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontFamily: themes.fontFamily.Bold,
                            marginBottom: 1,
                        }}></Text>

                        <Text style={{
                            color: 'gray',
                            fontFamily: themes.fontFamily.Bold,
                            fontSize: 13,
                            marginTop: 2,
                        }}>{lang.Send_us_an_e_mail[LangId]}</Text>
                        <Text style={{
                            fontSize: 15,
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontFamily: themes.fontFamily.Bold,
                            marginBottom: 225,
                        }}>{lang.Support_Tallo_in[LangId]}</Text>

                    </View>

                </View>


            </View>

        </ScrollView>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#fff",

        // justifyContent: "center",
    },
    loginBtn: {
        borderRadius: 5,
        // height: 35,
        width: '40%',
        marginLeft: 30,
        marginRight: 0,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 40,
        backgroundColor: '#F87300',
        marginBottom: '10%',
    },
    buttontext: {
        color: '#fff',
        fontSize: 16, fontWeight: 'bold',
    },

});

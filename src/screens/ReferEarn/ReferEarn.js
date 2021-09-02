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
import {getItemFromStorage} from '../../utils/AccessStorage';
import {Button, Popup, Input} from '../../components';
// import Gender from "../../components/Gender";
import Appicon from '../../components/Appicon';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {navigate, navigateScreen} from '../../Tools/NavigationServices';
import lang from '../../language/lang_values';


export default function ReferEarn({navigation}) {
    const dispatch = useDispatch();
    const [mobile, setMobile] = useState('');
    const [check, setCheck] = useState(false);
    const [LangId, setLangId] = useState('');
    const refer = 'Refer your friend and earn rs 1000 for each';
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


        dispatch({type: 'LOGIN_REQUEST', payload: mobile});
    }

    return (

        // <ScrollView>
        <View style={styles.container}>

            {/* <View style = {{ marginTop:0 , marginBottom:0 ,marginLeft:0, backgroundColor:'#F87300',height:"15%"}}>
            <Appicon icon={require("../../assets/icons/tallo-logo-main.png")}/>

            </View>    */}


            <View style={{flexDirection: 'row', marginTop: 20}}>
                <TouchableOpacity onPress={() => navigate('MoreDetails')}>
                    <Image
                        style={{marginRight: 20, marginTop: 5, marginBottom: 0, width: 30, height: 30, marginLeft: 10}}
                        source={require('../../assets/Images/BackButton.png')}/>
                </TouchableOpacity>
                <Text style={{
                    fontSize: 18,
                    color: 'black',
                    marginTop: 10,
                    marginLeft: 5,
                    fontFamily: themes.fontFamily.Bold,

                }}>{lang.refer_and_earn[LangId]}</Text>
            </View>

            <Image style={{width: 155, height: 155, marginTop: 17, alignSelf: 'center', marginBottom: 30}}
                   source={require('../../assets/Images/ReferAndEarn.png')}/>

            <View/>

            <View style={{height: '2%', backgroundColor: 'red', borderBottomWidth: 0.4, backgroundColor: '#fff'}}>

                {/* <Text style = {{alignSelf:'center' , marginTop:70 , color:'red'}}>Icon in progress</Text> */}

            </View>

            <Text style={{
                fontWeight: '600',
                marginTop: '5%',
                alignSelf: 'center',
                color: 'black',
                fontSize: 16,
                fontFamily: themes.fontFamily.Normal,
            }}>{refer}</Text>
            <Text style={{
                fontWeight: '600',
                marginTop: '1%',
                alignSelf: 'center',
                color: 'black',
                fontSize: 16,
                fontFamily: themes.fontFamily.Normal,
            }}>{lang.Person_usethe_below_code[LangId]}</Text>
            <View style={{flexDirection: 'row'}}>

                <TouchableOpacity style={[styles.loginBtn, {
                    backgroundColor: '#fff',
                    borderWidth: 1,
                    padding: 10,
                    borderColor: 'gray',
                    width: 150,
                }]}>
                    <Text style={[styles.buttontext, {color: 'gray'}]}>{lang.Welcome[LangId]}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.loginBtn}>
                    <Text style={styles.buttontext}>{lang.Refer_Now[LangId]}</Text>
                </TouchableOpacity>


            </View>

            <View style={{
                height: '30%',
                backgroundColor: '#F87300',
                borderBottomWidth: 1,
                marginBottom: 10,
                borderTopRightRadius: 50,
                borderTopLeftRadius: 50,
            }}>
                <View style={{alignSelf: 'center'}}>
                    <Text style={{
                        alignSelf: 'center',
                        marginTop: 70,
                        fontSize: 17,
                        fontFamily: themes.fontFamily.Normal,
                    }}>{lang.Invite_your_friend_and_one_more[LangId]}</Text>
                    <TouchableOpacity style={[styles.loginBtn, {backgroundColor: 'green', width: 200, marginTop: 10}]}>
                        <Text style={styles.buttontext}>{lang.Invite_Now[LangId]}</Text>
                    </TouchableOpacity>
                </View>

            </View>


        </View>
        // </ScrollView>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

        // justifyContent: "center",
    },
    loginBtn: {
        borderRadius: 5,
        height: 35,
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
        fontSize: 16,
        fontFamily: themes.fontFamily.Bold,
    },

});

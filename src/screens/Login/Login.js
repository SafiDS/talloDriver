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
    StatusBar, BackHandler,
} from 'react-native';
import {themes} from '../../utils';
import {useDispatch} from 'react-redux';
import {Button, Popup, Input} from '../../components';
import {removeFromStorage} from '../../utils/AccessStorage';
import AppLogo from '../../components/AppLogo';

export default function LoginScreen({navigation}) {
    const dispatch = useDispatch();
    const [mobile, setMobile] = useState('');
    const [check, setCheck] = useState(false);

    function handleBackButtonClick() {
        //BackHandler.exitApp();
        return true;
    }

    React.useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

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
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };


    }, []);

    StatusBar.setHidden(true);

    function Signin() {

        dispatch({type: 'LOGIN_REQUEST', payload: mobile});
        //dispatch({ type: 'OTP_REQUEST', payload: mobile })

    }

    return (


        // <ScrollView style={{ backgroundColor: "#fff"}}>
        <View style={styles.container}>

           <AppLogo />

            <View style={{
                marginTop: 100,
                marginBottom: 0,
                width: '80%',
                backgroundColor: '#fff',
                flexDirection: 'column',
                height: '40%',
                marginLeft: '10%',
                borderRadius: 15,
                justifyContent: 'center',
                alignContent: 'center',
            }}>

                <TextInput
                    style={styles.inputtext}
                    onChangeText={(mobile) => setMobile(mobile)}
                    placeholder={'Mobile No'}
                    paddingHorizontal={10}
                    keyboardType={'number-pad'}
                    placeholderTextColor="#000"
                    color={'black'}
                    returnKeyType='done'
                    maxLength={10}
                />

                <View/>
                <Button
                    title={'Genrate OTP'}
                    onPress={Signin}
                />

                {/* <Image style={{ marginTop:10 , marginBottom:0, width: 162, height: 35,marginLeft:0 }} source={require('../../assets/Images/MadeInIndia.png')} /> */}

            </View>

            <View style={{
                position: 'absolute', //Here is the trick
                bottom: 15, left: 10,
            }}>
                <Image style={{width: 162, height: 35, marginLeft: 2}}
                       source={require('../../assets/Images/MadeInIndia.png')}/>
            </View>

            {/* <View style = {{ marginTop:1 , marginBottom:1 ,marginLeft:0}}> */}
            {/* </View> */}
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        height: '100%',
        // justifyContent: "center",
    },
    logintext: {
        marginBottom: 10,
        marginLeft: '10%',
        // textAlign: 'center',
        marginTop: 10,
        color: '#0f0f0f',
        fontSize: 30,
        fontWeight: '700',
    },
    mobiletext: {
        marginBottom: 20,
        marginLeft: '10%',
        marginTop: '1%',
        // textAlign: 'center',
        color: '#B7B7B7',
        fontSize: 16,
        fontWeight: '600',
    },
    counterytext: {
        height: 40,
        width: '10%',
        borderColor: 'gray',
        borderWidth: 1,

    },
    inputtext: {
        height: 40,
        width: '85%',
        // paddingRight: '10%',
        // paddingLeft: '10%',
        borderColor: 'gray',
        // borderWidth: 0.3,
        marginBottom: '2%',
        marginTop: '10%',
        borderBottomWidth: 0.3,
        alignSelf: 'center',
        fontFamily: themes.fontFamily.Normal,
    },
    mainContainer: {
        width: 100,
        height: 100,
        // backgroundColor: 'red',
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 10,
    },
    checkContainer: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'flex-end',
    },
    checkbox: {
        height: 15,
        width: 15,
        alignSelf: 'flex-end',
        marginRight: 5,
    },
    iconContainer: {
        flex: 3,
        justifyContent: 'center',
        alignContent: 'center',

    },
    icon: {
        width: 75,
        height: 75,
        alignSelf: 'center',
        marginBottom: 5,
    },
});

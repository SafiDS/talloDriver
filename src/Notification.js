import React, {useState, useEffect} from "react";
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
    StatusBar, BackHandler
} from "react-native";

import {useDispatch} from 'react-redux'
// import Gender from "../../components/Gender";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import MainTabNavigator from './navigation/DrawerScreen'
import {saveToStorage} from './utils/AccessStorage';
import PushNotification, {Importance} from "react-native-push-notification";
import StaticText from './utils/StaticText'
import {navigate, navigateScreen} from './Tools/NavigationServices'
import useSound from "react-native-use-sound";

export default function Notification({navigation}) {
    const dispatch = useDispatch()
    const [mobile, setMobile] = useState("");
    const [Buzzer, setBuzzer] = useState(null);
    const coolMusic =
        // "https://www.nasa.gov/mp3/581549main_Apollo-8_Merry-Christmas.mp3";
        "http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3";

    const [play, pause, stop, data] = useSound(coolMusic, {numberOfLoops: -1, volume: 10});

    // useEffect for playing and stopping music
    useEffect(() => {
        if (Buzzer) {
        //    alert("play")
            play()

        } else {
            stop()
        }
    }, [Buzzer])

    useEffect(() => {
      //  notification()
    }, [])

    function notification() {
        // play()
        // setCheck(true)
        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function (token) {
                console.log('TOKEN:', token)
                StaticText.Token = token.token
                saveToStorage("Token", token.token)

            },

            // (required) Called when a remote or local notification is opened or received
            onNotification: (notification) => {
                //setBuzzer(true)
                // PushNotification.localNotification({
                //     channelId: "fcm_fallback_notification_channel", // (required)
                //     channelName: `Sound channel`, // (required)
                //     message: notification.message,
                //     title: notification.title,
                //     soundName: 'sample.mp3',
                //     playSound: 'sample.mp3',
                // });
                console.log('REMOTE NOTIFICATION ==>', notification)
                if(notification.data.body == "Someone has search for Ride booking. Please accept Ride Booking") {
                  console.log('NOTIFICATION ==>', notification)
                  var request = {"booking_id":notification.data.booking_id}
                  dispatch({type:'BOOKING_INFO',payload:request})
                  saveToStorage("Booking_Id",notification.data.booking_id)
                  StaticText.BookingId =  notification.data.booking_id
                 // setBuzzer(null)  // hoping that booking id is not unique for every push notification
                 }

                // write the condition for when to stop it
                //  if( condition for exceuting when user opened notification ) {
                //    setBuzzer(null)
                //  }

            },


            // Android only: GCM or FCM Sender ID
            // senderID: '256218572662',
            permissions: {
                sound: true,
                alert: true,
                badge: true
            },
            popInitialNotification: true,
            requestPermissions: true,

        });


        PushNotification.createChannel(
            {
                channelId: "sound-channel-id", // (required)
                channelName: `Sound channel`, // (required)
                channelDescription: "A sound channel", // (optional) default: undefined.
                soundName: 'sample.mp3',
                playSound: true,
                importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
                vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
            },
            (created) => console.log(`createChannel 'fcm_fallback_notification_channel' returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
        );


        PushNotification.popInitialNotification((notification) => {
            console.log("intially", notification);
        })
    }


    return (
        <MainTabNavigator/>
    );
}


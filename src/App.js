/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect } from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import PushNotification from "react-native-push-notification";
import StaticText from './utils/StaticText'
import { navigate, navigateScreen } from './Tools/NavigationServices'
import Notification from './Notification';


import { Provider as StoreProvider } from 'react-redux'
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme
} from 'react-native-paper';

import store from '../src/Container/store';
import MainTabNavigator from './navigation/DrawerScreen'
import { saveToStorage } from './utils/AccessStorage';
const Drawer = createDrawerNavigator();

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

//   useEffect(() => {
     
//     PushNotification.configure({
//       // (optional) Called when Token is generated (iOS and Android)
//       onRegister: function(token) {
//         console.log('TOKEN:', token)
//         StaticText.Token =  token.token
//         saveToStorage("Token", token.token)
       

//       },

//       // (required) Called when a remote or local notification is opened or received
//       onNotification: function(notification) {
//         console.log('REMOTE NOTIFICATION ==>', notification)
//         if(notification.data.body == "Someone has search for Ride booking. Please accept Ride Booking") {
//           StaticText.BookingId =  notification.data.booking_id
//           navigate('RiderGoToHome');
//           saveToStorage("Booking_Id",notification.data.booking_id)
        

         
//       }
//         // if (notification.foreground) {
//         //   PushNotification.localNotification({
//         //     title:notification.title,
//         //     message:notification.message
//         //   });
//         //   } 
//         // process the notification here
//       },
//       // Android only: GCM or FCM Sender ID
//      // senderID: '256218572662',
//       popInitialNotification: true,
//       requestPermissions: true,
      
//     })
// }, [])
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }

  //   useEffect(() => {
  //     LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  // }, [])

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  return (

    <PaperProvider theme={theme}>
      <StatusBar backgroundColor='#009387' barStyle="light-content" />
      <StoreProvider store={store}>
        {/* <SafeAreaView style={{ flex: 1 }}> */}
          <Notification />
        {/* </SafeArea  View> */}
      </StoreProvider>
    </PaperProvider>

  );
}

export default App;

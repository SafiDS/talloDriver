import React, {Component} from 'react';
import {StatusBar, SafeAreaView} from 'react-native';
import {
    DefaultTheme as NavigationDefaultTheme,
    DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Notification from './Notification';
import {Provider as StoreProvider} from 'react-redux'
import {
    Provider as PaperProvider,
    DefaultTheme as PaperDefaultTheme,
    DarkTheme as PaperDarkTheme
} from 'react-native-paper';

import store from '../src/Container/store';
import NotifService from "./utils/NotifService";
import PushNotification from "react-native-push-notification";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.notif = new NotifService(
        this.onNotif.bind(this),
    );
  }


    render() {
        const isDarkTheme = false;

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
        const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

        return (
            <PaperProvider theme={theme}>
                <StatusBar backgroundColor='#009387' barStyle="light-content"/>
                <StoreProvider store={store}>
                    {/* <SafeAreaView style={{ flex: 1 }}> */}
                    <Notification/>
                    {/* </SafeArea  View> */}
                </StoreProvider>
            </PaperProvider>
        )
    }

  onNotif(notif) {
    console.log(notif,"notif")
  }
}

export default App;

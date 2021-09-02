/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import {
    NavigationContainer,
    DefaultTheme as NavigationDefaultTheme,
    DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSelector, useDispatch } from 'react-redux'
import {
    DefaultTheme as PaperDefaultTheme,
    DarkTheme as PaperDarkTheme
} from 'react-native-paper';
import { getItemFromStorage } from '../utils/AccessStorage';

import RootStackScreen from './RootStackScreen';
import SignInStack from './SignInStack';
import PushNotification from "react-native-push-notification";


import { navigationRef } from '../Tools/NavigationServices';

const Drawer = createDrawerNavigator();

const DrawerScreen = () => {
    var Status = useSelector(state => state['SignIn']);
    const [user_id, setUserId] = React.useState("");


    const [isDarkTheme, setIsDarkTheme] = React.useState(false);
   
    useEffect(() => {
        getUserId()
        
     }, []);
 
     async function getUserId(){
         let user_id = await getItemFromStorage('RiderId');
         setUserId(user_id)
         console.log("user_id",user_id)
     }

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

    const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

    // const loginReducer = (prevState, action) => {
    //     switch (action.type) {
    //         case 'RETRIEVE_TOKEN':
    //             return {
    //                 ...prevState,
    //                 userToken: action.token,
    //                 isLoading: false,
    //             };
    //         case 'LOGIN':
    //             return {
    //                 ...prevState,
    //                 userName: action.id,
    //                 userToken: action.token,
    //                 isLoading: false,
    //             };
    //         case 'LOGOUT':
    //             return {
    //                 ...prevState,
    //                 userName: null,
    //                 userToken: null,
    //                 isLoading: false,
    //             };
    //         case 'REGISTER':
    //             return {
    //                 ...prevState,
    //                 userName: action.id,
    //                 userToken: action.token,
    //                 isLoading: false,
    //             };
    //     }
    // };

    // const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);


    // useEffect(() => {
    //     setTimeout(async () => {
    //         // setIsLoading(false);
    //         let userToken;
    //         userToken = null;
    //         try {
    //             userToken = await AsyncStorage.getItem('userToken');
    //         } catch (e) {
    //             console.log(e);
    //         }
    //         // console.log('user token: ', userToken);
    //         dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    //     }, 1000);
    // }, []);

    // if (loginState.isLoading) {
    //     return (
    //         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //             <ActivityIndicator size="large" />
    //         </View>
    //     );
    // }

    return (


        <NavigationContainer ref={navigationRef}>
            {/* drawerContent={props => <DrawerContent {...props} />} */}
            {console.log("Status",user_id)}
            {user_id != null ? (
                 <RootStackScreen />
            )
                :
                <SignInStack/>
               
            }
        </NavigationContainer>


    );
}

export default DrawerScreen;

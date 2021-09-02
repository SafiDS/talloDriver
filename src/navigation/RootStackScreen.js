import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {getItemFromStorage} from '../utils/AccessStorage';
import SplashScreen from '../screens/Splash/SplashScreen';
// import SignInScreen from '../screens/SignIn/SignInScreen';
import SignUpScreen from '../screens/SignUp/SignUpScreen';
import LoginScreen from '../screens/Login/Login';
import OTPScreen from '../screens/OTP/Otp';
import HomeScreen from '../screens/Home/Home';
import RaidingScreen from '../screens/Raiding/RaidingScreen';
import PaymentScreen from '../screens/Payment/Payment';

import Language from '../screens/Language/Language';

import License from '../screens/License/License';
import RCDocument from '../screens/RCDocument/RCDocument';
import Insurance from '../screens/Insurance/Insurance';
import Pancard from '../screens/Pancard/Pancard';
import Aadharcard from '../screens/Aadharcard/Aadharcard';
import Bankdetails from '../screens/Bankdetails/Bankdetails';
import UploadImage from '../screens/UploadImage/UploadImage';
import ChangeImage from '../screens/ChangeImage/ChangeImage';
import RiderDetails from '../screens/RiderDetails/RiderDetails';
import Dashboard from '../screens/Dashboard/Dashboard';
import Earning from '../screens/Earning/Earning';
import Incentives from '../screens/Incentives/Incentives';
import BookingHistory from '../screens/BookingHistory/BookingHistory';
import MoreDetails from '../screens/MoreDetails/MoreDetails';
import ReferEarn from '../screens/ReferEarn/ReferEarn';
import HelpAndSupport from '../screens/HelpAndSupport/HelpAndSupport';
import SuccessScreen from '../screens/SuccessScreen/SuccessScreen';
import RiderRideComplete from '../screens/RiderRideComplete/RiderRideComplete';
import RiderMultipleDestination from '../screens/RiderMultipleDestination/RiderMultipleDestination';
import RiderHomeOtp from '../screens/RiderHomeOtp/RiderHomeOtp';

import RiderOngoingRide from '../screens/RiderOngoingRide/RiderOngoingRide';
import RiderGoingHome from '../screens/RiderGoingHome/RiderGoingHome';
import RiderStatusGoToHome from '../screens/RiderStatusGoToHome/RiderStatusGoToHome';
import RiderStatusOnline from '../screens/RiderStatusOnline/RiderStatusOnline';
import CameraScreen from '../screens/RNCamera/RNCamera';
import RiderStatusOnline1 from '../screens/RiderStatusOnline1/RiderStatusOnline1';
import RiderStatusOnlineWearMask from '../screens/RiderStatusOnlineWearMask/RiderStatusOnlineWearMask';

import RiderGoToHome from '../screens/RiderGoToHome/RiderGoToHome';
import RiderHomeNewRide from '../screens/RiderHomeNewRide/RiderHomeNewRide';
import RiderMultipleDestinationDetails from '../screens/RiderMultipleDestinationDetails/RiderMultipleDestinationDetails';
import RiderCustomerSign from '../screens/RiderCustomerSign/RiderCustomerSign';
import RiderWithDraw from '../screens/RiderWithDraw/RiderWithDraw';
import OutstandingBlock from '../screens/OutstandingBlock/OutstandingBlock';
import MinimumBalance from '../screens/MinimumBalance/MinimumBalance';
import RiderCancel from '../screens/RiderCancel/RiderCancel';
import RiderRideRating from '../screens/RiderRideRating/RiderRideRating';
import RiderPayment from '../screens/RiderPayment/RiderPayment';
import HistoryMore from '../screens/HistoryMore/HistoryMore';
import EarningMore from '../screens/EarningMore/EarningMore';
import RiderAssistiveTouch from '../screens/RiderAssistiveTouch/RiderAssistiveTouch';
import EarningsMonthView from '../screens/EarningsMonthView/EarningsMonthView';
// import CustomerSignUpScreen from '../CustomerScreens/CustomerSignUpScreen/CustomerSignUpScreen'
// import CustomerPaymentOption from '../CustomerScreens/CustomerPaymentOption/CustomerPaymentOption'
// import CustomerPaymentPage from '../CustomerScreens/CustomerPaymentPage/CustomerPaymentPage'
// import DrawerContent from './DrawerContent'
// import DrawerScreen from './DrawerScreen'
//Bottom Navigation
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {navigate} from '../Tools/NavigationServices';
import lang_values from '../language/lang_values';
import {themes} from '../utils';


//Bottom Navigation
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const DashboardStack = () => {
    return (
        <Stack.Navigator header="none" headerMode="none">

            <Stack.Screen name={'Dashboard'} component={Dashboard}/>
            <Stack.Screen name={'RiderStatusGoToHome'} component={RiderStatusGoToHome}/>
            <Stack.Screen name={'RiderStatusOnline'} component={RiderStatusOnline}/>
            <Stack.Screen name={'RiderStatusOnline1'} component={RiderStatusOnline1}/>
            <Stack.Screen name={'RiderGoingHome'} component={RiderGoingHome}/>
            {/* <Stack.Screen name={"CameraScreen"} component={CameraScreen} /> */}
            <Stack.Screen name={'Earning'} component={Earning}/>
            <Stack.Screen name={'Incentives'} component={Incentives}/>
            <Stack.Screen name={'BookingHistory'} component={BookingHistory}/>
            <Stack.Screen name={'MoreDetails'} component={MoreDetails}/>
            <Stack.Screen name={'ReferEarn'} component={ReferEarn}/>
            <Stack.Screen name={'EarningMore'} component={EarningMore}/>
            <Stack.Screen name={'HelpAndSupport'} component={HelpAndSupport}/>
            <Stack.Screen name={'HistoryMore'} component={HistoryMore}/>
            <Stack.Screen name={'SuccessScreen'} component={SuccessScreen}/>


        </Stack.Navigator>
    );
};

const EarningStack = () => {
    return (
        <Stack.Navigator header="none" headerMode="none">
            <Stack.Screen name={'Earning'} component={Earning}/>
            <Stack.Screen name={'Dashboard'} component={Dashboard}/>
            <Stack.Screen name={'RiderStatusGoToHome'} component={RiderStatusGoToHome}/>
            <Stack.Screen name={'RiderStatusOnline'} component={RiderStatusOnline}/>
            <Stack.Screen name={'RiderStatusOnline1'} component={RiderStatusOnline1}/>
            <Stack.Screen name={'RiderGoingHome'} component={RiderGoingHome}/>
            <Stack.Screen name={'Incentives'} component={Incentives}/>
            <Stack.Screen name={'BookingHistory'} component={BookingHistory}/>
            <Stack.Screen name={'MoreDetails'} component={MoreDetails}/>
            <Stack.Screen name={'ReferEarn'} component={ReferEarn}/>
            <Stack.Screen name={'EarningMore'} component={EarningMore}/>
            <Stack.Screen name={'HelpAndSupport'} component={HelpAndSupport}/>
            <Stack.Screen name={'HistoryMore'} component={HistoryMore}/>
            <Stack.Screen name={'SuccessScreen'} component={SuccessScreen}/>


        </Stack.Navigator>
    );
};

const IncentivesStack = () => {
    return (
        <Stack.Navigator header="none" headerMode="none">
            <Stack.Screen name={'Incentives'} component={Incentives}/>
            <Stack.Screen name={'Dashboard'} component={Dashboard}/>
            <Stack.Screen name={'RiderStatusGoToHome'} component={RiderStatusGoToHome}/>
            <Stack.Screen name={'RiderStatusOnline'} component={RiderStatusOnline}/>
            <Stack.Screen name={'RiderStatusOnline1'} component={RiderStatusOnline1}/>
            <Stack.Screen name={'RiderGoingHome'} component={RiderGoingHome}/>
            <Stack.Screen name={'BookingHistory'} component={BookingHistory}/>
            <Stack.Screen name={'MoreDetails'} component={MoreDetails}/>
            <Stack.Screen name={'ReferEarn'} component={ReferEarn}/>
            <Stack.Screen name={'EarningMore'} component={EarningMore}/>
            <Stack.Screen name={'HelpAndSupport'} component={HelpAndSupport}/>
            <Stack.Screen name={'HistoryMore'} component={HistoryMore}/>
            <Stack.Screen name={'SuccessScreen'} component={SuccessScreen}/>


        </Stack.Navigator>
    );
};

const BookingHistoryStack = () => {
    return (
        <Stack.Navigator header="none" headerMode="none">
            <Stack.Screen name={'BookingHistory'} component={BookingHistory}/>
            <Stack.Screen name={'Earning'} component={Earning}/>
            <Stack.Screen name={'Dashboard'} component={Dashboard}/>
            <Stack.Screen name={'RiderStatusGoToHome'} component={RiderStatusGoToHome}/>
            <Stack.Screen name={'RiderStatusOnline'} component={RiderStatusOnline}/>
            <Stack.Screen name={'RiderStatusOnline1'} component={RiderStatusOnline1}/>
            <Stack.Screen name={'RiderGoingHome'} component={RiderGoingHome}/>
            <Stack.Screen name={'Incentives'} component={Incentives}/>
            <Stack.Screen name={'MoreDetails'} component={MoreDetails}/>
            <Stack.Screen name={'ReferEarn'} component={ReferEarn}/>
            <Stack.Screen name={'EarningMore'} component={EarningMore}/>
            <Stack.Screen name={'HelpAndSupport'} component={HelpAndSupport}/>
            <Stack.Screen name={'HistoryMore'} component={HistoryMore}/>
            <Stack.Screen name={'SuccessScreen'} component={SuccessScreen}/>
        </Stack.Navigator>
    );
};

const MoreDetailsStack = () => {
    return (
        <Stack.Navigator header="none" headerMode="none">
            <Stack.Screen name={'MoreDetails'} component={MoreDetails}/>
            <Stack.Screen name={'Earning'} component={Earning}/>
            <Stack.Screen name={'Dashboard'} component={Dashboard}/>
            <Stack.Screen name={'RiderStatusGoToHome'} component={RiderStatusGoToHome}/>
            <Stack.Screen name={'RiderStatusOnline'} component={RiderStatusOnline}/>
            <Stack.Screen name={'RiderStatusOnline1'} component={RiderStatusOnline1}/>
            <Stack.Screen name={'RiderGoingHome'} component={RiderGoingHome}/>
            <Stack.Screen name={'Incentives'} component={Incentives}/>
            <Stack.Screen name={'ReferEarn'} component={ReferEarn}/>
            <Stack.Screen name={'EarningMore'} component={EarningMore}/>
            <Stack.Screen name={'HelpAndSupport'} component={HelpAndSupport}/>
            <Stack.Screen name={'HistoryMore'} component={HistoryMore}/>
            <Stack.Screen name={'BookingHistory'} component={BookingHistory}/>
            <Stack.Screen name={'SuccessScreen'} component={SuccessScreen}/>


        </Stack.Navigator>
    );
};

function MyTabs() {

    const [LangId, setLangId] = React.useState('');

    React.useEffect(() => {

        // Create an scoped async function in the hook
        async function anyNameFunction() {
            var lanid = await getItemFromStorage('LangId');
            //alert("useeffect"+lanid)
            if (lanid != '') {
                setLangId(lanid);
            } else {
            }


        }

        // Execute the created function directly
        anyNameFunction();
    }, []);
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: '#F67321',
                inactiveTintColor: 'gray',
            }}
            tabBarLabelStyle={{
                fontFamily: themes.fontFamily.Bold,
            }}
        >
            <Tab.Screen
                name="Dashboard"
                component={DashboardStack}
                options={{
                    tabBarLabel: lang_values.dashboard[LangId],
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="home" color={color} size={30}/>
                    ),
                    tabBarLabelStyle: {
                        fontFamily: themes.fontFamily.Bold,
                    },
                }}
            />
            <Tab.Screen
                name="Earning"
                component={EarningStack}
                options={{
                    tabBarLabel: lang_values.earnings[LangId],
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="wallet-outline" color={color} size={30}/>
                    ),
                    tabBarLabelStyle: {
                        fontFamily: themes.fontFamily.Bold,
                    },
                }}
            />
            <Tab.Screen
                name="Incentives"
                component={IncentivesStack}
                options={{
                    tabBarLabel: lang_values.Incentives[LangId],
                    tabBarIcon: ({color}) => (
                        <FontAwesome5 name="coins" color={color} size={30}/>
                    ),
                    tabBarLabelStyle: {
                        fontFamily: themes.fontFamily.Bold,
                    },
                }}
            />
            <Tab.Screen
                name="BookingHistory"
                component={BookingHistoryStack}
                options={{
                    tabBarLabel: lang_values.history[LangId],
                    tabBarIcon: ({color}) => (
                        <Ionicons name="car-outline" color={color} size={30}/>
                    ),
                    tabBarLabelStyle: {
                        fontFamily: themes.fontFamily.Bold,
                    },
                }}
            />
            <Tab.Screen
                name="MoreDetails"
                component={MoreDetailsStack}
                options={{
                    tabBarLabel: lang_values.more[LangId],
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="account-settings" color={color} size={30}/>
                    ),
                    tabBarLabelStyle: {
                        fontFamily: themes.fontFamily.Bold,
                    },
                }}
            />


        </Tab.Navigator>
    );
}

const RootStack = createStackNavigator();


const RootStackScreen = ({navigation}) => {


    const [LoginStatus, setLoginStatus] = React.useState('');
    React.useEffect(() => {

        // Create an scoped async function in the hook
        async function anyNameFunction() {

            //  const GetDetails = await getItemFromStorage('Online')
            const GetDetails = await getItemFromStorage('riderScreenStatus');
            // const riderloginImageDate= await getItemFromStorage("riderloginImageDate")
            const loginImage = await getItemFromStorage('loginImage');

            // alert(GetDetails)
            //  setLoginStatus(GetDetails)
            if (GetDetails == 'Online') {
                // alert("image"+riderloginImageDate)

                var date = new Date();
                var day = date.getDate();
                var month = date.getMonth();
                var year = date.getFullYear();
                var todat_date_takeselfie = day + '-' + month + '-' + year;
                //alert(todat_date_takeselfie)
                if (loginImage == 'true') {
                    // alert("ssss")
                    setLoginStatus('Online');
                    navigate('RiderStatusOnline1');

                } else {
                    // alert("nnnnn")
                    setLoginStatus('Online');
                    navigate('RiderStatusOnline');
                }


            } else {
                setLoginStatus('Offline');
            }

        }

        // Execute the created function directly
        anyNameFunction();
    }, []);

    //   async function getInitialScreen() {
    //     const GetDetails = await getItemFromStorage('Online')
    //     if (GetDetails=="Online") { setLoginStatus("Online")
    //     "RiderStatusOnline"}
    //     else { setLoginStatus("Offline")
    //     "Dashboard" }

    // }


    return (

        <RootStack.Navigator>

            {/* {
           LoginStatus=="Online" ?
           <RootStack.Screen
           initialRouteName=  "RiderStatusOnline"
           name="RiderStatusOnline"
           component={RiderStatusOnline}
           options={{ headerShown: false , title:"" }}  />: */}

            <RootStack.Screen
                initialRouteName="Dashboard"
                name="Dashboard"
                component={MyTabs}
                options={{headerShown: false, title: ''}}/>

            <RootStack.Screen name="LoginScreen" headerBackground="red" component={LoginScreen}
                              options={{headerShown: false, title: 'Login'}}/>
            <RootStack.Screen name="Otp" component={OTPScreen} options={{headerShown: false, title: 'Verification'}}/>
            <RootStack.Screen name="SignUpScreen" component={SignUpScreen}
                              options={{headerShown: false, title: 'Registartion'}}/>
            <RootStack.Screen name="License" component={License} options={{headerShown: false, title: ''}}/>
            <RootStack.Screen name="RCDocument" component={RCDocument} options={{headerShown: false, title: ''}}/>
            <RootStack.Screen name="Insurance" component={Insurance} options={{headerShown: false, title: ''}}/>
            <RootStack.Screen name="Pancard" component={Pancard} options={{headerShown: false, title: ''}}/>
            <RootStack.Screen name="Aadharcard" component={Aadharcard} options={{headerShown: false, title: ''}}/>
            <RootStack.Screen name="Bankdetails" component={Bankdetails} options={{headerShown: false, title: ''}}/>
            <RootStack.Screen name="UploadImage" component={UploadImage} options={{headerShown: false, title: ''}}/>
            <RootStack.Screen name="ChangeImage" component={ChangeImage} options={{headerShown: false, title: ''}}/>
            <RootStack.Screen name="RiderDetails" component={RiderDetails} options={{headerShown: false, title: ''}}/>
            <RootStack.Screen name="Language" component={Language} options={{headerShown: false, title: ''}}/>
            {/* <RootStack.Screen name="Dashboard" component={MyTabs} options={{ headerShown: false , title:"" }}/> */}

            {/* </>

    } */}

            {/* <RootStack.Screen name="Dashobard" component={MyTabs} options={{ headerShown: false , title:"" }}/> */}

            <RootStack.Screen name="MoreDetails" component={MoreDetails} options={{headerShown: false, title: ''}}/>
            <RootStack.Screen name="ReferEarn" component={ReferEarn}
                              options={{headerShown: false, title: 'Refer and Earn'}}/>
            <RootStack.Screen name="HelpAndSupport" component={HelpAndSupport}
                              options={{headerShown: false, title: 'Help / Supports'}}/>
            <RootStack.Screen name="SuccessScreen" component={SuccessScreen}
                              options={{headerShown: false, title: 'Success  / Screen'}}/>
            <RootStack.Screen name="RiderRideComplete" component={RiderRideComplete}
                              options={{headerShown: false, title: 'RiderRide / Complete'}}/>
            <RootStack.Screen name="RiderMultipleDestination" component={RiderMultipleDestination}
                              options={{headerShown: false, title: 'RiderMultiple Destination'}}/>

            <RootStack.Screen name="RiderHomeOtp" component={RiderHomeOtp}
                              options={{headerShown: false, title: 'RiderHomeOtp'}}/>
            <RootStack.Screen name="RiderOngoingRide" component={RiderOngoingRide}
                              options={{headerShown: false, title: 'RiderOngoingRide'}}/>
            <RootStack.Screen name="RiderGoingHome" component={RiderGoingHome}
                              options={{headerShown: false, title: 'RiderGoingHome'}}/>
            <RootStack.Screen name="RiderStatusGoToHome" component={RiderStatusGoToHome}
                              options={{headerShown: false, title: 'RiderStatusGoToHome'}}/>
            <RootStack.Screen name="RiderStatusOnline" component={RiderStatusOnline}
                              options={{headerShown: false, title: 'RiderStatusOnline'}}/>

            <RootStack.Screen name="RiderStatusOnline1" component={RiderStatusOnline1}
                              options={{headerShown: false, title: 'RiderStatusOnline1'}}/>
            <RootStack.Screen name="RiderStatusOnlineWearMask" component={RiderStatusOnlineWearMask}
                              options={{headerShown: false, title: 'RiderStatusOnlineWearMask'}}/>
            <RootStack.Screen name="RiderGoToHome" component={RiderGoToHome}
                              options={{headerShown: false, title: 'RiderGoToHome'}}/>
            <RootStack.Screen name="RiderHomeNewRide" component={RiderHomeNewRide}
                              options={{headerShown: false, title: 'RiderHomeNewRide'}}/>

            <RootStack.Screen name="RiderMultipleDestinationDetails" component={RiderMultipleDestinationDetails}
                              options={{headerShown: false, title: 'RiderMultipleDestinationDetails'}}/>


            <RootStack.Screen name="RiderCustomerSign" component={RiderCustomerSign}
                              options={{headerShown: false, title: 'RiderCustomerSign'}}/>
            <RootStack.Screen name="RiderWithDraw" component={RiderWithDraw}
                              options={{headerShown: false, title: 'RiderWithDraw'}}/>
            <RootStack.Screen name="OutstandingBlock" component={OutstandingBlock}
                              options={{headerShown: false, title: 'OutstandingBlock'}}/>

            <RootStack.Screen name="MinimumBalance" component={MinimumBalance}
                              options={{headerShown: false, title: 'MinimumBalance'}}/>
            <RootStack.Screen name="RiderCancel" component={RiderCancel}
                              options={{headerShown: false, title: 'RiderCancel'}}/>

            <RootStack.Screen name="RiderRideRating" component={RiderRideRating}
                              options={{headerShown: false, title: 'RiderRideRating'}}/>
            <RootStack.Screen name="RiderPayment" component={RiderPayment}
                              options={{headerShown: false, title: 'RiderPayment'}}/>

            <RootStack.Screen name="RiderAssistiveTouch" component={RiderAssistiveTouch}
                              options={{headerShown: false, title: 'RiderAssistiveTouch'}}/>
            <RootStack.Screen name="EarningsMonthView" component={EarningsMonthView}
                              options={{headerShown: false, title: 'EarningsMonthView'}}/>

            {/* <RootStack.Screen name="CustomerSignUpScreen" component={CustomerSignUpScreen} options={{ headerShown: true , title:"CustomerSignUpScreen" }}/>

             <RootStack.Screen name="CustomerPaymentOption" component={CustomerPaymentOption} options={{ headerShown: true , title:"CustomerPaymentOption" }}/>
             <RootStack.Screen name="CustomerPaymentPage" component={CustomerPaymentPage} options={{ headerShown: true , title:"CustomerPaymentPage" }}/> */}

            <RootStack.Screen name="CameraScreen" component={CameraScreen}
                              options={{headerShown: false, title: 'RNCamera'}}/>

            <RootStack.Screen name="Earning" component={Earning} options={{headerShown: false, title: 'Registartion'}}/>
            <RootStack.Screen name="Incentives" component={Incentives}
                              options={{headerShown: false, title: 'Registartion'}}/>
            <RootStack.Screen name="BookingHistory" component={BookingHistory}
                              options={{headerShown: false, title: 'Registartion'}}/>
            <RootStack.Screen name="HistoryMore" component={HistoryMore}
                              options={{headerShown: false, title: 'Registartion'}}/>
            <RootStack.Screen name="EarningMore" component={EarningMore}
                              options={{headerShown: false, title: 'Registartion'}}/>


            <RootStack.Screen name="HomeScreen" component={HomeScreen}
                              options={{headerShown: false, title: 'Registartion'}}/>
            <RootStack.Screen name="RaidingScreen" component={RaidingScreen}/>
            {/* <RootStack.Screen name="PaymentScreen" component={PaymentScreen} /> */}

            <RootStack.Screen name="SplashScreen" component={SplashScreen}/>

            {/* <RootStack.Screen name="SignInScreen" component={SignInScreen} /> */}
            {/* <RootStack.Screen name="VerificationScreen" component={VerificationScreen}/> */}

        </RootStack.Navigator>
    );
};
export default RootStackScreen;

import React from 'react';

// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import ExploreScreen from '../screens/ExploreScreen';
import ProfileScreen from '../screens/ProfileScreen';
import callingScreen from '../screens/CallingScreen'

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();


const Tab = createBottomTabNavigator();
// const Tab = createMaterialBottomTabNavigator();
Icon.loadFont();
const MainTabScreen = () => (
  <Tab.Navigator
    // initialRouteName="Home"
    // activeColor="#fff"
    // barStyle={{ backgroundColor: '#e91e63' }}
    // tabBarOptions={{
    //   activeTintColor: '#fff',
      
    // }}

    initialRouteName={'Home'}
    tabBarOptions={{
       activeTintColor: 'orange',
       inactiveTintColor: 'lightgray',
       activeBackgroundColor: '#009387',
       inactiveBackgroundColor:  '#009387',
           style: {
                 backgroundColor:  '#009387',
                //  paddingBottom: 3
                paddingTop:3
           }
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarVisible:false,
        tabBarColor: '#009387',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Search"
      component={DetailsStackScreen}
      options={{
        tabBarLabel: 'Search',
        tabBarColor: 'red',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-search" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="TeleHealth"
      component={ProfileScreen}
      options={{
        tabBarLabel: 'TeleHealth',
        tabBarColor: 'orange',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-person" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Account"
      component={ExploreScreen}
      options={{
        tabBarLabel: 'Account',
        tabBarColor: '#009387',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-aperture" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;


const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#009387',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}>
  
    <HomeStack.Screen name="Home" component={HomeScreen} options={{
      title: 'JOIN ROOM',
      headerLeft: () => (
        <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
      )
    }} />
     <HomeStack.Screen name="Calling" component={callingScreen} options={{
      title: 'Overview',
      headerLeft: () => (
        <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
      )
    }} />
  </HomeStack.Navigator>
);

const DetailsStackScreen = ({ navigation }) => (
  <DetailsStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#009387',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}>
    <DetailsStack.Screen name="Details" component={DetailsScreen} options={{
      title: 'Search',
      headerLeft: () => (
        <Icon.Button name="ios-menu" size={25} backgroundColor='#009387' onPress={() => navigation.openDrawer()}></Icon.Button>
      )
    }} />
  </DetailsStack.Navigator>
);

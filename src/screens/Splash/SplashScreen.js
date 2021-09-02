import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    Image
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useDispatch } from 'react-redux'

import { Box, Header } from '../../components'
import { selectIcon } from '../../Tools/LoadLibrary';
import Carousel from 'react-native-banner-carousel';
import { Searchbar } from 'react-native-paper';


const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 150;
const images = [
    "https://reactjs.org/logo-og.png",
    "https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png",
    "https://static.javatpoint.com/images/logo/jtp_logo.png"
];


const SplashScreen = ({ navigation }) => {

    const dispatch = useDispatch()
    const { colors } = useTheme();
    const [getLocalStorage, setLocalStorage] = React.useState(false);
    const MaterialIcons = selectIcon('MaterialIcons')


    function renderPage(image, index) {
        return (
            <View key={index}>
                <Image style={{ width: BannerWidth, height: BannerHeight }}
                    resizeMode="contain"
                    source={{ uri: image }} />
            </View>
        );
    }

    function onChangeSearch() { }


    return (
        <View style={styles.container}>

            <Header
                leftIconType={'Ionicons'}
                LeftIcon={'menu-sharp'}
                RightIconType={'Ionicons'}
                RightIcon={'cart-sharp'}
            />

            <>
                <View style={{ flex: 0.2, paddingLeft: 10, paddingRight: 10 }}>
                    <Searchbar
                        style={{ borderRadius: 10, height: 40, backgroundColor: '#E9E9E9' }}
                        placeholder="Enter your location"
                        icon="pin"
                        onChangeText={onChangeSearch}
                    />
                </View>
                <View style={{ flex: 1, marginTop: 20 }}>
                    <Carousel
                        autoplay
                        autoplayTimeout={5000}
                        loop
                        index={0}
                        pageSize={BannerWidth}
                    >
                        {images.map((image, index) => renderPage(image, index))}
                    </Carousel>
                </View>
                <View style={{ flex: 1, height: 150, padding: 20, paddingTop: 0 }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Box IconType={'MaterialCommunityIcons'} Icon={'motorbike'} value="Bike" onPress={() => navigation.navigate('RaidingScreen')}/>
                        <Box IconType={'MaterialCommunityIcons'} Icon={'car-hatchback'} value="Cab" />
                        <Box IconType={'MaterialCommunityIcons'} Icon={'car-hatchback'} value="Auto" />
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'space-around' }}>
                        <Box IconType={'MaterialCommunityIcons'} Icon={'truck-delivery'} value="Delivery" />
                        <Box IconType={'MaterialCommunityIcons'} Icon={'car-hatchback'} value="Errands" />
                        <Box IconType={'MaterialIcons'} Icon={'miscellaneous-services'} value="Professional Service" />
                    </View>
                </View>
                <View style={{ flex: 1, borderTopWidth: 2, borderTopColor: '#ccc', paddingTop: 20 }}>
                    <Text style={{paddingLeft:20}}>Pick Your Order   </Text>
                    <Carousel
                        autoplay
                        autoplayTimeout={5000}
                        loop
                        index={0}
                        pageSize={BannerWidth}
                    >
                        {images.map((image, index) => renderPage(image, index))}
                    </Carousel>
                </View>
            </>
        </View>
    );
};

export default SplashScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#009387'
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    logo: {
        // width: height_logo,
        // height: height_logo
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        color: 'grey',
        marginTop: 5
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold'
    }
});

// import React, { Component } from 'react';  
//  import { Platform, StyleSheet, View, Text,  
//  Image, TouchableOpacity, Alert } from 'react-native';  
//  export default class Myapp extends Component  
// {  
//    constructor(){  
//      super();  
//      this.state={  
//      isVisible : true,  
//     }  
//   }  
//    Hide_Splash_Screen=()=>{  
//     this.setState({   
//       isVisible : false   
//     });  
//   }  
   
//   componentDidMount(){  
//     var that = this;  
//     setTimeout(function(){  
//       that.Hide_Splash_Screen();  
//     }, 2000);  
//    }  
   
//     render()  
//     {  
//         let Splash_Screen = (  
//              <View style={styles.SplashScreen_RootView}>  
//                  <View style={styles.SplashScreen_ChildView}>  
//                        <Image source={{uri:'https://static.javatpoint.com/tutorial/react-native/images/react-native-tutorial.png'}}  
//                     style={{width:'100%', height: '100%', resizeMode: 'contain'}} />  
//                 </View>  
//              </View> )  
//          return(  
//              <View style = { styles.MainContainer }>  
//                 <Text style={{textAlign: 'center'}}> Splash Screen Example</Text>  
//                  {  
//                   (this.state.isVisible === true) ? Splash_Screen : null  
//                 }  
//             </View>  
//               );  
//     }  
// }  
//  const styles = StyleSheet.create(  
// {  
//     MainContainer:  
//     {  
//         flex: 1,  
//         justifyContent: 'center',  
//         alignItems: 'center',  
//         paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0  
//     },  
   
//     SplashScreen_RootView:  
//     {  
//         justifyContent: 'center',  
//         flex:1,  
//         margin: 10,  
//         position: 'absolute',  
//         width: '100%',  
//         height: '100%',  
//       },  
   
//     SplashScreen_ChildView:  
//     {  
//         justifyContent: 'center',  
//         alignItems: 'center',  
//         backgroundColor: '#00BCD4',  
//         flex:1,  
//     },  
// });  
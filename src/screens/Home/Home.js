import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    Image as DisplayImage,
    SafeAreaView,
    TextInput
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useDispatch } from 'react-redux'

import { Box, Header,CircleButton } from '../../components'
import { selectIcon } from '../../Tools/LoadLibrary';
import Carousel from 'react-native-banner-carousel';
import { Searchbar } from 'react-native-paper';
import { Images } from '../../utils'
// import CircleButton from "react-native-circle-floatmenu";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Appicon from "../../components/Appicon";

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 150;
const images = [
    "https://reactjs.org/logo-og.png",
    "https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png",
    "https://static.javatpoint.com/images/logo/jtp_logo.png"
];


const HomeScreen = ({ navigation }) => {

    const dispatch = useDispatch()
    const { colors } = useTheme();
    const [getLocalStorage, setLocalStorage] = React.useState(false);
    const MaterialIcons = selectIcon('MaterialIcons')


    function renderPage(image, index) {
        return (
            <View key={index}>
                <DisplayImage
                    style={{
                        //  width: BannerWidth, height: BannerHeight 
                        height: 100,
                    }}
                    resizeMode="contain"
                    source={{ uri: image }} />
            </View>
        );
    }

    function onChangeSearch() { }


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
           
                <View style = {{backgroundColor:'#F87300' , height:"35%" , borderBottomEndRadius:100 ,marginBottom:30}}>
                    
                <View style = {{  height:"30%"}}>
                    
                </View>
                <View style = {{ height:"40%"}}>
                      <Text style = {{marginStart:15, fontSize:18 , fontWeight:'bold',color:'white' , marginBottom:8}}>Hello User !!</Text>
      <View style={{ flex: 0.2, paddingLeft: 15, paddingRight: 15 , marginTop:0}}>
                        <Searchbar
                            inputStyle={{ fontSize: 12 , }}
                            style={{ borderRadius: 15, height: 60, backgroundColor: 'white' }}
                            placeholder="Enter your location"
                            icon={Images.Location}
                            onChangeText={onChangeSearch}
                        />
                    </View>
                </View>
                </View>
           
                {/* <Header
                    leftIconType={'Ionicons'}
                    LeftIcon={'menu-sharp'}
                    RightIconType={'Ionicons'}
                    RightIcon={'cart-sharp'}
                /> */}
                   
                   {/* <View style = {{flex:1 , height:"20%" , backgroundColor:'red'}}></View> */}
                <>
                {/* <Text style = {{fontSize:18 , fontWeight:'bold',color:'red'}}>Manish</Text> */}
                    {/* <View style={{ flex: 0.2, paddingLeft: 10, paddingRight: 10 }}>
                        <Searchbar
                            inputStyle={{ fontSize: 12 }}
                            style={{ borderRadius: 10, height: 50, backgroundColor: 'white' }}
                            placeholder="Enter your location"
                            icon={Images.Location}
                            onChangeText={onChangeSearch}
                        />
                    </View> */}
                    {/* <View style={{ marginTop: 10, height: 100 }}>
                        <Carousel
                            autoplay
                            autoplayTimeout={5000}
                            loop
                            index={0}
                            pageSize={BannerWidth}
                        >
                            {images.map((image, index) => renderPage(image, index))}
                        </Carousel>
                    </View> */}
                    <View style={{ flex: 1, justifyContent: 'space-around', padding: "10%" , }}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <Box IconType={'MaterialCommunityIcons'} Icon={'bike'} value="Bike Taxi" onPress={() => { navigation.navigate('RaidingScreen') }} />
                            <Box IconType={'MaterialCommunityIcons'} Icon={'auto'} value="Auto" onPress={() => { navigation.navigate('RaidingScreen') }} />
                            {/* <Box IconType={'MaterialCommunityIcons'} Icon={'car'} value="Cab" onPress={() => { navigation.navigate('RaidingScreen') }} /> */}
                            {/* <Box IconType={'MaterialCommunityIcons'} Icon={'auto'} value="Auto" onPress={() => { navigation.navigate('RaidingScreen') }} /> */}
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: "30%", justifyContent: 'space-around' }}>
                        <Box IconType={'MaterialCommunityIcons'} Icon={'car'}   value="Cabs" onPress={() => { navigation.navigate('RaidingScreen') }} />
                            {/* <Box IconType={'MaterialCommunityIcons'} Icon={'delivery'} value="Delivery" onPress={() => { navigation.navigate('RaidingScreen') }} />
                            <Box IconType={'MaterialCommunityIcons'} Icon={'errands'} value="Errands" onPress={() => { navigation.navigate('RaidingScreen') }} /> */}
                            <Box IconType={'FontAwesome5'} Icon={'ProfessionalServices'} value="Commercial" onPress={() => { navigation.navigate('RaidingScreen') }} />
                        </View>
                    </View>
                    <View style={{ height: 150, borderTopWidth: 1, borderTopColor: '#ccc' }}>
                        <Text style={{ paddingLeft: 20 , marginTop:20 , fontWeight:'bold' }}>Your Offers</Text>
                        <TextInput
                style={styles.input}
                autoCapitalize="none"
             
                onChangeText={(mobile) => setName(mobile)}
              />

                        {/* <Carousel
                            autoplay
                            autoplayTimeout={5000}
                            loop
                            index={0}
                            pageSize={BannerWidth}
                        >
                            {images.map((image, index) => renderPage(image, index))}
                        </Carousel> */}
                    </View>
                    {/* <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', bottom: 20 }}> */}
                        {/* <DisplayImage
                            source={Images.Logo} resizeMode="contain" /> */}

                        {/* <CircleButton 
                        buttonColor="rgba(0,0,0,1)" position="center">
                            <CircleButton.Item
                                position="absolute"
                                buttonColor="#000"
                                title="Perfil"
                                onPress={() => console.log("BtnPress")}
                            >
                                <Icon
                                    name="card-account-details"
                                    style={styles.circleButtonIcon}
                                />
                            </CircleButton.Item>
                            <CircleButton.Item
                                position="absolute"
                                buttonColor="#000"
                                title="Perfil"
                                onPress={() => console.log("BtnPress")}
                            >
                                <Icon name="bookmark-outline" style={styles.circleButtonIcon} />
                            </CircleButton.Item>
                            <CircleButton.Item
                                position="absolute"
                                buttonColor="#000"
                                title="Perfil"
                                onPress={() => console.log("BtnPress")}
                            >
                                <Icon
                                    name="briefcase-outline"
                                    style={styles.circleButtonIcon}
                                />
                            </CircleButton.Item>
                            <CircleButton.Item
                                position="absolute"
                                buttonColor="#000"
                                title="Perfil"
                                onPress={() => console.log("BtnPress")}
                            >
                                <Icon
                                    name="reply"
                                    style={styles.circleButtonIcon}
                                />
                            </CircleButton.Item>
                            <CircleButton.Item
                                position="absolute"
                                buttonColor="#000"
                                title="Perfil"
                                onPress={() => console.log("BtnPress")}
                            >
                                <Icon
                                    name="reply"
                                    style={styles.circleButtonIcon}
                                />
                            </CircleButton.Item>
                       
                        </CircleButton> */}
                    {/* </View> */}
                </>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

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
    },
    btn_container: {
        flex: 1,
        backgroundColor: "#59a6eb",
        justifyContent: "center",
        width: "100%",
        elevation: 8,
        borderRadius: 5,
        margin: 1,
      },
      circleButtonIcon: {
        fontSize: 20,
        height: 22,
        color: "white",
      },
      input: {
        width: 360,
        height: 60,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20,
        marginTop:10,
        padding: 5,
        color: '#000',
        fontSize: 16,
        borderColor: "#d9d9d9",
        borderWidth: 3,
      },
});


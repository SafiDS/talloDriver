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
    FlatList,
} from 'react-native';
import {themes} from '../../utils';
import {useDispatch, useSelector} from 'react-redux';
import {getItemFromStorage} from '../../utils/AccessStorage';
import {StaticText} from '../../utils';
import {navigate, navigateScreen} from '../../Tools/NavigationServices';
import {useFocusEffect} from '@react-navigation/native';
import lang from '../../language/lang_values';
import {Rating} from 'react-native-ratings';
import moment from 'moment';


export default function BookingHistory({navigation}) {
    const dispatch = useDispatch();

    let booking_info = useSelector(state => {
        //console.log('State: booking_info', state.SignIn.Rider_booking);
        return state.SignIn.Rider_booking;
    });

    const array = [];

    const [rider_id, setRiderId] = useState('');
    const [rider_booking_info, setBookinginfo] = useState([]);
    const [LangId, setLangId] = useState('');


    React.useEffect(() => {
        async function data() {
            var id = await getItemFromStorage('RiderId');
            const lanid = await getItemFromStorage('LangId');
            if (!lanid) {
            } else {
                setLangId(lanid);
            }
            // alert(id)
            var request = {'rider_id': id};
            dispatch({type: 'RIDER_BOOKINGS', payload: request});
        }

        data();
        getdata();
        const unsubscribe = navigation.addListener('focus', () =>
            refreshPage(),
        );
        return () => {
            // clean up event listener
            unsubscribe;
        };
    }, []);

    async function Goback() {
        var img = await getItemFromStorage('loginImage');
        if (img == 'true') {
            navigate('RiderStatusOnline1');
        } else {
            navigation.goBack()
            //navigate('Dashboard');
        }

    }

    // useFocusEffect(
    //   React.useCallback(() => {
    //     let isActive = true;

    //     const fetchUser = async () => {


    //       try {
    //         var id = await getItemFromStorage("RiderId")
    //        // alert("refresh",id)
    //       var request={ "rider_id":id}
    //       dispatch({type:'RIDER_BOOKINGS',payload: request})

    //         if (isActive) {
    //           if(booking_info!=""){

    //             setBookinginfo(booking_info)
    //             console.log('State: booking_info1', rider_booking_info);

    //              }else{
    //               alert("History Not available")
    //            }
    //         }
    //       } catch (e) {
    //         // Handle error
    //       }
    //     };

    //     fetchUser();

    //     return () => {
    //       isActive = false;
    //     };
    //   })
    // );

    async function getdata() {

        if (booking_info != '') {
            setBookinginfo(booking_info);
            console.log('State: booking_info1', rider_booking_info);

        } else {
            alert('History Not available');
        }


    }

    async function refreshPage() {
        const lanid = await getItemFromStorage('LangId');
        if (!lanid) {
        } else {
            setLangId(lanid);
        }
//   var id = await getItemFromStorage("RiderId")
//   alert("refresh",id)
// var request={ "rider_id":id}
// dispatch({type:'RIDER_BOOKINGS',payload: request})
// if(booking_info!=""){

//   setBookinginfo(booking_info)
//   console.log('State: booking_info1', rider_booking_info);

//    }else{
//     alert("History Not available")
//  }
    }


    const renderUserProfile = (item, avgMinutes) => {
        return (
            <View style={styles.profileContainer}>
                <View style={styles.profileView}>
                    <View style={styles.profileCenter}>
                        <Image style={styles.userProfilePic}
                               source={item?.rider_profile_image ? {uri: item.rider_profile_image} : require('../../assets/Images/photo.png')}/>
                        <View style={styles.profilePicView}>
                            <Text style={styles.profileTitle}>{item?.rider_name ? item.rider_name : ' - '}</Text>
                            <View style={styles.profileCenter}>
                                <Rating
                                    count={5}
                                    defaultRating={4}
                                    imageSize={15}
                                    isDisabled={true}
                                    showRating={false}
                                />
                                <Text style={styles.ratingCount}>{'4.5'}</Text>
                            </View>

                        </View>
                    </View>

                    <View style={styles.profileColumnCenter}>
                        <Text style={styles.title}>{'Avg.Time'}</Text>
                        <Text style={styles.profileTitle}>{`${avgMinutes}m`}</Text>
                    </View>
                    <View style={styles.profileColumnCenter}>
                        <Text style={styles.profileTitle}>{`₹${item?.total_price ? item.total_price : 0}`}</Text>
                        <Text style={styles.title}>{`${item?.distance ? item.distance : 0} km`}</Text>
                    </View>
                </View>
            </View>
        );
    };

    const renderItem = ({item}) => {
        const pickupTime = moment(item.booking_start_time).format('hh:mm A');
        const departTime = moment(item.booking_end_time).format('hh:mm A');
        const totalMinutes = moment.duration(moment(item.booking_end_time).diff(moment(item.booking_start_time)));
        const avgMinutes = parseInt(totalMinutes.asMinutes()) % 60;
        return (
            <View style={styles.item}>
                <View style={styles.cardInfoContainer}>
                    <View style={styles.rowView}>
                        <View>
                            <View style={styles.startPointView}>
                                <Image source={require('../../assets/Images/Path2.png')} style={styles.image}/>
                            </View>
                            <View style={styles.directionLineView}>
                                <View style={styles.verticalLine}/>
                            </View>
                            <View style={styles.endingPointView}>
                                <Image source={require('../../assets/Images/Path1.png')} style={styles.image}/>
                            </View>
                        </View>
                        <View style={styles.infoView}>
                            <View style={{minHeight: 80}}>
                                <View style={styles.pickUpView}>
                                    <Text style={styles.title}>{'Pickup Location'}</Text>
                                    <Text style={styles.title}>{pickupTime}</Text>
                                </View>
                                <Text style={styles.locationTitle} numberOfLines={2}>
                                    {item.source}
                                </Text>
                            </View>
                            <View style={styles.horizontalLine}/>
                            <View>
                                <View style={styles.pickUpView}>
                                    <Text style={styles.title}>
                                        {'Drop Location'}
                                    </Text>
                                    <Text style={styles.title}>
                                        {departTime}
                                    </Text>
                                </View>
                                <Text style={styles.locationTitle} numberOfLines={2}>
                                    {item.destination}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.bottomBorder}/>
                {renderUserProfile(item, avgMinutes)}
            </View>
        );
    };

    StatusBar.setHidden(true);

    return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>


            <ScrollView>
                <View style={{marginTop: 1, marginBottom: 3, marginLeft: 0, flexDirection: 'row'}}>
                    <View>
                        <TouchableOpacity onPress={Goback}>
                            <Image style={{marginTop: 15, marginBottom: 0, width: 42, height: 42, marginLeft: 15}}
                                   source={require('../../assets/Images/BackButton.png')}/>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={{
                            marginRight: 0,
                            fontSize: 24,
                            marginLeft: 8,
                            marginTop: 20,
                            fontWeight: 'bold',
                            color: 'black',
                        }}>{lang.history[LangId]}</Text>
                    </View>
                </View>


                <View style={{
                    padding: 5,
                    margin: 14,
                }}>
                    <FlatList
                        data={rider_booking_info}
                        renderItem={renderItem}
                        keyExtractor={item => item.booking_number}
                    />
                </View>


            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

        // justifyContent: "center",
    },
    title: {
        fontSize: 16,
        color: 'gray',
        marginTop: 10,
    },
    title1: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
    },
    item: {
        backgroundColor: '#fff',
        padding: 5,
        // marginVertical: 8,
        // marginHorizontal: 16,
        marginBottom: 20,
    },

    item: {
        backgroundColor: '#fff',
        padding: 3,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#F1F1F1',
        marginHorizontal: 6,
        marginVertical: 10,
    },

    list: {
        flex: 1,
        marginTop: 20,
    },
    descriptionContainer: {
        flexDirection: 'row',
        paddingRight: 50,
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    textDescription: {
        marginLeft: 10,
        color: 'red',
    },

    cardInfoContainer: {
        flexDirection: 'column',
        marginStart: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    rowView: {
        flexDirection: 'row',
    },
    startPointView: {
        height: 30,
        width: 25,
        borderColor: 'white',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    directionLineView: {
        height: 70,
        width: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    verticalLine: {
        borderColor: 'lightgray',
        borderWidth: 2,
        height: '100%',
    },
    endingPointView: {
        height: 25,
        width: 25,
        borderColor: 'white',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoView: {
        marginLeft: 20,
        flex: 1,
    },
    pickUpView: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    horizontalLine: {
        borderBottomColor: '#F0F0F0',
        borderBottomWidth: 1,
        height: 3,
        flexDirection: 'row',
        marginBottom: 15,
    },
    bottomBorder: {
        borderBottomColor: '#F0F0F0',
        borderBottomWidth: 1,
        height: 3,
        flexDirection: 'row',
        marginVertical: 5,
        marginHorizontal: 15,
    },
    profileContainer: {
        marginHorizontal: 12,
        flex: 1,
    },
    profileView: {
        marginTop: 8,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    profileCenter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userProfilePic: {
        width: 45,
        height: 45,
        marginTop: 0,
        marginStart: 0,
        marginRight: 10,
        borderRadius: 5,
    },
    profilePicView: {
        alignItems: 'flex-start',
    },
    profileTitle: {
        color: 'black',
        fontSize: 16,
        fontFamily:'Baloo2-Bold'
    },
    profileColumnCenter: {
        alignItems: 'center',
    },
    ratingCount: {
        marginLeft: 5,
        color: '#f1c40f',
        fontSize: 16,
        fontFamily:'Baloo2-Regular'
    },

});

import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
    Image,
    StatusBar,
    Modal, FlatList, ScrollView,
} from 'react-native';
import {themes} from '../../utils';
import {navigate} from '../../Tools/NavigationServices';
import {getItemFromStorage} from '../../utils/AccessStorage';
import lang from '../../language/lang_values';
import moment from "moment";


export default function Incentives({navigation}) {


    const [LangId, setLangId] = useState('');
    const [riderInfo, setRiderInfo] = useState({
        rider_id: 0,
        to_company: 0,
        from_company: 0,
    });

    const [modalVisible, setModalVisible] = useState(false);
    const [riderIncentives, setRiderIncentives] = useState([]);

    React.useEffect(() => {
        refreshPage()
        const unsubscribe = navigation.addListener('focus', () =>
            refreshPage(),
        );
        return () => {
            // clean up event listener
            unsubscribe;
        };
    }, []);

    const getEarningList = async () => {
        let bodyData = {
            "rider_id": "1"
        };
        fetch(
            'https://www.tallo.in/was/rider_info',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyData),
            },
        )
            .then((response) => {
                return response.json();
            })
            .then(data => {
                console.log('Rider Info Response', data);
                if (data['statusCode'] == 'SUCCESS') {
                    setRiderIncentives(data.rider_incentives)
                    setRiderInfo(data.rider_info)
                }
            });
    }

    const getdata = async () => {
        var lanid = await getItemFromStorage('LangId');
        //alert("useeffect"+lanid)
        if (lanid != '') {
            setLangId(lanid);
        } else {
        }
    }

    const refreshPage = () => {
        getdata();
        getEarningList()
    }

    const _signUp = () => {
        setModalVisible(!modalVisible);
    }


    StatusBar.setHidden(true);


    const Goback = async () => {
        var img = await getItemFromStorage('loginImage');
        if (img == 'true') {
            navigate('RiderStatusOnline1');
        } else {
            navigation.goBack()
        }
    }

    const renderItem = ({item}) => {
        console.log(item, "item")
        return (
            <View style={styles.item}>
                <View style={styles.cardInfoContainer}>
                    <View style={styles.rowView}>
                        <View style={styles.infoView}>
                            <View style={styles.pickUpView}>
                                <Text style={[styles.buttontext, {color: 'black', fontSize: 18}]}>
                                    {item.id}
                                </Text>
                                <Text style={[styles.buttontext, {
                                    color: 'gray',
                                    fontFamily: themes.fontFamily.Normal,
                                    fontSize: 18
                                }]}>
                                    {item.date}
                                </Text>
                            </View>
                            <Text style={[styles.buttontext, {
                                color: 'gray',
                                fontFamily: themes.fontFamily.Normal,
                                fontSize: 16,
                                marginTop: 5
                            }]}>
                                {`₹${item?.incentive_amount ? item.incentive_amount : '0'}`}
                            </Text>
                            <Text
                                numberOfLines={2}
                                style={[styles.buttontext, {
                                    color: 'gray',
                                    fontFamily: themes.fontFamily.Normal,
                                    fontSize: 16,
                                    marginTop: 5
                                }]}>
                                {item.description}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>


            <View style={{flexDirection: 'row', marginTop: 20}}>
                <TouchableOpacity onPress={Goback}>
                    <Image
                        style={{marginRight: 20, marginTop: 5, marginBottom: 0, width: 30, height: 30, marginLeft: 10}}
                        source={require('../../assets/Images/BackButton.png')}/>
                </TouchableOpacity>

                <Text style={{
                    fontSize: 18,
                    fontFamily: themes.fontFamily.Bold,
                    color: 'black',
                    marginTop: 10,
                    marginLeft: 5,
                }}>{lang.Weekly_Incentives[LangId]}  </Text>
                <Text style={{
                    fontSize: 18,
                    fontFamily: themes.fontFamily.Bold,
                    color: 'black',
                    marginTop: 10,
                    marginLeft: 50,
                }}>
                    {`${lang.riderId_TA6543[LangId]} ${riderInfo.rider_id}`}
                </Text>
            </View>

            {/*<View style={{flexDirection: 'row', marginTop: 10}}>
                <View
                    style={[styles.loginBtn3, {backgroundColor: '#fff', borderWidth: 1, width: '40%'}]}>
                    <Text style={[styles.buttontext, {color: 'gray'}]}>{lang.From_Company[LangId]}</Text>
                    <Text style={[styles.buttontext, {color: 'black', marginTop: 10, fontSize: 28}]}>
                        {`₹${riderInfo?.from_company ? riderInfo.from_company : '0'}`}
                    </Text>
                </View>
                <View
                    style={[styles.loginBtn3, {backgroundColor: '#fff', borderWidth: 1, width: '40%'}]}>
                    <Text style={[styles.buttontext, {color: 'gray'}]}>{lang.To_Company[LangId]}</Text>
                    <Text style={[styles.buttontext, {color: 'black', marginTop: 10, fontSize: 28}]}>
                        {`₹${riderInfo?.to_company ? riderInfo.to_company : '0'}`}
                    </Text>
                </View>
            </View>*/}


            <View style={{
                padding: 5,
                margin: 14,
            }}>
                <FlatList
                    data={riderIncentives}
                    renderItem={renderItem}
                    keyExtractor={item => item.booking_number}
                />
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <TouchableOpacity onPress={() => _signUp()}>
                            <Image style={{
                                marginRight: 20,
                                marginTop: 20,
                                marginBottom: 0,
                                width: 15,
                                height: 15,
                                marginLeft: 270,
                            }} source={require('../../assets/Images/Cancel2.png')}/>
                        </TouchableOpacity>

                        <View style={{marginBottom: 0, padding: 10, margin: 1}}>
                            <View style={{
                                marginLeft: 15,
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Image style={{width: 60, height: 60, alignSelf: 'center'}}
                                       source={require('../../assets/Images/Withdraw.png')}/>
                                <Text style={{
                                    fontSize: 15,
                                    fontFamily: themes.fontFamily.Bold,
                                    marginBottom: 25,
                                    marginTop: 20,
                                    color: '#0000CC',
                                }}>Withdraw Requested</Text>
                                <Text style={{color: 'gray', fontFamily: themes.fontFamily.Bold, fontSize: 13}}>Your
                                    withdraw request
                                    has submitted</Text>
                                <Text style={{
                                    color: 'gray',
                                    fontFamily: themes.fontFamily.Bold,
                                    fontSize: 13,
                                    marginBottom: 0
                                }}>to
                                    Tallo Team. You will notified once</Text>
                                <Text style={{
                                    color: 'gray',
                                    fontFamily: themes.fontFamily.Bold,
                                    fontSize: 13,
                                    marginBottom: 20
                                }}>payment
                                    is proceed</Text>
                                <TouchableOpacity style={styles.loginBtn}
                                >
                                    <Text style={styles.buttontext}>Continue</Text>
                                </TouchableOpacity>
                            </View>

                        </View>


                    </View>
                </View>
            </Modal>
        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // justifyContent: "center",
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 2,
    },
    modalView: {
        margin: 20,
        height: 350,
        backgroundColor: 'white',
        borderRadius: 10,
        // padding: 35,
        // alignItems: "center",
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: 300,
    },
    loginBtn: {
        width: '50%',
        height: 45,
        marginLeft: 20,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 10,
        backgroundColor: '#F67321',
        color: '#000000',
        marginBottom: '10%',
        borderRadius: 10,
    },
    loginBtnn: {
        width: '50%',
        height: 45,
        marginLeft: 20,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 10,
        backgroundColor: 'white',
        color: '#000000',
        marginBottom: '10%',
        borderRadius: 15,
        borderColor: '#F67321',
        borderWidth: 1,
    },
    loginBtn3: {
        width: '50%',
        height: 100,
        marginLeft: 20,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 10,
        backgroundColor: 'white',
        color: '#000000',
        borderRadius: 15,
        borderColor: 'grey',
        borderWidth: 0.1,
    },
    buttontext: {
        color: 'white',
        fontSize: 17,
        fontFamily: themes.fontFamily.Bold,
    },

    buttontextt: {
        color: '#F67321',
        fontSize: 17,
        fontFamily: themes.fontFamily.Bold,
    },

    item: {
        backgroundColor: '#fff',
        padding: 3,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#F1F1F1',
        marginHorizontal: 0,
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
        fontFamily: 'Baloo2-Bold'
    },
    profileColumnCenter: {
        alignItems: 'center',
    },
    ratingCount: {
        marginLeft: 5,
        color: '#f1c40f',
        fontSize: 16,
        fontFamily: 'Baloo2-Regular'
    },

});

import React, {useState} from 'react';
import {
    View,
    Button, Text,
    TextInput, TouchableOpacity,
    StyleSheet, Image, FlatList,
    StatusBar,
} from 'react-native';
import {getStoreValue} from '../../Tools/StoreHandler';
import {useDispatch} from 'react-redux';
import {getItemFromStorage, saveToStorage} from '../../utils/AccessStorage';
import {StaticText, themes} from '../../utils';
import {navigate, navigateScreen} from '../../Tools/NavigationServices';


export default function Language({navigation}) {
    const dispatch = useDispatch();


    const [btnDisabled, setbtnDisabled] = useState(true);
    const [ItemId, setitemId] = useState('');
    const [imgLink, setimgLink] = useState('');
    const [itemindex, setitemindex] = useState('');
    const [rider_id, setRiderId] = useState('');


    React.useEffect(() => {
        // Create an scoped async function in the hook
        async function anyNameFunction() {
            const rider_id = await getItemFromStorage('RiderId');
            if (!rider_id) {
            } else {
                setRiderId(rider_id);
            }

        }

        //   const unsubscribe  = navigation.addListener("focus", () =>
        //   refreshPage()
        // );
        // return () => {
        //   // clean up event listener
        //   unsubscribe
        // }
        // Execute the created function directly
        anyNameFunction();
    }, []);

    StatusBar.setHidden(true);

    const RiderID = 'Rider Id:TA26354';

    const primaryData = [
        {

            id: '0',
            title: 'English',
        },
        {
            id: '1',
            title: 'Tamil',
        },
        {
            id: '2',
            title: 'Telugu',
        },

        {
            id: '3',
            title: 'Hindi',
        },
        {
            id: '4',
            title: 'Kannada',
        },
        {
            id: '5',
            title: 'Malayalam',
        },

    ];


    const renderItem = ({item}) => {
        return (
            <View>
                <View style={styles.listItem}>

                    <TouchableOpacity onPress={() => {
                        PressedItem(item.id, item.title), setitemindex(item.id);
                    }} style={{marginBottom: 5, marginTop: 4}}>

                        <Text style={{
                            backgroundColor: itemindex == item.id ? '#F87300' : '#ffff',
                            fontSize: 20,
                            color: 'grey',
                            fontFamily: themes.fontFamily.Normal,
                        }}>{item.title}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const PressedItem = (itemId, itemImg) => {
        //alert("hi")
        console.log(itemId);
        setitemId(itemId);
        setbtnDisabled(false);
        setimgLink(itemImg);
        saveToStorage('LangId', itemId.toString());
    };


    async function _signUp() {
        const rider_id = await getItemFromStorage('RiderId');

        console.log(rider_id);
        console.log(ItemId);
        fetch(
            'https://www.tallo.in/was/rider_language_update',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'rider_id': rider_id,
                    'language': ItemId,
                }),
            },
        )
            .then(function (response) {
                return response.json();
            })
            .then(data => {
                console.log('In fetch++++++++++', data);
                if (data['statusCode'] == 'SUCCESS') {

                    navigate('License');
                    // Addresses()
                }
            });


    }

    function signUp1() {
        navigate('SignUpScreen');

    }

    return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>


            <View style={{
                marginTop: -60,
                marginBottom: 100,
                marginLeft: 0,
                height: 5,
                flexDirection: 'column',
                justifyContent: 'space-around',
            }}>

                <Image style={{width: '100%', height: 390, alignSelf: 'center'}}
                       source={require('../../assets/Images/Rectangle.png')}/>
                <View style={{marginTop: 1, marginBottom: 100, marginLeft: 0, height: 5, flexDirection: 'row'}}>


                    <Image style={{marginTop: 60, marginBottom: 0, width: 150, height: 47, marginLeft: 75}}
                           source={require('../../assets/Images/largeLogo.png')}/>
                </View>
            </View>

            <TouchableOpacity onPress={signUp1}>
                <Image style={{marginTop: -20, marginBottom: 0, width: 42, height: 42, marginLeft: 15}}
                       source={require('../../assets/Images/BackButton.png')}/>
            </TouchableOpacity>

            <Text style={{
                fontSize: 20,
                color: '#ffffff',
                marginBottom: 25,
                marginTop: 100,
                marginLeft: 45,
                fontFamily: themes.fontFamily.Normal,
            }}>Choose Language</Text>


            <View>


                <FlatList
                    data={primaryData}
                    renderItem={renderItem}

                    keyExtractor={item => item.id.toString()}

                />


                <TouchableOpacity style={styles.loginBtn} onPress={() => _signUp()}>
                    <Text style={styles.buttontext}>Confirm</Text>
                </TouchableOpacity>

            </View>

            <View style={{
                position: 'absolute', //Here is the trick
                bottom: 4, left: 10,
            }}>
                <Image style={{width: 162, height: 35, marginLeft: 2}}
                       source={require('../../assets/Images/MadeInIndia.png')}/>
            </View>


        </View>
    );
}

const renderItem = ({item}) => (
    <Item title={item.title}/>
);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    buttongender: {
        color: 'white',
        // padding:20,
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: 12,
        textAlign: 'center',
    },

    logintext: {
        marginTop: 0,
        padding: 3,
        marginLeft: 0,
        color: '#000000',
        fontSize: 18,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },


    imageAvater: {
        paddingVertical: 30,
        padding: 30,
        width: 80,
        marginStart: 20,
        height: 80,
        // flexDirection:'row',
        // borderRadius: 150/2,
        // marginLeft:40,
        backgroundColor: '#fff',
        borderWidth: 1,
        // borderStyle: 'dashed',
        margin: 20,
    },
    uploadImageBtn: {
        borderRadius: 5,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 30,
    },
    item: {
        backgroundColor: '#fff',
        padding: 5,
        // marginVertical: 8,
        // marginHorizontal: 16,
    },
    title: {
        fontSize: 20,
        color: 'gray',
    },
    title1: {
        fontSize: 24,
        color: 'black',
        fontWeight: 'bold',
    },
    loginBtn: {
        borderRadius: 5,
        height: 35,
        marginLeft: 50,
        marginRight: 60,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 100,
        backgroundColor: '#F87300',
        marginBottom: 100,
    },
    buttontext: {
        color: '#fff',
        fontSize: 16,
        fontFamily: themes.fontFamily.Bold,
    },
    listItem: {

        marginBottom: -15, padding: 8, margin: 14, borderRadius: 15, marginTop: 10,

    },

    SelectedlistItem: {
        marginBottom: -10, padding: 1, margin: 14, borderRadius: 15, marginTop: 10,
        width: 190,
        height: 45,
    },

});

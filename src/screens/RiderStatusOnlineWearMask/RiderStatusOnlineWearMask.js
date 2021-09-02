import React, {useState} from 'react';
import {
    View,
    Button, Text,
    TextInput, TouchableOpacity,
    StyleSheet, Image, StatusBar,
} from 'react-native';
import {getStoreValue} from '../../Tools/StoreHandler';
import {useDispatch} from 'react-redux';
import {getItemFromStorage} from '../../utils/AccessStorage';
import {Images} from '../../utils';
import Appicon from '../../components/Appicon';
import {ScrollView} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function RiderStatusOnlineWearMask({navigation}) {
    const dispatch = useDispatch();

    const [Name, setName] = useState('');
    const [Date, setDate] = useState('');
    const [Email, setEmail] = useState('');
    const [City, setCity] = useState('');
    const [Gender, setGender] = useState('');
    const [Phone, SetPhone] = useState('');
    StatusBar.setHidden(true);
    const uploadMsg = 'Make sure you upload you latest picture';

    React.useEffect(() => {
        // Create an scoped async function in the hook
        async function anyNameFunction() {
            const GetDetails = await getItemFromStorage('PhoneNumber');
            if (!GetDetails) {
            } else {
                SetPhone(GetDetails);
            }

        }

        // Execute the created function directly
        anyNameFunction();
    }, []);


    function _signUp() {
        var request = {
            'Name': Name,
            'Date': Date,
            'Email': Email,
            'City': City,
            'gender': Gender,
            'phone': Phone,
            'navigation': navigation,
        };
        dispatch({type: 'Change_Image', payload: request});
    }


    function selectGender(Status) {
        console.log(Status);
        setGender(Status);
    }


    return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>


            <ScrollView>
                <Text style={{
                    fontSize: 16,
                    color: '#000000',
                    fontWeight: 'bold',
                    marginLeft: 25,
                    marginTop: 17,
                    marginBottom: 20,
                }}>Upload Photo</Text>

                <View style={styles.container}>
                    {/* <View style={{ marginBottom: 40, marginLeft: 0 }}>
          </View> */}
                    <View style={{textAlign: 'left'}}>
                        {/* <Text style={{ fontSize: 16, color: '#000000', fontWeight: 'bold', marginLeft: 1 }}>Upload Photo</Text> */}


                        <View style={styles.imageAvater}>

                            <TouchableOpacity style={styles.uploadImageBtn} onPress={() => _signUp()}>
                                {/* <AntDesign name="upload" size={20} color="#808080" /> */}
                                {/* <Text style={styles.uploadtext}>Upload your image</Text> */}
                            </TouchableOpacity>


                        </View>


                    </View>

                </View>
                <TouchableOpacity
                    style={[styles.loginBtn, {backgroundColor: 'white', borderColor: 'red', borderWidth: 1}]}
                    onPress={() => _signUp()}>
                    <Text style={[styles.buttontext, {color: 'red', fontWeight: '100', marginTop: 10}]}>Change
                        Image1</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.loginBtn, {marginTop: 70, marginBottom: 20}]}
                                  onPress={() => _signUp()}>
                    <Text style={styles.buttontext}>Upload Photo</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: 370,
        height: 40,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 15,
        borderRadius: 15,
        padding: 0,
        paddingLeft: 10,
        color: '#000',
        fontSize: 16,
        borderColor: '#d9d9d9',
        borderWidth: 1,
    },
    logintext: {
        padding: 3,
        // marginLeft: 10,
        color: '#000000',
        fontSize: 18,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },

    loginBtn: {
        borderRadius: 5,
        height: 35,
        marginLeft: 50,
        marginRight: 60,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 50,
        backgroundColor: '#F87300',
        marginBottom: 30,
    },
    buttontext: {
        color: '#fff',
        fontSize: 16, fontWeight: 'bold',
    },

    imageAvater: {
        paddingVertical: 30,
        padding: 10,
        width: 150,
        height: 150,
        // borderRadius: 150/2,
        // marginLeft:40,
        backgroundColor: '#fff',
        borderWidth: 1,
        // borderStyle: 'dashed',
        margin: 30,
    },
    uploadImageBtn: {
        borderRadius: 5,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 30,
    },
    uploadtext: {
        color: '#808080',
        fontSize: 16,
        marginTop: 5,
    },

});

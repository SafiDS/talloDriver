import React, { useState } from 'react'
import { View, Text , TextInput , StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';



const InputCircle = props => {
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    return (

        <View style = {styles.maincontainer}> 
          <CheckBox style={{ height: 40, marginLeft: 10 , backgroundColor:'red' }}
                  tintColor={'white'}
                  height={"70%"}
                  disabled={false}
                  value={toggleCheckBox}
                //   boxType="square"
                  onValueChange={(newValue) => setToggleCheckBox(newValue)}
                />
                    <TextInput
                    style={styles.inputtext}
                    onChangeText={(mobile) => setMobile(mobile)}
                    placeholder={"Enter mobile number "}
                    paddingHorizontal={10}
                    keyboardType={'number-pad'}
                    placeholderTextColor="#000"
                    color={'black'}
                    returnKeyType='done'
                />
        </View>

    )

}

const styles = StyleSheet.create({
maincontainer:{
    // flex:1,
    flexDirection:'row',
    height:"80%"
    
},
inputView:{

},
inputtext: {
    height: 40,
    width: "90%",
    borderColor: 'gray',
    borderWidth: 0.5
},

})

export default InputCircle
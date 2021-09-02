import React from 'react'
import {View , Text , StyleSheet } from 'react-native'
import DatePicker from 'react-native-datepicker'


const Calender = (props) => {

    return(
    <DatePicker
    style={styles.input}
    placeholder='DOB'
    date={Date}
    mode="date"
    format="YYYY-MM-DD"
    confirmBtnText="Confirm"
    cancelBtnText="Cancel"
    disabled={false}
   
    autoCapitalize="none"
    fontSize={18}
    customStyles={{
      dateIcon: {
        position: 'relative',
        marginLeft: 0,
        marginBottom:18
      },
      dateInput: {
        marginEnd:200,
        borderWidth: 0,
        fontSize:18,
        marginBottom:18
      },
      placeholderText: {
        fontSize: 17,
        color: "#AFAFAF",
        marginStart:-50
      },
    }}
    onDateChange={(mobile) => setDate(mobile)}
    // onChangeText={(mobile) => setDate(mobile)}
  />
    )

}

const styles = StyleSheet.create({

    input: {
        width: 350,
        height: 40,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 20,
        padding: 10,
        color: '#000',
        fontSize: 16,
        borderColor: "#d9d9d9",
        borderWidth: 0,
        borderRadius: 10,
        backgroundColor:'white',
        
      },
})
    

export default  Calender
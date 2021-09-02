import React , {Component} from 'react'
import {View,Text , Image ,StyleSheet } from 'react-native';


const Appicon= props => {

    return(
        <View style = {styles.iconStyle}>
        <Image source={props.icon} style={styles.icon} />
        </View>
    )

}

const styles = StyleSheet.create({
// iconStyle:{
//       width:50,
//       height:50 ,
//     //   marginTop:20,
//     //   marginLeft:-80,
//     //   alignContent:'center',
//     //   alignSelf:'center',
//     //   marginRight:20,
     
      
//     // backgroundColor:'#FDE8A5'

// },
icon: {
    // width: 250,
    height: 50,
    alignSelf: 'center',
    alignItems:'center',
    alignContent:'center',
    width:"30%",
    marginRight:"60%",
    marginTop:"5%"
    
    // marginBottom: 10,
 
},

})

export default Appicon